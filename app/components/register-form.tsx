"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmittedDataModal } from "./submit-data-modal";

export default function Registerform() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data: any) =>
    setSubmittedData(data);
    setIsModalOpen(true);
  };

  return (
    <main className="mx-auto my-10 max-w-2xl px-4">
      <h1 className="mb-6 text-3xl font-bold">Registration Form</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 rounded-xl border p-6 shadow"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">
            Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="rounded-lg border px-3 py-2"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="rounded-lg border px-3 py-2"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
            })}
          />

          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="rounded-lg border px-3 py-2"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="font-medium">
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="rounded-lg border px-3 py-2"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div className="flex flex-col gap-2">
          <label htmlFor="age" className="font-medium">
            Age
          </label>

          <input
            id="age"
            type="number"
            placeholder="Enter your age"
            className="rounded-lg border px-3 py-2"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
              min: {
                value: 18,
                message: "You must be at least 18 years old",
              },
              max: {
                value: 100,
                message: "Age must be 100 or below",
              },
            })}
          />

          {errors.age && (
            <p className="text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-medium">
            Phone
          </label>

          <input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="rounded-lg border px-3 py-2"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
          />

          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Department */}
        <div className="flex flex-col gap-2">
          <label htmlFor="department" className="font-medium">
            Department
          </label>

          <select
            id="department"
            className="rounded-lg border px-3 py-2 bg-white text-gray-900"
            {...register("department", {
              required: "Please select a department",
            })}
          >
            <option className="text-grey" value="">
              Select Department
            </option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">Design</option>
            <option value="hr">HR</option>
            <option value="marketing">Marketing</option>
          </select>

          {errors.department && (
            <p className="text-sm text-red-600">{errors.department.message}</p>
          )}
        </div>

        {/* gender */}
        <fieldset className="flex flex-col gap-3">
          <label className="font-medium">Gender</label>

          <label className="flex gap-2">
            <input
              type="radio"
              value="male"
              {...register("gender", {
                required: "Please select your gender",
              })}
            />
            Male
          </label>

          <label className="flex gap-2">
            <input type="radio" value="female" {...register("gender")} />
            Female
          </label>

          <label className="flex gap-2">
            <input type="radio" value="other" {...register("gender")} />
            Other
          </label>

          {errors.gender && (
            <p className="text-sm text-red-600">{errors.gender.message}</p>
          )}
        </fieldset>

        {/* skills */}
        <fieldset className="flex flex-col gap-3">
          <legend className="font-medium">Skills</legend>

          <label className="flex gap-2">
            <input
              type="checkbox"
              value="javascript"
              {...register("skills", {
                required: "Please select at least one skill",
              })}
            />
            JavaScript
          </label>

          <label className="flex gap-2">
            <input type="checkbox" value="react" {...register("skills")} />
            React
          </label>

          <label className="flex gap-2">
            <input type="checkbox" value="nextjs" {...register("skills")} />
            Next.js
          </label>

          <label className="flex gap-2">
            <input type="checkbox" value="typescript" {...register("skills")} />
            TypeScript
          </label>

          {errors.skills && (
            <p className="text-sm text-red-600">{errors.skills.message}</p>
          )}
        </fieldset>

        {/* Terms */}
        <div className="flex flex-col gap-2">
          <label className="flex gap-2">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept the terms",
              })}
            />
            I agree to the terms and conditions
          </label>

          {errors.terms && (
            <p className="text-sm text-red-600">{errors.terms.message}</p>
          )}
        </div>

        {/* About */}
        <div className="flex flex-col gap-2">
          <label htmlFor="about" className="font-medium">
            About
          </label>

          <textarea
            id="about"
            rows={4}
            placeholder="Tell us about yourself"
            className="rounded-lg border px-3 py-2"
            {...register("about", {
              required: "Please tell us something about yourself",
              minLength: {
                value: 20,
                message: "About must be at least 20 characters",
              },
            })}
          />

          {errors.about && (
            <p className="text-sm text-red-600">{errors.about.message}</p>
          )}
        </div>

        {/* address */}
        <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
          <label className="px-2 font-medium">Address</label>

          {/* Street */}
          <div className="flex flex-col gap-2">
            <label htmlFor="street">Street</label>

            <input
              id="street"
              type="text"
              className="rounded-lg border px-3 py-2"
              {...register("address.street", {
                required: "Street is required",
              })}
            />

            {errors.address?.street && (
              <p className="text-sm text-red-600">
                {errors.address.street.message}
              </p>
            )}
          </div>

          {/* City */}
          <div className="flex flex-col gap-2">
            <label htmlFor="city">City</label>

            <input
              id="city"
              type="text"
              className="rounded-lg border px-3 py-2"
              {...register("address.city", {
                required: "City is required",
              })}
            />

            {errors.address?.city && (
              <p className="text-sm text-red-600">
                {errors.address.city.message}
              </p>
            )}
          </div>

          {/* State */}
          <div className="flex flex-col gap-2">
            <label htmlFor="state">State</label>

            <input
              id="state"
              type="text"
              className="rounded-lg border px-3 py-2"
              {...register("address.state", {
                required: "State is required",
              })}
            />

            {errors.address?.state && (
              <p className="text-sm text-red-600">
                {errors.address.state.message}
              </p>
            )}
          </div>

          {/* ZIP Code */}
          <div className="flex flex-col gap-2">
            <label htmlFor="zipCode">ZIP Code</label>

            <input
              id="zipCode"
              type="text"
              className="rounded-lg border px-3 py-2"
              {...register("address.zipCode", {
                required: "ZIP code is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "ZIP code must be 6 digits",
                },
              })}
            />

            {errors.address?.zipCode && (
              <p className="text-sm text-red-600">
                {errors.address.zipCode.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div className="flex flex-col gap-2">
            <label htmlFor="country">Country</label>

            <input
              id="country"
              type="text"
              className="rounded-lg border px-3 py-2"
              {...register("address.country", {
                required: "Country is required",
              })}
            />

            {errors.address?.country && (
              <p className="text-sm text-red-600">
                {errors.address.country.message}
              </p>
            )}
          </div>
        </fieldset>

        {/* Button  */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-black px-5 py-2.5 text-white"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg border px-5 py-2.5"
          >
            Reset
          </button>
        </div>
      </form>
      <SubmittedDataModal
        isOpen={isModalOpen}
        data={submittedData}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
