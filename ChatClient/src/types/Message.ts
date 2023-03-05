import type { Status } from "./Status";

export interface Message {
  senderName: string;
  receiverId: string;
  message: string;
  date: string;
  status: Status;
}
