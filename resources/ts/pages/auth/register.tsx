import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterPage = () => {
  const { data, setData, post, processing, errors } = useForm<RegisterForm>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  function submitRegistration(e: React.FormEvent) {
    e.preventDefault();
    post("/register");
  }

  return (
    <>
      <Head>
        <title>Register Account</title>
      </Head>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-80">
            <div className="text-center mb-4">
              <img src="/assets/images/logo.png" alt="" width={60} />
              <h4>
                <strong>Geek</strong>Store
              </h4>
            </div>

            <div className="card border-0 rounded-3 shadow-sm border-top-success">
              <div className="card-body">
                <div className="text-center">
                  <h6 className="fw-bold">Register Account</h6>
                  <hr />
                </div>
                <form onSubmit={submitRegistration}>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-1">
                        Nama Lengkap
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fa fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Nama Lengkap"
                          className="form-control"
                          value={data.name}
                          onChange={(e) => setData("name", e.target.value)}
                        />
                      </div>
                      {errors?.name && (
                        <div className="alert alert-danger">{errors?.name}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-1">
                        Alamat Email
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fa fa-envelope"></i>
                        </span>
                        <input
                          type="email"
                          placeholder="Email"
                          className="form-control"
                          value={data.email}
                          onChange={(e) => setData("email", e.target.value)}
                        />
                      </div>
                      {errors?.email && (
                        <div className="alert alert-danger">
                          {errors?.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-1">
                        Password
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fa fa-lock"></i>
                        </span>
                        <input
                          type="password"
                          placeholder="Password"
                          className="form-control"
                          value={data.password}
                          onChange={(e) => setData("password", e.target.value)}
                        />
                      </div>
                      {errors?.password && (
                        <div className="alert alert-danger">
                          {errors?.password}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-1">
                        Konfirmasi Password
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fa fa-lock"></i>
                        </span>
                        <input
                          type="password"
                          placeholder="Password Confirmation"
                          className="form-control"
                          value={data.password_confirmation}
                          onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-success shadow-sm rounded-sm px-4 w-100"
                    disabled={processing}
                    type="submit"
                  >
                    {processing ? "Loading..." : "Register"}
                  </button>
                </form>
              </div>
            </div>

            <div className="register text-center mt-3 mb-3">
              Sudah Punya Akun ? <Link href="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
