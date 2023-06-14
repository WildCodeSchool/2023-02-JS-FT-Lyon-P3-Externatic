const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  constructor() {
    super({ table: "company" });
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.database.query(`select  * from  ${this.table}`);
  }

  insert(company) {
    return this.database.query(
      `insert into ${this.table} (user_id, name, contact, description, website) values (?, ?, ?, ?, ?)`,
      [
        company.user_id,
        company.name,
        company.contact,
        company.description,
        company.website,
      ]
    );
  }

  update(company) {
    return this.database.query(
      `update ${this.table} set user_id = ?, name = ?, contact = ?, description = ?, website = ? where id = ${company.id}`,
      [
        company.user_id,
        company.name,
        company.contact,
        company.description,
        company.website,
      ]
    );
  }
}

module.exports = CompanyManager;
