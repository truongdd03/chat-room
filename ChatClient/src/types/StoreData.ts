import type { Client } from "stompjs";
import type { Message } from "./Message";

export interface StoreData {
  username: string;
  isConnected: boolean;
  messages: Record<string, Array<Message>>;
  stompClient?: Client;
}
