import type { Client } from "stompjs";
import type { Message } from "./Message";
import type { User } from "./User";

export interface StoreData {
  isConnected: boolean;
  messages: Record<string, Array<Message>>;
  stompClient?: Client;
  user?: User;
}
