import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AboutUsModal = ({ onClose }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
     style={{ fontFamily: 'Poppins' }}
      className="fixed bg-black/60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[650px] max-w-full bg-white rounded-xl p-6 relative shadow-lg bg-red"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">About Us</h2>
        <p className="text-sm text-gray-500 mb-4">
          Learn who we are and what we’re building.
        </p>

        {/* Content */}
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
            <p className="font-semibold text-gray-800 mb-1">Our Mission</p>
            <p>
              We build simple and reliable solutions that help people manage their
              daily work more effectively, with a focus on clean UI, speed, and
              real-world usability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-gray-800 mb-1">What We Do</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Build modern web & mobile applications</li>
                <li>Design user-friendly interfaces</li>
                <li>Focus on performance and scalability</li>
              </ul>
            </div>

            <div className="rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-gray-800 mb-1">Our Values</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Quality over shortcuts</li>
                <li>Simple and clean experience</li>
                <li>Continuous improvement</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
            <p className="font-semibold text-gray-800 mb-1">Need Support?</p>
            <p>
              If you have questions or feedback, feel free to contact us through
              the Contact page.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsModal;