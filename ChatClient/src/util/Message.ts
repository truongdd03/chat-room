import type { Message } from "@/types/Message";
import type { StoreData } from "@/types/StoreData";
import type { Store } from "vuex";
import { getGroupById } from "./Group";
import { Status } from "@/types/Status";
import type { User } from "@/types/User";

export const onMessageReceived = (store: Store<StoreData>, payload: any) => {
  const payloadData: Message = JSON.parse(payload.body);

  console.log("payload", payloadData);

  const { senderName } = payloadData;
  const { receiverId } = payloadData;

  if (!store.state.messages[receiverId]) {
    store.state.messages[receiverId] = [];
  }
  store.state.messages[receiverId].push(payloadData);
  if (!store.state.groupById[receiverId]) {
    getGroupById(store, receiverId);
  }

  if (payloadData.status == Status.JOIN) {
    // Update members
    store.state.groupById[receiverId].members.push({ username: senderName });
  } else if (payloadData.status == Status.LEAVE) {
    // Update members
    store.state.groupById[receiverId].members = store.state.groupById[
      receiverId
    ].members.filter((member: User) => member.username != senderName);
  }
};

export const sendMessage = (store: Store<StoreData>, message: Message) => {
  if (store.state.stompClient) {
    store.state.stompClient.send(
      "/app/private-message",
      {},
      JSON.stringify(message)
    );

    const { receiverId } = message;
    if (!store.state.messages[receiverId]) {
      store.state.messages[receiverId] = [];
    }
    // store.state.messages[receiverId].push(message);
  }
};
