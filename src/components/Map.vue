<script setup>
import mapboxgl from "mapbox-gl";
import { computed, onMounted, ref, watch } from "vue";


const mapContainer = ref(null)
const map = ref()
const APIkey = import.meta.env.VITE_KEY_TOMORROW
const mapboxKey = import.meta.env.VITE_KEY_MAPBOX
const timeStamp = new Date().toISOString()
const selectedInfoMap = ref('precipitationIntensity')
const dropdownOpen = ref(false)

mapboxgl.accessToken = mapboxKey


const props = defineProps({
  centerMap: Array,
})

const toggleTileMap = () => {
  map.value.getSource('infoWeather').setTiles([`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${selectedInfoMap.value}/${timeStamp}.png?apikey=${APIkey}`]);
  map.value.getSource('infoWeather').reload();
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

watch(() => props.centerMap, (newValue) => {
  map.value.setCenter(newValue)
})

watch(selectedInfoMap, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    toggleTileMap()
  }
})

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/streets-v12",
    center: props.centerMap,
    zoom: 5,
    antialias: true
  })

  map.value.on('load', () => {
    map.value.addSource('infoWeather', {
      type: 'raster',
      tiles: [`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${selectedInfoMap.value}/${timeStamp}.png?apikey=${APIkey}`],
      tileSize: 256
    })
    map.value.addLayer({
      id: 'radar-tiles',
      type: 'raster',
      source: 'infoWeather',
      minzoom: 1,
      maxzoom: 12
    })
  })
})
</script>

<template>
  <div class="relative w-full">
    <div ref="mapContainer" class="map-container" />
    <div class="absolute z-[1] top-2 right-2">
        <div class="dropdown dropdown-bottom dropdown-end">
          <div tabindex="0" role="button" @click="dropdownOpen = !dropdownOpen" class="btn btn-xs m-1">{{ infoMapText }}
          </div>
          <ul tabindex="0" v-show="dropdownOpen"
            class="dropdown-content z-[1] menu p-2 text-xs shadow bg-base-100 rounded-box w-52 flex flex-col gap-1">
            <li class="border-b-[1px] border-white pb-1" @click="selectedInfoMap = 'precipitationIntensity', dropdownOpen = !dropdownOpen">Intensidade da precipitação</li>
            <li class="border-b-[1px] border-white pb-1" @click="selectedInfoMap = 'temperature', dropdownOpen = !dropdownOpen">Temperatura</li>
            <li class="border-b-[1px] border-white pb-1" @click="selectedInfoMap = 'dewPoint', dropdownOpen = !dropdownOpen">Orvalho</li>
            <li class="border-b-[1px] border-white pb-1" @click="selectedInfoMap = 'humidity', dropdownOpen = !dropdownOpen">Umidade</li>
            <li class="border-b-[1px] border-white pb-1" @click="selectedInfoMap = 'windSpeed', dropdownOpen = !dropdownOpen">Velocidade do vento</li>
            <li class="border-b-[1px] border-white pb-1" @click="selectedInfoMap = 'windDirection', dropdownOpen = !dropdownOpen">Direção do vento</li>
            <li class="border-b-[1px] border-white pb-1" @click="selectedInfoMap = 'visibility', dropdownOpen = !dropdownOpen">Visibilidade</li>
          </ul>
        </div>
      </div>
  </div>
</template>

<style>
.map-container {
  @apply flex-1;
}

.mapboxgl-canvas {
  @apply rounded-3xl h-[15rem];
}

.mapboxgl-control-container {
  @apply hidden;
}
</style>