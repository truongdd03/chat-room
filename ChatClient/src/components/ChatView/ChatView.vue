<template>
  <div class="wrapper">
    <ChatHeader style="height: 50px"></ChatHeader>
    <ChatContent class="chat-content" :messages="messages"></ChatContent>
    <ChatFooter style="height: 70px" @new-message="onSendMessage"></ChatFooter>
  </div>
</template>

<script lang="ts" setup>
import ChatHeader from "./ChatHeader.vue";
import ChatFooter from "./ChatFooter.vue";
import ChatContent from "./ChatContent/ChatContent.vue";
import { onMounted, ref, type Ref } from "vue";
import type { Message } from "@/types/Message";
import { Store, useStore } from "vuex";
import type { Client } from "stompjs";
import type { StoreData } from "@/types/StoreData";

const store: Store<StoreData> = useStore();

const messages: Ref<Array<Message>> = ref([]);

onMounted(() => {
  messages.value = store.state.messages["public"];
});

const sendPublicMessage = (message: Message) => {
  if (store.state.stompClient) {
    (store.state.stompClient as Client).send(
      "/app/message",
      {},
      JSON.stringify(message)
    );
  }
};

const onSendMessage = ($event: any) => {
  const senderName = store.state.username;
  const receiverName = "Pickachu";
  const status = "MESSAGE";
  const date = "today";
  const message: Message = {
    senderName,
    message: $event,
    receiverName,
    status,
    date,
  };
  sendPublicMessage(message);
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
