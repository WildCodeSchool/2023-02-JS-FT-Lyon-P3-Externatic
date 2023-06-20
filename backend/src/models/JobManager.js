const AbstractManager = require("./AbstractManager");

class JobManager extends AbstractManager {
  constructor() {
    super({ table: "job_posting" });
  }

  find(jobId) {
    return this.database.query(
      `
      SELECT job_posting.id, job_posting.company_id, job_posting.title, job_posting.description, job_posting.requirements, job_posting.contract_type, job_posting.remote, job_posting.location, job_posting.salary, job_posting.posting_date, job_posting.archived, company.name, company.contact, company.website
      FROM job_posting
      INNER JOIN company ON job_posting.company_id = company.id
      WHERE job_posting.id = ?
    `,
      [jobId]
    );
  }

  findAll() {
    return this.database.query(`
      SELECT job_posting.id, job_posting.company_id, job_posting.title, job_posting.description, job_posting.requirements, job_posting.contract_type, job_posting.remote, job_posting.location, job_posting.salary, job_posting.posting_date, job_posting.archived, company.name, company.contact, company.website
      FROM ${this.table}
      INNER JOIN company ON job_posting.company_id = company.id
    `);
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
