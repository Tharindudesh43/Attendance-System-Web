import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

const Header = () => {
  const [whichversion, setWhichVersion] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const rolefind = localStorage.getItem("role") || "";
    setRole(rolefind);
    setWhichVersion(rolefind);
  }, []);

  return (
    <div>
      <Navbar whichversion={whichversion} />
    </div>
  );
};

export default Header;
