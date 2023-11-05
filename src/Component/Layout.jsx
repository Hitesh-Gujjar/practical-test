import React from "react";
import Popup from "./NotificationNote";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSuccess } from "../Redux/Actions/actions";

function Layout({ title = false, discription, children, isLogout = false }) {
  const validationMessage = useSelector((state) => state.validationMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("login");
    navigate("/");
    dispatch(setSuccess("log-out successfully"));
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6  lg:px-8 h-full">
      <div className=" flex justify-between  items-center">
        {title && (
          <div className="mt-6">
            <h2 className="text-base font-semibold leading-7 text-lg text-gray-900">
              {title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {discription}
            </p>
          </div>
        )}
        <div>
          {isLogout && (
            <button
              type="button"
              className="block rounded-md bg-blue-500 px-3 py-2 mt-6 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                handleLogout();
              }}
            >
              Log out
            </button>
          )}
        </div>
      </div>
      <div className="py-6 ">{children}</div>
      {validationMessage.status !== "" && <Popup message={validationMessage} />}
    </div>
  );
}

export default Layout;
