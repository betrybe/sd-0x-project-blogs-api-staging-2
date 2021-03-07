const User = (sequelize, DataTypes) => {
  const userDefine = sequelize.define('User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    { timestamps: false });

  userDefine.associate = (models) => {
    userDefine.hasMany(models.Post, { foreignKey: 'userId', as: 'post' });
  };

  return userDefine;
};

module.exports = User;
