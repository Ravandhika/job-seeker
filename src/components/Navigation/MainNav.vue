<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl"
        >
          Ravan Careers
        </router-link>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="ml-9 h-full first:ml-0"
            >
              <router-link
                :to="menuItem.url"
                class="py2.5 flex h-full items-center"
              >
                {{ menuItem.text }}
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" />
          <action-button v-else text="Sign in" @click="LOGIN_USER" />
        </div>
      </div>

      <sub-nav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";

import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import SubNav from "@/components/Navigation/SubNav.vue";

const menuItems = ref([
  {
    text: "Teams",
    url: "/teams",
  },
  {
    text: "Locations",
    url: "/",
  },
  {
    text: "Life at Ravan Careers",
    url: "/",
  },
  {
    text: "How we hire",
    url: "/",
  },
  {
    text: "Jobs",
    url: "/jobs/results",
  },
]);

const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const LOGIN_USER = userStore.LOGIN_USER;

const headerHeightClass = computed(() => ({
  "h-16": !isLoggedIn.value,
  "h-32": isLoggedIn.value,
}));
</script>
