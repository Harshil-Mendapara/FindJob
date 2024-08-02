const Sequelize = require('sequelize');
const config = require('../config/config.js');

const sequelize = new Sequelize(
    config.databaseName,
    config.username,
    config.password, {
    dialect: config.dialect
});

const db = {};

const UserModel = require('./User.model.js')(sequelize, Sequelize);
const RoleModel = require('./Role.model.js')(sequelize, Sequelize);
const CandidateModel = require('./Candidate.model.js')(sequelize, Sequelize);
const RecruiterModel = require('./Recruiter.model.js')(sequelize, Sequelize);
const JobModel = require('./Job.model.js')(sequelize, Sequelize);
const JobProposalsModel = require('./job_proposals.model.js')(sequelize, Sequelize);

db.Users = UserModel;
db.Roles = RoleModel;
db.Candidates = CandidateModel;
db.Recruiters = RecruiterModel;
db.Jobs = JobModel;
db.JobProposals = JobProposalsModel;


Object.values(db).forEach(model => {
    if (model.associate) {
        model.associate(db);
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
