<template>
  <div class="wrapper">
    <input class="input has-background-dark	is-primary has-text-white is-large" placeholder="Enter your name...">
    <p class="button is-primary is-large ml-2">Join!</p>
  </div>
</template>

<script setup lang="ts">
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