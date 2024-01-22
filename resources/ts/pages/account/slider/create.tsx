import LayoutAccount from "@/layouts/account";
import { Head, useForm } from "@inertiajs/react";
import React, { FormEvent } from "react";
import Swal from "sweetalert2";

const AccountSliderCreatePage = () => {
  const { data, setData, errors, processing, post } = useForm<{
    link: string;
    image: File | null;
  }>({
    link: "",
    image: null,
  });

  function submiCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/account/sliders", {
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
        <title>Create Slider</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-palette me-2"></i> Add New Slider
                </span>
              </div>

              <div className="card-body">
                <form onSubmit={submiCategory}>
                  <div className="row">
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
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter image slider link..."
                        value={data.link}
                        onChange={(e) => setData("link", e.target.value)}
                      />
                    </div>
                    {errors.link && (
                      <div className="alert alert-danger">{errors.link}</div>
                    )}
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

export default AccountSliderCreatePage;
