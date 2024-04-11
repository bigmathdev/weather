<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const emit = defineEmits(['selectedInfoMap'])

const dropdownOpen = ref(false)
const selectedInfoMap = ref('precipitationIntensity')

const mapTiles = {
  precipitationIntensity: 'Intensidade da precipitação',
  temperature: 'Temperatura',
  dewPoint: 'Orvalho',
  humidity: 'Umidade',
  windSpeed: 'Velocidade do vento',
  windDirection: 'Direção do vento',
  visibility: 'Visibilidade',
}

const handleMapTiles = (map) => {
  selectedInfoMap.value = map
  emit('selectedInfoMap', map)
  dropdownOpen.value = !dropdownOpen.value
}
</script>

<template>
  <div class="dropdown-container">
    <button class="dropdown-button" @click="dropdownOpen = !dropdownOpen">
      <span>{{ mapTiles[selectedInfoMap] }}</span>
      <Icon icon="iconamoon:arrow-down-2" />
    </button>
    <ul class="dropdown-unordered" v-show="dropdownOpen">
      <li
        class="dropdown-list"
        v-for="(map, index) in Object.keys(mapTiles)"
        @click="handleMapTiles(map)"
      >
        {{ Object.values(mapTiles)[index] }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown-container {
  @apply absolute right-2 top-2 z-[1] min-w-[170px];
}

.dropdown-button {
  @apply flex min-w-[170px] items-center justify-between gap-1 rounded-md bg-[#2e5497] p-1 text-xs;
}

.dropdown-unordered {
  @apply absolute z-[1] mt-1 min-w-[170px] rounded-md bg-[#2e5497];
}

.dropdown-list {
  @apply cursor-pointer p-2 pb-1 text-xs hover:rounded-md hover:bg-gray-500;
}
</style>
