<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';


const infoWeather = ref({})
const apiDataLoaded = ref(false)
const imageUrl = ref()

axios.get('https://api.hgbrasil.com/weather?format=json-cors&key=6b858f9e')
  .then(response => {
    infoWeather.value = response.data.results
    imageUrl.value = new URL(`../icons/${infoWeather.value.condition_slug}.svg`, import.meta.url).href
    apiDataLoaded.value = true
  })
  .catch(error => {
    console.log(error)
  })

</script>

<template>
  <div class="container flex flex-col items-center gap-8 py-9 px-6">
    <header class="flex justify-end w-full">
      <input type="checkbox" value="light" class="toggle theme-controller" />
    </header>
    <div class="info-clima text-center pt-1">
      <img class="w-24 h-24" v-if="apiDataLoaded" :src="imageUrl" alt="">
      <p v-else>Carregando..</p>
      <span class="text-[4rem] font-bold">{{infoWeather.temp }}º</span>

      <div class="flex gap-2">
        <span v-if="apiDataLoaded" class="text-base font-medium">Máx: {{infoWeather.forecast[0].max}}º</span>
        <span v-if="apiDataLoaded" class="text-base font-medium">Min: {{infoWeather.forecast[0].min}}º</span>
      </div>
      <span v-if="apiDataLoaded">{{ infoWeather.city }}</span>

    </div>
    <div class="card w-full p-4">
      <div class="flex justify-between">
        <span>Hoje</span>
        <span>Mar,10</span>
      </div>
      <div class="flex w-full justify-between">
        <div class="flex flex-col items-center" v-for="forecast in infoWeather.forecast">
          <span>{{ forecast.max }}</span>
          <Icon icon="material-symbols:cloud" />
          <span>10:00</span>
        </div>
      </div>
    </div>
  </div>
</template>
