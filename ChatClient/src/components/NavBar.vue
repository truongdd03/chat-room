<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink to="/" class="navbar-item">
        <p class="is-size-4 has-text-primary">Chat Room</p>
      </RouterLink>

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
        <div class="navbar-item field">
          <p class="control has-icons-right">
            <input
              class="input has-background-dark is-primary"
              type="search"
              placeholder="Search..."
            />
            <span class="icon is-small is-right">
              <font-awesome-icon icon="fa-solid fa-search" inverse />
            </span>
          </p>
        </div>
        <div class="navbar-item">
          <a class="button is-dark"> Log out </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const showNav = ref(false);
</script>

<style scoped>
.navbar {
  padding: 0 10px 0 10px;
  height: 100%;
  background-color: var(--vt-c-black);
  border-bottom: solid 2px grey;
}

.navbar-menu {
  background-color: var(--vt-c-black);
}

.navbar-item {
  height: 100%;
}

.input {
  color: white;
}
</style>
