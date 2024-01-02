import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Contact = () => {
  return (
    <>
    <div className=" min-h-[calc(40vmax)] flex flex-col">

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-1 mt-8">Contact Us</h1>
        <div className="h-1 w-60 bg-blue-700 rounded mb-6"></div>
      </div>
      <div className=" flex md:flex-row flex-col justify-center">

        <div className="flex justify-center">
          <div className=" m-8  border-2 border-blue-500 rounded-lg p-8">
            <p>Aayush Man Shakya</p>
            <div className="flex gap-2 items-center">
              <MdOutlineEmail />
              <p>aayushman950@gmail.com</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaPhoneAlt />
              <p>9861666110</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=" m-8  border-2 border-blue-500 rounded-lg p-8">
            <p>Aayush Man Shakya</p>
            <div className="flex gap-2 items-center">
              <MdOutlineEmail />
              <p>aayushman950@gmail.com</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaPhoneAlt />
              <p>9861666110</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=" m-8  border-2 border-blue-500 rounded-lg p-8">
            <p>Aayush Man Shakya</p>
            <div className="flex gap-2 items-center">
              <MdOutlineEmail />
              <p>aayushman950@gmail.com</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaPhoneAlt />
              <p>9861666110</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
