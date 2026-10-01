"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { FormikModal } from "./formik-modal";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  age: number | "";
  country: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  age: "",
  country: "",
  gender: "",
  password: "",
  confirmPassword: "",
};

// Validation;
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .required("Phone is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(18, "You must be at least 18")
    .max(100, "Enter a valid age")
    .required("Age is required"),
  country: Yup.string().required("Please select a country"),
  gender: Yup.string().required("Please choose a gender"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const inputClass = "w-full rounded-lg border border-gray-300 p-2 text-black";
const labelClass = "block text-sm font-medium text-gray-500";

export default function SimpleForm() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const onSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    setSubmittedData(values);
    setIsModalOpen(true);
    resetForm();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold text-black">Sign Up</h2>

        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-4">
            <div className="space-y-1">
              <label className={labelClass}>Name</label>
              <Field name="name" type="text" className={inputClass} />
              <ErrorMessage
                name="name"
                component="p"
                className="text-sm text-red-600"
              />
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Email</label>
              <Field name="email" type="email" className={inputClass} />
              <ErrorMessage
                name="email"
                component="p"
                className="text-sm text-red-600"
              />
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Phone</label>
              <Field name="phone" type="text" className={inputClass} />
              <ErrorMessage
                name="phone"
                component="p"
                className="text-sm text-red-600"
              />
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Age</label>
              <Field name="age" type="number" className={inputClass} />
              <ErrorMessage
                name="age"
                component="p"
                className="text-sm text-red-600"
              />
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Country</label>
              <Field as="select" name="country" className={inputClass}>
                <option value="">-- Select --</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
              </Field>
              <ErrorMessage
                name="country"
                component="p"
                className="text-sm text-red-600"
              />
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Gender</label>
              <div className="flex gap-4 text-sm text-gray-500">
                <label className="flex items-center gap-2">
                  <Field
                    type="radio"
                    name="gender"
                    value="male"
                    className="accent-black"
                  />{" "}
                  Male
                </label>
                <label className="flex items-center gap-2">
                  <Field
                    type="radio"
                    name="gender"
                    value="female"
                    className="accent-black"
                  />{" "}
                  Female
                </label>
                <label className="flex items-center gap-2">
                  <Field
                    type="radio"
                    name="gender"
                    value="other"
                    className="accent-black"
                  />{" "}
                  Other
                </label>
              </div>
              <ErrorMessage
                name="gender"
                component="p"
                className="text-sm text-red-600"
              />
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Password</label>
              <Field name="password" type="password" className={inputClass} />
              <ErrorMessage
                name="password"
                component="p"
                className="text-sm text-red-600"
              />
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className={inputClass}
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-sm text-red-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-800"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>

      <FormikModal
        isOpen={isModalOpen}
        data={submittedData}
        onClose={closeModal}
      />
    </div>
  );
}
