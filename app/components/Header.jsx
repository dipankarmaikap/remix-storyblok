import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="container flex items-center justify-between px-4 py-6 md:py-8">
      <Link className="text-3xl" to="/">
        Dipankar Maikap
      </Link>
      <button className="sm:hidden" aria-label="Mobile navigation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <nav className="hidden sm:flex gap-x-6">
        <Link className="hover:text-green-900 smallheading" to="/">
          Home
        </Link>
        <Link className="hover:text-green-900 smallheading" to="/about">
          About
        </Link>
        <Link className="hover:text-green-900 smallheading" to="/blog">
          Blog
        </Link>
        <Link className="hover:text-green-900 smallheading" to="/contact">
          Contact
        </Link>
      </nav>
    </header>
  );
}
