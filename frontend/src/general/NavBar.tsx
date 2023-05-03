import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import bargainHiveLogo from "../assets/icons8-hive-64.png";
import { useAuth } from "../hooks/useAuth";
// export interface INavBarProps {
// }

export default function NavBar() {
  const { user } = useContext(UserContext);
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.pathname === window.location.pathname) {
      window.location.reload();
    }
  };

  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <nav className="bg-white border-gray-200 ">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xxl px-4 md:px-6 py-2.5">
            <a href="/" className="flex items-center step-1">
              <img
                src={bargainHiveLogo}
                className="h-6 mr-3 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap ">
                BargainHive
              </span>
            </a>
            <div className="flex items-center max-sm:w-full ">
              <button
                onClick={() => navigate("/getStarted")}
                // href="/getStarted"
                className="mr-6 text-sm font-medium text-gray-500  hover:underline start-step-1"
              >
                How To Start
              </button>
              {!user ? (
                <a
                  href="/account/login"
                  className="text-sm font-medium text-blue-600  hover:underline max-sm:ml-auto login-step-1"
                >
                  Login
                </a>
              ) : (
                <>
                  <div className="max-sm:ml-auto">
                    <a
                      href="/user/tracks"
                      className="mr-3 text-sm font-medium text-blue-600  hover:underline "
                    >
                      Profile
                    </a>
                    <button
                      onClick={logout}
                      className=" text-sm font-medium p-2 rounded bg-blue-600 text-white   hover:underline "
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
        <nav className="bg-gray-50 ">
          <div className="max-w-screen-xxl px-4 py-3 mx-auto md:px-6">
            <div className="flex items-center">
              <ul className="flex flex-row flex-wrap   mt-0 mr-6 gap-4 text-sm font-medium nav-step-3">
                <li>
                  <a
                    href="/"
                    className="text-gray-900  hover:underline"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    state={{ productTab: "pop" }}
                    className="text-gray-900  hover:underline "
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
                    className="text-gray-900  hover:underline "
                    onClick={handleLinkClick}
                  >
                    Hot
                  </NavLink>
                </li>
                <li className="nav-step-2">
                  <NavLink
                    to="/products"
                    state={{ productTab: "all" }}
                    className="text-gray-900  hover:underline"
                    onClick={handleLinkClick}
                  >
                    All Products
                  </NavLink>
                </li>
                {user && (
                  <li>
                    <a
                      href="/addProduct"
                      className="text-gray-900  hover:underline"
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
