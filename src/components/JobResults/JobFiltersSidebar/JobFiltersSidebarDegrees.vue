<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="UNIQUE_DEGREES"
    :action="userStore.ADD_SELECTED_DEGREES"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

import { useUserStore } from "@/stores/user";
import { useDegreesStore } from "@/stores/degrees";

const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES);

const userStore = useUserStore();
const degreesStore = useDegreesStore();
</script>
