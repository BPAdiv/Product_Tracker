import { useContext, useState } from "react";
import swal from "sweetalert";
import { UserContext } from "../../contexts/userContext";
import axios from "axios";

export interface setModalOpen {
  className: string;
  content: string;
}

export default function UpdateUserModal({ className, content }: setModalOpen) {
  const [isOpen, setIsOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const { user, setUser } = useContext(UserContext);
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newEmail && !newUserName) {
      return swal({
        title: "At least one of the fields is required ",
        text: "Try again after filling the fields",
        icon: "warning",
        timer: 1500,
        buttons: [false],
      });
    }
    try {
      if (!user) return;

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/updateUser`,
        { email: newEmail, userName: newUserName, userId: user._id }
      );
      console.log(data);
      setUser({ ...data.updateUser });
      setIsOpen(false);
      swal({
        title: "Success!",
        text: "User updated successfully",
        icon: "success",
        timer: 1500,
        buttons: [false],
      });
    } catch (error) {
      setIsOpen(false);
      swal({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Could not update user",
      });
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className}>
        {content}
      </button>
      {isOpen ? (
        <div className="fixed  top-0 left-0 right-0 z-50   w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  min-h-screen flex justify-center items-center   ">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0  bg-black  w-full bg-opacity-40 -z-10 "
          ></div>
          <section className="bg-gray-900 w-max px-[3vw] rounded relative">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-[2vw] top-[2vw] text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white border border-gray-400 hover:border-gray-600  transition-all "
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <section className=" bg-gray-900">
              <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="my-6 text-xl font-bold  text-white text-center">
                  Update product
                </h2>
                <h2 className="mb-4 text-base font-bold  text-gray-500 text-center">
                  If you dont want to update a field leave it empty
                </h2>
                <form onSubmit={(e) => handleUpdateUser(e)}>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium  text-white"
                      >
                        New Email
                      </label>
                      <input
                        type="email"
                        name="name"
                        id="name"
                        className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type New Email"
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="brand"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        New UserName
                      </label>
                      <input
                        type="text"
                        name="brand"
                        id="brand"
                        className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type New UserName"
                        onChange={(e) => setNewUserName(e.target.value)}
                      />
                    </div>
                    {/* <div className="w-full">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Phone
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Phone Number"
                        required
                        min={0}
                      />
                    </div> */}
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <button
                      type="submit"
                      className="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >
                      Update user
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className=" inline-flex items-center   border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-900"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </section>
        </div>
      ) : (
        ""
      )}
    </>
    // <>
    //   <button
    //     onClick={() => setIsOpen(true)}
    //     className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //     type="button"
    //   >
    //     Toggle modal
    //   </button>
    //   {isOpen && (
    //     <div
    //       id="authentication-modal"
    //       aria-hidden="true"
    //       className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    //     >
    //       <div className="relative w-full max-w-md max-h-full">
    //         <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
    //           <button
    //             type="button"
    //             className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
    //             onClick={() => setIsOpen(false)}
    //           >
    //             <svg
    //               aria-hidden="true"
    //               className="w-5 h-5"
    //               fill="currentColor"
    //               viewBox="0 0 20 20"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <path
    //                 fill-rule="evenodd"
    //                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //                 clip-rule="evenodd"
    //               ></path>
    //             </svg>
    //             <span className="sr-only">Close modal</span>
    //           </button>
    //           <section className="bg-white dark:bg-gray-900">
    //             <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
    //               <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
    //                 Update product
    //               </h2>
    //               <form action="#">
    //                 <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
    //                   <div className="sm:col-span-2">
    //                     <label
    //                       htmlFor="name"
    //                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //                     >
    //                       Product Name
    //                     </label>
    //                     <input
    //                       type="text"
    //                       name="name"
    //                       id="name"
    //                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                       value="Apple iMac 27&ldquo;"
    //                       placeholder="Type product name"
    //                       required
    //                     />
    //                   </div>
    //                   <div className="w-full">
    //                     <label
    //                       htmlFor="brand"
    //                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //                     >
    //                       Brand
    //                     </label>
    //                     <input
    //                       type="text"
    //                       name="brand"
    //                       id="brand"
    //                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                       value="Apple"
    //                       placeholder="Product brand"
    //                       required
    //                     />
    //                   </div>
    //                   <div className="w-full">
    //                     <label
    //                       htmlFor="price"
    //                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //                     >
    //                       Price
    //                     </label>
    //                     <input
    //                       type="number"
    //                       name="price"
    //                       id="price"
    //                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                       value="2999"
    //                       placeholder="$299"
    //                       required
    //                     />
    //                   </div>
    //                   <div>
    //                     <label
    //                       htmlFor="category"
    //                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //                     >
    //                       Category
    //                     </label>
    //                     <select
    //                       id="category"
    //                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                     >
    //                       <option selected>Electronics</option>
    //                       <option value="TV">TV/Monitors</option>
    //                       <option value="PC">PC</option>
    //                       <option value="GA">Gaming/Console</option>
    //                       <option value="PH">Phones</option>
    //                     </select>
    //                   </div>
    //                   <div>
    //                     <label
    //                       htmlFor="item-weight"
    //                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //                     >
    //                       Item Weight (kg)
    //                     </label>
    //                     <input
    //                       type="number"
    //                       name="item-weight"
    //                       id="item-weight"
    //                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                       value="15"
    //                       placeholder="Ex. 12"
    //                       required
    //                     />
    //                   </div>
    //                   <div className="sm:col-span-2">
    //                     <label
    //                       htmlFor="description"
    //                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //                     >
    //                       Description
    //                     </label>
    //                     <textarea
    //                       id="description"
    //                       rows={8}
    //                       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                       placeholder="Write a product description here..."
    //                     >
    //                       Standard glass, 3.8GHz 8-core 10th-generation Intel
    //                       Core i7 processor, Turbo Boost up to 5.0GHz, 16GB
    //                       2666MHz DDR4 memory, Radeon Pro 5500 XT with 8GB of
    //                       GDDR6 memory, 256GB SSD storage, Gigabit Ethernet,
    //                       Magic Mouse 2, Magic Keyboard - US
    //                     </textarea>
    //                   </div>
    //                 </div>
    //                 <div className="flex items-center space-x-4">
    //                   <button
    //                     type="submit"
    //                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //                   >
    //                     Update product
    //                   </button>
    //                   <button
    //                     type="button"
    //                     className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
    //                   >
    //                     <svg
    //                       className="w-5 h-5 mr-1 -ml-1"
    //                       fill="currentColor"
    //                       viewBox="0 0 20 20"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                     >
    //                       <path
    //                         fill-rule="evenodd"
    //                         d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
    //                         clip-rule="evenodd"
    //                       ></path>
    //                     </svg>
    //                     Delete
    //                   </button>
    //                 </div>
    //               </form>
    //             </div>
    //           </section>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>
  );
}
