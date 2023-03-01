<template>
  <div class="content-wrapper">
    <p class="is-italic has-text-centered">Conversation's beginning</p>
    <div v-for="message in messages" v-bind:key="message.message">
      <p
        v-if="shouldDisplayDate(message, messages!)"
        class="has-text-centered has-text-grey"
      >
        {{ getLocalTime(message.date) }}
      </p>
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
import { getLocalTime, shouldDisplayDate } from "@/util/Date";

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
