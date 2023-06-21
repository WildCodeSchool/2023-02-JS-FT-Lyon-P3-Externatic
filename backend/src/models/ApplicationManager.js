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

  findApplicationsByUserId(userId) {
    return this.database.query(
      `SELECT * FROM ${this.table} AS app
       JOIN candidate AS c ON app.candidate_id = c.id
       JOIN user AS u ON c.user_id = u.id
       JOIN job_posting AS jp ON app.job_posting_id = jp.id
       JOIN company AS co ON jp.company_id = co.id
       WHERE app.candidate_id = ?`,
      [userId]
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
