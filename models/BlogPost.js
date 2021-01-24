const BlogPost = (sequelize, DataTypes) => {
  const User = sequelize.define('BlogPost',
    {
      id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    });

  User.associate = (models) => {
    Product.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
  };

  return User;
};

module.exports = BlogPost;
