import { Post } from "../types/Post";

const API_URL = "http://localhost:4001";

export async function register(data: {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/account`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Registration failed");
  }
  return res;
}

export async function login(data: {
  username: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res;
}

export async function fetchFeed(): Promise<Post[]> {
    const res = await fetch(`${API_URL}/posts`)
    const result = await res.json()
    return result.posts;
  }
  
  export async function createAPI(content: string) {
    const stored = localStorage.getItem("account");
    if (stored) {
        const account = JSON.parse(stored);
        await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "userId": account?.accountId, "content": content })
        })
    }
  }
  
  export async function updatePost(postId: number) {
    await fetch(`${API_URL}/posts/${postId}`, {
      method: 'PUT'
    })
  }
