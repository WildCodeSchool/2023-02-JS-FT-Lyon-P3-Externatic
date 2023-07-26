const AbstractManager = require("./AbstractManager");

class JobCategoryManager extends AbstractManager {
  constructor() {
    super({ table: "job_category" });
  }

  insert(category) {
    return this.database.query(`INSERT INTO ${this.table} (name) VALUES (?)`, [
      category.name,
    ]);
  }

  update(category) {
    return this.database.query(
      `UPDATE ${this.table} set name = ?, where id = ?`,
      [category.name, category.id]
    );
  }
}

module.exports = JobCategoryManager;
