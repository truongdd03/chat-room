<template>
  <div class="modal-wrapper">
    <div class="popup-modal">
      <div @click="closeModal" class="icon close-icon">
        <font-awesome-icon
          class="has-text-grey"
          icon="fa-solid fa-times"
          inverse
        />
      </div>

      <p class="has-text-centered is-size-5">New Group</p>
      <input
        v-model="groupName"
        class="input is-primary has-background-dark mt-2"
        placeholder="Enter group's name..."
      />
      <div class="buttons mt-4 is-centered">
        <p
          class="button has-background-dark has-text-white"
          @click="closeModal"
        >
          Cancel
        </p>
        <p class="button is-success" @click="createGroup">Create</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { StoreData } from "@/types/StoreData";
import { addGroup } from "@/util/Group";
import { notify } from "@kyvg/vue3-notification";
import { ref, type Ref } from "vue";
import { useStore, type Store } from "vuex";

const store: Store<StoreData> = useStore();

const emits = defineEmits(["close", "selectChat"]);

const props = defineProps({
  members: Array<string>,
});

const groupName: Ref<string> = ref("");

const closeModal = () => {
  emits("close");
};

const createGroup = async () => {
  if (groupName.value.replace(" ", "").length != 0) {
    const id = await addGroup(props.members!, groupName.value);
    store.state.messages[id] = [];
    emits("selectChat", id);
    closeModal();
  } else {
    notify({
      title: `Invalid group's name!`,
      type: "error",
    });
  }
};
</script>

<style scoped>
.modal-wrapper {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-modal {
  min-width: 400px;
  background-color: var(--vt-c-black);
  padding: 20px;
  border-radius: 10px;
  border: solid 1px grey;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
