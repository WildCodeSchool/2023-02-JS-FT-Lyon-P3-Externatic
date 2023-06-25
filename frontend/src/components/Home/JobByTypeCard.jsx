import React from "react";
import { PropTypes } from "prop-types";
import styles from "./JobByTypeCard.module.css";
import cardJobPosting from "../../assets/cardJobPosting.jpg";

export default function JobByTypeCard({ jobTypes }) {
  return (
    <main className={styles.JobByTypeCardContainer}>
      <section className={styles.JobByTypeCardText}>
        <div>{jobTypes}</div>
        <div>00 Jobs</div>
      </section>
      <img className={styles.backgroundCardImg} src={cardJobPosting} alt="" />
    </main>
  );
}

JobByTypeCard.propTypes = {
  jobTypes: PropTypes.string.isRequired,
};
