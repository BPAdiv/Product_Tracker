import * as React from "react";
import UserAbout from "./UserAbout";
import UpdateUserModal from "./UpdateUserModal";

export default function UserHeading() {
  return (
    <div>
      {/* Code block starts */}
      <div className="my-6 lg:my-12  px-6 mx-auto flex flex-col gap-5 items-start  justify-between p-5 shadow-sm rounded border border-gray-300">
        <div className="w-full border-b pb-2">
          <h4 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100 ">
            Your Profile
          </h4>
        </div>

        <div className="mt-6 md:mt-0 flex items-end justify-between w-full max-sm:flex-col max-sm:items-center gap-3">
          <UserAbout />
          <div className="text-right py-2">
            <UpdateUserModal
              content="Edit Profile"
              className="transition focus:outline-none duration-150 ease-in-out hover:bg-blue-800 bg-blue-700 rounded text-white px-8 py-2 text-sm"
            />
            {/* <button className="transition focus:outline-none duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
              Edit Profile
            </button> */}
          </div>
        </div>
        {/* Code block ends */}
      </div>
    </div>
  );
}
