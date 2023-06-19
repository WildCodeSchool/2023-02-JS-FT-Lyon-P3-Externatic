const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  constructor() {
    super({ table: "company" });
  }

  find(companyId) {
    return this.database.query(
      `
      SELECT company.id, company.user_id, company.name, company.contact, company.description, user.email, user.phone, user.city, user.picture
      FROM company
      INNER JOIN user ON company.user_id = user.id
      WHERE company.id = ?
    `,
      [companyId]
    );
  }

  findAll() {
    return this.database
      .query(`SELECT company.id, company.user_id, company.name, company.contact, company.description, user.email, user.phone, user.city, user.picture
    FROM ${this.table}
    INNER JOIN user ON company.user_id = user.id`);
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
