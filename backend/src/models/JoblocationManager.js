const AbstractManager = require("./AbstractManager");

class JoblocationManager extends AbstractManager {
  constructor() {
    super({ table: "job_location" });
  }

  insert(jobLocation) {
    return this.database.query(`INSERT INTO ${this.table} (name) VALUES (?)`, [
      jobLocation.name,
    ]);
  }

  update(jobLocation) {
    return this.database.query(
      `UPDATE ${this.table} set name = ? where id = ${jobLocation.id}`,
      [jobLocation.name, jobLocation.id]
    );
  }
}

module.exports = JoblocationManager;
