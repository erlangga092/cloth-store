import LayoutAccount from "@/layouts/account";
import { AuthProps } from "@/types/auth";
import { hasAnyPermission } from "@/utils/has-permission";
import { Head } from "@inertiajs/react";
import React from "react";

const AccountDashboardPage = ({ auth }: { auth: AuthProps }) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-4">
          <div className="col-12 col-md-12 col-lg-12 mb-4">
            <div className="alert alert-success border-0 shadow-sm mb-0">
              Selamat datang, <strong>{auth.user.name}</strong>
            </div>
          </div>
        </div>

        {hasAnyPermission(["dashboard.statistics"]) && (
          <div className="row mt-2">
            <div className="col-12 col-lg-3 mb-4">
              <div className="card border-0 shadow-sm overflow-hidden">
                <div className="card-body p-0 d-flex align-items-center">
                  <div
                    className="bg-primary py-4 px-5 mfe-3"
                    style={{ width: "130px" }}
                  >
                    <i className="fas fa-circle-notch fa-spin fa-2x text-white"></i>
                  </div>
                  <div>
                    <div className="text-value text-primary">0</div>
                    <div className="text-muted text-uppercase fw-bold small">
                      Unpaid
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 mb-4">
              <div className="card border-0 rounded shadow-sm overflow-hidden">
                <div className="card-body p-0 d-flex align-items-center">
                  <div
                    className="bg-success py-4 px-5 mfe-3"
                    style={{ width: "130px" }}
                  >
                    <i className="fas fa-check-circle fa-2x text-white"></i>
                  </div>
                  <div>
                    <div className="text-value text-success">0</div>
                    <div className="text-muted text-uppercase fw-bold small">
                      Paid
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 mb-4">
              <div className="card border-0 rounded shadow-sm overflow-hidden">
                <div className="card-body p-0 d-flex align-items-center">
                  <div
                    className="bg-warning py-4 px-5 mfe-3"
                    style={{ width: "130px" }}
                  >
                    <i className="fas fa-exclamation-triangle fa-2x text-white"></i>
                  </div>
                  <div>
                    <div className="text-value text-warning">0</div>
                    <div className="text-muted text-uppercase fw-bold small">
                      Expired
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 mb-4">
              <div className="card border-0 rounded shadow-sm overflow-hidden">
                <div className="card-body p-0 d-flex align-items-center">
                  <div
                    className="bg-danger py-4 px-5 mfe-3"
                    style={{ width: "130px" }}
                  >
                    <i className="fas fa-times fa-2x text-white"></i>
                  </div>
                  <div>
                    <div className="text-value text-danger">0</div>
                    <div className="text-muted text-uppercase fw-bold small">
                      Cancelled
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </LayoutAccount>
    </>
  );
};

export default AccountDashboardPage;
