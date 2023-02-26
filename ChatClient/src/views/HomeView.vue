<template>
  <div class="wrapper">
    <div class="navbar-wrapper">
      <NavBar></NavBar>
    </div>
    <Splitpanes class="content-wrapper">
      <Pane min-size="20" size="20">
        <ListingView></ListingView>
      </Pane>
      <Pane min-size="40">
        <ChatView></ChatView>
      </Pane>
    </Splitpanes>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { notify } from "@kyvg/vue3-notification";
import { onMounted } from "vue";
import { useStore } from "vuex";

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import NavBar from "@/components/NavBar.vue";
import ListingView from "@/components/ListingView.vue";
import ChatView from "@/components/ChatView.vue";

const store = useStore();

onMounted(() => {
  if (!store || store.state.username == "") {
    // router.push("/");
  } else {
    notify({
      title: `Welcome ${store.state.username}`,
      type: "success",
    });
  }
});
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
}

.navbar-wrapper {
  height: 60px;
}

.content-wrapper {
  height: calc(100% - 60px);
}
</style>

<style>
.splitpanes__splitter {
  background-color: var(--vt-c-black);
  width: 5px;
}
</style>
