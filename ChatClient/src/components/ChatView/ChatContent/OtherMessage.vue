<template>
  <div class="message-wrapper">
    <div class="message has-text-primary">
      <p>{{ message?.message }}</p>
      <p class="is-size-7 author">
        sent by <span class="has-text-info">{{ message?.senderName }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "@/types/Message";

defineProps({
  message: Object as () => Message,
});
</script>

<style scoped>
.message-wrapper {
  display: flex;
  justify-content: left;
}
.message {
  max-width: 60%;
  background-color: var(--vt-c-black-soft);
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 5px 15px 5px 15px;
}

.author {
  text-align: right;
}
</style>
