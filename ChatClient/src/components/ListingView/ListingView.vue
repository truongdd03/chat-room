<template>
  <div class="wrapper">
    <ListingHeader
      style="height: 50px; width: 100%"
      @add-user="onAddUser"
    ></ListingHeader>
    <div class="modals-wrapper">
      <ListingModal
        v-for="chatName in chatNames"
        v-bind:key="chatName"
        :chat-name="chatName"
        :selected-listing="selectedListing"
        @select-listing="selectListing($event)"
      ></ListingModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type Ref } from "vue";
import ListingModal from "./ListingModal.vue";
import ListingHeader from "./ListingHeader.vue";
import { useStore, type Store } from "vuex";
import type { StoreData } from "@/types/StoreData";

const store: Store<StoreData> = useStore();

const chatNames: Ref<Array<string>> = ref(["Public"]);

watch(
  () => Object.keys(store.state.messages).length,
  (count, previousCount) => {
    const keys = Object.keys(store.state.messages);
    if (count > previousCount) {
      for (const chatName of keys) {
        if (!chatNames.value.includes(chatName)) {
          chatNames.value.unshift(chatName);
        }
      }
    } else {
      for (const chatName of chatNames.value) {
        if (!keys.includes(chatName)) {
          chatNames.value.filter((name: string) => name == chatName);
        }
      }
    }
  }
);

defineProps({
  selectedListing: String,
});

const emit = defineEmits(["select-listing"]);

const selectListing = (username: string) => {
  emit("select-listing", username);
};

const onAddUser = (username: string) => {
  store.state.messages[username] = [];
  selectListing(username);
};
</script>

<style scoped>
.wrapper {
  background-color: var(--vt-c-black);
}

.modals-wrapper {
  overflow-y: scroll;
  height: calc(100% - 50px);
}
</style>
