const Recruiter = (sequelize, DataTypes) => {
  const Recruiter = sequelize.define('recruiters', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Email already exists" },
      validate: {
        isEmail: { msg: "Must be a valid email address" }
      },
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: { msg: "Contact number must contain only numbers" },
      }
    },
  }, {
    timestamps: true,
  });

  Recruiter.associate = (models) => {
    Recruiter.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
  };

  return Recruiter;
}

module.exports = Recruiter;