const { DataTypes } = require('sequelize');
const actionCompletedTemp = require('./action-completed');
const actionTemp = require('./action-type');
const avatarTemp = require('./avatar');
const locationTemp = require('./location');
const objectTemp = require('./object');
const collectionTemp = require('./collection');
const userTemp = require('./user');
const tipTemp = require('./tip');

function initModels(sequelize) {
  const action_completed = actionCompletedTemp(sequelize, DataTypes);
  const action_type = actionTemp(sequelize, DataTypes);
  const avatar = avatarTemp(sequelize, DataTypes);
  const location = locationTemp(sequelize, DataTypes);
  const object = objectTemp(sequelize, DataTypes);
  const collection = collectionTemp(sequelize, DataTypes);
  const user = userTemp(sequelize, DataTypes);
  const tip = tipTemp(sequelize, DataTypes);

  // action_type table associations
  action_type.belongsToMany(user, {
    through: {
      model: 'action_completed',
      unique: false,
    },
    foreignKey: 'action_id',
    otherKey: 'user_id',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  });

  // avatar table associations
  avatar.hasMany(user, {
    foreignKey: {
      name: 'avatar_id',
      allowNull: false,
      defaultValue: 1,
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  });

  // location table associations
  location.hasMany(user, {
    foreignKey: {
      name: 'location_id',
      allowNull: false,
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  });

  // object table associations
  object.belongsToMany(user, {
    through: 'collection',
    foreignKey: 'object_id',
    otherKey: 'user_id',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  });

  // user table associations
  user.belongsToMany(action_type, {
    through: {
      model: 'action_completed',
      unique: false,
    },
    foreignKey: 'user_id',
    otherKey: 'action_id',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  });

  user.belongsTo(avatar, {
    foreignKey: {
      name: 'avatar_id',
      allowNull: false,
      defaultValue: 1,
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  });

  user.belongsTo(location, {
    foreignKey: {
      name: 'location_id',
      allowNull: false,
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  });

  user.belongsToMany(object, {
    through: 'collection',
    foreignKey: 'user_id',
    otherKey: 'object_id',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  });

  return {
    action_completed,
    action_type,
    avatar,
    location,
    object,
    user,
    collection,
    tip,
  };
}

module.exports.initModels = initModels;
