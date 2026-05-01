import { create } from "zustand";
import blogService from "../services/blogs";
import { devtools } from "zustand/middleware";

const useBlogStore = create(
  devtools((set) => ({
    blogs: [],
    actions: {
      addBlog: async (content) => {
        const newBlog = await blogService.createBlog(content);
        set((state) => ({ blogs: state.blogs.concat(newBlog) }));
      },
      updateBlog: async (content) => {
        const updatedBlog = await blogService.updateBlog(content);
        set((state) => ({
          blogs: state.blogs.map((b) =>
            b.id === content.id ? updatedBlog : b,
          ),
        }));
      },
      deleteBlog: async (id) => {
        await blogService.deleteBlog(id);
        set((state) => ({
          blogs: state.blogs.filter((b) => b.id !== id),
        }));
      },
      initialize: async () => {
        const blogs = await blogService.getAll();
        set(() => ({ blogs }));
      },
    },
  })),
);

export default useBlogStore;

export const useBlogs = () => {
  const blogs = useBlogStore((state) => state.blogs);
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return sortedBlogs;
};
export const useBlog = (id) => {
  const blogs = useBlogStore((state) => state.blogs);
  return blogs.find((b) => b.id === id);
};
export const useBlogActions = () => useBlogStore((state) => state.actions);
