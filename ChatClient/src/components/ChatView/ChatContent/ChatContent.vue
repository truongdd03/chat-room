<template>
  <div class="content-wrapper">
    <div v-for="message in messages" v-bind:key="message.message">
      <MyMessage
        v-if="message.senderName == store.state.username"
        :message="message"
      ></MyMessage>
      <OtherMessage v-else :message="message"></OtherMessage>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import type { Message } from "@/types/Message";
import MyMessage from "./MyMessage.vue";
import OtherMessage from "./OtherMessage.vue";

const store = useStore();

defineProps({
  messages: Array<Message>,
});
</script>

<style scoped>
.content-wrapper {
  height: 100%;
  width: 100px;
  padding: 10px;
}
</style>
