<template>
  <div class="wrapper">
    <div class="icon-text">
      <span class="input-wrapper">
        <input
          class="input has-background-dark is-primary"
          placeholder="Enter your chat..."
        />
      </span>
      <span class="icon-wrapper">
        <font-awesome-icon
          class="icon has-text-primary"
          icon="fa-solid fa-paper-plane"
          inverse
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--vt-c-black-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
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
