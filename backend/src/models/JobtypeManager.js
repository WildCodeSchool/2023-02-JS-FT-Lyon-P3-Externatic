const AbstractManager = require("./AbstractManager");

class JobtypeManager extends AbstractManager {
  constructor() {
    super({ table: "job_type" });
  }

  insert(jobType) {
    return this.database.query(`INSERT INTO ${this.table} (name) VALUES (?)`, [
      jobType.name,
    ]);
  }

  update(jobType) {
    return this.database.query(
      `UPDATE ${this.table} set name = ? where id = ?`,
      [jobType.name, jobType.id]
    );
  }
}

module.exports = JobtypeManager;
