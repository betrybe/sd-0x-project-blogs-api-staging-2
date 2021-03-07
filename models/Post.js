const Post = (sequelize, DataTypes) => {
  const postsDefine = sequelize.define('Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      createdAt: 'published',
      updatedAt: 'updated',
    });

  postsDefine.associate = (models) => {
    postsDefine.belongsTo(
      models.User,
      { foreignKey: 'id', as: 'user' },
    );
  };

  return postsDefine;
};

module.exports = Post;
