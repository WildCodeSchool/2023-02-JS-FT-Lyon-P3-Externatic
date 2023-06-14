const AbstractManager = require("./AbstractManager");

class CandidateManager extends AbstractManager {
  constructor() {
    super({ table: "candidate" });
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.database.query(`select  * from  ${this.table}`);
  }

  insert(candidate) {
    return this.database.query(
      `insert into ${this.table} (user_id, firstname, lastname, cv) values (?, ?, ?, ?)`,
      [candidate.user_id, candidate.firstname, candidate.lastname, candidate.cv]
    );
  }

  update(candidate) {
    return this.database.query(
      `update ${this.table} set user_id = ?, firstname = ?, lastname = ?, cv = ? where id = ${candidate.id}`,
      [candidate.user_id, candidate.firstname, candidate.lastname, candidate.cv]
    );
  }
}

module.exports = CandidateManager;
