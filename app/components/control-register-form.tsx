"use client";
import { useState } from "react";
import { SubmittedDataModal } from "./submit-data-modal";



interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  phone: string;
  department: string;
  gender: string;
  skills: string[];
  about: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  age?: string;
  phone?: string;
  department?: string;
  gender?: string;
  skills?: string;
  about?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}


export default function ControlRegisterform(){
 const [formData, setFormData] = useState<FormData>({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    age:"",
    phone:"",
    department:"",
    gender:"",
    skills:[]as string[],
    about:"",
     address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });


  
  const [errors, setErrors] = useState<Errors>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputStyle = "rounded-lg border px-3 py-2";
  const errorMsg= "errorMsg";


const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  const updated = { ...formData, [name]: value };
  setFormData(updated);

  const fieldErrors = validate(updated);
  setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof Errors] }));
};

const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  const updated = {
    ...formData,
    address: { ...formData.address, [name]: value },
  };
  setFormData(updated);

  const fieldErrors = validate(updated);
  setErrors((prev) => ({
    ...prev,
    address: {
      ...prev.address,
      [name]: fieldErrors.address?.[name as keyof NonNullable<Errors["address"]>],
    },
  }));
};

const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value, checked } = e.target;
  const updated = {
    ...formData,
    skills: checked
      ? [...formData.skills, value]
      : formData.skills.filter((s) => s !== value),
  };
  setFormData(updated);

  const fieldErrors = validate(updated);
  setErrors((prev) => ({ ...prev, skills: fieldErrors.skills }));
};

   const validate = (data: FormData): Errors => {
   const errs: Errors = {};

    if (!data.name.trim()) errs.name = "Name is required";

    if (!data.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      errs.email = "Please enter a valid email";

    if (!data.password) errs.password = "Password is required";
    else if (data.password.length < 6)
      errs.password = "Password must be at least 6 characters";

    if (!data.confirmPassword) errs.confirmPassword = "Please confirm your password";
    else if (data.confirmPassword !== data.password)
      errs.confirmPassword = "Passwords do not match";

    if (!data.age) {
  errs.age = "Age is required";
} else if (Number(data.age) < 18) {
  errs.age = "You must be at least 18 years old";
} else if (Number(data.age) > 100) {
  errs.age = "Age must be 100 or below";
}

    if (!data.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(data.phone))
      errs.phone = "Phone number must be 10 digits";

    if (!data.department) errs.department = "Please select a department";
    if (!data.gender) errs.gender = "Please select your gender";
    if (data.skills.length === 0) errs.skills = "Please select at least one skill";
   

    if (!data.about.trim()) errs.about = "Please tell us something about yourself";
    else if (data.about.trim().length < 20)
      errs.about = "About must be at least 20 characters";

    const addrErrs: NonNullable<Errors["address"]> = {};
    if (!data.address.street.trim()) addrErrs.street = "Street is required";
    if (!data.address.city.trim()) addrErrs.city = "City is required";
    if (!data.address.state.trim()) addrErrs.state = "State is required";
    if (!data.address.zipCode.trim()) addrErrs.zipCode = "ZIP code is required";
    else if (!/^[0-9]{6}$/.test(data.address.zipCode))
      addrErrs.zipCode = "ZIP code must be 6 digits";
    if (!data.address.country.trim()) addrErrs.country = "Country is required";
    if (Object.keys(addrErrs).length > 0) errs.address = addrErrs;

    return errs;
  };


   const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setIsModalOpen(true);
    }
  };

  
   const handleReset = () => {
    setFormData({
      name: "", email: "", password: "", confirmPassword: "",
      age: "", phone: "", department: "", gender: "", skills: [],
      about: "",
      address: { street: "", city: "", state: "", zipCode: "", country: "" },
    });
    setErrors({});
  };


  return (
    <main className="mx-auto my-10 max-w-2xl px-4">
      <h1 className="mb-6 text-3xl font-bold">Registration Form</h1>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 rounded-xl border p-6 shadow"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            className={inputStyle}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="errorMsg">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className={inputStyle}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="errorMsg">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className={inputStyle}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="errorMsg">{errors.password}</p>}
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="font-medium">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className={inputStyle}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="errorMsg">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Age */}
        <div className="flex flex-col gap-2">
          <label htmlFor="age" className="font-medium">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="Enter your age"
            className={inputStyle}
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p className="errorMsg">{errors.age}</p>}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-medium">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            className={inputStyle}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="errorMsg">{errors.phone}</p>}
        </div>

        {/* Department */}
        <div className="flex flex-col gap-2">
          <label htmlFor="department" className="font-medium">Department</label>
          <select
            id="department"
            name="department"
            className="rounded-lg border px-3 py-2 bg-white text-gray-900"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">Design</option>
            <option value="hr">HR</option>
            <option value="marketing">Marketing</option>
          </select>
          {errors.department && (
            <p className="errorMsg">{errors.department}</p>
          )}
        </div>

        {/* Gender */}
        <fieldset className="flex flex-col gap-3">
          <label className="font-medium">Gender</label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={handleChange}
            />
            Other
          </label>
          {errors.gender && <p className="errorMsg">{errors.gender}</p>}
        </fieldset>

        {/* Skills */}
        <fieldset className="flex flex-col gap-3">
          <legend className="font-medium">Skills</legend>
          <label className="flex gap-2">
            <input
              type="checkbox"
              value="javascript"
              checked={formData.skills.includes("javascript")}
              onChange={handleSkillChange}
            />
            JavaScript
          </label>
          <label className="flex gap-2">
            <input
              type="checkbox"
              value="react"
              checked={formData.skills.includes("react")}
              onChange={handleSkillChange}
            />
            React
          </label>
          <label className="flex gap-2">
            <input
              type="checkbox"
              value="nextjs"
              checked={formData.skills.includes("nextjs")}
              onChange={handleSkillChange}
            />
            Next.js
          </label>
          <label className="flex gap-2">
            <input
              type="checkbox"
              value="typescript"
              checked={formData.skills.includes("typescript")}
              onChange={handleSkillChange}
            />
            TypeScript
          </label>
          {errors.skills && <p className="errorMsg">{errors.skills}</p>}
        </fieldset>

       

        {/* About */}
        <div className="flex flex-col gap-2">
          <label htmlFor="about" className="font-medium">About</label>
          <textarea
            id="about"
            name="about"
            rows={4}
            placeholder="Tell us about yourself"
            className={inputStyle}
            value={formData.about}
            onChange={handleChange}
          />
          {errors.about && <p className="errorMsg">{errors.about}</p>}
        </div>

        {/* Address */}
        <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
          <label className="px-2 font-medium">Address</label>

          <div className="flex flex-col gap-2">
            <label htmlFor="street">Street</label>
            <input
              id="street"
              name="street"
              type="text"
              className={inputStyle}
              value={formData.address.street}
              onChange={handleAddressChange}
            />
            {errors.address?.street && (
              <p className="errorMsg">{errors.address.street}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              className={inputStyle}
              value={formData.address.city}
              onChange={handleAddressChange}
            />
            {errors.address?.city && (
              <p className="errorMsg">{errors.address.city}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="state">State</label>
            <input
              id="state"
              name="state"
              type="text"
              className={inputStyle}
              value={formData.address.state}
              onChange={handleAddressChange}
            />
            {errors.address?.state && (
              <p className="errorMsg">{errors.address.state}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="zipCode">ZIP Code</label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              className={inputStyle}
              value={formData.address.zipCode}
              onChange={handleAddressChange}
            />
            {errors.address?.zipCode && (
              <p className="errorMsg">{errors.address.zipCode}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              name="country"
              type="text"
              className={inputStyle}
              value={formData.address.country}
              onChange={handleAddressChange}
            />
            {errors.address?.country && (
              <p className="errorMsg">{errors.address.country}</p>
            )}
          </div>
        </fieldset>

        {/* Buttons */}
        <div className="flex gap-3">
          <button type="submit" className="rounded-lg bg-black px-5 py-2.5 text-white">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="rounded-lg border px-5 py-2.5">
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