import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "./Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { setSuccess, setError } from "../Redux/Actions/actions";
import { useDispatch } from "react-redux";

function UserCreateForm(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const signup = location.state.signup | "";
  const navigate = useNavigate();

  const checkIsDuplicate = (users, newuser) =>
    users?.length > 0
      ? users.some(
          (user) =>
            user.user_name.toLowerCase().trim() === newuser.toLowerCase().trim()
        )
      : false;

  const handleSubmit = (user) => {
    let usersDetails = [];
    const getUsers = JSON.parse(localStorage.getItem("usersDetails"));
    const userIsDuplicate = checkIsDuplicate(getUsers, user.user_name);

    if (userIsDuplicate) {
      dispatch(setError("User is already exist"));
      return;
    }

    if (getUsers) {
      usersDetails = getUsers;
    }

    usersDetails.push(user);
    localStorage.setItem("usersDetails", JSON.stringify(usersDetails));
    dispatch(setSuccess("User added successfully"));

    if (signup) {
      navigate("/");
      return;
    } else {
      navigate("/user-list");
    }
  };

  const validation = Yup.object({
    user_name: Yup.string()
      .required("User name is required.")
      .max(100, "User name cannot exceed 100 characters.")
      .matches(/^[a-zA-Z\s]*$/, "Only characters and spaces are allowed."),
    email: Yup.string()
      .required("Email is required.")
      .max(150, "Email cannot exceed 150 characters.")
      .email("Invalid email format"),
    dob: Yup.string().required("DOB is required"),
    password: Yup.string()
      .required("Password is required.")
      .max(150, "Password cannot exceed 150 characters."),
    repassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Re-enter Password is required."),
    gender: Yup.string().required("Gender is required."),
  });

  return (
    <Layout
      title={"Create New User"}
      discription={""}
      isLogout={signup ? false : true}
    >
      <div className="mx-auto max-w-7xl  bg-white rounded-lg shadow-sm border  border-gray-200 ">
        <div className="mx-12 ">
          <Formik
            initialValues={{
              user_name: "",
              email: "",
              phone_no: "",
              dob: "",
              password: "",
              repassword: "",
              gender: "male",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validationSchema={validation}
          >
            <Form className="py-12">
              <div className="">
                <div className="">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="user_name"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                      >
                        User Name
                      </label>
                      <Field
                        type="text"
                        name="user_name"
                        id="user_name"
                        placeholder="First Name"
                        className="w-full p-2 border border-gray-300 p-2 rounded-lg  focus:outline-blue-300"
                      />
                      <ErrorMessage
                        component="a"
                        className={"text-sm text-red-500 px-2"}
                        name="user_name"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                      >
                        Email:
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        autoComplete="given-name"
                        className="w-full p-2 border border-gray-300 p-2 rounded-lg  focus:outline-blue-300"
                      />
                      <ErrorMessage
                        component="a"
                        className={"text-sm text-red-500 px-2"}
                        name="email"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="phone_no"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                      >
                        Contact No:
                      </label>
                      <Field
                        type="number"
                        name="phone_no"
                        id="phone_no"
                        placeholder="Phone Number"
                        autoComplete="given-name"
                        className="w-full p-2 border border-gray-300 p-2 rounded-lg  focus:outline-blue-300"
                      />
                      <ErrorMessage
                        component="a"
                        className={"text-sm text-red-500 px-2"}
                        name="phone_no"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                      >
                        Gender:
                      </label>
                      <Field
                        as="select"
                        name="gender"
                        className="w-full p-2 border border-gray-300 p-2 rounded-lg  focus:outline-blue-300"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>{" "}
                        {/* Corrected value */}
                      </Field>
                      <ErrorMessage
                        component="div"
                        className={"text-sm text-red-500 px-2"}
                        name="gender"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                      >
                        DOB
                      </label>
                      <Field
                        type="date"
                        name="dob"
                        id="dob"
                        placeholder="DOB"
                        className="w-full p-2 border border-gray-300 p-2 rounded-lg  focus:outline-blue-300"
                      />
                      <ErrorMessage
                        component="a"
                        className={"text-sm text-red-500 px-2"}
                        name="dob"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                      >
                        Password
                      </label>
                      <Field
                        type="text"
                        name="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="given-name"
                        className="w-full p-2 border border-gray-300 p-2 rounded-lg  focus:outline-blue-300"
                      />
                      <ErrorMessage
                        component="a"
                        className={"text-sm text-red-500 px-2"}
                        name="password"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="repassword"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                      >
                        Re-Password
                      </label>
                      <Field
                        type="text"
                        name="repassword"
                        id="repassword"
                        placeholder="Re-Passowrd"
                        autoComplete="given-name"
                        className="w-full p-2 border border-gray-300 p-2 rounded-lg  focus:outline-blue-300"
                      />
                      <ErrorMessage
                        component="a"
                        className={"text-sm text-red-500 px-2"}
                        name="repassword"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => {
                    if (signup) {
                      navigate("/");
                      return;
                    }
                    navigate("/user-list");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" w-24 rounded-lg bg-blue-500 text-white p-2 "
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default UserCreateForm;
