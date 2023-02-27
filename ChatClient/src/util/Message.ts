import type { Message } from "@/types/Message";
import type { StoreData } from "@/types/StoreData";
import type { Store } from "vuex";

export const onPublicMessageReceived = (
  store: Store<StoreData>,
  payload: any
) => {
  const payloadData = JSON.parse(payload.body);
  switch (payloadData.status) {
    case "JOIN":
      break;

    case "MESSAGE":
      store.state.messages["Public"].push(payloadData);
      break;
  }
};

export const onPrivateMessageReceived = (
  store: Store<StoreData>,
  payload: any
) => {
  const payloadData = JSON.parse(payload.body);

  if (payloadData.status == "MESSAGE") {
    const { senderName } = payloadData;

    if (!store.state.messages[senderName]) {
      store.state.messages[senderName] = [];
    }
    if (senderName != store.state.username) {
      store.state.messages[senderName].push(payloadData);
    }
  }
};

export const sendMessage = (store: Store<StoreData>, message: Message) => {
  if (message.receiverName == "Public") {
    sendPublicMessage(store, message);
  } else {
    sendPrivateMessage(store, message);
  }
};

const sendPublicMessage = (store: Store<StoreData>, message: Message) => {
  if (store.state.stompClient) {
    store.state.stompClient.send("/app/message", {}, JSON.stringify(message));
  }
};

const sendPrivateMessage = (store: Store<StoreData>, message: Message) => {
  if (store.state.stompClient) {
    store.state.stompClient.send(
      "/app/private-message",
      {},
      JSON.stringify(message)
    );

    const { receiverName } = message;
    if (!store.state.messages[receiverName]) {
      store.state.messages[receiverName] = [];
    }
    store.state.messages[receiverName].push(message);
  }
};
