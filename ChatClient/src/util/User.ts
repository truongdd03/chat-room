import type { StoreData } from "@/types/StoreData";
import type { Store } from "vuex";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { onMessageReceived } from "./Message";
import axios from "axios";
import type { User } from "@/types/User";
import type { Group } from "@/types/Group";
import { getGroupsOfUser } from "./Group";

export const registerUser = async (
  store: Store<StoreData>,
  username: string
) => {
  const user: User = { username };
  await validateUsername(user);

  store.state.user = user;

  const userGroups = await getGroupsOfUser(store);
  userGroups.forEach((group: Group) => {
    store.state.messages[group.id] = [];
    store.state.groupById[group.id] = group;
  });

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
  await axios.post("http://localhost:8080/register", user);
};

const onConnected = (store: Store<StoreData>) => {
  store.state.isConnected = true;
  store.state.stompClient?.subscribe(
    `/user/${store.state.user?.username}/private`,
    (payload) => onMessageReceived(store, payload)
  );
};

const onError = (err: any) => {
  console.log(err);
};
