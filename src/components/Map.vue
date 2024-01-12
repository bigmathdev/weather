<script setup>
import mapboxgl from "mapbox-gl";
import { onMounted, ref } from "vue";
mapboxgl.accessToken = 'pk.eyJ1IjoiYmlnbWF0aGRldiIsImEiOiJjbHJiNTdpencwa2UxMnFtd3gzcGNyNmxiIn0.qvrW30umZJRA0LJfQkDlnw'

const mapContainer = ref(null)

onMounted(() => {
  const map = ref(new mapboxgl.Map({
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/streets-v12", // Replace with your preferred map style
    center: [-71.224518, 42.213995],
    zoom: 9,
  }))

  map.value = map;
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