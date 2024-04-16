<script setup>
import mapboxgl from 'mapbox-gl'
import { onMounted, ref, watch } from 'vue'
import IndexMap from '../components/IndexMap.vue'
import Dropdown from '../components/Dropdown.vue'

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
  map.value
    .getSource('infoWeather')
    .setTiles([
      `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${selectedInfoMap.value}/${timeStamp}.png?apikey=${APIkey}`,
    ])
  map.value.getSource('infoWeather').reload()
}

watch(
  () => props.centerMap,
  (value) => {
    map.value.flyTo({
      center: value,
      essential: true,
      speed: 0.2,
      zoom: 9,
    })
  }
)

watch(selectedInfoMap, () => {
  toggleTileMap()
})

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: props.centerMap,
    zoom: 9,
    antialias: true,
  })

  map.value.on('load', () => {
    const styleJson = map.value.getStyle().layers

    // adiciona o raster a primeira camada da pilha na renderização do mapa
    const firstSymbolId = ref(
      styleJson.filter((f) => f.type == 'symbol').shift().id
    )

    map.value.addSource('infoWeather', {
      type: 'raster',
      tiles: [
        `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${selectedInfoMap.value}/${timeStamp}.png?apikey=${APIkey}`,
      ],
      tileSize: 256,
    })
    map.value.addLayer(
      {
        id: 'radar-tiles',
        type: 'raster',
        source: 'infoWeather',
      },
      firstSymbolId.value
    )
  })
})
</script>

<template>
  <div class="relative w-full">
    <div ref="mapContainer" class="map-container" />
    <Dropdown @selected-info-map="(value) => (selectedInfoMap = value)" />
    <IndexMap :selected-info-map="selectedInfoMap" />
  </div>
</template>

<style>
.map-container {
  @apply flex-1;
}

.mapboxgl-canvas {
  @apply h-[15rem] rounded-t-3xl;
}

.mapboxgl-ctrl {
  @apply hidden;
}
</style>
