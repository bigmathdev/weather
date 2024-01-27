<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps(['selectedInfoMap'])

const colors = ref()

const indexPrecipitationIntensity = ref({
  0: {
    name: 0,
    color: '#ffffff'
  },
  1: {
    name: 0.36,
    color: '#9aea74'
  },
  2: {
    name: 2,
    color: '#2e8401'
  },
  3: {
    name: 7,
    color: '#ff9101'
  },
  4: {
    name: 50,
    color: '#89120c'
  },
})
const indexTemperature = ref({
  0: {
    name: -34,
    color: 'rgb(143,60,187)'
  },
  1: {
    name: -30,
    color: 'rgb(105,74,179)'
  },
  2: {
    name: -23,
    color: 'rgb(62,85,163)'
  },
  3: {
    name: -17,
    color: 'rgb(48,133,180)'
  },
  4: {
    name: -12,
    color: 'rgb(35,177,196)'
  },
  5: {
    name: -7,
    color: 'rgb(20,221,212)'
  },
  6: {
    name: -1,
    color: 'rgb(39,215,166)'
  },
  7: {
    name: 4,
    color: 'rgb(62,194,102)'
  },
  8: {
    name: 10,
    color: 'rgb(95,174,31)'
  },
  9: {
    name: 16,
    color: 'rgb(200,195,12)'
  },
  10: {
    name: 21,
    color: 'rgb(250,190,1)'
  },
  11: {
    name: 27,
    color: 'rgb(241,154,13)'
  },
  12: {
    name: 32,
    color: 'rgb(238,95,18)'
  },
  13: {
    name: 38,
    color: 'rgb(244,44,14)'
  },
  14: {
    name: 43,
    color: 'rgb(204,33,10)'
  },
  15: {
    name: 49,
    color: 'rgb(155,23,6)'
  }
})
const indexHumidity = ref({
  0: {
    name: '10%',
    color: '#fff5c6'
  },
  1: {
    name: '20%',
    color: '#ffeead'
  },
  2: {
    name: '30%',
    color: '#ffde95'
  },
  3: {
    name: '40%',
    color: '#f7c87a'
  },
  4: {
    name: '50%',
    color: '#d1a266'
  },
  5: {
    name: '60%',
    color: '#a27a59'
  },
  6: {
    name: '70%',
    color: '#814e58'
  },
  7: {
    name: '80%',
    color: '#752c6c'
  },
  8: {
    name: '100%',
    color: '#51105f'
  }

})
const indexwindSpeed = ref({})
const indexWindDirection = ref({})
const indexVisibility = ref({})


const generateColor = (index) => {
  const color = Object.values(index).map(temp => temp.color).join(', ')
  colors.value = `linear-gradient(to right, ${color})`
}

watch(() => props.selectedInfoMap, (value) => {
  colors.value = ''
  switch (value) {
    case 'precipitationIntensity':
      return generateColor(indexPrecipitationIntensity.value)
    case 'temperature' || 'dewPoint':
      return generateColor(indexTemperature.value)
    case 'humidity':
      return generateColor(indexHumidity.value)
    case 'windSpeed':
      return generateColor(indexwindSpeed.value)
    case 'windDirection':
      return generateColor(indexWindDirection.value)
    case 'visibility':
      return generateColor(indexVisibility.value)
  }
})

onMounted(() => {
  generateColor(indexPrecipitationIntensity.value)
})
</script>

<template>
  <div class="relative flex justify-between items-center rounded-b-3xl w-full h-8 px-2" :style="{ 'background': colors }">
    <div v-if="props.selectedInfoMap === 'precipitationIntensity'" class="text-[8px] font-bold"
      v-for="index in Object.keys(indexPrecipitationIntensity)" :key="index">
      {{ indexPrecipitationIntensity[index].name }}
    </div>
    <div v-else-if="props.selectedInfoMap === 'temperature'" class="text-[8px] font-bold"
      v-for="index in Object.keys(indexTemperature)">
      {{ indexTemperature[index].name }}
    </div>
    <div v-else-if="props.selectedInfoMap === 'humidity'" class="text-[8px] font-bold"
      v-for="index in Object.keys(indexHumidity)">
      {{ indexHumidity[index].name }}
    </div>
  </div>
</template>

<style scoped></style>