const JobProposal = (sequelize, DataTypes) => {
  const JobProposal = sequelize.define('jobProposals', {
    status: {
      type: DataTypes.ENUM('Pending', 'Reviewed', 'Intreview', 'Selected', 'Rejected'),
      allowNull: false,
      defaultValue: 'Pending',
      validate: {
        isIn: {
          args: [['Pending', 'Reviewed', 'Intreview', 'Selected', 'Rejected']],
          msg: "Status must be one of 'Pending', 'Reviewed', 'Intreview', 'Selected', 'Rejected'"
        }
      }
    },
  }, {
    timestamps: true,
  });

  JobProposal.associate = (models) => {
    JobProposal.belongsTo(models.Users, { foreignKey: 'userId' });
    JobProposal.belongsTo(models.Candidates, { foreignKey: 'candidateId' });
    JobProposal.belongsTo(models.Jobs, { foreignKey: 'jobId' });
  };

  return JobProposal;
}

module.exports = JobProposal;