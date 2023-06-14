const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  constructor() {
    super({ table: "company" });
  }

  insert(company) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      company.name,
    ]);
  }

  update(company) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [company.name, company.id]
    );
  }
}

module.exports = CompanyManager;
