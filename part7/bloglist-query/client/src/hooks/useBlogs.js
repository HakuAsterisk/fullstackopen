import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, createBlog, updateBlog, deleteBlog } from '../services/blogs'

const selectSortedBlogs = (data) => [...data].sort((a, b) => b.likes - a.likes)

export const useBlogs = () => {
  const queryClient = useQueryClient()

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: false,
    select: selectSortedBlogs,
  })

  const blogById = (id) => {
    const blogsData = queryClient.getQueryData(['blogs'])
    return blogsData ? blogsData.find((blog) => blog.id === id) : null
  }

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  return {
    blogs: blogs.data ?? [],
    isPending: blogs.isPending,
    isError: blogs.isError,
    getBlog: (id) => blogById(id),
    addBlog: (newBlog) => newBlogMutation.mutateAsync(newBlog),
    updateBlog: (blog) => updateBlogMutation.mutateAsync(blog),
    deleteBlog: (id) => deleteBlogMutation.mutateAsync(id),
  }
}
