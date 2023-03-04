<template>
  <div class="wrapper" v-if="store && store.state.user">
    <div class="navbar-wrapper">
      <NavBar></NavBar>
    </div>
    <Splitpanes class="content-wrapper">
      <Pane style="min-width: 300px" size="20">
        <ListingView
          style="width: 100%; height: 100%"
          :selected-chat="selectedChat"
          @select-chat="onChatSelected"
          @create-group="onCreateGroup"
        ></ListingView>
      </Pane>
      <Pane min-size="40">
        <ChatView
          style="width: 100%; height: 100%"
          :selected-chat="selectedChat"
        ></ChatView>
      </Pane>
    </Splitpanes>
    <GroupNameModal
      v-if="displayGroupModal"
      :members="members"
      @select-chat="onChatSelected"
      @close="displayGroupModal = false"
    ></GroupNameModal>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { notify } from "@kyvg/vue3-notification";
import { onBeforeMount, ref, type Ref } from "vue";
import { Store, useStore } from "vuex";

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import NavBar from "@/components/NavBar.vue";
import ListingView from "@/components/ListingView/ListingView.vue";
import ChatView from "@/components/ChatView/ChatView.vue";
import GroupNameModal from "@/components/GroupNameModal.vue";
import type { StoreData } from "@/types/StoreData";
import type { Group } from "@/types/Group";
import { getGroupById } from "@/util/Group";

const store: Store<StoreData> = useStore();

const displayGroupModal: Ref<boolean> = ref(false);
const members: Ref<Array<string>> = ref([]);

const onChatSelected = async (id: string) => {
  selectedChat.value = await getGroupById(store, id);
};

const selectedChat: Ref<Group> = ref(Object.values(store.state.groupById)[0]);

onBeforeMount(() => {
  if (!store || !store.state.user) {
    router.push("/");
  } else {
    notify({
      title: `Welcome ${store.state.user.username}`,
      type: "success",
    });
  }
});

const onCreateGroup = (groupMembers: Array<string>) => {
  members.value = groupMembers;
  displayGroupModal.value = true;
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  /* overflow-y: hidden; */
}

.navbar-wrapper {
  height: 60px;
}

.content-wrapper {
  height: calc(100% - 60px);
}
</style>

<style>
.splitpanes__splitter {
  background-color: var(--vt-c-black);
  width: 5px;
}
</style>
