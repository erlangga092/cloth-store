import { Link } from "@inertiajs/react";
import React from "react";

export default function Header() {
  return (
    <>
      <nav className="navbar-expand-md navbar-dark fixed-top bg-green shadow">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <section className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1">
                <Link
                  href="/"
                  className="d-flex align-items-center col-md-12 mb-2 mb-md-0 text-white text-decoration-none"
                >
                  <img src="/assets/images/logo.png" width="50" />
                  <h5>
                    <strong>Geek</strong>Store
                  </h5>
                </Link>
              </section>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
