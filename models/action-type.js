module.exports = function (sequelize, DataTypes) {
  const action_type = sequelize.define(
    'action_type',
    {
      action_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      action_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      point_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'action_type',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true,
    },
  );

  return action_type;
};
