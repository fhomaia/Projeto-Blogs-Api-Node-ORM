const { BlogPost, PostsCategory, User, Category } = require('../models');

const createPost = async (newPost) => {
  const { userId, title, categoryIds, content } = newPost;
  const published = new Date();
  const updated = published;
  const { id } = await BlogPost.create({ title, content, userId, published, updated });
  await Promise.all(categoryIds
  .map((categoryId) => PostsCategory
    .create({ postId: id, categoryId })));
  return { id, userId, title, content };
};

const getPostById = async (id) => {
  const post = await BlogPost
  .findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['number'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
  if (!post) return { message: 'Post does not exist' };
  return post;
};

module.exports = {
  createPost,
  getPostById,
};