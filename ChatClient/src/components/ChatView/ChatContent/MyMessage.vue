<template>
  <div class="message-wrapper">
    <div class="message has-text-primary">
      <p>{{ message?.message }}</p>
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
  justify-content: right;
}
.message {
  max-width: 60%;
  background-color: rgba(92, 198, 173, 0.589);
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 5px 15px 5px 15px;
}
</style>
