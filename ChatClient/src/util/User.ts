import type { StoreData } from "@/types/StoreData";
import type { Store } from "vuex";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { onPrivateMessageReceived, onPublicMessageReceived } from "./Message";
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

export const registerUser = async (
  store: Store<StoreData>,
  username: string
) => {
  const user: User = { username };
  await validateUsername(user);

  store.state.user = user;

  const sock = new SockJS("http://localhost:8080/ws");
  store.state.stompClient = over(sock);
  store.state.stompClient.connect({}, () => onConnected(store), onError);

  listenUserOnExit(store);
};

const listenUserOnExit = async (store: Store<StoreData>) => {
  window.addEventListener("beforeunload", async () => {
    await axios.post("http://localhost:8080/unregister", store.state.user);
  });
};

const validateUsername = async (user: User) => {
  console.log(user);
  await axios.post("http://localhost:8080/register", user);
};

const onConnected = (store: Store<StoreData>) => {
  store.state.isConnected = true;
  store.state.stompClient?.subscribe("/chatroom/public", (payload) =>
    onPublicMessageReceived(store, payload)
  );
  store.state.stompClient?.subscribe(
    `/user/${store.state.user?.username}/private`,
    (payload) => onPrivateMessageReceived(store, payload)
  );
};

const onError = (err: any) => {
  console.log(err);
};
