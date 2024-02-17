import { useState, useEffect } from "react";
import { npf_logo_white, npf_logo_blue, scale } from "../../assets";
import { Link } from "react-router-dom";
import { LOGIN } from "../../routes/constants";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import "./auth.css";
import { Form, Field } from "react-final-form";
import { useRegisterUserMutation } from "../../service/user.service";
import { useNavigate } from "react-router-dom";
import rtkMutation from "../../utils/rtkMutation";
import validate from "validate.js";
import { showAlert } from "../../static/alert";
import { useGetDivisionQuery } from "../../service/division.service";

const constraints = {
  name: {
    presence: true,
  },
  email: {
    presence: true,
  },
  id_number: {
    presence: true,
  },
  police_division_id: {
    presence: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
  confirm_password: {
    presence: true,
    equality: "password",
  },
};

function Register() {
  const { data: divisionData } = useGetDivisionQuery();
  console.log(divisionData);

  const navigate = useNavigate();
  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const [registerUser, { error, isSuccess }] = useRegisterUserMutation({
    provideTag: ["User"],
  });

  const onSubmit = async (values) => {
    try {
      console.log(values);
      await rtkMutation(registerUser, values);
    } catch (error) {
      showAlert("Oops", error.message || "An error occurred", "error");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(LOGIN);
      showAlert(
        "Account created successfully!",
        "Pls login to continue",
        "success"
      );
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [error, isSuccess, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prevState) => !prevState);
    } else if (field === "confirm_password") {
      setShowConfirmPassword((prevState) => !prevState);
    }
  };

  return (
    <>
      <section className="h-screen justify-center items-center hidden sm:block md:flex lg:flex">
        <div className="flex flex-col items-center w-full">
          <div className="text-center mb-8">
            <div className="flex flex-col justify-center items-center">
              <div className="md:block lg:flex gap-5 items-center justify-center justify-content-center pb-5">
                <div className="md:flex md:justify-center">
                  <img
                    src={npf_logo_white}
                    alt="Nigerian Police Force Logo"
                    className="w-24 h-24"
                  />
                </div>
                <h4 className="logo-head">THE NIGERIAN POLICE FORCE</h4>
              </div>
              <h5 className="logo-lead">ARREST REPORT DASHBOARD</h5>
              <img src={scale} alt="Scale" className="mt-4" />
            </div>
          </div>
        </div>

        <div className="h-screen bg-[#020065] w-full flex justify-center items-center">
          <div className="lg:w-4/5 p-8">
            <h5 className="login-text pb-7">Register </h5>
            <Form
              onSubmit={(values, form) => onSubmit(values, form)}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="text"
                        name="name"
                        component="input"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500
        rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      />
                      <label
                        htmlFor="name"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        Full Name{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.name && (
                        <span className="text-red-600">
                          {form.getState().errors.name}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="email"
                        name="email"
                        component="input"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500
        rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      />
                      <label
                        htmlFor="email"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        Email Address{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.email && (
                        <span className="text-red-600">
                          {form.getState().errors.email}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="text"
                        name="police_division_id"
                        component="select"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500
        rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      >
                        <option value="" selected disabled hidden></option>
                        {divisionData &&
                          divisionData.data.map((row) => (
                            <option key={row._id} value={row._id}>
                              {row.division_name}
                            </option>
                          ))}
                      </Field>
                      <label
                        htmlFor="police_division_id"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        Police Division{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.police_division_id && (
                        <span className="text-red-600">
                          {form.getState().errors.police_division_id}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="text"
                        name="id_number"
                        component="input"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500
        rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      />
                      <label
                        htmlFor="id_number"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        ID Number{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.id_number && (
                        <span className="text-red-600">
                          {form.getState().errors.id_number}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        component="input"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      />
                      <label
                        htmlFor="password"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        Password{" "}
                      </label>
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => togglePasswordVisibility("password")}
                      >
                        {showPassword ? (
                          <BsEyeSlash className="h-6 w-6 text-gray-400" />
                        ) : (
                          <BsEye className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.password && (
                        <span className="text-red-600">
                          {form.getState().errors.password}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        id="confirm_password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        component="input"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      />
                      <label
                        id="outlined"
                        htmlFor="confirm_password"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        Re-enter Password{" "}
                      </label>
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() =>
                          togglePasswordVisibility("confirm_password")
                        }
                      >
                        {showConfirmPassword ? (
                          <BsEyeSlash className="h-6 w-6 text-gray-400" />
                        ) : (
                          <BsEye className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.confirm_password && (
                        <span className="text-red-600">
                          {form.getState().errors.confirm_password}
                        </span>
                      )}
                  </div>

                  <button className="auth-btn" type="submit">
                    {submitting ? (
                      <>
                        <span className="loading-dots">
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                        </span>
                      </>
                    ) : (
                      "Next"
                    )}
                  </button>
                </form>
              )}
            />

            <p className="auth-question flex gap-5 pt-5">
              Already have an account?{" "}
              <Link className="auth-link" to={LOGIN}>
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#020065] min-h-screen flex flex-col justify-center items-center sm:block md:hidden lg:hidden">
        <div className="flex flex-col items-center gap-5 pt-5">
          <img
            src={npf_logo_blue}
            alt="Nigerian Police Force Logo"
            className="w-24 h-24"
          />
          <h4 className="logo-head text-center text-white">
            THE NIGERIAN POLICE FORCE
          </h4>
        </div>

        <div className="flex flex-col mt-10 w-full">
          <div className="w-full max-w-md mx-auto p-5">
            <h5 className="login-text pb-7">Register</h5>

            <Form
              onSubmit={(values, form) => onSubmit(values, form)}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="text"
                        name="name"
                        component="input"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500
        rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      />
                      <label
                        htmlFor="name"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        Full Name{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.name && (
                        <span className="text-red-600">
                          {form.getState().errors.name}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="email"
                        name="email"
                        component="input"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500
        rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      />
                      <label
                        htmlFor="email"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        Email Address{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.email && (
                        <span className="text-red-600">
                          {form.getState().errors.email}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="text"
                        name="police_division_id"
                        component="select"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500
        rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      >
                        <option value="" selected disabled hidden></option>
                        <option value="1">Division 1</option>
                        <option value="2">Division 2</option>
                      </Field>
                      <label
                        htmlFor="police_division_id"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        Police Division{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.police_division_id && (
                        <span className="text-red-600">
                          {form.getState().errors.police_division_id}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="text"
                        name="id_number"
                        component="input"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500
        rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      />
                      <label
                        htmlFor="id_number"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        ID Number{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.id_number && (
                        <span className="text-red-600">
                          {form.getState().errors.id_number}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        component="input"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      />
                      <label
                        htmlFor="password"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        Password{" "}
                      </label>
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => togglePasswordVisibility("password")}
                      >
                        {showPassword ? (
                          <BsEyeSlash className="h-6 w-6 text-gray-400" />
                        ) : (
                          <BsEye className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.password && (
                        <span className="text-red-600">
                          {form.getState().errors.password}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        component="input"
                        className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
                      />
                      <label
                        id="outlined"
                        htmlFor="confirm_password"
                        className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
                      >
                        Re-enter Password{" "}
                      </label>
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() =>
                          togglePasswordVisibility("confirm_password")
                        }
                      >
                        {showConfirmPassword ? (
                          <BsEyeSlash className="h-6 w-6 text-gray-400" />
                        ) : (
                          <BsEye className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.confirm_password && (
                        <span className="text-red-600">
                          {form.getState().errors.confirm_password}
                        </span>
                      )}
                  </div>

                  <button className="auth-btn" type="submit">
                    {submitting ? (
                      <>
                        <span className="loading-dots">
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                        </span>
                      </>
                    ) : (
                      "Next"
                    )}
                  </button>
                </form>
              )}
            />

            <p className="auth-question flex gap-5 pt-5">
              Already have an account?{" "}
              <Link className="auth-link" to={LOGIN}>
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
