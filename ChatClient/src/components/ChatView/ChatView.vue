<template>
  <div class="wrapper">
    <ChatHeader style="height: 50px"></ChatHeader>
    <div class="chat-content"></div>
    <ChatFooter style="height: 70px"></ChatFooter>
  </div>
</template>

<script lang="ts" setup>
import ChatHeader from "./ChatHeader.vue";
import ChatFooter from "./ChatFooter.vue";
</script>

<style scoped>
.wrapper {
  background-color: var(--vt-c-black-mute);
  width: 100%;
}

.chat-content {
  height: calc(100% - 120px);
}
</style>
