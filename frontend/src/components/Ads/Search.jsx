import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Search() {
  const [info, setInfo] = useState([]);
  const [userInfo, setUserInfo] = useState({
    city: "",
    job: "",
  });

  const handleChanges = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const showJobInfo = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/jobs`);
      setInfo(
        res.data.filter((jobs) => {
          return jobs.location === userInfo.city && jobs.title === userInfo.job;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <select name="city" id="city" onChange={handleChanges}>
        <option value="">Choose a city</option>
        <option value="New York">New York</option>
        <option value="Paris">Paris</option>
        <option value="Lyon">Lyon</option>
      </select>
      <select name="job" id="job" onChange={handleChanges}>
        <option value="">Choose a job</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="DevOps">Dev Ops</option>
        <option value="Front End Dev">Front End Dev</option>
      </select>
      {/* {userInfo.city && console.log(userInfo.city)} */}

      <div>
        {
          info &&
            info.map((item) => (
              <p key={item.id}>
                Title: {item.title} <br />
                Description: {item.description} <br />
                Requirements: {item.requirements} <br />
                Contract : {item.contract_type} <br />
              </p>
            ))
          // console.log(info[0].description)
        }
      </div>
      <button type="button" onClick={showJobInfo}>
        Recherche
      </button>
    </div>
  );
}
