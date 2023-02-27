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
import { ref, type Ref } from "vue";
import ListingModal from "./ListingModal.vue";
import ListingHeader from "./ListingHeader.vue";
import { useStore, type Store } from "vuex";
import type { StoreData } from "@/types/StoreData";

const store: Store<StoreData> = useStore();

const chatNames: Ref<Array<string>> = ref(["Public"]);

defineProps({
  selectedListing: String,
});

const emit = defineEmits(["select-listing"]);

const selectListing = (username: string) => {
  emit("select-listing", username);
};

const onAddUser = (username: string) => {
  store.state.messages[username] = [];
  chatNames.value.unshift(username);
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
