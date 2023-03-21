<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
    <div class="flex items-center text-sm">
      <action-button
        text="Clear Filters"
        type="secondary"
        @Click="userStore.CLEAR_USER_JOB_FILTER_SELECTIONS"
      ></action-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
