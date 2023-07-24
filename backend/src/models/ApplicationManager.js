const AbstractManager = require("./AbstractManager");

class ApplicationManager extends AbstractManager {
  constructor() {
    super({ table: "application" });
  }

  insert(application) {
    return this.database.query(
      `INSERT INTO ${this.table} (candidate_id, company_id, job_posting_id, date, status) VALUES (?, ?, ?, ?, ?)`,
      [
        application.candidate_id,
        application.company_id,
        application.job_posting_id,
        application.date,
        application.status,
      ]
    );
  }

  findApplicationsByUserId(userId) {
    return this.database.query(
      `SELECT * FROM ${this.table} AS app
       JOIN job_posting AS jp ON app.job_posting_id = jp.id
       JOIN company AS co ON jp.company_id = co.id
       WHERE app.candidate_id = ?`,
      [userId]
    );
  }

  findApplicationsByCompanyId(companyId) {
    return this.database.query(
      `SELECT * FROM ${this.table} AS app
       JOIN job_posting AS jp ON app.job_posting_id = jp.id
       JOIN company AS co ON jp.company_id = co.id
       WHERE co.id = ?`,
      [companyId]
    );
  }

  update(application) {
    return this.database.query(
      `UPDATE ${this.table} set candidate_id = ?, job_posting_id = ?, date = ?, status = ? where id = ?`,
      [
        application.candidate_id,
        application.job_posting_id,
        application.date,
        application.status,
        application.id,
      ]
    );
  }

  delete(applicationId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE candidate_id = ?`,
      [applicationId]
    );
  }
}

module.exports = ApplicationManager;
