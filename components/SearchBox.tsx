'use client'
import { useState } from "react";
import { useRouter} from 'next/navigation';
import dynamic from "next/dynamic";
const SearchBox =()=> {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products/?search=${query.trim()}`);
    }
    setQuery('')
  };
  return (
    <>
      <div className="flex">
        <form onSubmit={handleSearch}>
          <div className="relative  w-96">
            <button type="submit" className="absolute top-0 start-0 p-2.5 text-sm font-medium h-full text-gray-500  rounded-s-full border  hover:bg-black border-none ">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
            </button>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-secondary "
              placeholder="Search for products..."
              value={query}
              required
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
}
export default dynamic(() => Promise.resolve(SearchBox), { ssr: false });