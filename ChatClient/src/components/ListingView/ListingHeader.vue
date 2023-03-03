<template>
  <div class="listing-header">
    <div class="icon-text">
      <span class="input-wrapper">
        <Multiselect
          v-model="username"
          :options="users"
          :searchable="true"
          placeholder="Enter username..."
          @click="loadUsers"
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
import Multiselect from "@vueform/multiselect";
import { getUsernames } from "@/util/Users";
import { ref, type Ref } from "vue";

const emit = defineEmits(["add-user"]);

const username: Ref<string> = ref("");

const users: Ref<Array<string>> = ref([]);

const addUser = () => {
  if (username.value != "") {
    emit("add-user", username.value);
    username.value = "";
  }
};

const loadUsers = async () => {
  users.value = await getUsernames();
  console.log(users.value);
};
</script>

<style scoped>
.listing-header {
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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

<style src="@vueform/multiselect/themes/default.css"></style>
