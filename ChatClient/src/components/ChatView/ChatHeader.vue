<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-start">
      <div class="navbar-item">
        <p class="has-text-primary">User 1</p>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <font-awesome-icon
          class="icon has-text-primary"
          icon="fa-solid fa-ellipsis"
          inverse
        />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  width: 100%;
  height: 100%;
  background-color: var(--vt-c-black-soft);
  padding: 0 10px 0 10px;
}

.navbar-item {
  height: 100%;
}
</style>
