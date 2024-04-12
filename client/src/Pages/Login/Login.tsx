import "./Login.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginInputs, SigninInputs } from "../../Data/Datas";
import AxiosCall from "../../utils/AxiosCall";
import Loading from "../../Components/Loader/Loading";
import { useFormik } from "formik";
import userSchema from "../../formvalidate/signupvalidate";
import { LoginTypes, SignupTypes } from "../../types/authTypes";
import loginSchema from "../../formvalidate/loginvalidate";

function Login() {
  const navigate = useNavigate();
  const [toggleLoginSignin, setToggleLoginSignin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // signup formik and validation part*****
  const {
    handleSubmit: handleSignupSubmit,
    errors: SignupErrors,
    values: SignupValues,
    handleChange: SignupHandleChange,
    handleBlur: SignupHanldeBlur,
    touched: SignupTouched,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: userSchema,
    onSubmit: (value) => {
      handleSubmitSignUp(value);
    },
  });

  // login formik and validation part *******
  const {
    handleSubmit: handleLoginSubmit,
    errors: LoginErrors,
    values: LoginValues,
    handleChange: LoginHandleChange,
    handleBlur: LoginHanldeBlur,
    touched: LoginTouched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (value) => {
      handleSubmitLogin(value);
    },
  });

  const handleSubmitLogin = async (Values: LoginTypes) => {
    setLoading(true);
    const data = await AxiosCall({
      Url: " /api/auth/login",
      Mehtod: "Post",
      Data: {
        email: Values.email,
        password: Values.password,
      },
    });

    if (data.success) {
      localStorage.setItem("access_current_user", JSON.stringify(data.user));
      navigate("/");
    } else {
      alert(data.error);
    }
    setLoading(false);
  };

  const handleSubmitSignUp = async (Values: SignupTypes) => {
    setLoading(true);
    const data = await AxiosCall({
      Url: "/api/auth/register",
      Method: "Post",
      Data: {
        username: Values.username,
        email: Values.email,
        password: Values.password,
      },
    });

    if (data.success) {
      alert(data.message);
    } else {
      alert(data.error);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        {toggleLoginSignin ? (
          <form onSubmit={handleLoginSubmit}>
            <h2>Login Form</h2>

            <div className="input-container">
              {LoginInputs.map((Inp) => (
                <div>
                  <input
                    name={Inp.name}
                    type={Inp.type}
                    placeholder={Inp.placeholder}
                    value={LoginValues[Inp.name as keyof typeof LoginValues]}
                    onChange={LoginHandleChange}
                    onBlur={LoginHanldeBlur}
                  />
                  {LoginTouched[Inp.name as keyof typeof LoginValues] &&
                    LoginErrors[Inp.name as keyof typeof LoginValues] && (
                      <span className="text-[1.4rem] text-[#904444]">
                        {LoginErrors[Inp.name as keyof typeof LoginValues]}
                      </span>
                    )}
                </div>
              ))}
            </div>

            <div className="submit-btn-container">
              <button
                disabled={loading}
                className="flex items-center justify-center gap-2"
              >
                {loading ? <Loading size={18} /> : "Login"}
              </button>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="underline text-[#ffffff] text-[1.4rem]"
                >
                  forgot password
                </Link>
              </div>

              <div className="text-center">
                <button
                  className="underline text-[#ffffff] text-[1.4rem]"
                  onClick={() => setToggleLoginSignin(false)}
                >
                  Create new account
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit}>
            <h2>Signin Form</h2>

            <div className="input-container">
              {SigninInputs.map((Inp) => (
                <div>
                  <input
                    type={Inp.type}
                    placeholder={Inp.placeholder}
                    name={Inp.name}
                    value={SignupValues[Inp.name as keyof typeof SignupValues]}
                    onChange={SignupHandleChange}
                    onBlur={SignupHanldeBlur}
                    // required
                  />
                  {SignupTouched[Inp.name as keyof typeof SignupValues] && [
                      Inp.name as keyof typeof SignupValues,
                    ] && (
                      <span className="text-[1.4rem] text-[#904444]">
                        {SignupErrors[Inp.name as keyof typeof SignupValues]}
                      </span>
                    )}
                </div>
              ))}
            </div>

            <div className="submit-btn-container">
              <button
                disabled={loading}
                className="flex items-center justify-center gap-2"
              >
                {loading ? <Loading size={18} /> : "Register"}
              </button>
            </div>

            <div>
              <p className="text-center text-[1.4rem] text-white mt-5">
                Already have account/{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => setToggleLoginSignin(true)}
                >
                  Signup
                </span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
