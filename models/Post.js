const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post",
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    }, { timestamps: false });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user', foreignKey: 'UserId' });
  };

  return Post;
};

module.exports = Post;
