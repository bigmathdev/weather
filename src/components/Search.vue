<script setup>
import { watch } from 'vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (newValue, oldValue) => {
  console.log('componente search', [newValue, oldValue])
})

</script>


<template>
  <input type="text" :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)"
    placeholder="Busque pela cidade" class="input input-bordered input-sm max-w-xs" />
</template>

<style></style>