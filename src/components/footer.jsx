import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AboutUsModal from "../components/AboutUs_modal";
import ConatctUsModal from "../components/ContactUs_modal";

const routes = {
  "Admin Portal": "/admin_Login",
  "Lecturer Portal": "/lecturer_login",
  "Privacy Policy": "/privacy-policy",
};

const Footer = () => {
  const navigate = useNavigate();
  const [AboutUsShowModal, setAboutUsShowModal] = useState(false);
  const [ContactUsShowModal, setContactUsShowModal] = useState(false);

  const handleFooterLinkClick = (l) => {
    if (l === "About Us") {
      setAboutUsShowModal(true);
    } else if (l === "Contact Us") {
      setContactUsShowModal(true);
    } else {
      navigate(routes[l]);
    }
  };

  return (
    <footer style={{ background: "#0b1120", color: "white", padding: "4rem 2.5rem 2.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="footer-cols" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "3rem", marginBottom: "3rem" }}>
          <div style={{ maxWidth: "280px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "linear-gradient(135deg, #1e40af, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "22px" }}>Marky</span>
            </div>
            <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.7 }}>
              Smart attendance management for modern university faculty reliable, real time, and remarkably simple.
            </p>
          </div>

          <div style={{ display: "flex", gap: "4rem" }}>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "14px", marginBottom: "1.25rem", color: "#e2e8f0" }}>Platform</div>
              {["Admin Portal", "Lecturer Portal"].map(l => (
                <button
                  key={l}
                  type="button"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick(l)}
                  style={{
                    display: "block", background: "none", border: "none", padding: 0,
                    font: "inherit", textAlign: "left",
                    color: "#64748b", fontSize: "14px", marginBottom: "10px",
                    cursor: "pointer", transition: "color .2s"
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "14px", marginBottom: "1.25rem", color: "#e2e8f0" }}>Support</div>
              {["About Us", "Contact Us", "Privacy Policy"].map(l => (
                <button
                  key={l}
                  type="button"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick(l)}
                  style={{
                    display: "block", background: "none", border: "none", padding: 0,
                    font: "inherit", textAlign: "left",
                    color: "#64748b", fontSize: "14px", marginBottom: "10px",
                    cursor: "pointer", transition: "color .2s"
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1e293b", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ color: "#475569", fontSize: "13px" }}>© 2026 Marky Attendance System. All rights reserved.</span>
        </div>
      </div>

      {AboutUsShowModal && (
        <AboutUsModal onClose={() => setAboutUsShowModal(false)} />
      )}
      {ContactUsShowModal && (
        <ConatctUsModal onClose={() => setContactUsShowModal(false)} />
      )}
    </footer>
  );
};

export default Footer;