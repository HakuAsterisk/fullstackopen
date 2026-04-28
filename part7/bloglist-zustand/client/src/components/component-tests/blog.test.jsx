import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../blog";
import { test } from "vitest";

const mockUsedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockUsedNavigate,
  };
});

const blog = {
  user: [{ id: "123" }],
  title: "Test title",
  author: "Test author",
  url: "testurl",
  likes: 7,
};
const userOne = {
  id: "123",
  username: "testuser",
  name: "Test",
};
const userTwo = {
  id: "456",
  username: "otheruser",
  name: "Other",
};

describe("<Blog />", () => {
  test("Blog information displayed on render", () => {
    render(<Blog blog={blog} user={null} />);
    const header = screen.getByText("Test title");
    expect(header).toBeDefined().toBeVisible();
    const author = screen.getByText("by Test author");
    expect(author).toBeVisible();
    const url = screen.getByText("testurl");
    expect(url).toBeVisible();
    const likes = screen.getByText("7");
    expect(likes).toBeVisible();
  });
  test("Like and delete buttons hidden by default", () => {
    const likeButton = screen.queryByText("Like");
    expect(likeButton).toBeNull();
    const deleteButton = screen.queryByText("Delete");
    expect(deleteButton).toBeNull();
  });
});

describe("When logged in but not blogs creator", () => {
  test("Like button visible and handles calls properly", async () => {
    const handler = vi.fn();
    render(<Blog blog={blog} user={userTwo} handleLike={handler} />);
    const event = userEvent.setup();
    const likeButton = screen.getByText("Like");
    await event.click(likeButton);
    await event.click(likeButton);
    expect(handler.mock.calls).toHaveLength(2);
  });
  test("Delete button hidden", () => {
    render(<Blog blog={blog} user={userTwo} />);
    const deleteButton = screen.queryByText("Delete");
    expect(deleteButton).toBeNull();
  });
});

describe("When logged in as blogs creator", () => {
  test("Delete button visible", () => {
    render(<Blog blog={blog} user={userOne} />);
    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeVisible();
  });
});
