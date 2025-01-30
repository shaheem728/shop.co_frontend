"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/strore";
import { addToCart, CartItem } from "@/app/redux/slices/cartSlice";
import ColorSelector from "@/components/Colorselector";
import Star from "@/components/Star";
import { fetchProducts, Product } from "@/app/redux/slices/productSlice";
import ProductDetail from "@/components/ProductDetail";
import RelatedProducts from "@/components/RelatedProducts";
import Loading from '@/components/Loading';
interface Images {
  image: string;
}
export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params); // Unwrap the params Promise
  const { products, status} = useSelector(
    (state: RootState) => state.products
  );
  const [detail, setDetail] = useState<Product | null | undefined>(null);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (status === "succeeded") {
      const item = products.find((product) => product.uuid === slug);
      setDetail(item ? item : null); // Set to null if item is undefined
    } else if (status === "idle") {
      dispatch(fetchProducts({ page: 1, search: "" }));
    }
  }, [products, slug, status,dispatch]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(1);
  const [price, setPrice] = useState<number>(100);
  const [isLoading, setIsLoading] = useState(false);
  // Handle color selection
  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
    // Set the default image for the selected color
    const colorDetail = detail?.colors.find(
      (color) => color.color_name === colorName
    );
    if (colorDetail && colorDetail.images.length > 0) {
      setSelectedImage(colorDetail.images[0].image);
    }
  };
  useEffect(() => {
    if (detail) {
      // Only set defaults if no color or image is already selected
      if (!selectedColor && detail.colors.length > 0) {
        const defaultColor = detail.colors[0];
        setSelectedColor(defaultColor.color_name);
  
        if (!selectedImage && defaultColor.images.length > 0) {
          setSelectedImage(defaultColor.images[0].image);
        }
      }
    }
  }, [detail,selectedColor, selectedImage]);
  useEffect(() => {
    if (!detail) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [detail]);
  
  if (!detail) {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="flex flex-col items-center justify-center my-48">
          <p>Product Not Found</p>
          <button
            type="reset"
            onClick={() => dispatch(fetchProducts({ page: 1, search: "" }))}
            className="btn-reset"
          >
            Reset
          </button>
        </div>
      );
    }
  }
  // Filter images by the selected color
  const filteredImages =
    detail.colors.find((color) => color.color_name === selectedColor)?.images ||
    [];
  const increaseQty = () => {
    //handle product qunantity
    if (qty < detail.stock) {
      setQty(qty + 1);
    }
    if (price < detail.price * detail.stock) {
      const p = detail.price;
      setPrice(p * (qty + 1));
    }
  };
  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
    if (price > detail.price) {
      const p = price - detail.price;
      setPrice(p);
    }
  };
  const amount = price - Number(detail.discount);
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: detail.id,
      name: detail.name,
      quantity: 1,
      price: detail.price,
      image: selectedImage ?selectedImage:'',
      stock: detail.stock,
      color: selectedColor?selectedColor:'',
      size: selectedSize ? selectedSize : "small",
    };
    dispatch(addToCart(cartItem));
  };
  return (
    <section className="mt-28 mx-3">
      <div className="md:px-28  bg-white">
        <div className="flex flex-col lg:flex-row ">
          <div className="flex flex-col lg:flex-row">
            <div className="col-auto">
              <div className="flex flex-col-reverse lg:flex-row">
                {/* Small images */}
                <div className="flex lg:flex-col">
                  {filteredImages.map((image: Images, index: number) => (
                    <div
                      key={index}
                      className={`m-2 w-36 h-40 bg-secondary rounded-2xl cursor-pointer ${
                        selectedImage === image.image ? "ring-4 ring-black" : ""
                      }`}
                      onClick={() => setSelectedImage(image.image)}
                    >
                      <Image
                        className="h-full w-full object-contain rounded-2xl"
                        src={image.image}
                        alt={`Product Image ${index + 1}`}
                        width={400}
                        height={400}
                        />
                     
                    </div>
                  ))}
                </div>

                {/* Big image */}
                <div className="md:w-[430px] h-[32em] mx-1 bg-secondary rounded-2xl">
                  {filteredImages.length > 0 && (
                    <Image
                      className="w-full h-full object-fill rounded-2xl"
                      src={selectedImage || filteredImages[0]?.image}
                      alt={detail.name}
                      width={400}
                      height={400}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:ms-4">
            <h1 className="text-black md:text-5xl text-xl font-bold text-center py-10">
              {detail.name}
            </h1>
            <div className="flex items-center gap-1 ">
              <Star star={Number(detail.rating)} />
              <div className="inline">
                <span className="text-black text-base">{4.5}/</span>
                <span className="text-gray-500 text-base">5</span>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-black mt-1">
                  {" "}
                  ${amount}
                </span>
                {detail.discount > 1 && (
                  <>
                    <span className="text-2xl font-bold text-gray-400 line-through  mt-1">
                      ${price}
                    </span>
                    <div className="discount-content">
                      -{detail.discount}%
                    </div>
                  </>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-sm my-3">{detail.description}</p>
            <hr />
            <p className="text-gray-600 text-sm mt-3">Select Color&apos;s</p>
            <div className="flex flex-wrap">
              {detail.colors.map((color) => (
                <ColorSelector
                  key={color.color_name}
                  color={color.color_name}
                  isSelected={selectedColor === color.color_name}
                  onSelect={handleColorSelect}
                  value={color.color_name}
                />
              ))}
            </div>
            <hr />
            <p className="text-gray-600 text-sm mt-3">Choose Size</p>
            <div className="flex flex-row my-3">
              {(detail?.sizes || []).map((size: string, index: number) => (
                <div
                  key={index}
                  className={`btn-size cursor-pointer ${
                    selectedSize === size ? "ring-4 ring-black" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
            <div className="flex">
              {/* quantity */}
              {detail.stock > 0 && (
                <div
                  className="flex rounded-full shadow-sm mt-2 bg-secondary w-auto me-1"
                  role="group"
                >
                  <button
                    type="button"
                    className="btn-quantity rounded-s-full"
                    onClick={decreaseQty}
                  >
                    <svg
                      className="w-6 h-6 text-gray-800   hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 "
                  >
                    {qty}
                  </button>
                  <button
                    type="button"
                    className="btn-quantity rounded-e-full"
                    onClick={increaseQty}
                  >
                    <svg
                      className="w-6 h-6 text-gray-800  hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-7 7V5"
                      />
                    </svg>
                  </button>
                </div>
              )}

              <button
                type="button"
                className="btn-addTocart"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*=============== End productDetail ==============*/}

      <section className="bg-white py-5 ">
        <ProductDetail detail={detail} />
      </section>
      <section className="bg-white py-5 ">
        <RelatedProducts data={detail.category} />
      </section>
    </section>
  );
}
