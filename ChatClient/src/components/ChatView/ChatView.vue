<template>
  <div class="wrapper">
    <ChatHeader
      style="height: 50px"
      :chat-name="selectedChat?.name"
      :members="selectedChat?.members.length || 0"
    ></ChatHeader>
    <ChatContent
      class="chat-content"
      :messages="store.state.messages[props.selectedChat!.id]"
    ></ChatContent>
    <ChatFooter style="height: 70px" @new-message="onSendMessage"></ChatFooter>
  </div>
</template>

<script lang="ts" setup>
import ChatHeader from "./ChatHeader.vue";
import ChatFooter from "./ChatFooter.vue";
import ChatContent from "./ChatContent/ChatContent.vue";
import type { Message } from "@/types/Message";
import { Store, useStore } from "vuex";
import type { StoreData } from "@/types/StoreData";
import { sendMessage } from "@/util/Message";
import type { Group } from "@/types/Group";
import { Status } from "@/types/Status";

const store: Store<StoreData> = useStore();

const props = defineProps({
  selectedChat: Object as () => Group,
});

console.log("Size", props.selectedChat?.members.length);

const onSendMessage = ($event: any) => {
  const senderName = store.state.user!.username;
  const receiverId = props.selectedChat!.id;
  const status = Status.MESSAGE;
  const date = new Date().toString();
  const message: Message = {
    senderName,
    message: $event,
    receiverId,
    status,
    date,
  };

  sendMessage(store, message);
};
</script>

<style scoped>
.wrapper {
  background-color: var(--vt-c-black-mute);
  width: 100%;
}

.chat-content {
  height: calc(100% - 120px);
  overflow-y: scroll;
  width: 100%;
}
</style>
