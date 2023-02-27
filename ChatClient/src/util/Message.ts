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

export const sendPublicMessage = (
  store: Store<StoreData>,
  message: Message
) => {
  if (store.state.stompClient) {
    store.state.stompClient.send("/app/message", {}, JSON.stringify(message));
  }
};
