<script setup>
import mapboxgl from "mapbox-gl";
import { computed, onMounted, ref, watch } from "vue";
import IndexMap from '../components/IndexMap.vue';
import Dropdown from '../components/Dropdown.vue';

const mapContainer = ref(null)
const map = ref()
const APIkey = import.meta.env.VITE_KEY_TOMORROW
const mapboxKey = import.meta.env.VITE_KEY_MAPBOX
const timeStamp = new Date().toISOString()
const selectedInfoMap = ref('precipitationIntensity')

mapboxgl.accessToken = mapboxKey

const props = defineProps({
  centerMap: Array,
})

const toggleTileMap = () => {
  map.value.getSource('infoWeather').setTiles([`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${selectedInfoMap.value}/${timeStamp}.png?apikey=${APIkey}`]);
  map.value.getSource('infoWeather').reload();
}

watch(() => props.centerMap, (newValue) => {
  map.value.setCenter(newValue)
})

watch(selectedInfoMap, () => {
  toggleTileMap()
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
    <IndexMap :selectedInfoMap="selectedInfoMap" />
    <div ref="mapContainer" class="map-container" />
    <Dropdown @selected-info-map="(value) => selectedInfoMap = value"/> 
  </div>
</template>

<style scoped>
.map-container {
  @apply flex-1;
}

.mapboxgl-canvas {
  @apply rounded-t-3xl h-[15rem];
}
</style>