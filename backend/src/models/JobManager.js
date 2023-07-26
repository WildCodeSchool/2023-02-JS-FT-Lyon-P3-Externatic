const AbstractManager = require("./AbstractManager");

class JobManager extends AbstractManager {
  constructor() {
    super({ table: "job_posting" });
  }

  find(jobId) {
    return this.database.query(
      `
      SELECT job_posting.id, job_posting.company_id, job_posting.job_category_id, job_posting.job_type_id, job_posting.job_location_id, job_posting.title, job_posting.description, job_posting.requirements, job_posting.remote, job_posting.salary, job_posting.posting_date, job_posting.archived, company.name, company.contact, company.website, user.email, user.phone, user.city, user.picture, job_category.category, job_type.type, job_location.location
      FROM job_posting
      INNER JOIN company ON job_posting.company_id = company.id
      INNER JOIN user ON job_posting.user_id = user.id
      INNER JOIN job_category ON job_posting.job_category_id = job_category.id
      INNER JOIN job_type ON job_posting.job_type_id = job_type.id
      INNER JOIN job_location ON job_posting.job_location_id = job_location.id
      WHERE job_posting.id = ?
    `,
      [jobId]
    );
  }

  findJobsByUserId(userId) {
    return this.database.query(
      `SELECT job_posting.id, job_posting.company_id, job_posting.job_category_id, job_posting.job_type_id, job_posting.job_location_id, job_posting.title, job_posting.description, job_posting.requirements, job_posting.remote, job_posting.salary, job_posting.posting_date, job_posting.archived, company.name, company.contact, company.website, user.email, user.phone, user.city, user.picture, job_category.category, job_type.type, job_location.location
      FROM job_posting
      INNER JOIN company ON job_posting.company_id = company.id
      INNER JOIN user ON job_posting.user_id = user.id
      INNER JOIN job_category ON job_posting.job_category_id = job_category.id
      INNER JOIN job_type ON job_posting.job_type_id = job_type.id
      INNER JOIN job_location ON job_posting.job_location_id = job_location.id
       WHERE job.user_id = ?`,
      [userId]
    );
  }

  findJobsByCompanyId(companyId) {
    return this.database.query(
      `SELECT job_posting.id, job_posting.company_id, job_posting.job_category_id, job_posting.job_type_id, job_posting.job_location_id, job_posting.title, job_posting.description, job_posting.requirements, job_posting.remote, job_posting.salary, job_posting.posting_date, job_posting.archived, company.name, company.contact, company.website, user.email, user.phone, user.city, user.picture, job_category.category, job_type.type, job_location.location
      FROM job_posting
      INNER JOIN company ON job_posting.company_id = company.id
      INNER JOIN user ON job_posting.user_id = user.id
      INNER JOIN job_category ON job_posting.job_category_id = job_category.id
      INNER JOIN job_type ON job_posting.job_type_id = job_type.id
      INNER JOIN job_location ON job_posting.job_location_id = job_location.id
       WHERE company.id = ?`,
      [companyId]
    );
  }

  findAll() {
    return this.database.query(`
    SELECT job_posting.id, job_posting.company_id, job_posting.job_location_id, job_posting.title, job_posting.description, job_posting.requirements, job_posting.remote, job_posting.salary, job_posting.posting_date, job_posting.archived, company.name, company.contact, company.website, user.email, user.phone, user.city, user.picture, job_category.category, job_type.type, job_location.location
      FROM ${this.table}
      INNER JOIN company ON job_posting.company_id = company.id
      INNER JOIN user ON job_posting.user_id = user.id
      INNER JOIN job_category ON job_posting.job_category_id = job_category.id
      INNER JOIN job_type ON job_posting.job_type_id = job_type.id
      INNER JOIN job_location ON job_posting.job_location_id = job_location.id
    `);
  }

  insert(job) {
    return this.database.query(
      `insert into ${this.table} (company_id, user_id, job_category_id, job_type_id, job_location_id, title, description, requirements, remote, salary, posting_date, archived) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        job.company_id,
        job.user_id,
        job.job_category_id,
        job.job_type_id,
        job.job_location_id,
        job.title,
        job.description,
        job.requirements,
        job.remote,
        job.salary,
        job.posting_date,
        job.archived,
      ]
    );
  }

  update(job) {
    return this.database.query(
      `update ${this.table} set company_id = ? , user_id = ? , job_category_id = ? , job_type_id = ? , job_location_id = ? , title = ?, description = ?, requirements = ?, remote = ?, salary = ?, posting_date = ?, archived = ? where id = ?`,
      [
        job.company_id,
        job.user_id,
        job.job_category_id,
        job.job_type_id,
        job.job_location_id,
        job.title,
        job.description,
        job.requirements,
        job.remote,
        job.salary,
        job.posting_date,
        job.archived,
        job.id,
      ]
    );
  }

  delete(jobId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [
      jobId,
    ]);
  }
}
module.exports = JobManager;
