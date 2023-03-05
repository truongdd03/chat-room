<template>
  <div class="listing-header">
    <div class="icon-text">
      <span class="input-wrapper">
        <Multiselect
          class="is-primary"
          v-model="members"
          :options="users"
          :searchable="true"
          mode="tags"
          placeholder="Enter username..."
          @click="loadUsers"
        />
      </span>
      <span class="icon-wrapper">
        <font-awesome-icon
          class="icon has-text-primary"
          @click="createGroup"
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
import { useStore, type Store } from "vuex";
import type { StoreData } from "@/types/StoreData";

const store: Store<StoreData> = useStore();

const emit = defineEmits(["create-group"]);

const members: Ref<Array<string>> = ref([]);

const users: Ref<Array<string>> = ref([]);

const createGroup = async () => {
  if (members.value.length != 0) {
    const currentUsername = store.state.user!.username;
    if (!members.value.includes(currentUsername)) {
      members.value.push(currentUsername);
    }
    emit("create-group", members.value);
    members.value = [];
  }
};

const loadUsers = async () => {
  users.value = await getUsernames();
};
</script>

<style scoped>
.listing-header {
  padding: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.icon-text {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

.input {
  background-color: rgb(54, 54, 54);
}

.modal {
  position: absolute;
  background-color: yellow;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.multiselect-tags-search {
  background-color: rgb(54, 54, 54);
}
</style>
