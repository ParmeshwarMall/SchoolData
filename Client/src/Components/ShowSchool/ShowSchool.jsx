import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";

import { toast } from "react-toastify";

import "./ShowSchool.css";

const ShowSchool = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const toastId = toast.loading("Fetching schools data...", {
      position: "top-center",
    });
    const fetchSchools = async () => {
      try {
        const response = await axios.get(
          "https://school-backend-9n4e.onrender.com/getdata"
        );
        setSchools(response.data);
        toast.dismiss(toastId);
        toast.success("Fetch data successfully", {
          position: "top-center",
        });
      } catch (error) {
        console.error("Error fetching school data:", error);
        toast.dismiss(toastId);
        toast.error("Cannot fetch data", {
          position: "top-center",
        });
      }
    };

    fetchSchools();
  }, []);

  console.log(schools);

  return (
    <div className="schools-container">
      <h1 className="head">All Schools</h1>
      <div className="schools-list">
        {schools.map((school) => (
          <div class="card" key={school._id}>
            <img
              src={`https://school-backend-9n4e.onrender.com/${school.image}`}
              class="card-img-top"
              alt={`${school.name}`}
              style={{height:"200px"}}
            />
            <div class="card-body">
              <h5 class="card-title">{`${school.name}`}</h5>
              <p class="card-text"><span className="card-title">Email:</span> {`${school.email}`}</p>
              <p class="card-text">
              <span className="card-title">Address:</span> {`${school.address} ${school.city} ${school.state}`}
              </p>
              <p class="card-text"><span className="card-title">Phone No.:</span> {`${school.phone}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchool;
