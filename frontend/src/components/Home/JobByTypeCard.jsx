import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import styles from "./JobByTypeCard.module.css";
import cardJobPosting from "../../assets/cardJobPosting.jpg";
import { api } from "../../services/api";

export default function JobByTypeCard({ jobTypes }) {
  const [jobTypeCount, setJobTypeCount] = useState(0);
  const notifyError = () =>
    toast.error("Problème de récupération des applications..");
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobOffers = await api.getAlljobOffers();
        const count = jobOffers.reduce((acc, job) => {
          if (job.category === jobTypes) {
            return acc + 1;
          }
          return acc;
        }, 0);
        setJobTypeCount(count);
      } catch (error) {
        console.error(error);
        notifyError();
      }
    };

    fetchJobs();
  }, [jobTypes]);

  return (
    <main className={styles.JobByTypeCardContainer}>
      <section className={styles.JobByTypeCardText}>
        <div>{jobTypes}</div>
        <div>{jobTypeCount}</div>
      </section>
      <img
        className={styles.backgroundCardImg}
        src={cardJobPosting}
        alt="office img"
      />
    </main>
  );
}

JobByTypeCard.propTypes = {
  jobTypes: PropTypes.string.isRequired,
};
