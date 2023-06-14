module.exports = function (sequelize, DataTypes) {
  const object = sequelize.define(
    'object',
    {
      object_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      label: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      full_picture_url: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      mini_picture_url: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      latin: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      short_desc: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      fun_fact: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'object',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true,
    },
  );

  return object;
};
