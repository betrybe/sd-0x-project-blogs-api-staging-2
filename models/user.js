const { Model } = require('sequelize');

const userConfig = (DataTypes) => ({
  displayName: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: { type: DataTypes.STRING, allowNull: false },
  image: DataTypes.STRING,
});

function user(sequelize, DataTypes) {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init(userConfig(DataTypes), {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
  });
  return User;
}

module.exports = user;
