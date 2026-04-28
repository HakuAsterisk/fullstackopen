const collection = require("lodash/collection");
const math = require("lodash/math");

const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const reducer = (favorite, item) => {
    return favorite.likes > item.likes ? favorite : item;
  };
  return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const blogsByAuthor = collection.countBy(blogs, "author");
  const topAuthor = Object.keys(blogsByAuthor).reduce((a, b) =>
    blogsByAuthor[a] > blogsByAuthor[b] ? a : b,
  );
  return { author: topAuthor, blogs: blogsByAuthor[topAuthor] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const blogsByAuthor = collection.groupBy(blogs, "author");
  const topAuthor = Object.keys(blogsByAuthor).reduce((a, b) => {
    const likesA = math.sum(blogsByAuthor[a].map((item) => item.likes));
    const likesB = math.sum(blogsByAuthor[b].map((item) => item.likes));
    return likesA > likesB ? a : b;
  });
  return {
    author: topAuthor,
    likes: blogsByAuthor[topAuthor].reduce((sum, item) => sum + item.likes, 0),
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
