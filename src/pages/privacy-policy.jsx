import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const sections = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly, such as your name, university email, faculty/department, and role (lecturer or admin) when you register or sign in. We also collect attendance records, timestamps, and lecture/subject data generated as you use Marky.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `Your information is used to operate the attendance system: authenticating your account, recording and displaying attendance, generating reports for admins, and improving the reliability of the platform. We do not sell your personal data to third parties.`,
  },
  {
    title: "3. Data Storage & Security",
    body: `Attendance and account data is stored on secured servers accessible only to authorized university staff. We apply reasonable technical and organizational measures to protect your data from unauthorized access, alteration, or loss.`,
  },
  {
    title: "4. Data Sharing",
    body: `We may share data with your university faculty or administration for academic and record-keeping purposes. We do not share your personal information with external advertisers or unrelated third parties.`,
  },
  {
    title: "5. Data Retention",
    body: `Attendance records and account information are retained for as long as your account is active or as required for academic record-keeping, after which data may be archived or deleted in line with university policy.`,
  },
  {
    title: "6. Your Rights",
    body: `You may request access to, correction of, or deletion of your personal data by contacting your system administrator. Some information may be retained where required for academic or legal record-keeping.`,
  },
  {
    title: "7. Cookies & Sessions",
    body: `Marky uses session tokens to keep you signed in securely. These are used only for authentication purposes and not for tracking or advertising.`,
  },
  {
    title: "8. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Continued use of Marky after changes are posted constitutes acceptance of the updated policy.`,
  },
  {
    title: "9. Contact Us",
    body: `If you have questions about this Privacy Policy or how your data is handled, please reach out through the Contact option on our site.`,
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div style={{ background: "#f8faff", color: "#1e293b", flex: 1, padding: "4rem 2.5rem", fontFamily: "'Nunito', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          @media (max-width: 640px) {
            .privacy-container { padding: 2.5rem 1.25rem !important; }
            .privacy-title { font-size: 1.5rem !important; }
          }
        `}</style>

        <div className="privacy-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>
            Marky Attendance System
          </div>
          <h1 className="privacy-title" style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "2.1rem", color: "#0f172a", margin: 0, marginBottom: "0.75rem" }}>
            Privacy Policy
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "2.5rem" }}>
            Last updated: July 12, 2026
          </p>

          <p style={{ color: "#475569", fontSize: "16px", lineHeight: 1.8, fontWeight: 400, marginBottom: "2.5rem" }}>
            This Privacy Policy explains how Marky Attendance System collects, uses, and protects information
            when you use our platform as a lecturer, admin, or student.
          </p>

          {sections.map(({ title, body }) => (
            <div key={title} style={{ marginBottom: "1.75rem" }}>
              <h2 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontSize: "1.15rem", color: "#1e293b", marginBottom: "0.5rem" }}>
                {title}
              </h2>
              <p style={{ color: "#64748b", fontSize: "15px", fontWeight: 400, lineHeight: 1.8, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;