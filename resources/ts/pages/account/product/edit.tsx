import LayoutAccount from "@/layouts/account";
import { CategoryType } from "@/types/category";
import { ProductWithSizeType } from "@/types/product";
import { Head, useForm } from "@inertiajs/react";
import React, { FormEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import "./ql-editor.css";

const AccountProductEditPage = ({
  categories,
  product,
}: {
  categories: Array<CategoryType>;
  product: ProductWithSizeType;
}) => {
  const productSizeDefault = product.product_sizes.map((v) => {
    return {
      size: v.size,
      price: v.price,
    };
  });

  const { data, setData, errors, processing, post } = useForm<{
    title: string;
    category_id: number;
    description: string;
    weight: number | null;
    product_sizes: Array<{
      size: string;
      price: number;
    }>;
  }>({
    title: product.title,
    category_id: product.category_id,
    description: product.description,
    weight: product.weight,
    product_sizes: productSizeDefault,
  });

  function submitProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/account/products", {
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
        <title>Edit Product | Marketplace</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-shopping-bag me-2"></i> Add New Product
                </span>
              </div>

              <div className="card-body">
                <form onSubmit={submitProduct}>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label fw-bold">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter title product..."
                      value={data.title}
                      onChange={(e) => setData("title", e.target.value)}
                    />
                  </div>
                  {errors.title && (
                    <div className="alert alert-danger">{errors.title}</div>
                  )}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label fw-bold">
                          Category
                        </label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setData("category_id", Number(e.target.value))
                          }
                        >
                          <option value="">--select category--</option>
                          {categories.map(
                            (category: CategoryType, index: number) => (
                              <option
                                value={category.id}
                                key={category.id}
                                selected={category.id === data.category_id}
                              >
                                {category.name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      {errors.category_id && (
                        <div className="alert alert-danger">
                          {errors.category_id}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label fw-bold">
                          Weight(Gram)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter weight (gram)..."
                          value={data.weight || 0}
                          onChange={(e) =>
                            setData("weight", Number(e.target.value))
                          }
                        />
                      </div>
                      {errors.weight && (
                        <div className="alert alert-danger">
                          {errors.weight}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label fw-bold">
                      Description
                    </label>
                    <ReactQuill
                      theme="snow"
                      placeholder="Enter product description..."
                      value={data.description}
                      onChange={(content) => setData("description", content)}
                    />
                  </div>
                  {errors.description && (
                    <div className="alert alert-danger">
                      {errors.description}
                    </div>
                  )}
                  <div className="row mt-3 mb-5">
                    <div className="col-md-12">
                      <div className="alert alert-warning">
                        <i className="fa fa-into-circle"></i> add size and price
                        for your product.
                      </div>
                    </div>
                    {data.product_sizes.map((v, i) => (
                      <div className="row" key={i}>
                        <div className="col-md-5">
                          <div className="mb-3">
                            <label htmlFor="" className="form-label fw-bold">
                              Size
                            </label>
                            <input
                              type="text"
                              name="size"
                              value={v.size || ""}
                              className="form-control"
                              placeholder="Enter size..."
                              onChange={(e) => {
                                let newProductSizes = [...data.product_sizes];
                                newProductSizes[i].size = e.target.value;
                                setData("product_sizes", newProductSizes);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="mb-3">
                            <label htmlFor="" className="form-label fw-bold">
                              Price
                            </label>
                            <input
                              type="number"
                              name="price"
                              value={v.price}
                              className="form-control"
                              placeholder="Enter price..."
                              onChange={(e) => {
                                let newProductSizes = [...data.product_sizes];
                                newProductSizes[i].price = Number(
                                  e.target.value
                                );
                                setData("product_sizes", newProductSizes);
                              }}
                            />
                          </div>
                        </div>
                        {i ? (
                          <div className="col-md-2">
                            <div className="mb-3">
                              <label
                                htmlFor=""
                                className="form-label fw-bold text-white"
                              >
                                .
                              </label>
                              <button
                                className="btn btn-danger btn-md border-0 shadow-sm w-100"
                                type="button"
                                onClick={() => {
                                  let newProductSizes = [...data.product_sizes];
                                  console.info(newProductSizes);
                                  newProductSizes.splice(i, 1);
                                  setData("product_sizes", newProductSizes);
                                }}
                              >
                                <i className="fa fa-trash me-2"></i> Remove
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}

                    <div className="col-md-12">
                      {errors.product_sizes && (
                        <div className="alert alert-danger">
                          {errors.product_sizes}
                        </div>
                      )}
                    </div>

                    <div className="col-md-12">
                      <button
                        className="btn btn-primary btn-md border-0 shadow-sm"
                        type="button"
                        onClick={() => {
                          setData("product_sizes", [
                            ...data.product_sizes,
                            { size: "", price: 0 },
                          ]);
                        }}
                      >
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                  <div>
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutAccount>
    </>
  );
};

export default AccountProductEditPage;
