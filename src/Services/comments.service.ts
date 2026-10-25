import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
export async function getPostComments(postid: string) {
  const data = await axios.get(`${baseUrl}/posts/${postid}/comments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data;
}
export async function createPostComments(postid: string, formdata: FormData) {
  const data = await axios.post(
    `${baseUrl}/posts/${postid}/comments`,
    formdata,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    },
  );
  return data;
}
