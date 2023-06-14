const AbstractManager = require("./AbstractManager");

class JobManager extends AbstractManager {
  constructor() {
    super({ table: "job_posting" });
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.database.query(`select  * from  ${this.table}`);
  }

  insert(job) {
    return this.database.query(
      `insert into ${this.table} (company_id, title, description, requirements, contract_type, remote, location, salary, posting_date, archived) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        job.company_id,
        job.title,
        job.description,
        job.requirements,
        job.contract_type,
        job.remote,
        job.location,
        job.salary,
        job.posting_date,
        job.archived,
      ]
    );
  }

  update(job) {
    return this.database.query(
      `update ${this.table} set company_id = ? , title = ?, description = ?, requirements = ?, contract_type = ?, remote = ?, location = ?, salary = ?, posting_date = ?, archived = ? where id = ${job.id}`,
      [
        job.company_id,
        job.title,
        job.description,
        job.requirements,
        job.contract_type,
        job.remote,
        job.location,
        job.salary,
        job.posting_date,
        job.archived,
      ]
    );
  }
}

module.exports = JobManager;
