import { DeleteAct } from "@/components/delete-act";
import { Pagination } from "@/components/pagination";
import { Search } from "@/components/search";
import LayoutAccount from "@/layouts/account";
import { ColorType, ColorWithPaginationType } from "@/types/color";
import { hasAnyPermission } from "@/utils/has-permission";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const AccountColorPage = ({ colors }: { colors: ColorWithPaginationType }) => {
  return (
    <>
      <Head>
        <title>Color | Marketplace</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-5">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 col-12 mb-2">
                <Link
                  href="/account/colors/create"
                  className="btn btn-md btn-success border-0 shadow w-100"
                  type="button"
                >
                  <i className="fa fa-plus-circle me-2"></i>
                  Add
                </Link>
              </div>
              <div className="col-md-9">
                <Search URL="/account/colors" />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 mb-4">
          <div className="col-12">
            <div className="card border rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-palette me-2"></i> Color
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
                          Image
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {colors.data.length ? (
                        colors.data.map((color: ColorType, index: number) => (
                          <tr key={index}>
                            <td className="text-center">
                              {++index +
                                (colors.current_page - 1) * colors.per_page}
                            </td>
                            <td>{color.name}</td>
                            <td className="text-center">
                              <img
                                src={color.image}
                                alt={color.name}
                                className="rounded-3"
                                height={35}
                              />
                            </td>
                            <td className="text-center">
                              {hasAnyPermission(["colors.edit"]) && (
                                <Link
                                  href={`/account/colors/${color.id}/edit`}
                                  className="btn btn-primary btn-sm me-2"
                                >
                                  <i className="fa fa-pencil-alt"></i>
                                </Link>
                              )}
                              {hasAnyPermission(["colors.delete"]) && (
                                <DeleteAct
                                  URL="/account/colors"
                                  id={color.id}
                                />
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            No data found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <Pagination links={colors.links} align="end" />
              </div>
            </div>
          </div>
        </div>
      </LayoutAccount>
    </>
  );
};

export default AccountColorPage;
