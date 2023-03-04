<template>
  <div class="wrapper">
    <ListingHeader
      style="width: 100%"
      @create-group="onCreateGroup"
    ></ListingHeader>
    <div class="modals-wrapper">
      <ListingModal
        v-for="group in Object.values(store.state.groupById)"
        v-bind:key="group.id"
        :chat-info="group"
        :selected-chat="selectedChat"
        @select-chat="selectListing"
      ></ListingModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ListingModal from "./ListingModal.vue";
import ListingHeader from "./ListingHeader.vue";
import { useStore, type Store } from "vuex";
import type { StoreData } from "@/types/StoreData";
import type { Group } from "@/types/Group";

const store: Store<StoreData> = useStore();

defineProps({
  selectedChat: Object as () => Group,
});

const emit = defineEmits(["select-chat", "create-group"]);

const selectListing = (username: string) => {
  emit("select-chat", username);
};

const onCreateGroup = (members: string[]) => {
  emit("create-group", members);
};
</script>

<style scoped>
.wrapper {
  background-color: var(--vt-c-black);
}

.modals-wrapper {
  overflow-y: scroll;
}
</style>
