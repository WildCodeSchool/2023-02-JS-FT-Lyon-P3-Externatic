const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (email, phone, city, picture, hashedPassword, admin) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.email,
        user.phone,
        user.city,
        user.picture,
        user.hashedPassword,
        user.admin,
      ]
    );
  }

  update(candidate) {
    return this.database.query(
      `UPDATE ${this.table} set email = ?, phone = ? where id = ?`,
      [candidate.email, candidate.phone, candidate.id]
    );
  }

  updatePicture(candidate) {
    return this.database.query(
      `update ${this.table} set picture = ? where id = ${candidate.id}`,
      [candidate.picture]
    );
  }
}

module.exports = UserManager;
