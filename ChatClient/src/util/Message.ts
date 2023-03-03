import type { Message } from "@/types/Message";
import type { StoreData } from "@/types/StoreData";
import type { Store } from "vuex";

export const onMessageReceived = (store: Store<StoreData>, payload: any) => {
  const payloadData = JSON.parse(payload.body);

  if (payloadData.status == "MESSAGE") {
    const { receiverId } = payloadData;
    const { senderName } = payloadData;

    if (!store.state.messages[receiverId]) {
      store.state.messages[receiverId] = [];
    }
    if (senderName != store.state.user?.username) {
      store.state.messages[receiverId].push(payloadData);
    }
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
    store.state.messages[receiverId].push(message);
  }
};
