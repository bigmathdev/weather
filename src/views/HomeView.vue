<script setup>
import { onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import Search from '@/components/Search.vue'
import Map from '@/components/Map.vue'
import { useSearchCity } from '../composable/searchCity'
import { useSearchCenterMap } from '../composable/searchCenterMap'

const searchCityName = ref('')
const imageURL = (imageName, format) =>
  new URL(`../assets/icons/${imageName}.${format}`, import.meta.url).href
const { parseInfoWeather, searchCity } = useSearchCity()
const { centerMap, searchCenterMap } = useSearchCenterMap()

const moonPhase = {
  new: 'Lua nova',
  waxing_crescent: 'Lua crescente',
  first_quarter: 'Quarto crescente',
  waxing_gibbous: 'Gibosa crescente',
  full: 'Lua cheia',
  waning_gibbous: 'Gibosa minguante',
  last_quarter: 'Quarto minguante',
  waning_crescent: 'Lua minguante',
}

const forecastWeekday = {
  Dom: 'Domingo',
  Seg: 'Segunda',
  Ter: 'Terça',
  Qua: 'Quarta',
  Qui: 'Quinta',
  Sex: 'Sexta',
  Sáb: 'Sábado',
}

watch(parseInfoWeather, (value) => {
  searchCenterMap(value.city_name)
})

onMounted(() => {
  if (!Object.keys(parseInfoWeather.value).length) {
    searchCity()
  } else {
    searchCenterMap(parseInfoWeather.value.city_name)
  }
})
</script>

<template>
  <div class="lg:flex lg:justify-center">
    <div
      class="container flex flex-col items-center gap-8 px-6 py-9"
      v-if="Object.keys(parseInfoWeather).length"
    >
      <header class="flex w-full items-center justify-between">
        <Search
          v-model="searchCityName"
          @input-search="searchCity(searchCityName), (searchCityName = '')"
        />
        <input
          type="checkbox"
          value="night"
          class="theme-controller toggle col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]"
        />
      </header>
      <div class="info-weather flex w-full flex-col items-center text-center">
        <img
          class="h-48 w-48"
          :src="imageURL(parseInfoWeather.condition_slug, 'svg')"
          alt=""
        />
        <p>{{ parseInfoWeather.description }}</p>
        <span class="text-[4rem] font-bold">{{ parseInfoWeather.temp }}º</span>

        <div class="flex gap-2">
          <span class="text-base font-medium"
            >Máx: {{ parseInfoWeather.forecast[0].max }}º</span
          >
          <span class="text-base font-medium"
            >Min: {{ parseInfoWeather.forecast[0].min }}º</span
          >
        </div>
        <span>{{ parseInfoWeather.city }}</span>
        <div class="flex w-full justify-around pt-6 text-xs">
          <div class="flex flex-col items-start justify-between gap-2">
            <p class="flex min-h-6 items-center">
              Nascer do sol: {{ parseInfoWeather.sunrise }}
            </p>
            <p class="flex min-h-6 items-center text-center">
              Pôr do sol: {{ parseInfoWeather.sunset }}
            </p>
          </div>
          <div class="flex flex-col items-start justify-between gap-2">
            <p class="flex min-h-6 items-center">
              Vento: {{ parseInfoWeather.wind_speedy }}
            </p>
            <p class="flex min-h-6 items-center gap-2">
              {{ moonPhase[parseInfoWeather.moon_phase] }}
              <img
                :src="imageURL(parseInfoWeather.moon_phase, 'png')"
                class="h-6 w-6"
                alt=""
              />
            </p>
          </div>
        </div>
      </div>
      <div
        class="card w-full gap-2 rounded-3xl border-[1px] border-current p-4"
      >
        <div class="flex items-center justify-between">
          <span>Semana</span>
          <Icon icon="mdi:calendar-outline" />
        </div>
        <div class="flex w-full flex-col justify-between gap-2">
          <div
            class="flex items-center justify-between"
            v-for="forecast in parseInfoWeather.forecast"
          >
            <span class="min-w-[4.12rem]">{{
              forecastWeekday[forecast.weekday]
            }}</span>
            <span class="min-w-[2.4rem]">{{ forecast.rain_probability }}%</span>
            <img
              :src="imageURL(forecast.condition, 'svg')"
              class="h-8 w-8"
              alt=""
            />
            <span>{{ forecast.max }}º</span>
            <span>{{ forecast.min }}º</span>
          </div>
        </div>
      </div>
      <Map v-if="centerMap" :center-map="centerMap" />
    </div>
    <div v-else class="flex h-screen items-center justify-center">
      <h1>Carregando...</h1>
    </div>
  </div>
</template>

<style></style>
