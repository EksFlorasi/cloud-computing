module.exports = function (sequelize, DataTypes) {
  const collection = sequelize.define(
    'collection',
    {},
    {
      sequelize,
      tableName: 'collection',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true,
    },
  );

  return collection;
};
