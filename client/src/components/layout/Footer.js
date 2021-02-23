import React from "react";

const MyComponent = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Tutor-Tool{" - "}
      <a href="https://www.in.tum.de/impressum/" className={"text-white"}>
        Impressum
      </a>
      {" - "}
      <a href="https://www.in.tum.de/impressum/" className={"text-white"}>
        FAQ
      </a>
      {" - "}
      <a href="mailto:tutorbetrieb@in.tum.de" className={"text-white"}>
        Contact
      </a>
    </footer>
  );
};

export default MyComponent;
