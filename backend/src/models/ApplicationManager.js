const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (email, phone, city, picture, password, admin) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.email,
        user.phone,
        user.city,
        user.picture,
        user.password,
        user.admin,
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

module.exports = UserManager;
