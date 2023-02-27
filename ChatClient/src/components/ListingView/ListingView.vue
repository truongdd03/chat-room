<template>
  <div class="wrapper">
    <ListingModal :chat-name="'Public'" :selected-listing="selectedListing"></ListingModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";
import ListingModal from "./ListingModal.vue";

const selectedListing: Ref<string> = ref("Public");
</script>

<style scoped>
.wrapper {
  background-color: var(--vt-c-black);
}
</style>
