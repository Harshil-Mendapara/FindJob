const Job = (sequelize, DataTypes) => {
    const Job = sequelize.define('jobs', {
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        skills: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qualifications: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

    }, {
        timestamps: true,
    });

    Job.associate = (models) => {
        Job.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
        Job.belongsTo(models.Recruiters, { as: 'recruiter', foreignKey: 'recruiterId' });
    };
    return Job;
}


module.exports = Job;
