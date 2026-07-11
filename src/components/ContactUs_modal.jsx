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


  if (typeof document !== "undefined" && !document.getElementById("__contact-modal-styles")) {
  const s = document.createElement("style");
  s.id = "__contact-modal-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

    @keyframes contactOverlayIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes contactPanelIn {
      from { opacity: 0; transform: translateY(20px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .__contact-overlay { animation: contactOverlayIn 0.2s ease forwards; }
    .__contact-panel   { animation: contactPanelIn 0.28s cubic-bezier(0.22,1,0.36,1) forwards; }

    .__contact-input {
      width: 100%;
      box-sizing: border-box;
      border-radius: 10px;
      border: 1.5px solid #dbeafe;
      padding: 10px 13px;
      font-size: 13.5px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      color: #1e3a8a;
      background: #f8faff;
      outline: none;
      transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
    }
    .__contact-input::placeholder { color: #93c5fd; font-weight: 400; }
    .__contact-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
      background: #fff;
    }
    .__contact-input.error {
      border-color: #fca5a5;
      background: #fff5f5;
    }
    .__contact-input.error:focus {
      box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
    }

    .__contact-label {
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #1d4ed8;
      margin-bottom: 6px;
      display: block;
    }

    .__contact-cancel-btn:hover {
      background: #eff6ff !important;
      border-color: #93c5fd !important;
      color: #1d4ed8 !important;
    }
    .__contact-send-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, #1e40af, #2563eb) !important;
      box-shadow: 0 6px 20px rgba(29,78,216,0.35) !important;
      transform: translateY(-1px);
    }
    .__contact-send-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .__contact-close-icon:hover { background: rgba(255,255,255,0.25) !important; transform: rotate(90deg); }
    .__contact-close-icon { transition: transform 0.2s, background 0.18s; }
  `;
  document.head.appendChild(s);
}

return (
  <div
    className="__contact-overlay"
    style={{
      fontFamily: "'DM Sans', 'Poppins', sans-serif",
      position: "fixed",
      inset: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      background: "rgba(15,23,42,0.55)",
      backdropFilter: "blur(5px)",
    }}
    onClick={onClose}
  >
    <div
      className="__contact-panel"
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        maxWidth: "620px",
        background: "#fff",
        borderRadius: "22px",
        boxShadow: "0 28px 64px rgba(30,58,138,0.18), 0 4px 16px rgba(0,0,0,0.07)",
        overflow: "hidden",
      }}
    >
      <div style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #3b82f6 100%)",
        padding: "24px 28px 20px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position:"absolute", top:"-50px", right:"-50px", width:"170px", height:"170px", borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-60px", left:"25%", width:"140px", height:"140px", borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />


        <div style={{ display:"flex", alignItems:"center", gap:"12px", position:"relative", zIndex:1 }}>
          <div style={{
            width:"42px", height:"42px", borderRadius:"11px",
            background:"rgba(255,255,255,0.16)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"20px",
          }}>✉️</div>
          <div>
            <h2 style={{ color:"#fff", fontSize:"19px", fontWeight:"700", margin:0, letterSpacing:"-0.3px" }}>
              Contact Us
            </h2>
            <p style={{ color:"rgba(255,255,255,0.62)", fontSize:"12px", margin:"2px 0 0", fontWeight:"500" }}>
              Send a message — we'll get back to you soon
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding:"24px 28px 22px" }}>

        {errors.general && (
          <div style={{
            display:"flex", alignItems:"center", gap:"9px",
            background:"#fff5f5", border:"1.5px solid #fecaca",
            borderRadius:"10px", padding:"11px 14px",
            color:"#dc2626", fontSize:"13px", fontWeight:"600",
            marginBottom:"14px",
          }}>
            <span style={{ fontSize:"16px" }}>⚠️</span>
            {errors.general}
          </div>
        )}

        {sent && (
          <div style={{
            display:"flex", alignItems:"center", gap:"9px",
            background:"#f0fdf4", border:"1.5px solid #bbf7d0",
            borderRadius:"10px", padding:"11px 14px",
            color:"#16a34a", fontSize:"13px", fontWeight:"600",
            marginBottom:"14px",
          }}>
            <span style={{ fontSize:"16px" }}>✅</span>
            Message sent successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px", marginBottom:"14px" }}>
            <div>
              <label className="__contact-label">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`__contact-input${errors.name ? " error" : ""}`}
                placeholder="Your name"
              />
              {errors.name && (
                <p style={{ fontSize:"11px", color:"#ef4444", marginTop:"4px", fontWeight:"600" }}>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="__contact-label">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`__contact-input${errors.email ? " error" : ""}`}
                placeholder="you@email.com"
              />
              {errors.email && (
                <p style={{ fontSize:"11px", color:"#ef4444", marginTop:"4px", fontWeight:"600" }}>
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div style={{ marginBottom:"14px" }}>
            <label className="__contact-label">Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className={`__contact-input${errors.subject ? " error" : ""}`}
              placeholder="What's this about?"
            />
            {errors.subject && (
              <p style={{ fontSize:"11px", color:"#ef4444", marginTop:"4px", fontWeight:"600" }}>
                {errors.subject}
              </p>
            )}
          </div>

          <div style={{ marginBottom:"20px" }}>
            <label className="__contact-label">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className={`__contact-input${errors.message ? " error" : ""}`}
              placeholder="Write your message here…"
              style={{ resize:"none", lineHeight:"1.6" }}
            />
            {errors.message && (
              <p style={{ fontSize:"11px", color:"#ef4444", marginTop:"4px", fontWeight:"600" }}>
                {errors.message}
              </p>
            )}
          </div>

          <div style={{
            display:"flex", justifyContent:"flex-end", alignItems:"center", gap:"10px",
            paddingTop:"4px",
            borderTop:"1px solid #f1f5f9",
            marginTop:"4px", paddingTop:"16px",
          }}>
            <button
              type="button"
              onClick={onClose}
              className="__contact-cancel-btn"
              style={{
                padding:"9px 20px",
                borderRadius:"10px",
                border:"1.5px solid #dbeafe",
                background:"#fff",
                color:"#374151",
                fontSize:"13px",
                fontWeight:"600",
                cursor:"pointer",
                transition:"all 0.18s",
                letterSpacing:"0.2px",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSending}
              className="__contact-send-btn"
              style={{
                padding:"9px 22px",
                borderRadius:"10px",
                border:"none",
                background:"linear-gradient(135deg, #1d4ed8, #2563eb)",
                color:"#fff",
                fontSize:"13px",
                fontWeight:"700",
                cursor:"pointer",
                letterSpacing:"0.3px",
                boxShadow:"0 4px 14px rgba(29,78,216,0.28)",
                transition:"all 0.2s",
                display:"flex",
                alignItems:"center",
                gap:"7px",
              }}
            >
              {isSending ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation:"spin 0.8s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default ContactUsModal;