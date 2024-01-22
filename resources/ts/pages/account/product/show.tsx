import { Pagination } from "@/components/pagination";
import LayoutAccount from "@/layouts/account";
import { ColorType } from "@/types/color";
import { ProductWithImageAndPaginationType } from "@/types/product";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const show = ({
  colors,
  product,
}: {
  colors: Array<ColorType>;
  product: ProductWithImageAndPaginationType;
}) => {
  const { data, setData, errors, processing, post } = useForm<{
    color_id: number;
    image: File | null;
    product_id: number;
  }>({
    color_id: 0,
    image: null,
    product_id: product.id,
  });

  function submitProductImage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/account/products/store_image_product", {
      onSuccess: () => {
        Swal.fire({
          title: "Success",
          text: "Successfully saved.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setData("image", null);
        setData("color_id", 0);
      },
      onError: (err: unknown) => {
        let errMsg = "Internal Error";
        if (typeof err === "object") {
          const errStr = err as { 0: string };
          errMsg = errStr[0];
        }
        window.alert(errMsg);
      },
    });
  }

  return (
    <>
      <Head>
        <title>Detail Product | Marketplace</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-shopping-bag me-2"></i>Upload Product
                  Image
                </span>
              </div>
              <div className="card-body">
                <form onSubmit={submitProductImage}>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label fw-bold">
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) =>
                        setData("image", e.target.files?.[0] || null)
                      }
                    />
                  </div>
                  {errors.image && (
                    <div className="alert alert-danger">{errors.image}</div>
                  )}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label fw-bold">
                      Color
                    </label>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        setData("color_id", Number(e.target.value))
                      }
                    >
                      <option value="">--Select Color--</option>
                      {colors.map((color) => (
                        <option value={color.id} key={color.id}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.color_id && (
                    <div className="alert alert-danger">{errors.color_id}</div>
                  )}
                  <div>
                    <button
                      className="btn btn-md btn-success me-2"
                      type="submit"
                      disabled={processing}
                    >
                      <i className="fa fa-save me-2"></i>Save
                    </button>
                    <button
                      className="btn btn-md btn-warning"
                      type="reset"
                      disabled={processing}
                    >
                      <i className="fa fa-redo me-2"></i>Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-shopping-bag me-2"></i>Product Image
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
                        <th scope="col" style={{ width: "20%" }}>
                          Image
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Color
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Color Name
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.product_images.data.length ? (
                        product.product_images.data?.map((image, i) => (
                          <tr key={i}>
                            <td className="text-center">
                              {++i +
                                (product.product_images.current_page - 1) *
                                  product.product_images.per_page}
                            </td>
                            <td className="text-center">
                              <img
                                src={image.image}
                                alt={image.image}
                                width={200}
                                className="rounded-3"
                              />
                            </td>
                            <td className="text-center">
                              <img
                                src={image.color.image}
                                alt={image.color.image}
                                width={30}
                                className="rounded-circle"
                              />
                            </td>
                            <td className="text-center">{image.color.name}</td>
                            <td className="text-center">[DELETE]</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center">
                            No data found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination align="end" links={product.product_images.links} />
              </div>
            </div>
          </div>
        </div>
      </LayoutAccount>
    </>
  );
};

export default show;
