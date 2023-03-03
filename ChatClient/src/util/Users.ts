import axios from "axios";
import type { User } from "@/types/User";

export const getUsernames = async () => {
  try {
    const rawResult = await axios.get("http://localhost:8080/users");
    const users: Array<User> = rawResult.data;
    return users.map((user: User) => user.username);
  } catch {
    return [];
  }
};
