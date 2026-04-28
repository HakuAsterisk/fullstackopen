import { useState, useEffect } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { useNotificationActions } from "./stores/notification-store";

import blogService from "./services/blogs";
import loginService from "./services/login";

import LoginForm from "./components/login-form";
import Notification from "./components/notification";
import NewBlog from "./components/new-blog";
import BlogList from "./components/blog-list";
import Blog from "./components/blog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const { setNotification } = useNotificationActions();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("appUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const handleLogin = async (loginData) => {
    try {
      const user = await loginService.login({ ...loginData });
      window.localStorage.setItem("appUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNotification("Login successful!");
    } catch {
      setNotification("Wrong username or password");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("appUser");
    setUser(null);
    setNotification("Logout succesful!");
  };

  const handleNewBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.createBlog(newBlog);
      setNotification(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`,
      );
      setBlogs(blogs.concat(returnedBlog));
    } catch (error) {
      setNotification(`Creating a new blog failed! (${error.status})`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id);
      setNotification("Blog deleted!");
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      setNotification(`Deleting the blog failed! (${error.status})`);
    }
  };

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog);
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)));
      setNotification(`${blog.title} liked!`);
    } catch (error) {
      setNotification(`Liking the blog failed! (${error.status})`);
    }
  };

  const padding = {
    padding: 5,
  };
  const match = useMatch("/blogs/:id");
  const blog = match
    ? sortedBlogs.find((blog) => blog.id === match.params.id)
    : null;
  const navButtonSx = {
    bgcolor: "primary.dark",
    "&:hover": { bgcolor: "primary.800" },
  };

  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
            <Button color="inherit" component={Link} to="/" sx={navButtonSx}>
              Blogs
            </Button>
            {user && (
              <Button
                color="inherit"
                component={Link}
                to="/create"
                sx={navButtonSx}
              >
                New Blog
              </Button>
            )}
          </Box>
          {!user ? (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={navButtonSx}
            >
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout} sx={navButtonSx}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        <Notification />
        <ErrorBoundary
          fallback={
            <>
              <h2>Something went wrong! :(</h2>
              <h4>Try again sometime later or ping me @somerandomhandle</h4>
            </>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <BlogList blogs={sortedBlogs} />
                </div>
              }
            />
            <Route
              path="/login"
              element={<LoginForm handleLogin={handleLogin} />}
            />
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blog={blog}
                  user={user}
                  handleDelete={handleDelete}
                  handleLike={handleLike}
                />
              }
            />
            <Route
              path="/create"
              element={<NewBlog handleNewBlog={handleNewBlog} />}
            />
            <Route
              path="*"
              element={
                <Box sx={{ mt: 5, textAlign: "center" }}>
                  <h2>404 - Not Found</h2>
                  <p>The page you are looking for does not exist.</p>
                  <Button variant="contained" component={Link} to="/">
                    Go to Home
                  </Button>
                </Box>
              }
            />
          </Routes>
        </ErrorBoundary>
      </Container>
    </>
  );
};

export default App;
