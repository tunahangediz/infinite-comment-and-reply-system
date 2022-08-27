import { useFormik } from "formik";
import React from "react";
import useLogin from "../hooks/useLogin";

function Login() {
  const { login } = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });
  return (
    <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <form
        onSubmit={formik.handleSubmit}
        class="max-w-md mx-auto mt-8 mb-0 space-y-4"
      >
        <div>
          <label for="email" class="sr-only">
            Email
          </label>

          <div class="relative">
            <input
              id="email"
              name="email"
              type="email"
              class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
        </div>

        <div>
          <label for="password" class="sr-only">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              name="password"
              type="password"
              class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <p></p>

          <button
            type="submit"
            class="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
