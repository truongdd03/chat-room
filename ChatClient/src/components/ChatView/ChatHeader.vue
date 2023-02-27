<template>
  <div class="chat-header">
    <p class="has-text-primary">User 1</p>
    <font-awesome-icon
      class="icon has-text-primary"
      icon="fa-solid fa-ellipsis"
      inverse
    />
  </div>
</template>

<style scoped>
.chat-header {
  width: 100%;
  height: 100%;
  background-color: var(--vt-c-black-soft);
  padding: 0 10px 0 10px;
  border-bottom: solid 2px var(--vt-c-black);
  display: flex;
  align-items: center;
}

.icon {
  margin-left: auto;
}
</style>
