module.exports = function (sequelize, DataTypes) {
  const action_completed = sequelize.define(
    'action_completed',
    {
      completed_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      tableName: 'action_completed',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true,
    },
  );

  return action_completed;
};
