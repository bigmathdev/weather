<script setup>
import { onMounted, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import Search from "@/components/Search.vue";
import Map from "@/components/Map.vue";
import { useSearchCity } from '../composable/searchCity'
import { useSearchCenterMap } from '../composable/searchCenterMap'

const searchCityName = ref("");
const searchTimer = ref(null);
const imageURL = (imageName, format) =>
  new URL(`../assets/icons/${imageName}.${format}`, import.meta.url).href;
const { parseInfoWeather, searchCity } = useSearchCity()
const { centerMap, searchCenterMap } = useSearchCenterMap()

const moonPhase = {
  new: "Lua nova",
  waxing_crescent: "Lua crescente",
  first_quarter: "Quarto crescente",
  waxing_gibbous: "Gibosa crescente",
  full: "Lua cheia",
  waning_gibbous: "Gibosa minguante",
  last_quarter: "Quarto minguante",
  waning_crescent: "Lua minguante"
}

const forecastWeekday = {
  Dom: "Domingo",
  Seg: "Segunda",
  Ter: "Terça",
  Qua: "Quarta",
  Qui: "Quinta",
  Sex: "Sexta",
  Sáb: "Sábado"
}

watch(parseInfoWeather, (value) => {
  searchCenterMap(value.city_name)
})

watch(searchCityName, (value) => {
  clearTimeout(searchTimer.value);
  if (value) {
    searchTimer.value = setTimeout(() => {
      searchCity(searchCityName.value)
      searchCityName.value = ''
    }, 2000);
  }
});

onMounted(() => {
  if (!Object.keys(parseInfoWeather.value).length) {
    searchCity()
  } else {
    searchCenterMap(parseInfoWeather.value.city_name);
  }
});
</script>

<template>
  <div class="lg:flex lg:justify-center">
    <div class="container flex flex-col items-center gap-8 py-9 px-6" v-if="Object.keys(parseInfoWeather).length">
      <header class="flex justify-between w-full items-center">
        <Search v-model="searchCityName" />
        <input type="checkbox" value="night"
          class="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2" />
      </header>
      <div class="info-weather w-full text-center flex flex-col items-center">
        <img class="w-48 h-48" :src="imageURL(parseInfoWeather.condition_slug, 'svg')" alt="" />
        <p>{{ parseInfoWeather.description }}</p>
        <span class="text-[4rem] font-bold">{{ parseInfoWeather.temp }}º</span>

        <div class="flex gap-2">
          <span class="text-base font-medium">Máx: {{ parseInfoWeather.forecast[0].max }}º</span>
          <span class="text-base font-medium">Min: {{ parseInfoWeather.forecast[0].min }}º</span>
        </div>
        <span>{{ parseInfoWeather.city }}</span>
        <div class="w-full flex justify-around text-xs pt-6">
          <div class="flex flex-col gap-2 items-start justify-between">
            <p class="min-h-6 flex items-center">
              Nascer do sol: {{ parseInfoWeather.sunrise }}
            </p>
            <p class="min-h-6 flex items-center text-center">
              Pôr do sol: {{ parseInfoWeather.sunset }}
            </p>
          </div>
          <div class="flex flex-col gap-2 items-start justify-between">
            <p class="min-h-6 flex items-center">
              Vento: {{ parseInfoWeather.wind_speedy }}
            </p>
            <p class="gap-2 min-h-6 flex items-center">
              {{ moonPhase[parseInfoWeather.moon_phase] }}
              <img :src="imageURL(parseInfoWeather.moon_phase, 'png')" class="w-6 h-6" alt="" />
            </p>
          </div>
        </div>
      </div>
      <div class="card w-full p-4 rounded-3xl gap-2 border-current border-[1px]">
        <div class="flex justify-between items-center">
          <span>Semana</span>
          <Icon icon="mdi:calendar-outline" />
        </div>
        <div class="flex flex-col gap-2 w-full justify-between">
          <div class="flex items-center justify-between" v-for="(forecast) in parseInfoWeather.forecast">
            <span class="min-w-[4.12rem]">{{ forecastWeekday[forecast.weekday] }}</span>
            <span class="min-w-[2.4rem]">{{ forecast.rain_probability }}%</span>
            <img :src="imageURL(forecast.condition, 'svg')" class="w-8 h-8" alt="" />
            <span>{{ forecast.max }}º</span>
            <span>{{ forecast.min }}º</span>
          </div>
        </div>
      </div>
      <Map v-if="centerMap" :centerMap="centerMap" />
    </div>
    <div v-else class="h-screen flex justify-center items-center">
      <h1>Carregando...</h1>
    </div>
  </div>
</template>

<style></style>
