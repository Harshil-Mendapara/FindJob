const Role = (sequelize, DataTypes) => {
    const Role = sequelize.define('roles', {
        name: {
            type: DataTypes.ENUM('candidate', 'admin', 'recruiter'),
            allowNull: true,
        },

    }, {
        timestamps: true,
        hooks: {
            afterCreate(row) {
                delete row.dataValues.createdAt
                delete row.dataValues.updatedAt
            }
        },

    });

    Role.associate = (models) => {
        Role.hasMany(models.Users, { foreignKey: 'roleId' });
    };

    return Role;
}

module.exports = Role
