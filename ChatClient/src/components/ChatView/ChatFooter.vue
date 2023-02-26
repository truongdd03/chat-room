<template>
  <div class="footer-wrapper">
    <div class="icon-text">
      <span class="input-wrapper">
        <input
          v-model="message"
          v-on:keydown="handleKeyDown"
          class="input has-background-dark is-primary"
          placeholder="Enter your chat..."
        />
      </span>
      <span class="icon-wrapper">
        <font-awesome-icon
          @click="sendMessage"
          class="icon has-text-primary"
          icon="fa-solid fa-paper-plane"
          inverse
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Ref, ref } from "vue";

const emit = defineEmits(["new-message"]);

const message: Ref<String> = ref("");

const sendMessage = () => {
  if (message.value != "") {
    emit("new-message", message.value);
    message.value = "";
  }
};

const handleKeyDown = ($event: any) => {
  if ($event.key == "Enter") {
    sendMessage();
  }
};
</script>

<style scoped>
.footer-wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--vt-c-black-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-top: solid 2px var(--vt-c-black);
}

.icon-text {
  height: 100%;
  width: 100%;
  padding: 0 10px 0 10px;
}
.input-wrapper {
  width: calc(100% - 35px);
  height: 100%;
  display: flex;
  align-items: center;
}
.icon-wrapper {
  height: 100%;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
}
</style>
