const AbstractManager = require("./AbstractManager");

class CandidateManager extends AbstractManager {
  constructor() {
    super({ table: "candidate" });
  }

  find(candidateId) {
    return this.database.query(
      `
      SELECT candidate.id, candidate.user_id, candidate.firstname, candidate.lastname, candidate.cv, user.email, user.hashedPassword, user.phone, user.city, user.picture
      FROM candidate
      INNER JOIN user ON candidate.user_id = user.id
      WHERE candidate.id = ?
    `,
      [candidateId]
    );
  }

  findByEmailWithPassword(email) {
    return this.database.query(
      `SELECT * FROM ${this.table} 
      INNER JOIN user ON candidate.user_id = user.id
      WHERE email = ?`,
      [email]
    );
  }

  findAll() {
    return this.database
      .query(`SELECT candidate.id, candidate.user_id, candidate.firstname, candidate.lastname, candidate.cv, user.email,user.hashedPassword, user.phone, user.city, user.picture
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
      `update ${this.table} set user_id = ${candidate.user_id}, firstname = ?, lastname = ?, cv = ? where id = ${candidate.id}`,
      [candidate.user_id, candidate.firstname, candidate.lastname, candidate.cv]
    );
  }

  delete(candidateId) {
    return this.database.query(
      `DELETE candidate, user
    FROM candidate
    JOIN user ON candidate.user_id = user.id
    WHERE candidate.id = ?
  `,
      [candidateId]
    );
  }
}

module.exports = CandidateManager;
