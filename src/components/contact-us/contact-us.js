import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../alert/dialog-modal";
import emailjs from "@emailjs/browser";

function ContactUs() {
  const form = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_r6hvccc",
        "template_jx4576b",
        form.current,
        "hQhPWFs4OHjzQIaXJ"
      )
      .then(
        () => {
          setOpen(true);
          event.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const [open, setOpen] = useState(false);

  return (
    <main className="py-14">
      <Modal
        message={"Thanks for contacting us! We'll reach out soon  😊"}
        open={open}
        setOpen={setOpen}
        error={"success"}
        buttonMessage={"Continue"}
      />

      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
          <div className="max-w-lg space-y-3">
            <h3 className="text-blue-600 font-semibold">Contact</h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Let us know how we can help
            </p>
            <p>
              We’re here to help and answer any question you might have, We look
              forward to hearing from you! Please fill out the form, or us the
              contact information bellow .
            </p>
            <div>
              <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                <li className="flex items-center gap-x-3">
                  <div className="flex-none text-gray-400">
                    <EnvelopeIcon className="w-6 h-6" />
                  </div>
                  <a href="mailto:jobnest0094@gmail.com">
                    jobnest0094@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-x-3">
                  <div className="flex-none text-gray-400">
                    <PhoneIcon className="w-6 h-6" />
                  </div>
                  <a href="tel:+94768242884">+94 76 824 2884</a>
                </li>
                <li className="flex items-center gap-x-3">
                  <div className="flex-none text-gray-400">
                    <MapPinIcon className="w-6 h-6" />
                  </div>
                  <p>Kurunegala, North Western, Sri Lanka.</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
            <form ref={form} onSubmit={submitHandler} className="space-y-5">
              <div>
                <label className="font-medium">Full name</label>
                <input
                  type="text"
                  required
                  name="user_name"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Message</label>
                <textarea
                  required
                  name="message"
                  className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                ></textarea>
              </div>
              <button className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
export default ContactUs;
