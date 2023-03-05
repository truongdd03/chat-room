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
        v-if="message.status == Status.MESSAGE && message.senderName == store.state.user!.username"
        :message="message"
      ></MyMessage>
      <OtherMessage
        v-else-if="message.status == Status.MESSAGE"
        :message="message"
      ></OtherMessage>
      <p
        v-else-if="message.status == Status.JOIN"
        class="has-text-centered has-text-grey"
      >
        {{ message.senderName }} joined the chat!
      </p>
      <p
        v-else-if="message.status == Status.LEAVE"
        class="has-text-centered has-text-grey"
      >
        {{ message.senderName }} left the chat :(
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Store, useStore } from "vuex";
import type { Message } from "@/types/Message";
import MyMessage from "./MyMessage.vue";
import OtherMessage from "./OtherMessage.vue";
import { getLocalTime, shouldDisplayDate } from "@/util/Date";
import type { StoreData } from "@/types/StoreData";
import { Status } from "@/types/Status";

const store: Store<StoreData> = useStore();

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
