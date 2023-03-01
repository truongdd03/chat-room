import type { Message } from "@/types/Message";

export const getLocalTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const today = new Date();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const hours = formatNumber(date.getHours());
  const minutes = formatNumber(date.getMinutes());
  if (compareDate(today, date)) {
    return `Today, ${hours}:${minutes}`;
  } else {
    return `${weekday[date.getDay()]}, ${hours}:${minutes}`;
  }
};

export const shouldDisplayDate = (
  message: Message,
  messages: Array<Message>
): boolean => {
  const previousMessageIndex = messages.findIndex((m: Message) => m.date == message.date) - 1;
  if (previousMessageIndex < 0) {
    return true;
  }
  const previousMessage = messages[previousMessageIndex];
  const date = new Date(message.date);
  const previousDate = new Date(previousMessage.date);
  return !compareDate(date, previousDate);
};

const compareDate = (date1: Date, date2: Date): boolean => {
  return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
}

const formatNumber = (num: number): string => {
  let str = num.toString();
  if (str.length < 2) {
    str = "0" + str;
  }
  return str;
}