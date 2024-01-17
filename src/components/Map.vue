<script setup>
import mapboxgl from "mapbox-gl";
import { onMounted, ref, watch } from "vue";
mapboxgl.accessToken = 'pk.eyJ1IjoiYmlnbWF0aGRldiIsImEiOiJjbHJiNTdpencwa2UxMnFtd3gzcGNyNmxiIn0.qvrW30umZJRA0LJfQkDlnw'

const mapContainer = ref(null)
const map = ref()
const APIkey = '5okkmwDU3kpUj5y4nXMqIEmwKzy5v3yI'
const timeStamp = new Date().toISOString()

const props = defineProps({
  centerMap: Array,
  dataField: String
})

const toggleTileMap = () => {
  map.value.getSource('infoWeather').setTiles([`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${props.dataField}/${timeStamp}.png?apikey=${APIkey}`]);
  map.value.getSource('infoWeather').reload();
}

watch(() => props.centerMap, (newValue, oldValue) => {
    map.value.setCenter(newValue)
    map.value.flyTo({
      center: [oldValue, newValue],
      essential: true
    })
})

watch(() => props.dataField, (newValue, oldValue) => {
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
      tiles: [`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${props.dataField}/${timeStamp}.png?apikey=${APIkey}`],
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
  <div ref="mapContainer" class="map-container"></div>
</template>

<style>
.map-container {
  @apply max-w-[86vw] flex-1;
}

.mapboxgl-canvas {
  @apply rounded-3xl
}

.mapboxgl-control-container {
  @apply hidden;
}
</style>