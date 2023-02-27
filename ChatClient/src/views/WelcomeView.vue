<template>
  <div class="wrapper">
    <input
      v-model="username"
      v-on:keydown="handleKeyDown"
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
import { Store, useStore } from "vuex";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import type { StoreData } from "@/types/StoreData";

const username = ref("");

const store: Store<StoreData> = useStore();

const registerUser = (username: string) => {
  store.state.username = username;

  const sock = new SockJS("http://localhost:8080/ws");
  store.state.stompClient = over(sock);
  store.state.stompClient.connect({}, onConnected, onError);
};

const onConnected = () => {
  store.state.isConnected = true;
  store.state.stompClient?.subscribe(
    "/chatroom/public",
    onPublicMessageReceived
  );
  // stompClient.subscribe(
  //   `/user/${username.value}/private`,
  //   onPrivateMessageReceived
  // );
};

const onPublicMessageReceived = (payload: any) => {
  const payloadData = JSON.parse(payload.body);
  switch (payloadData.status) {
    case "JOIN":
      break;

    case "MESSAGE":
      store.state.messages["Public"].push(payloadData);
      break;
  }
};

// const onPrivateMessageReceived = () => {};

const onError = (err: any) => {
  console.log(err);
};

const onJoinClicked = () => {
  if (username.value.replace(" ", "").length == 0) {
    notify({
      title: "Please enter your username",
      type: "error",
    });
  } else {
    registerUser(username.value);
    router.push("/home");
  }
};

const handleKeyDown = ($event: any) => {
  if ($event.key == "Enter") {
    onJoinClicked();
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
