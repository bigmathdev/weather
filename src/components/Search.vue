<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input type="text" :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)"
    placeholder="Busque pela cidade" class="input input-bordered input-sm max-w-xs" />
</template>

<style></style>