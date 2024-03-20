<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['selectedInfoMap'])

const dropdownOpen = ref(false);
const selectedInfoMap = ref('precipitationIntensity');


const mapTiles = {
  precipitationIntensity: 'Intensidade da precipitação',
  temperature: 'Temperatura',
  dewPoint: 'Orvalho',
  humidity: 'Umidade',
  windSpeed: 'Velocidade do vento',
  windDirection: 'Direção do vento',
  visibility: 'Visibilidade',
}

const infoMapText = computed(() => {
  switch (selectedInfoMap.value) {
    case 'precipitationIntensity':
      return 'Intensidade da precipitação';
    case 'temperature':
      return 'Temperatura';
    case 'dewPoint':
      return 'Orvalho';
    case 'humidity':
      return 'Umidade';
    case 'windSpeed':
      return 'Velocidade do vento';
    case 'windDirection':
      return 'Direção do vento';
    case 'visibility':
      return 'Visibilidade';
  }
})

const handleMapTiles = (map) => {
  selectedInfoMap.value = map
  dropdownOpen.value = !dropdownOpen.value
  emit('selectedInfoMap', map)
}
</script>

<template>
  <div class="absolute z-[1] top-2 right-2">
      <div class="dropdown dropdown-bottom dropdown-end">
        <div tabindex="0" role="button" @click="dropdownOpen = !dropdownOpen" class="btn btn-xs m-1">{{ infoMapText }}
        </div>
        <ul tabindex="0" v-show="dropdownOpen"
          class="dropdown-content z-[1] menu p-2 text-xs shadow bg-base-100 rounded-box w-52 flex flex-col gap-1">
          <li class="border-b-[1px] border-white pb-1 cursor-pointer hover:bg-blue-600" v-for="(map, index) in Object.keys(mapTiles)"
            @click="handleMapTiles(map)">{{ Object.values(mapTiles)[index] }}</li>
        </ul>
      </div>
    </div>
</template>