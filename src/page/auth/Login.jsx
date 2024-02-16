import { npf_logo_white, npf_logo_blue, scale } from "../../assets";
import { Link } from "react-router-dom";
import { REGISTER } from "../../routes/constants";
import "./auth.css";

function Login() {
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

        <div className="h-screen bg-[#020065] p-8 w-full flex justify-center items-center">
          <div>
            <h5 className="login-text mb-2">Login</h5>
            <p className="login-desc pb-7">Login to the dashboard</p>

            <div className="relative w-full input-component mb-7 empty sm:inline-block sm:pr-1">
              <input
                id="email"
                type="text"
                name="email"
                className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
              />
              <label
                htmlFor="email"
                className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
              >
                Email/ID
              </label>
            </div>

            <div className="relative w-full input-component mb-5 empty sm:inline-block sm:pr-1">
              <input
                id="password"
                type="password"
                name="password"
                className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
              />
              <label
                htmlFor="password"
                className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
              >
                Password{" "}
              </label>
            </div>
            <button className="auth-btn">Next</button>
            <p className="auth-question flex gap-5 pt-5">
              Don’t have an account?{" "}
              <Link className="auth-link" to={REGISTER}>
                Register
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
            <h5 className="login-text mb-2">Login</h5>
            <p className="login-desc pb-7">Login to the dashboard</p>

            <div className="relative w-full input-component mb-7 empty sm:inline-block sm:pr-1">
              <input
                id="email"
                type="text"
                name="email"
                className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
              />
              <label
                id="outlined"
                htmlFor="email"
                className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
              >
                Email/ID
              </label>
            </div>

            <div className="relative w-full input-component mb-5 empty sm:inline-block sm:pr-1">
              <input
                id="password"
                type="password"
                name="password"
                className="auth-input w-full border-gray-300 p-4 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-base peer"
              />
              <label
                id="outlined"
                htmlFor="password"
                className="auth-label text-sm font-medium absolute top-1/2 -translate-y-1/2 px-1 left-2 peer-focus:top-0 bg-[#020065] z-20 transition-all duration-300"
              >
                Password{" "}
              </label>
            </div>

            <button className="auth-btn">Next</button>
            <p className="auth-question flex gap-5 pt-5">
              Don’t have an account?{" "}
              <Link className="auth-link" to={REGISTER}>
                Register
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
