<template>
  <div class="wrapper">
    <div class="chat-header">
      <ChatHeader></ChatHeader>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatHeader from "./ChatHeader.vue";
</script>

<style scoped>
.wrapper {
  background-color: var(--vt-c-black-mute);
  width: 100%;
}

.chat-header {
  height: 10px;
}
</style>
