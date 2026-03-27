import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ContactUsModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Close on ESC + lock background scroll
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

  const handleChange = (e) => {
    setSent(false);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      nextErrors.email = "Enter a valid email";

    if (!form.subject.trim()) nextErrors.subject = "Subject is required";
    if (!form.message.trim()) nextErrors.message = "Message is required";
    else if (form.message.trim().length < 10)
      nextErrors.message = "Message should be at least 10 characters";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    try {
      await new Promise((r) => setTimeout(r, 900));
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setErrors({ general: `Failed to send. Please try again. ${err.message}` });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
     style={{ fontFamily: 'Poppins' }}
      className=" fixed bg-black/60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[650px] max-w-full bg-white rounded-xl p-6 relative shadow-lg"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <h2 
        className="text-2xl font-bold text-gray-800 mb-1">Contact Us</h2>
        <p className="text-sm text-gray-500 mb-4">
          Send us a message and we’ll get back to you soon.
        </p>

        {errors.general && (
          <div className="mb-3 rounded-lg bg-red-50 text-red-700 p-3 text-sm">
            {errors.general}
          </div>
        )}

        {sent && (
          <div className="mb-3 rounded-lg bg-green-50 text-green-700 p-3 text-sm">
            ✅ Message sent successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border p-2 outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border p-2 outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="you@email.com"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border p-2 outline-none focus:ring-2 ${
                errors.subject
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="Subject"
            />
            {errors.subject && (
              <p className="text-xs text-red-600 mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className={`mt-1 w-full rounded-lg border p-2 outline-none focus:ring-2 resize-none ${
                errors.message
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="Write your message..."
            />
            {errors.message && (
              <p className="text-xs text-red-600 mt-1">{errors.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              style={{ fontFamily: 'Poppins' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSending}
              className="px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-700 disabled:opacity-60"
              style={{ fontFamily: 'Poppins' }}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsModal;