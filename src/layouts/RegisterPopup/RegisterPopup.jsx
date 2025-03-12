import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./RegisterPopup.css";
import addUsers from "../../store/user/api/Post/addUsers";
// Redux
import { useDispatch, useSelector } from "react-redux";
function RegisterPopup({ onClose }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);


  // إعداد useFormik
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "The name must be at least 3 characters long.")
        .required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(addUsers(values));
      localStorage.setItem(
        "userID",
        JSON.stringify(users.addUsers.id) 
      );
      onClose();
    },
  });
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h5>New user registration</h5>
          <button className="btn btn-close" onClick={onClose}></button>
        </div>
        <div className="popup-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-control ${
                  formik.touched.username && formik.errors.username
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="invalid-feedback">{formik.errors.username}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPopup;
