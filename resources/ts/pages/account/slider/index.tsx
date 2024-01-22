import { DeleteAct } from "@/components/delete-act";
import { Pagination } from "@/components/pagination";
import { Search } from "@/components/search";
import LayoutAccount from "@/layouts/account";
import { SliderType, SliderWithPaginationType } from "@/types/slider";
import { hasAnyPermission } from "@/utils/has-permission";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const AcccountSliderPage = ({
  sliders,
}: {
  sliders: SliderWithPaginationType;
}) => {
  return (
    <>
      <Head>
        <title>color</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-5">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 col-12 mb-2">
                <Link
                  href="/account/sliders/create"
                  className="btn btn-md btn-success border-0 shadow w-100"
                  type="button"
                >
                  <i className="fa fa-plus-circle me-2"></i>
                  Add
                </Link>
              </div>
              <div className="col-md-9">
                <Search URL="/account/sliders" />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 mb-4">
          <div className="col-12">
            <div className="card border rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-images me-2"></i> Image Slider
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
                          Image
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Link
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sliders.data.length ? (
                        sliders.data.map((color: SliderType, index: number) => (
                          <tr key={index}>
                            <td className="text-center">
                              {++index +
                                (sliders.current_page - 1) * sliders.per_page}
                            </td>
                            <td className="text-center">
                              <img
                                src={color.image}
                                alt={color.link}
                                className="rounded-3"
                                height={35}
                              />
                            </td>
                            <td className="text-center">{color.link}</td>
                            <td className="text-center">
                              {hasAnyPermission(["sliders.edit"]) && (
                                <Link
                                  href={`/account/sliders/${color.id}/edit`}
                                  className="btn btn-primary btn-sm me-2"
                                >
                                  <i className="fa fa-pencil-alt"></i>
                                </Link>
                              )}
                              {hasAnyPermission(["sliders.delete"]) && (
                                <DeleteAct
                                  URL="/account/sliders"
                                  id={color.id}
                                />
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
                            No data found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <Pagination links={sliders.links} align="end" />
              </div>
            </div>
          </div>
        </div>
      </LayoutAccount>
    </>
  );
};

export default AcccountSliderPage;
