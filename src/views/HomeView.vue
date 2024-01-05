<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';

let infoWeather = ref({})

axios.get('https://api.hgbrasil.com/weather?format=json-cors&key=6b858f9e')
.then( response => {
  infoWeather = response.data.results
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
    <Icon icon="line-md:sun-rising-loop" width="270" height="270" color="#FDB441" fill="#FDB441" />
    <div class="info-clima text-center pt-1">
      <span class="text-[4rem] font-bold">28º</span>
      <div class="flex gap-2">
        <span class="text-base font-medium">Máx: 24º</span>
        <span class="text-base font-medium">Min: 19º</span>
      </div>
    </div>
    <div class="card w-full p-4">
      <div class="flex justify-between">
        <span>Hoje</span>
        <span>Mar,10</span>
      </div>
      <div>
        <div>
          <span>24ª</span>
          <i></i>
          <span>10:00</span>
        </div>
        <div>
          <span>24ª</span>
          <i></i>
          <span>10:00</span>
        </div>
        <div>
          <span>24ª</span>
          <i></i>
          <span>10:00</span>
        </div>
        <div>
          <span>24ª</span>
          <i></i>
          <span>10:00</span>
          <span>{{ infoWeather.city_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
