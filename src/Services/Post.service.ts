import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
export async function getSinglePost(postId: string) {
  const data = await axios.get(`${baseUrl}/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data;
}

export async function createPost(formdata: FormData) {
  const data = await axios.post(`${baseUrl}/posts`, formdata, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data;
}

export async function editPost(postId: string, formdata: FormData) {
  const data = await axios.put(`${baseUrl}/posts/${postId}`, formdata, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data;
}

export async function deletePost(postId: string) {
  const data = await axios.delete(`${baseUrl}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data;
}
