<script setup>
import { Icon } from '@iconify/vue'
import { useSearchCity } from '../composable/searchCity'
import { useImageURL } from '../composable/imageURL'

const { parseInfoWeather } = useSearchCity()
const { imageURL } = useImageURL()

const forecastWeekday = {
  Dom: 'Domingo',
  Seg: 'Segunda',
  Ter: 'Terça',
  Qua: 'Quarta',
  Qui: 'Quinta',
  Sex: 'Sexta',
  Sáb: 'Sábado',
}
</script>

<template>
  <div class="homeViewWeekContainer">
    <div class="homeViewWeek">
      <span>Semana</span>
      <Icon icon="mdi:calendar-outline" />
    </div>
    <div class="homeViewWeekInfo">
      <div
        class="homeViewWeekInfoForecast"
        v-for="forecast in parseInfoWeather.forecast"
      >
        <span class="homeViewInfoWeekday">{{
          forecastWeekday[forecast.weekday]
        }}</span>
        <span class="homeViewInfoWeekRainProbability"
          >{{ forecast.rain_probability }}%</span
        >
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
</template>

<style scoped>
.homeViewWeekContainer {
  @apply w-full gap-2 rounded-3xl border-[1px] border-current p-4;
}

.homeViewWeek {
  @apply flex items-center justify-between;
}

.homeViewWeekInfo {
  @apply flex w-full flex-col justify-between gap-2;
}

.homeViewWeekInfoForecast {
  @apply flex items-center justify-between;
}

.homeViewInfoWeekday {
  @apply min-w-[4.12rem];
}

.homeViewInfoWeekRainProbability {
  @apply min-w-[2.4rem];
}
</style>
