<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <a href="/" class="is-size-4 has-text-primary brand">Chat Room</a>
      </div>

      <div
        class="navbar-burger"
        @click="showNav = !showNav"
        :class="{ 'is-active': showNav }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-end">
        <div class="navbar-item">
          <p class="is-size-6">
            Hi
            <span class="has-text-primary">{{
              store.state.user?.username
            }}</span
            >!
          </p>
        </div>
        <div class="navbar-item">
          <a href="/" class="button is-dark">Log out</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { StoreData } from "@/types/StoreData";
import { ref } from "vue";
import { Store, useStore } from "vuex";

const store: Store<StoreData> = useStore();

const showNav = ref(false);
</script>

<style scoped>
.navbar {
  padding: 0 10px 0 10px;
  height: 100%;
  background-color: var(--vt-c-black);
  border-bottom: solid 2px grey;
}

.brand:hover {
  background-color: var(--vt-c-black);
}

.navbar-menu {
  background-color: var(--vt-c-black);
}

.navbar-item {
  height: 100%;
}
</style>
