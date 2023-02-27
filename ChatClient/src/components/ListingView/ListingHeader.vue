<template>
  <div class="listing-header">
    <div class="icon-text">
      <span class="input-wrapper">
        <input
          v-model="username"
          v-on:keydown="handleKeyDown"
          class="input has-background-dark is-primary"
          placeholder="Enter username..."
        />
      </span>
      <span class="icon-wrapper">
        <font-awesome-icon
          class="icon has-text-primary"
          @click="addUser"
          icon="fa-solid fa-plus-circle"
          inverse
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";

const emit = defineEmits(["add-user"]);

const username: Ref<string> = ref("");

const addUser = () => {
  if (username.value != "") {
    emit("add-user", username.value);
    username.value = "";
  }
};

const handleKeyDown = ($event: any) => {
  if ($event.key == "Enter") {
    addUser();
  }
};
</script>

<style scoped>
.listing-header {
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
}
.icon-text {
  height: 100%;
  width: 100%;
}
.input-wrapper {
  width: calc(100% - 30px);
  height: 100%;
  display: flex;
  align-items: center;
}
.icon-wrapper {
  height: 100%;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
</style>
