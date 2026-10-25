import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
export async function getUsersFeed() {
  const data = await axios.get(`${baseUrl}/posts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data;
}
