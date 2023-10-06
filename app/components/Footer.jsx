import { Link } from "@remix-run/react";
import React from "react";

export default function Footer() {
  return (
    <footer className="p-4 flex justify-between items-center">
      <p>Copyright @ 2019 - {new Date().getFullYear()}</p>
      {/* <p>Website designed and developed by me.</p> */}
      <div className="social flex space-x-4">
        <Link to="/">Twitter</Link>
        <Link to="/">Github</Link>
      </div>
    </footer>
  );
}
