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
import { ref, type Ref } from "vue";
import type { Message } from "@/types/Message";

const messages: Ref<Array<Message>> = ref([]);

const onSendMessage = ($event: any) => {
  const id = messages.value.length.toString();
  messages.value.push({ id, message: $event });
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
