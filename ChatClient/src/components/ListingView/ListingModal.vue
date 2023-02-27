<template>
  <div
    :class="`listing-wrapper ${selectedListing == chatName ? 'selected' : ''}`"
    @click="selectListing"
  >
    <p class="has-text-primary">{{ chatName }}</p>
    <div v-if="lastMessage">
      <p>
        <span class="has-text-info"
          >{{
            lastMessage?.senderName == store.state.username
              ? "You"
              : lastMessage.senderName
          }}:</span
        >
        {{ lastMessage?.message }}
      </p>
    </div>
    <div v-else>
      <p class="is-italic">There is no message to show</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "@/types/Message";
import type { StoreData } from "@/types/StoreData";
import { ref, watch, type Ref } from "vue";
import { Store, useStore } from "vuex";

const emit = defineEmits(["select-listing"]);

const props = defineProps({
  chatName: String,
  selectedListing: String,
});

const store: Store<StoreData> = useStore();

const lastMessage: Ref<Message | null> = ref(null);

watch(
  () => store.state.messages[props.chatName!].length,
  (count, prevCount) => {
    if (prevCount < count) {
      lastMessage.value = store.state.messages[props.chatName!][count - 1];
    }
  }
);

const selectListing = () => {
  emit("select-listing", props.chatName);
};
</script>

<style scoped>
.listing-wrapper {
  width: 100%;
  height: 70px;
  border-bottom: solid 2px black;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
}

.selected {
  background-color: var(--vt-c-black-soft);
}
</style>
