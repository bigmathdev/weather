<script setup>
import {defineModel} from 'vue'

const model = defineModel()
</script>

<template>
  <input type="text" v-model="model" placeholder="Busque pela cidade" class="input input-bordered input-sm max-w-xs" />
</template>

<style></style>