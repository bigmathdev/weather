<script setup>
import { onMounted, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import Search from '../components/Search.vue'

const infoWeather = ref({})
const apiDataLoaded = ref(false)
const searchCityName = ref('')
const searchTimer = ref(null)
const key = ref(0)
const imageURL = (imageName, format) => new URL(`../assets/icons/${imageName}.${format}`, import.meta.url).href

const searchCity = () => {
  axios.get(`https://api.hgbrasil.com/weather?format=json-cors&key=6b858f9e&city_name=${searchCityName.value}`)
    .then(response => {
      infoWeather.value = response.data.results
      searchCityName.value = ''
      key.value++
    })
    .catch(error => {
      console.log(error)
    })
}

watch(searchCityName, (value) => {
  clearTimeout(searchTimer.value)
  if (value) {
    searchTimer.value = setTimeout(searchCity, 2000)
  }
})

onMounted(() => {
  axios.get('https://api.hgbrasil.com/weather?format=json-cors&key=6b858f9e&user_ip=remote')
    .then(response => {
      infoWeather.value = response.data.results
      infoWeather.value.forecast.shift()
      apiDataLoaded.value = true
    })
    .catch(error => {
      console.log(error)
    })
})

</script>

<template>
  <div class="container flex flex-col items-center gap-8 py-9 px-6">
    <header class="flex justify-between w-full items-center">
      <Search v-model="searchCityName" :key="key"/>
      <input type="checkbox" value="night"
        class="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2" />
    </header>
    <div class="info-weather w-full text-center flex flex-col items-center">
      <img class="w-48 h-48" v-if="apiDataLoaded" :src="imageURL(infoWeather.condition_slug, 'svg')" alt="">
      <p v-else>Carregando..</p>
      <p>{{ infoWeather.description }}</p>
      <span class="text-[4rem] font-bold">{{ infoWeather.temp }}º</span>

      <div class="flex gap-2">
        <span v-if="apiDataLoaded" class="text-base font-medium">Máx: {{ infoWeather.forecast[0].max }}º</span>
        <span v-if="apiDataLoaded" class="text-base font-medium">Min: {{ infoWeather.forecast[0].min }}º</span>
      </div>
      <span v-if="apiDataLoaded">{{ infoWeather.city }}</span>
      <div class="w-full flex justify-around text-xs pt-6">
        <div class="flex flex-col gap-2 items-start justify-between">
          <p class="min-h-6 flex items-center">Nascer do sol: {{ infoWeather.sunrise }}</p>
          <p class="min-h-6 flex items-center text-center">Pôr do sol: {{ infoWeather.sunset }}</p>
        </div>
        <div class="flex flex-col gap-2 items-start justify-between">
          <p class="min-h-6 flex items-center">Vento: {{ infoWeather.wind_speedy }}</p>
          <p class="flex gap-2 items-center min-h-6 flex items-center">
            {{
              infoWeather.moon_phase === 'new' ? 'Lua nova' : '' ||
                infoWeather.moon_phase === 'waxing_crescent' ? 'Lua crescente' : '' ||
                  infoWeather.moon_phase === 'first_quarter' ? 'Quarto crescente' : '' ||
                    infoWeather.moon_phase === 'waxing_gibbous' ? 'Gibosa crescente' : '' ||
                      infoWeather.moon_phase === 'full' ? 'Lua cheia' : '' ||
                        infoWeather.moon_phase === 'waning_gibbous' ? 'Gibosa minguante' : '' ||
                          infoWeather.moon_phase === 'last_quarter' ? 'Quarto minguante' : '' ||
                            infoWeather.moon_phase === 'waning_crescent' ? 'Lua minguante' : ''
            }}
            <img :src="imageURL(infoWeather.moon_phase, 'png')" class="w-6 h-6" alt="">
          </p>
        </div>
      </div>
    </div>
    <div class="card w-full p-4 rounded-3xl gap-2 border-current border-[1px] ">
      <div class="flex justify-between items-center">
        <span>Semana</span>
        <Icon icon="mdi:calendar-outline" />
      </div>
      <div class="flex flex-col gap-2 w-full justify-between">
        <div class="flex items-center justify-between" v-for="forecast in infoWeather.forecast">
          <span class="min-w-[4.12rem]">
            {{
              forecast.weekday === "Dom" ? 'Domingo' : '' ||
                forecast.weekday === "Seg" ? 'Segunda' : '' ||
                  forecast.weekday === "Ter" ? 'Terça' : '' ||
                    forecast.weekday === "Qua" ? 'Quarta' : '' ||
                      forecast.weekday === "Qui" ? 'Quinta' : '' ||
                        forecast.weekday === "Sex" ? 'Sexta' : '' ||
                          forecast.weekday === "Sáb" ? 'Sábado' : ''
            }}
          </span>
          <span class="min-w-[2.4rem]">{{ forecast.rain_probability }}%</span>
          <img v-if="apiDataLoaded" :src="imageURL(forecast.condition, 'svg')" class="w-8 h-8" alt="">
          <span>{{ forecast.max }}º</span>
          <span>{{ forecast.min }}º</span>
        </div>
      </div>
    </div>
  </div>
</template>