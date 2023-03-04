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
import { addGroup } from "@/util/Group";
import { useStore, type Store } from "vuex";
import type { StoreData } from "@/types/StoreData";

const store: Store<StoreData> = useStore();

const emit = defineEmits(["select-chat"]);

const members: Ref<Array<string>> = ref([]);

const users: Ref<Array<string>> = ref([]);

const createGroup = async () => {
  if (members.value.length != 0) {
    let groupName = members.value[0];
    if (members.value.length > 1) {
      // Ask for group name

    }
    const id = await addGroup(members.value, groupName);
    store.state.messages[id] = [];
    members.value = [];
    emit("select-chat", id);
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
