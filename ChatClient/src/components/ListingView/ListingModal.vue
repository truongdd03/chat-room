<template>
  <div
    :class="`listing-wrapper ${
      selectedChat?.id == chatInfo?.id ? 'selected' : ''
    }`"
    @click="selectListing"
  >
    <p class="has-text-primary">{{ chatInfo?.name }}</p>
    <div v-if="lastMessage">
      <p>
        <span class="has-text-info"
          >{{
            lastMessage?.senderName == store.state.user?.username
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
import type { Group } from "@/types/Group";
import type { Message } from "@/types/Message";
import type { StoreData } from "@/types/StoreData";
import { ref, watch, type Ref, onMounted } from "vue";
import { Store, useStore } from "vuex";

const emit = defineEmits(["select-chat"]);

const props = defineProps({
  chatInfo: Object as () => Group,
  selectedChat: Object as () => Group,
});

const store: Store<StoreData> = useStore();

const lastMessage: Ref<Message | null> = ref(null);

watch(
  () => store.state.messages[props.chatInfo!.id].length,
  () => {
    updateMessage();
  }
);

onMounted(() => {
  updateMessage();
});

const updateMessage = () => {
  const messages = store.state.messages[props.chatInfo!.id];
  if (!messages) {
    lastMessage.value = null;
  } else {
    let i = messages.length - 1;
    while (i >= 0 && messages[i].message == "") i -= 1;
    if (i < 0) {
      lastMessage.value = null;
    } else {
      lastMessage.value = messages[i];
    }
  }
};

const selectListing = () => {
  emit("select-chat", props.chatInfo?.id);
};
</script>

<style scoped>
.listing-wrapper {
  width: 100%;
  height: 70px;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
}

.selected {
  background-color: var(--vt-c-black-soft);
}
</style>
