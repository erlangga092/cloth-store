import LayoutAccount from "@/layouts/account";
import { RoleType } from "@/types/role";
import { Head, useForm } from "@inertiajs/react";
import React, { FormEvent } from "react";
import Swal from "sweetalert2";

const AccountUserCreatePage = ({ roles }: { roles: Array<RoleType> }) => {
  const { data, setData, errors, processing, post } = useForm<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    roles: string;
  }>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    roles: "",
  });

  function submitUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/account/users", {
      onSuccess: () => {
        Swal.fire({
          title: "Success",
          text: "Successfully saved.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }

  return (
    <>
      <Head>
        <title>Create User</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-shield-alt"></i> Add New User
                </span>
              </div>

              <div className="card-body">
                <form onSubmit={submitUser}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label fw-bold">
                          Fullname
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your fullname..."
                          value={data.name}
                          onChange={(e) => setData("name", e.target.value)}
                        />
                      </div>
                      {errors.name && (
                        <div className="alert alert-danger">{errors.name}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label fw-bold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email address..."
                          value={data.email}
                          onChange={(e) => setData("email", e.target.value)}
                        />
                      </div>
                      {errors.email && (
                        <div className="alert alert-danger">{errors.email}</div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label fw-bold">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter your password..."
                          value={data.password}
                          onChange={(e) => setData("password", e.target.value)}
                        />
                      </div>
                      {errors.password && (
                        <div className="alert alert-danger">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label fw-bold">
                          Password Confirmation
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password confirmation..."
                          value={data.password_confirmation}
                          onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="roles" className="fw-bold form-label">
                          Roles
                        </label>
                        <select
                          name="roles"
                          className="form-control"
                          onChange={(e) => setData("roles", e.target.value)}
                        >
                          {roles.map((role: RoleType, index: number) => (
                            <option key={index} value={role.name}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <>
                    <button
                      type="submit"
                      className="btn btn-md btn-success me-2"
                      disabled={processing}
                    >
                      <i className="fa fa-save"></i> Submit
                    </button>
                    <button
                      type="reset"
                      className="btn btn-md btn-warning"
                      disabled={processing}
                    >
                      <i className="fa fa-redo"></i> Reset
                    </button>
                  </>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutAccount>
    </>
  );
};

export default AccountUserCreatePage;
