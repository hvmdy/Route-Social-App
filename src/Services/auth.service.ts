import axios from "axios";
import {
  type LoginSchemaType,
  type RegisterSchemaType,
} from "./../lib/Schemas/Auth.schema";
const baseUrl = import.meta.env.VITE_BASE_URL;
export async function userRegister(formData: RegisterSchemaType) {
  const data = await axios.post(`${baseUrl}/users/signup`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}

export async function userLogin(formData: LoginSchemaType) {
  const data = await axios.post(`${baseUrl}/users/signin`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}
