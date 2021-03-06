const BlogPost = (sequelize, dataType) => {
  const blogPost = sequelize.define('BlogPost', {
  id: { type: dataType.INTEGER, primaryKey: true, autoIncrement: true },
  title: dataType.STRING,
  content: dataType.STRING,
  userId: { type: dataType.INTEGER, foreignKey: true },
  published: dataType.DATE,
  updated: dataType.DATE,
  },
  { timestamps: false });
  blogPost.associate = (model) => {
    blogPost.belongsTo(model.User, {
      foreignKey: 'userId', as: 'user',
    });
  };
  return blogPost;
};

module.exports = BlogPost;