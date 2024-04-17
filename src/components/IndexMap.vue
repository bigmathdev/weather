<script setup>
import { computed } from 'vue'

import { Icon } from '@iconify/vue'
import { useIndexCondition } from '../composable/indexConditionWeather'

const props = defineProps(['selectedInfoMap'])

const indexes = useIndexCondition()

const generateColor = computed(() => {
  const color = Object.values(indexes[props.selectedInfoMap])
    .map((m) => m.color)
    .join(', ')
  return `linear-gradient(to right, ${color})`
})
</script>

<template>
  <div class="indexMapContainer" :style="{ background: generateColor }">
    <div
      v-for="(item, key) in Object.values(indexes[props.selectedInfoMap])"
      :key="key"
    >
      <div v-if="props.selectedInfoMap === 'windDirection'">
        <Icon class="indexMapIcon" :icon="item.name" />
      </div>
      <div v-else class="indexMapItem">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.indexMapContainer {
  @apply relative flex h-8 w-full items-center justify-between rounded-b-3xl px-2;
}

.indexMapIcon {
  @apply h-4 w-4 font-bold text-black;
}

.indexMapItem {
  @apply text-[8px] font-bold;
}
</style>
