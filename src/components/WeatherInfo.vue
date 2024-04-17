<script setup>
import { onMounted, ref, watch } from 'vue'

import Search from '@/components/Search.vue'
import Map from '@/components/Map.vue'
import Card from '@/components/Card.vue'

import { useSearchCity } from '../composable/searchCity'
import { useSearchCenterMap } from '../composable/searchCenterMap'
import { useImageURL } from '../composable/imageURL'

const { parseInfoWeather, searchCity } = useSearchCity()
const { centerMap, searchCenterMap } = useSearchCenterMap()
const { imageURL } = useImageURL()

const searchCityName = ref('')

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
  <div class="homeViewInfo" v-if="Object.keys(parseInfoWeather).length">
    <header class="homeViewHeader">
      <Search
        v-model="searchCityName"
        @input-search="searchCity(searchCityName), (searchCityName = '')"
      />
      <input
        type="checkbox"
        value="night"
        class="homeViewCheckboxTheme theme-controller toggle col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]"
      />
    </header>
    <div class="homeViewMain">
      <img
        class="h-48 w-48"
        :src="imageURL(parseInfoWeather.condition_slug, 'svg')"
        alt=""
      />
      <p>{{ parseInfoWeather.description }}</p>
      <span class="homeViewMainTemp">{{ parseInfoWeather.temp }}º</span>

      <div class="homeViewMaxAndMin">
        <span class="homeViewMax text-base font-medium"
          >Máx: {{ parseInfoWeather.forecast[0].max }}º</span
        >
        <span class="homeViewMin text-base font-medium"
          >Min: {{ parseInfoWeather.forecast[0].min }}º</span
        >
      </div>
      <span>{{ parseInfoWeather.city }}</span>
      <div class="homeViewSection">
        <div class="homeViewSectionLeft">
          <p class="homeViewSectionLeftSunrise">
            Nascer do sol: {{ parseInfoWeather.sunrise }}
          </p>
          <p class="homeViewSectionLeftSunset">
            Pôr do sol: {{ parseInfoWeather.sunset }}
          </p>
        </div>
        <div class="homeViewSectionRigth">
          <p class="homeViewSectionRigthSpeedy">
            Vento: {{ parseInfoWeather.wind_speedy }}
          </p>
          <p class="homeViewSectionRigthMoonPhase">
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
    <Card />
    <Map v-if="centerMap" :center-map="centerMap" />
  </div>
  <div v-else class="homeViewLoading">
    <h1>Carregando...</h1>
  </div>
</template>

<style scoped>
.homeViewContainer {
  @apply flex w-full justify-center;
}

.homeViewInfo {
  @apply flex flex-col items-center justify-center gap-8 px-6 py-9 lg:max-w-[1536px];
}

.homeViewHeader {
  @apply flex w-full items-center justify-between;
}

.homeViewMain {
  @apply flex w-full flex-col items-center text-center;
}

.homeViewMainTemp {
  @apply text-[4rem] font-bold;
}

.homeViewMaxAndMin {
  @apply flex gap-2;
}

.homeViewMax {
  @apply text-base font-medium;
}

.homeViewMin {
  @apply text-base font-medium;
}

.homeViewSection {
  @apply flex w-full justify-around pt-6 text-xs;
}

.homeViewSectionLeft {
  @apply flex flex-col items-start justify-between gap-2;
}

.homeViewSectionLeftSunrise {
  @apply flex min-h-6 items-center;
}

.homeViewSectionLeftSunset {
  @apply flex min-h-6 items-center text-center;
}

.homeViewSectionRigth {
  @apply flex flex-col items-start justify-between gap-2;
}

.homeViewSectionRigthSpeedy {
  @apply flex min-h-6 items-center;
}

.homeViewSectionRigthMoonPhase {
  @apply flex min-h-6 items-center gap-2;
}

.homeViewLoading {
  @apply flex h-screen items-center justify-center;
}
</style>
