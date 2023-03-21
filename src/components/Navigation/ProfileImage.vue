<template>
  <img
    :src="imageLink"
    class="h-8 w-8 rounded-3xl object-contain"
    alt="User profile image"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const imageLink = ref(
  "https://cdn130.picsart.com/325861479094211.png?to=crop&type=webp&r=768x462&q=85"
);
</script>
