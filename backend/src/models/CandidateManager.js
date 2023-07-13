const AbstractManager = require("./AbstractManager");

class CandidateManager extends AbstractManager {
  constructor() {
    super({ table: "candidate" });
  }

  find(id) {
    return this.database.query(
      `
      SELECT candidate.id, candidate.user_id, candidate.firstname, candidate.lastname, candidate.cv, user.email, user.hashedPassword, user.phone, user.city, user.picture
      FROM candidate
      INNER JOIN user ON candidate.user_id = user.id
      WHERE candidate.id = ?
    `,
      [id]
    );
  }

  findCandidateByEmailWithPassword(email) {
    return this.database.query(
      `SELECT ${this.table}.*, user.hashedPassword, user.email, user.phone, user.city, user.picture, user.admin FROM ${this.table} 
      INNER JOIN user ON candidate.user_id = user.id
      WHERE email = ?`,
      [email]
    );
  }

  findAll() {
    return this.database
      .query(`SELECT candidate.id, candidate.user_id, candidate.firstname, candidate.lastname, candidate.cv, user.email, user.phone, user.city, user.picture, user.admin
    FROM ${this.table}
    INNER JOIN user ON candidate.user_id = user.id`);
  }

  insert(candidate) {
    return this.database.query(
      `
      INSERT INTO candidate (user_id, firstname, lastname, cv)
      VALUES (?, ?, ?, ?)
    `,
      [candidate.user_id, candidate.firstname, candidate.lastname, candidate.cv]
    );
  }

  update(candidate) {
    return this.database.query(
      `update ${this.table} set firstname = ?, lastname = ? where user_id = ${candidate.id}`,
      [candidate.firstname, candidate.lastname]
    );
  }

  updateCV(candidate) {
    return this.database.query(
      `update ${this.table} set cv = ? where user_id = ${candidate.id}`,
      [candidate.cv]
    );
  }

  deleteByLastName(lastname) {
    return this.database.query(
      `
      DELETE candidate, user
      FROM candidate
      JOIN user ON candidate.user_id = user.id
      WHERE candidate.lastname = ?
      `,
      [lastname]
    );
  }
}

module.exports = CandidateManager;
