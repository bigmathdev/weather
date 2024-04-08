import { computed } from 'vue'
import axios from "axios"
import { useLocalStorage } from '@vueuse/core'

export const useSearchCity = () => {
  const hgBrasilKey = import.meta.env.VITE_KEY_HG_BRASIL
  const infoWeatherStorage = useLocalStorage('infoWeather')

  const searchCity = (searchCityName) => {
    // Se for por input do usuário vai carregar pela variável searchCityName e se for a primeira vez da requisição, onde ela não tem nenhum dado armazenado no localStorage, será carregado pelo IP
    axios
      .get(
        `https://api.hgbrasil.com/weather?format=json-cors&key=${hgBrasilKey}${searchCityName
          ? `&city_name=${searchCityName}`
          : "&user_ip=remote"
        }`
      )
      .then((response) => {
        infoWeatherStorage.value = JSON.stringify(response.data.results)
        parseInfoWeather.value.forecast.shift()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const parseInfoWeather = computed(() => {
    return infoWeatherStorage.value ? JSON.parse(infoWeatherStorage.value) : {}
  })

  return {
    searchCity,
    parseInfoWeather,
  }
}