import type { Client } from "stompjs";
import type { Message } from "./Message";
import type { User } from "./User";
import type { Group } from "./Group";

export interface StoreData {
  isConnected: boolean;
  messages: Record<string, Array<Message>>;
  stompClient?: Client;
  user?: User;
  groupById: Record<string, Group>;
}
