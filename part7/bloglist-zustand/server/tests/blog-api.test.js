const assert = require("node:assert");
const { test, after, beforeEach, before, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const helper = require("./blog-test-helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

describe("Blog tests", () => {
  let token = null;
  before(async () => {
    await User.deleteMany({});
    const password = "asd123";
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
    const response = await api
      .post("/api/login")
      .send({ username: "root", password })
      .expect(200);
    token = response.body.token;

    await Blog.deleteMany({});
    await Blog.insertMany(
      helper.listWithManyBlogs.map((blog) => ({ ...blog, user: user._id })),
    );
  });
  describe("Reading blogs", () => {
    test("Expected amount of blogs returned as JSON", async () => {
      const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
      assert.strictEqual(response.body.length, helper.listWithManyBlogs.length);
    });

    test('Blog identifier is "id", not "_id"', async () => {
      const response = await api.get("/api/blogs");
      response.body.forEach((blog) => {
        assert.ok(blog.id);
      });
    });

    test("Likes always defined and >= 0", async () => {
      const blogWithoutLikes = helper.newBlog;
      const savedBlog = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blogWithoutLikes)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(savedBlog.body.likes, 0);
    });
  });

  describe("Adding blogs", () => {
    test("A valid blog can be added", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const savedBlog = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(helper.validBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
      const titles = blogsAtEnd.map((b) => b.title);
      assert.ok(titles.includes(savedBlog.body.title));
    });

    test("Blog with invalid data fails with 400", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogWithoutTitle = helper.validBlog;
      delete blogWithoutTitle.title;
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blogWithoutTitle)
        .expect(400);

      const blogWithoutUrl = helper.validBlog;
      delete blogWithoutUrl.url;
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blogWithoutUrl)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
    });

    test("Adding a blog without a token fails with 401", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blog = blogsAtStart[1];
      await api.post("/api/blogs").send(blog).expect(401);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
    });
  });
  describe("Deleting blogs", () => {
    test("Specific blog can be deleted with valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
      const titles = blogsAtEnd.map((b) => b.title);
      assert.ok(!titles.includes(blogToDelete.title));
    });
  });
  describe("Updating blogs", () => {
    test("Blog can be updated with valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[1];
      const updatedBlogData = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      };

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlogData)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);
    });
  });
});

describe("User tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("asd123", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });
  describe("Adding users", () => {
    test("A valid user can be added", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "newuser",
        name: "New User",
        password: "password123",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      assert.ok(usernames.includes(newUser.username));
    });

    test("An invalid user cannot be added", async () => {
      const usersAtStart = await helper.usersInDb();
      let newUser = {
        username: "username",
        name: "Invalid User",
        password: "pw",
      };
      await api.post("/api/users").send(newUser).expect(400);

      newUser = {
        username: "un",
        name: "Invalid User",
        password: "password123",
      };
      await api.post("/api/users").send(newUser).expect(400);

      newUser = {
        ...newUser,
        username: "root",
      };
      await api.post("/api/users").send(newUser).expect(400);

      newUser = {
        username: "validusername",
        name: "Invalid User",
      };
      await api.post("/api/users").send(newUser).expect(400);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
