const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      id: DataTypes.INTEGER,
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, { as: 'blogPosts', foreignKey: 'user_id' });
  };

  return User;
};

module.exports = User;
