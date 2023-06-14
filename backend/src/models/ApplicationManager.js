const AbstractManager = require("./AbstractManager");

class ApplicationManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (candidate_id, job_posting_id, date, status) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.candidate_id,
        user.job_posting_id,
        user.date,
        user.picture,
        user.status,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} set candidate_id = ?, job_posting = ?, date = ?, picture = ?, status = ? where id = ${user.id}`,
      [
        user.candidate_id,
        user.job_posting_id,
        user.date,
        user.picture,
        user.status,
      ]
    );
  }
}

module.exports = ApplicationManager;
