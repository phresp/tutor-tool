import React from "react";
import { Link } from "react-router-dom";

const MyComponent = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center footer">
      Copyright &copy; {new Date().getFullYear()} Tutor-Tool{" - "}
      <a href="https://www.in.tum.de/impressum/" className={"text-white"}>
        Impressum
      </a>
      {" - "}
      <a href="https://www.in.tum.de/datenschutz/" className={"text-white"}>
        Datenschutz
      </a>
      {" - "}
      <Link to="/faq" className="text-white">
        FAQ
      </Link>
      {" - "}
      <a
        href="https://www.in.tum.de/fuer-studierende/tutorbetrieb-der-fakultaet-fuer-informatik/"
        className={"text-white"}
      >
        Contact
      </a>
    </footer>
  );
};

export default MyComponent;
