module.exports = function (sequelize, DataTypes) {
  const tip = sequelize.define(
    'tip',
    {
      tip_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tip_desc: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'tip',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true,
    },
  );

  return tip;
};
