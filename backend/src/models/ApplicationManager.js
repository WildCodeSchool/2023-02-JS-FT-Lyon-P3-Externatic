const AbstractManager = require("./AbstractManager");

class ApplicationManager extends AbstractManager {
  constructor() {
    super({ table: "applications" });
  }

  insert(applications) {
    return this.database.query(
      `INSERT INTO ${this.table} (candidate_id, job_posting_id, date, status) VALUES (?, ?, ?, ?)`,
      [
        applications.candidate_id,
        applications.job_posting_id,
        applications.date,
        applications.status,
      ]
    );
  }

  update(applications) {
    return this.database.query(
      `UPDATE ${this.table} set candidate_id = ?, job_posting_id = ?, date = ?, status = ? where id = ${applications.id}`,
      [
        applications.candidate_id,
        applications.job_posting_id,
        applications.date,
        applications.status,
      ]
    );
  }
}

module.exports = ApplicationManager;
