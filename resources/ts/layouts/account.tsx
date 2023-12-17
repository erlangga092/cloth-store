import { Sidebar } from "@/components/sidebar";
import { AuthProps } from "@/types/auth";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";

const LayoutAccount = ({ children }: { children: React.ReactNode }) => {
  const { auth } = usePage<{ auth: AuthProps }>().props;
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const form = useForm();

  useEffect(() => {
    setMounted(true);
  }, []);

  function sidebarToggleHandler(e: React.SyntheticEvent) {
    e.preventDefault();

    if (mounted) {
      if (!sidebarToggle) {
        document.body.classList.add("sb-sidenav-toggled");
        setSidebarToggle(true);
      } else {
        document.body.classList.remove("sb-sidenav-toggled");
        setSidebarToggle(false);
      }
    }
  }

  function logoutHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    form.post("/logout");
  }

  return (
    <div className="d-flex sb-sidenav-toggled" id="warapper">
      <div className="bg-sidebar" id="sidebar-wrapper">
        <div className="sidebar-heading bg-light text-center">
          <img src="/assets/images/logo.png" width={23} />
          <strong>Geek</strong>
          <small>Store</small>
        </div>
        <Sidebar />
      </div>
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="btn btn-success-dark"
              onClick={sidebarToggleHandler}
            >
              <i className="fa fa-list-ul"></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <NavDropdown
                  title={auth.user.name}
                  className="fw-bold"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fa fa-sign-out-alt me-2"></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid">{children}</div>
      </div>
    </div>
  );
};

export default LayoutAccount;
