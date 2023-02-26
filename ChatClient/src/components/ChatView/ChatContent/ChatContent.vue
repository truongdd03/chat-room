<template>
  <div class="content-wrapper">
    <MyMessage
      v-for="message in messages"
      v-bind:key="message.id"
      :message="message"
    ></MyMessage>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "@/types/Message";

import MyMessage from "./MyMessage.vue";

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
