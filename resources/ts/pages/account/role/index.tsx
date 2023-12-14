import { DeleteAct } from "@/components/delete-act";
import { Pagination } from "@/components/pagination";
import { Search } from "@/components/search";
import LayoutAccount from "@/layouts/account";
import { PermissionType } from "@/types/permission";
import { RoleType, RoleWithPaginationType } from "@/types/role";
import { hasAnyPermission } from "@/utils/has-permission";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const AccountRolePage = ({ roles }: { roles: RoleWithPaginationType }) => {
  return (
    <>
      <Head>
        <title>Permission</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-5">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 col-12 mb-2">
                <Link
                  href="/account/roles/create"
                  className="btn btn-md btn-success border-0 shadow w-100"
                  type="button"
                >
                  <i className="fa fa-plus-circle me-2"></i>
                  Add
                </Link>
              </div>
              <div className="col-md-9 col-12 mb-2">
                <Search URL="/account/roles" />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 mb-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-shield-alt"></i> Roles
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
                        <th scope="col" style={{ width: "15%" }}>
                          Role
                        </th>
                        <th scope="col" style={{ width: "50%" }}>
                          Permission
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles.data.map((role: RoleType, index: number) => (
                        <tr key={index}>
                          <td className="text-center">
                            {++index +
                              (roles.current_page - 1) * roles.per_page}
                          </td>
                          <td>{role.name}</td>
                          <td>
                            {role.permissions.map(
                              (permission: PermissionType, index: number) => (
                                <span
                                  className="badge bg-success p-2 rounded-pill border-0 ms-2 mb-2"
                                  key={index}
                                >
                                  {permission.name}
                                </span>
                              )
                            )}
                          </td>
                          <td className="text-center">
                            {hasAnyPermission(["roles.edit"]) && (
                              <Link
                                href={`/account/roles/${role.id}/edit`}
                                className="btn btn-primary btn-sm me-2"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </Link>
                            )}
                            {hasAnyPermission(["roles.delete"]) && (
                              <DeleteAct URL="/account/roles" id={role.id} />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination links={roles.links} align="end" />
              </div>
            </div>
          </div>
        </div>
      </LayoutAccount>
    </>
  );
};

export default AccountRolePage;
