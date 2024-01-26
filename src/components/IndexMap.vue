<script setup>
import { computed, ref } from 'vue';

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

const generateColor = computed(() => {
  const color = Object.values(indexTemperature.value).map(temperature => temperature.color).join(', ')

  return `linear-gradient(to right, ${color})`
})
</script>

<template>
  <div class="flex justify-between items-center rounded-b-3xl w-full h-6 px-2" :style="{'background': generateColor}">
    <div class="text-[8px] font-bold" v-for="index in Object.keys(indexTemperature)" :key="index">
      {{ indexTemperature[index].name }}
    </div>
  </div>
</template>

<style scoped></style>