const bcrypt = require('bcrypt');

const User = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            unique: { msg: "Username already exists" },
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            trim: true,
            validate: { isEmail: true },
        },
        password: {
            type: DataTypes.STRING,
            trim: true,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: {
                    args: [['male', 'female', 'other']],
                    msg: "Gender must be either 'Male', 'Female', or 'Other'"
                }
            }
        },
        contactNo: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                isNumeric: { msg: "Contact number must contain only numbers" },
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    }, {
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const hashedPassword = await bcrypt.hash(user.password, 12);
                    user.password = hashedPassword;
                }
            },
            afterCreate(row) {
                delete row.dataValues.password;
            }
        },
    });

    User.associate = (models) => {
        User.belongsTo(models.Roles, { foreignKey: 'roleId' });
        User.hasOne(models.Candidates, { as: 'candidate', foreignKey: 'userId' });
        User.hasMany(models.Jobs, { as: 'jobs', foreignKey: 'userId' });
        User.hasOne(models.Recruiters, { as: 'recruiter', foreignKey: 'userId' });
    };
    return User;
}
module.exports = User 
