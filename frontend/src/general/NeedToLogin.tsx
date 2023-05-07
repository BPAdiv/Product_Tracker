import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

type INeedToLoginProps = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  followPage?: boolean;
};

export default function NeedToLogin({
  isLogin,
  setIsLogin,
  followPage,
}: INeedToLoginProps) {
  // const [showModal, setIsLogin] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none   ">
        <div className="relative w-auto my-6  max-w-3xl p-5 z-50 ">
          {/*content*/}
          <div
            // onSubmit={(e) => handleSumbitNewFollow(e)}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <div className="p-5 border-b">
              <h1 className="text-center text-3xl font-semibold">
                Need To Login!
              </h1>
            </div>
            {/*header*/}

            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                To access products and the followings you need to{" "}
                <span className="font-semibold"> Login </span>or to
                <span className="font-semibold"> Sign up</span>
              </p>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500  bg-white hover:bg-red-50 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-red-700 focus:z-10 dark:bg-gray-700 dark:text-red-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-red-600"
                type="button"
                onClick={() => (followPage ? navigate("/") : setIsLogin(false))}
              >
                {followPage ? "Back Home" : "Close"}
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => navigate("/account/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div
          onClick={() => setIsLogin(false)}
          className="opacity-50 fixed inset-0 z-40 bg-black "
        ></div>
      </div>
    </>
  );
}
