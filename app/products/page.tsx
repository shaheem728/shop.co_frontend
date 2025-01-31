"use client";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/Filter";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/strore";
import { fetchProducts, Product } from "../redux/slices/productSlice";
import { SetStateAction, useEffect, useState, Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { Drawer } from "flowbite-react";
import Loading from "@/components/Loading";
function ProductsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const dispatch: AppDispatch = useDispatch();
  const { products, pages, status, error } = useSelector(
    (state: RootState) => state.products
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts({ page: page, search: "" }));
    }
  }, [dispatch, status, page]);
  useEffect(() => {
    dispatch(fetchProducts({ page: page, search: category }));
  }, [category, page, dispatch]);
  useEffect(() => {
    dispatch(fetchProducts({ page: page, search: search }));
  }, [search, dispatch, page]);
  useEffect(() => {
    if (products.length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [products]);
  const handleColorSelect = (color: string) => {
    setQuery(color);
  };
  const handleSize = (size: string) => {
    setQuery(size);
  };
  const handlecategory = (category: string) => {
    setCategory(category);
  };
  const selectPageHandler = (selectPage: SetStateAction<number>) => {
    setPage(selectPage);
  };
  //input filter
  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  function handleRemoveFilter() {
    dispatch(fetchProducts({ page: page, search: "" }));
    setQuery("");
    setQuery("");
    setCategory("");
  }
  const filteredItem = products.filter((product) => {
    const queryLower = String(query).toLocaleLowerCase();
    const priceQuery = query.match(/^\d+$/); // Check if query is a number
    return (
      (product.category &&
        product.category.toLocaleLowerCase().includes(queryLower)) ||
      (product.name && product.name.toLocaleLowerCase().includes(queryLower)) ||
      (product.sizes &&
        String(product.sizes).toLocaleLowerCase().includes(queryLower)) ||
      (product.colors &&
        product.colors[0] &&
        product.colors[0].color_name &&
        product.colors[0].color_name
          .toLocaleLowerCase()
          .includes(queryLower)) ||
      (product.style &&
        product.style.toLocaleLowerCase().includes(queryLower)) ||
      (priceQuery && product.price <= parseInt(priceQuery[0])) // Filter by price
    );
  });
  function filterData(products: Product[], query: string) {
    let filteredProducts = products;
    if (query) {
      filteredProducts = filteredItem;
    }
    return filteredProducts.map((product) => (
      <ProductCard key={product.uuid} product={product} />
    ));
  }
  const result = filterData(products, query);
  if (status === "failed")
    return (
      <p className="flex justify-center items-center my-40">Error: {error}</p>
    );
  if (products.length === 0) {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="flex flex-col items-center justify-center my-48">
          <p>Please wait...</p>
          {products.length < 0 && (
            <button
              type="reset"
              onClick={() => dispatch(fetchProducts({ page: 1, search: "" }))}
              className="btn-reset"
            >
              Reset
            </button>
          )}
        </div>
      );
    }
  }
  return (
    <div className="bg-white mt-20">
      {/* Mobile filter */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <!-- drawer component --> */}
        <div className="lg:hidden block">
          <div className="flex  items-end justify-end">
            <button
              className="text-white bg-gray-800 hover:bg-gray-900 cursor-pointer focus:ring-8 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 "
              onClick={() => setIsOpen(true)}
            >
              <svg
                className="w-[26px] h-[26px] "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
                />
              </svg>
            </button>
          </div>
          <div
            className={`fixed top-20 z-40 ${
              isOpen == true ? " " : "hidden"
            } h-screen p-4 overflow-y-auto transition-transform  bg-white w-80 dark:bg-gray-800" tabIndex={-1} aria-labelledby="drawer-label`}
          >
            <button
              type="button"
              onClick={()=>setIsOpen(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
            <Filter
              handleChanges={handleChanges}
              onSelectSize={handleSize}
              onSelectColor={handleColorSelect}
              onSelectCategory={handlecategory}
              handleRemoveFilter={handleRemoveFilter}
            />
          </div>
        </div>

        {/* <!-- End drawer component --> */}
        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <div className="hidden lg:block">
              <Filter
                handleChanges={handleChanges}
                onSelectSize={handleSize}
                onSelectColor={handleColorSelect}
                onSelectCategory={handlecategory}
                handleRemoveFilter={handleRemoveFilter}
              />
            </div>
            {/* Products*/}
            <div className="lg:col-span-3">
              <hr />
              <div className="flex flex-wrap justify-center gap-1 py-3 min-h-80">
                {
                  !result ? (
                    <h3 className="my-40">Please waite...</h3>
                  ) : result.length === 0 ? (
                    <h3 className="my-40">Not Matching</h3>
                  ) : (
                    result
                  ) /*result of flter */
                }
              </div>
              <hr />
              <div className="flex justify-evenly py-3 ">
                {/*previous */}
                {page > 1 && (
                  <button
                    className="btn-paggination"
                    onClick={() => {
                      selectPageHandler(page - 1);
                    }}
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                      />
                    </svg>
                    Previous
                  </button>
                )}
                <div className="flex justify-center items-center -space-x-px h-8 text-sm">
                  {[...Array(pages)].map((_, i) => {
                    return (
                      <span onClick={() => selectPageHandler(i + 1)} key={i}>
                        <span
                          className={`flex items-center justify-center px-3 h-8 leading-tight ${
                            page === i + 1 ? "text-blue-500" : "text-gray-500"
                          } bg-white   hover:bg-gray-100 hover:text-gray-700 `}
                        >
                          {i + 1}
                        </span>
                      </span>
                    );
                  })}
                </div>
                {/*next*/}
                {page < pages && (
                  <button
                    className="btn-paggination"
                    onClick={() => {
                      selectPageHandler(page + 1);
                    }}
                  >
                    Next
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsPage />
    </Suspense>
  );
}
