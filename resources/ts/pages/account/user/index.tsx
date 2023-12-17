import { DeleteAct } from "@/components/delete-act";
import { Pagination } from "@/components/pagination";
import { Search } from "@/components/search";
import LayoutAccount from "@/layouts/account";
import { RoleType } from "@/types/role";
import { UserType, UserWithPaginationType } from "@/types/user";
import { hasAnyPermission } from "@/utils/has-permission";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const AccountUserPage = ({ users }: { users: UserWithPaginationType }) => {
  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-5">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 col-12 mb-2">
                <Link
                  href="/account/users/create"
                  className="btn btn-md btn-success border-0 shadow w-100"
                  type="button"
                >
                  <i className="fa fa-plus-circle me-2"></i>
                  Add
                </Link>
              </div>
              <div className="col-md-9">
                <Search URL="/account/users" />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 mb-4">
          <div className="col-12">
            <div className="card border rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-users"></i> Users
                </span>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "5%" }}>
                          No
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Name
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Email Address
                        </th>
                        <th scope="col" style={{ width: "30%" }}>
                          Role
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.data.map((user: UserType, index: number) => (
                        <tr key={index}>
                          <td className="text-center">
                            {++index +
                              (users.current_page - 1) * users.per_page}
                          </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            {user.roles.map(
                              (role: RoleType, roleIndex: number) => (
                                <span
                                  className="badge bg-success rounded-pill px-2 py-1 ms-2 me-2"
                                  key={roleIndex}
                                >
                                  {role.name}
                                </span>
                              )
                            )}
                          </td>
                          <td className="text-center">
                            {hasAnyPermission(["users.edit"]) && (
                              <Link
                                href={`/account/users/${user.id}/edit`}
                                className="btn btn-primary btn-sm me-2"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </Link>
                            )}
                            {hasAnyPermission(["users.delete"]) && (
                              <DeleteAct URL="/account/users" id={user.id} />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination links={users.links} align="end" />
              </div>
            </div>
          </div>
        </div>
      </LayoutAccount>
    </>
  );
};

export default AccountUserPage;
