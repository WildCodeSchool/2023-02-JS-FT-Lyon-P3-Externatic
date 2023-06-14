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
      `UPDATE ${this.table} set phone = ? where id = ?`,
      [user.phone, user.id]
    );
  }
}

module.exports = ApplicationManager;
