import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import "./AddSchool.css";

import { toast } from 'react-toastify';

const AddSchool = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    const toastId = toast.loading("Waiting for confirmation...", {
      position: "top-center",
    });
    const formData = new FormData();

    formData.append('name', data.schoolName);
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('phone', data.phone);
    formData.append('image', data.schoolImage[0]);

    try {
      const response = await fetch('https://school-backend-9n4e.onrender.com/schools', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.dismiss(toastId);
        toast.success('School data submitted successfully', {
            position: "top-center",
            });
      } else {
        toast.dismiss(toastId);
        toast.error('Failed to submit school data', {
            position: "top-center",
            });
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error occurred");
    }
  };

  return (
    <div className="container1">
      <form onSubmit={handleSubmit(onSubmit)} className="school-form">
        <h1 className="head">Fill Form to Add New School</h1>

        {/* Form fields */}
        <div className="form-data">
          <label className="form-label" htmlFor="schoolName">School Name</label>
          <input
            className="form-input"
            id="schoolName"
            {...register("schoolName", { required: "School Name is required" })}
            placeholder="Enter school name"
          />
          {errors.schoolName && <span>{errors.schoolName.message}</span>}
        </div>

        <div className="form-data">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            className="form-input"
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email",
              },
            })}
            placeholder="Enter email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="form-data">
          <label className="form-label" htmlFor="address">Address</label>
          <input
            className="form-input"
            id="address"
            {...register("address", { required: "Address is required" })}
            placeholder="Enter address"
          />
          {errors.address && <span>{errors.address.message}</span>}
        </div>

        <div className="form-data">
          <label className="form-label" htmlFor="city">City</label>
          <input
            className="form-input"
            id="city"
            {...register("city", { required: "City is required" })}
            placeholder="Enter city"
          />
          {errors.city && <span>{errors.city.message}</span>}
        </div>

        <div className="form-data">
          <label className="form-label" htmlFor="state">State</label>
          <input
            className="form-input"
            id="state"
            {...register("state", { required: "State is required" })}
            placeholder="Enter state"
          />
          {errors.state && <span>{errors.state.message}</span>}
        </div>

        <div className="form-data">
          <label className="form-label" htmlFor="phone">Phone No.</label>
          <input
            className="form-input"
            id="phone"
            type="tel"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Enter a valid phone number",
              },
            })}
            placeholder="Enter contact number"
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>

        <div className="form-data">
          <label className="form-label" htmlFor="schoolImage">School Image</label>
          <input
            className="form-input"
            id="schoolImage"
            type="file"
            accept="image/*"
            {...register("schoolImage", {
              required: "School Image is required",
            })}
          />
          {errors.schoolImage && <span>{errors.schoolImage.message}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
      <NavLink to="showschool" style={{ textDecoration: "none" }}>
        <button className="check-btn">Check all schools</button>
      </NavLink>
    </div>
  );
};

export default AddSchool;
