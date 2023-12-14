import LayoutAccount from "@/layouts/account";
import { PermissionType } from "@/types/permission";
import { Head, useForm } from "@inertiajs/react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

const AccountRoleCreatePage = ({
  permissions,
}: {
  permissions: Array<PermissionType>;
}) => {
  let [currPermissions, setCurPermissions] = useState<Array<string>>([]);
  const { data, setData, post, processing, errors } = useForm<{
    name: string;
    permissions: Array<string>;
  }>({
    name: "",
    permissions: [],
  });

  function checkRole(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setCurPermissions((curr) => [...curr, e.target.value]);
    } else {
      setCurPermissions((curr) => curr.filter((v) => v != e.target.value));
    }
  }

  useEffect(() => {
    setData("permissions", currPermissions);
  }, [currPermissions]);

  function submitRole(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/account/roles", {
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
        <title>Create Role</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-shield-alt"></i> Add New Role
                </span>
              </div>

              <div className="card-body">
                <form onSubmit={submitRole}>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label fw-bold">
                      Role Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter role name..."
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                    />
                  </div>
                  {errors.name && (
                    <div className="alert alert-danger">{errors.name}</div>
                  )}
                  <div className="mb-3">
                    <label htmlFor="" className="fw-bold">
                      Permissions
                    </label>
                    <br />
                    {permissions.map(
                      (permission: PermissionType, index: number) => (
                        <div
                          className="form-check form-check-inline"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value={permission.name}
                            id={`check-${permission.id}`}
                            onChange={checkRole}
                          />
                          <label
                            htmlFor={`check-${permission.id}`}
                            className="form-check-label"
                          >
                            {permission.name}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                  {errors.permissions && (
                    <div className="alert alert-danger">
                      {errors.permissions}
                    </div>
                  )}
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

export default AccountRoleCreatePage;
