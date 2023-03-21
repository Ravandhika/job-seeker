<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <job-filters-sidebar-prompt />
      <job-filters-sidebar-skills />

      <collapsible-menu header="Degrees">
        <job-filters-sidebar-degrees />
      </collapsible-menu>

      <collapsible-menu header="Job Types">
        <job-filters-sidebar-job-types />
      </collapsible-menu>

      <collapsible-menu header="Organizations">
        <job-filters-sidebar-organizations />
      </collapsible-menu>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import CollapsibleMenu from "@/components/Shared/CollapsibleMenu.vue";
import JobFiltersSidebarPrompt from "./JobFiltersSidebarPrompt.vue";
import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue";

import { useUserStore } from "@/stores/user";

const route = useRoute();
const userStore = useUserStore();

const parseSkillsSearchTerm = () => {
  const role = (route.query.role as string) || "";
  userStore.UPDATE_SKILLS_SEARCH_TERM(role);
};

onMounted(parseSkillsSearchTerm);
</script>
