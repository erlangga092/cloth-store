import { Pagination } from "@/components/pagination";
import { Search } from "@/components/search";
import LayoutAccount from "@/layouts/account";
import { PermissionWithPaginationType } from "@/types/permission";
import { Head } from "@inertiajs/react";
import React from "react";

const AccountPermissionPage = ({
  permissions,
}: {
  permissions: PermissionWithPaginationType;
}) => {
  return (
    <>
      <Head>
        <title>Permission</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-5">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-9 col-12 mb-2">
                <Search URL="/account/permissions" />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 mb-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-key"></i> Permissions
                </span>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "5%" }}>
                          No.
                        </th>
                        <th scope="col">Permission Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissions.data.map((permission, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            {++index +
                              (permissions.current_page - 1) *
                                permissions.per_page}
                          </td>
                          <td>{permission.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination links={permissions.links} align="end" />
              </div>
            </div>
          </div>
        </div>
      </LayoutAccount>
    </>
  );
};

export default AccountPermissionPage;
