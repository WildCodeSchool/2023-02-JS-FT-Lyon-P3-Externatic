const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  constructor() {
    super({ table: "company" });
  }

  find(id) {
    return this.database.query(
      `
      SELECT company.id, company.user_id, company.name, company.contact, company.website, company.description, user.email, user.phone, user.city, user.picture
      FROM company
      INNER JOIN user ON company.user_id = user.id
      WHERE company.id = ?
    `,
      [id]
    );
  }

  findAll() {
    return this.database
      .query(`SELECT company.id, company.user_id, company.name, company.contact, company.website, company.description, user.email, user.phone, user.city, user.picture, user.admin
    FROM ${this.table}
    INNER JOIN user ON company.user_id = user.id`);
  }

  findCompanyByEmailWithPassword(email) {
    return this.database.query(
      `SELECT ${this.table}.*, user.hashedPassword, user.email, user.phone, user.city, user.picture, user.admin FROM ${this.table} 
      INNER JOIN user ON company.user_id = user.id
      WHERE email = ?`,
      [email]
    );
  }

  insert(company) {
    return this.database.query(
      `
      INSERT INTO company (user_id, name, contact, description, website)
      VALUES (?, ?, ?, ?, ?)
    `,
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
      `update ${this.table} set name = ?, contact = ?, description = ?, website = ? where company.id = ?`,
      [
        company.name,
        company.contact,
        company.description,
        company.website,
        company.id,
      ]
    );
  }

  delete(companyId) {
    return this.database.query(
      `DELETE company, user
    FROM company
    JOIN user ON company.user_id = user.id
    WHERE company.id = ?
  `,
      [companyId]
    );
  }
}

module.exports = CompanyManager;
