<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
import Search from "@/components/Search.vue";
import Map from "@/components/Map.vue";

const mapboxKey = import.meta.env.VITE_KEY_MAPBOX
const hgBrasilKey = import.meta.env.VITE_KEY_HG_BRASIL
const searchCityName = ref("");
const searchTimer = ref(null);
const centerMap = ref();
const imageURL = (imageName, format) =>
  new URL(`../assets/icons/${imageName}.${format}`, import.meta.url).href;
const infoWeatherStorage = ref(JSON.parse(localStorage.getItem("infoWeather")));

const searchCenterMap = (cityName) => {
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?proximity=ip&access_token=${mapboxKey}`
    )
    .then((response) => {
      centerMap.value = response.data.features[0].center;
    })
    .catch((error) => {
      console.log(error);
    });
};

const stringifyAndParseInfoWeather = (object) => {
  localStorage.setItem("infoWeather", JSON.stringify(object.data.results));
  infoWeatherStorage.value = JSON.parse(localStorage.getItem("infoWeather"));
};

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

const searchCity = () => {
  // Se for por input do usuário vai carregar pela variável searchCityName e se for a primeira vez da requisição, onde ela não tem nenhum dado armazenado no localStorage, será carregado pelo IP
  axios
    .get(
      `https://api.hgbrasil.com/weather?format=json-cors&key=${hgBrasilKey}${searchCityName.value
        ? `&city_name=${searchCityName.value}`
        : "&user_ip=remote"
      }`
    )
    .then((response) => {
      if (searchCityName.value) {
        stringifyAndParseInfoWeather(response);
        searchCenterMap(infoWeatherStorage.value.city_name);
        searchCityName.value = "";
      } else {
        setTimeout(() => {
          stringifyAndParseInfoWeather(response);
          searchCenterMap(infoWeatherStorage.value.city_name);
          infoWeatherStorage.value.forecast.shift();
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

watch(searchCityName, (value) => {
  clearTimeout(searchTimer.value);
  if (value) {
    searchTimer.value = setTimeout(() => {
      // searchCenterMap(value)
      searchCity();
    }, 2000);
  }
});

onMounted(() => {
  if (infoWeatherStorage.value == null || infoWeatherStorage.value == undefined) {
    searchCity();
  } else {
    searchCenterMap(infoWeatherStorage.value.city_name);
  }
});
</script>

<template>
  <div class="lg:flex lg:justify-center">
    <div class="container flex flex-col items-center gap-8 py-9 px-6" v-if="infoWeatherStorage">
      <header class="flex justify-between w-full items-center">
        <Search v-model="searchCityName" />
        <input type="checkbox" value="night"
          class="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2" />
      </header>
      <div class="info-weather w-full text-center flex flex-col items-center">
        <img class="w-48 h-48" :src="imageURL(infoWeatherStorage.condition_slug, 'svg')" alt="" />
        <p>{{ infoWeatherStorage.description }}</p>
        <span class="text-[4rem] font-bold">{{ infoWeatherStorage.temp }}º</span>

        <div class="flex gap-2">
          <span class="text-base font-medium">Máx: {{ infoWeatherStorage.forecast[0].max }}º</span>
          <span class="text-base font-medium">Min: {{ infoWeatherStorage.forecast[0].min }}º</span>
        </div>
        <span>{{ infoWeatherStorage.city }}</span>
        <div class="w-full flex justify-around text-xs pt-6">
          <div class="flex flex-col gap-2 items-start justify-between">
            <p class="min-h-6 flex items-center">
              Nascer do sol: {{ infoWeatherStorage.sunrise }}
            </p>
            <p class="min-h-6 flex items-center text-center">
              Pôr do sol: {{ infoWeatherStorage.sunset }}
            </p>
          </div>
          <div class="flex flex-col gap-2 items-start justify-between">
            <p class="min-h-6 flex items-center">
              Vento: {{ infoWeatherStorage.wind_speedy }}
            </p>
            <p class="gap-2 min-h-6 flex items-center">
              {{ moonPhase[infoWeatherStorage.moon_phase] }}
              <img :src="imageURL(infoWeatherStorage.moon_phase, 'png')" class="w-6 h-6" alt="" />
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
          <div class="flex items-center justify-between" v-for="(forecast) in infoWeatherStorage.forecast">
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
