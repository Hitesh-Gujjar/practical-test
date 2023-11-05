import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Component/Layout";
import { setSuccess, setError } from "../Redux/Actions/actions";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkLogin, setCheckLogin] = useState(false);
  const [error, setErrors] = useState("");

  const [credential, setCredential] = useState({
    userName: "",
    password: "",
  });

  const handleCredential = (name, value) => {
    setCredential({ ...credential, [name]: value });
  };

  const onSingIn = async (e) => {
    e.preventDefault();

    const getUsers = JSON.parse(localStorage.getItem("usersDetails"));
    if (getUsers.length > 0) {
      const getCurrentUser = getUsers.find(
        (user) => user.user_name === credential.userName
      );
      console.log("getCurrentUser", getCurrentUser?.user_name);
      if (
        getCurrentUser?.user_name === credential.userName &&
        getCurrentUser.password === credential.password
      ) {
        localStorage.setItem("login", true);
        dispatch(setSuccess("Login successfully"));
        return navigate("/user-list");
      } else if (
        getCurrentUser?.user_name !== credential.userName ||
        getCurrentUser?.user_name !== credential.userName
      ) {
        setErrors("Please enter correct user name and password");
        dispatch(setError("Please enter correct user name and password"));
      } else {
        setErrors("Please enter correct credentials");
        dispatch(setError("Please enter correct validation"));
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-h-md max-w-md">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            CUSTOMER LOGIN
          </h2>
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <input
                id="userid"
                name="userName"
                type="text"
                value={credential.userName}
                onChange={(e) =>
                  handleCredential(e.target.name, e.target.value)
                }
                autoComplete="email"
                required
                className=" border-t-0 border-x-0 border-gray-300  placeholder-gray-500 block w-full px-4 py-2 border text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="User Name"
              />
              <input
                id="password"
                name="password"
                type="password"
                value={credential.password}
                onChange={(e) =>
                  handleCredential(e.target.name, e.target.value)
                }
                autoComplete="current-password"
                required
                className=" border-t-0 border-x-0 placeholder-gray-500 block w-full px-4 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Password"
              />
              <p className="text-red-500">{error}</p>
            </div>
            {checkLogin ? (
              <button
                type="button"
                className="w-full flex py-2 justify-center px-4 bg-blue-800 hover:bg-blue-600 text-white font-semibold rounded-md"
                disabled
              >
                <svg
                  class="animate-spin text-white h-5 w-5 mr-3 ..."
                  viewBox="0 0 24 24"
                ></svg>
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-800 hover:bg-blue-600 text-white font-semibold rounded-md"
                onClick={(e) => {
                  onSingIn(e);
                }}
              >
                Sign in
              </button>
            )}
          </form>

          <div
            className="w-full flex justify-end py-2 text-blue-300 cursor-pointer"
            onClick={() => {
              navigate("/sing-up", { state: { signup: true } });
            }}
          >
            <p className="text-md  mt-1">Sing-up</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
