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

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} set email = ?, phone = ?, city = ? where id = ${user.id}`,
      [user.email, user.phone, user.city]
    );
  }

  updatePicture(user) {
    return this.database.query(
      `update ${this.table} set picture = ? where id = ${user.id}`,
      [user.picture]
    );
  }
}

module.exports = UserManager;
