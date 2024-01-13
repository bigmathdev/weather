<script setup>
import axios from "axios";
import mapboxgl from "mapbox-gl";
import { onMounted, ref, watch } from "vue";
mapboxgl.accessToken = 'pk.eyJ1IjoiYmlnbWF0aGRldiIsImEiOiJjbHJiNTdpencwa2UxMnFtd3gzcGNyNmxiIn0.qvrW30umZJRA0LJfQkDlnw'

const mapContainer = ref(null)
const map = ref()
const APIkey = '5okkmwDU3kpUj5y4nXMqIEmwKzy5v3yI'
const dataField = 'precipitationIntensity'
const timeStamp = new Date().toISOString()

const props = defineProps({
  centerMap: Array
})

onMounted(() => {
  // console.log(props.centerMap)
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
    tiles: [`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${dataField}/${timeStamp}.png?apikey=${APIkey}`],
    tileSize: 256,
    atribuition: '&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>'
    }),
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
  flex: 1;
}
</style>