<template>
  <div class="wrapper">
    <input
      v-model="username"
      class="input has-background-dark is-primary has-text-white is-large"
      placeholder="Enter your name..."
    />
    <p class="button is-primary is-large ml-2" @click="onJoinClicked">Join!</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { notify } from "@kyvg/vue3-notification";
import { useStore } from "vuex";
import { over } from "stompjs";
import SockJS from "sockjs-client";

const username = ref("");

const store = useStore();

const registerUser = (username: string) => {
  store.state.username = username;

  const sock = new SockJS("http://localhost:8080/ws");
  const stompClient = over(sock);
  stompClient.connect({}, onConnected, onError);
};

const onConnected = () => {
  store.state.isConnected = true;
};

const onError = () => {};

const onJoinClicked = () => {
  if (username.value.replace(" ", "").length == 0) {
    notify({
      title: "Please enter your username",
      type: "error",
    });
  } else {
    console.log(store);
    registerUser(username.value);
    router.push("/home");
  }
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input {
  width: 50vw;
}

.button {
  width: 200px;
}
</style>
