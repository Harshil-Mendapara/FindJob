const Candidate = (sequelize, DataTypes) => {
    const Candidate = sequelize.define('candidates', {
        Fullname: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        email: {
            type: DataTypes.STRING,
            trim: true,
            validate: { isEmail: true },
        },
        contactNo: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                isNumeric: { msg: "Contact number must contain only numbers" },
            }
        },
        resume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        current_salary: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expected_salary: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        experience: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        education: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
        }

    }, {
        timestamps: true,
    });
    Candidate.associate = (models) => {
        Candidate.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
        Candidate.hasMany(models.JobProposals, { as: 'jobProposals', foreignKey: 'candidateId' });

    };

    return Candidate;
}

module.exports = Candidate

