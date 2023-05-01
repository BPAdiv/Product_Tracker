import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";

export interface setModalOpen {
  className: string;
  content: string;
}

export default function ContactUsModal({ className, content }: setModalOpen) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/contact`,
        { email, subject, emailContent }
      );

      setModalOpen(false);
      swal({
        title: "Success!",
        text: "Email has sent successfully",
        icon: "success",
        timer: 1500,
        buttons: [false],
      });
    } catch (error) {
      console.log(error);
      setModalOpen(false);
      swal({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Could not send email",
      });
    }
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)} className={className}>
        {content}
      </button>
      {modalOpen ? (
        <div className="fixed  top-0 left-0 right-0 z-50   w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  min-h-screen flex justify-center items-center   ">
          <div
            onClick={() => setModalOpen(false)}
            className="absolute inset-0  bg-black  w-full bg-opacity-40 -z-10 "
          ></div>
          <section className="bg-gray-900 w-max px-[3vw] rounded relative">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
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
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center  text-white">
                Contact Us
              </h2>
              <p className="mb-8 lg:mb-16 font-light text-center  text-gray-400 sm:text-xl">
                Got a technical issue? Want to send feedback about a beta
                feature? Need details about Bargain Hive? Let us know.
              </p>
              <form onSubmit={(e) => submitForm(e)} className="space-y-8">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium  text-gray-300"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="shadow-sm  border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
                    placeholder="name@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="block p-3 w-full text-sm  rounded-lg border  shadow-sm  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
                    placeholder="Let us know how we can help you"
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-400"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="block p-2.5 w-full text-sm  rounded-lg shadow-sm border   bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Leave a comment..."
                    onChange={(e) => setEmailContent(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg  sm:w-fit  focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                  Send message
                </button>
              </form>
            </div>
          </section>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
