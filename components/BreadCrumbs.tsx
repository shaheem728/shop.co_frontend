"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Breadcrumbs = () => {
  const router = usePathname();
  const pathnames = router.split("/").filter((x) => x);
  let breadcrumbsPath = "";
  return (
    <div className="flex items-center gap-3  border-t px-4">
      {pathnames.length === 0 ? (
        ""
      ) : (
        <Link
          href="/"
          className="text-gray-500 font-normal text-base hover:text-blue-500"
        >
          Home
        </Link>
      )}
      {pathnames.map((name, index) => {
        breadcrumbsPath += `/${name}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <div
            key={breadcrumbsPath}
            className="text-gray-500  font-normal text-base hover:text-blue-500"
          >
            <span className="flex items-center gap-3">
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.53073 0.469372L6.53073 5.46937C6.60065 5.53905 6.65613 5.62184 6.69399 5.71301C6.73184 5.80417 6.75133 5.90191 6.75133 6.00062C6.75133 6.09933 6.73184 6.19707 6.69399 6.28824C6.65613 6.3794 6.60065 6.46219 6.53073 6.53187L1.53073 11.5319C1.38984 11.6728 1.19874 11.7519 0.999484 11.7519C0.800227 11.7519 0.609131 11.6728 0.468235 11.5319C0.327338 11.391 0.248184 11.1999 0.248184 11.0006C0.248184 10.8014 0.327338 10.6103 0.468235 10.4694L4.93761 6L0.46761 1.53062C0.326714 1.38973 0.247559 1.19863 0.247559 0.999372C0.247559 0.800115 0.326714 0.609018 0.46761 0.468122C0.608506 0.327227 0.799603 0.24807 0.99886 0.24807C1.19812 0.24807 1.38921 0.327227 1.53011 0.468122L1.53073 0.469372Z"
                  fill="black"
                  fillOpacity="0.6"
                />
              </svg>
              {name}
            </span>
          </div>
        ) : (
          <div key={breadcrumbsPath}>
            <Link href={breadcrumbsPath}>
              <div
                key={breadcrumbsPath}
                className="text-gray-500  font-normal text-base hover:text-blue-500"
              >
                <span className="flex items-center gap-3">
                  <svg
                    width="7"
                    height="12"
                    viewBox="0 0 7 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.53073 0.469372L6.53073 5.46937C6.60065 5.53905 6.65613 5.62184 6.69399 5.71301C6.73184 5.80417 6.75133 5.90191 6.75133 6.00062C6.75133 6.09933 6.73184 6.19707 6.69399 6.28824C6.65613 6.3794 6.60065 6.46219 6.53073 6.53187L1.53073 11.5319C1.38984 11.6728 1.19874 11.7519 0.999484 11.7519C0.800227 11.7519 0.609131 11.6728 0.468235 11.5319C0.327338 11.391 0.248184 11.1999 0.248184 11.0006C0.248184 10.8014 0.327338 10.6103 0.468235 10.4694L4.93761 6L0.46761 1.53062C0.326714 1.38973 0.247559 1.19863 0.247559 0.999372C0.247559 0.800115 0.326714 0.609018 0.46761 0.468122C0.608506 0.327227 0.799603 0.24807 0.99886 0.24807C1.19812 0.24807 1.38921 0.327227 1.53011 0.468122L1.53073 0.469372Z"
                      fill="black"
                      fillOpacity="0.6"
                    />
                  </svg>
                  {name}
                </span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
