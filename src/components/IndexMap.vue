<script setup>
import { computed } from 'vue';

import { Icon } from '@iconify/vue';
import { useIndexCondition } from '../composable/indexConditionWeather'

const props = defineProps(['selectedInfoMap'])

const indexes = useIndexCondition()

const generateColor = computed(() => {
  const color = Object.values(indexes[props.selectedInfoMap]).map(m => m.color).join(', ')
  return `linear-gradient(to right, ${color})`
})

</script>

<template>
  <div class="relative flex justify-between items-center rounded-b-3xl w-full h-8 px-2"
    :style="{ 'background': generateColor }">
    <div v-for="(item, key) in Object.values(indexes[props.selectedInfoMap])" :key="key">
      <div v-if="props.selectedInfoMap === 'windDirection'">
        <Icon class="text-black font-bold w-4 h-4" :icon="item.name" />
      </div>
      <div v-else class="text-[8px] font-bold">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style></style>