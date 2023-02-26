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
import { useStore } from "vuex";
import { notify } from "@kyvg/vue3-notification";
import router from "@/router";

const username = ref("");

const store = useStore();

const onJoinClicked = () => {
  if (username.value.replace(" ", "").length == 0) {
    notify({
      title: "Please enter your username",
      type: "error",
    });
  } else {
    store.state.username = username.value;
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
