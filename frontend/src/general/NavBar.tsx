import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Link, NavLink } from "react-router-dom";

// export interface INavBarProps {
// }

export default function NavBar() {
  const { user } = useContext(UserContext);
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.pathname === window.location.pathname) {
      window.location.reload();
    }
  };
  return (
    <>
      <div>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xxl px-4 md:px-6 py-2.5">
            <a href="/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-6 mr-3 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                BargainHive
              </span>
            </a>
            <div className="flex items-center">
              <a
                href="/getStarted"
                className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline"
              >
                How To Start
              </a>
              {!user ? (
                <a
                  href="/account/login"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Login
                </a>
              ) : (
                <a
                  href="/user/tracks"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Profile
                </a>
              )}
            </div>
          </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700">
          <div className="max-w-screen-xxl px-4 py-3 mx-auto md:px-6">
            <div className="flex items-center">
              <ul className="flex flex-row flex-wrap   mt-0 mr-6 gap-4 text-sm font-medium">
                <li>
                  <a
                    href="/"
                    className="text-gray-900 dark:text-white hover:underline"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    state={{ productTab: "pop" }}
                    className="text-gray-900 dark:text-white hover:underline "
                    onClick={handleLinkClick}
                    // onClick={this.forceUpdate}
                  >
                    Popular
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    state={{ productTab: "hot" }}
                    className="text-gray-900 dark:text-white hover:underline "
                    onClick={handleLinkClick}
                  >
                    Hot
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    state={{ productTab: "all" }}
                    className="text-gray-900 dark:text-white hover:underline"
                    onClick={handleLinkClick}
                  >
                    All Products
                  </NavLink>
                </li>
                {user && (
                  <li>
                    <a
                      href="/addProduct"
                      className="text-gray-900 dark:text-white hover:underline"
                    >
                      Track Product
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
