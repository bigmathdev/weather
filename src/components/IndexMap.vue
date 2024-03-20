<script setup>
import { ref, computed } from 'vue';

import { Icon } from '@iconify/vue';

const props = defineProps(['selectedInfoMap'])

const indexes = ref({
  precipitationIntensity: {
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
  },
  temperature: {
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
  },
  dewPoint: {
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
  },
  humidity: {
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
  },
  windSpeed: {
    0: {
      name: 0,
      color: '#fdfaaa'
    },
    1: {
      name: 8,
      color: '#eaf1a1'
    },
    2: {
      name: 16,
      color: '#bedd8c'
    },
    3: {
      name: 32,
      color: '#86aa94'
    },
    4: {
      name: 56,
      color: '#5e83ca'
    },
    5: {
      name: 72,
      color: '#545ecd'
    },
    6: {
      name: 96,
      color: '#5a3c98'
    },
    7: {
      name: 114,
      color: '#431e73'
    },
    8: {
      name: 129,
      color: '#270648'
    }
  },
  windDirection: {
    0: {
      name: 'mdi:arrow-down',
      color: '#fef202',
    },
    1: {
      name: 'mdi:arrow-bottom-left',
      color: '#51ba28'
    },
    2: {
      name: 'mdi:arrow-left',
      color: '#03a59e'
    },
    3: {
      name: 'mdi:arrow-top-left',
      color: '#17439d'
    },
    4: {
      name: 'mdi:arrow-up',
      color: '#692e8f'
    },
    5: {
      name: 'mdi:arrow-top-right',
      color: '#c22558'
    },
    6: {
      name: 'mdi:arrow-right',
      color: '#f6721e'
    },
    7: {
      name: 'mdi:arrow-bottom-right',
      color: '#ffad02'
    }
  },
  visibility: {
    0: {
      name: 0,
      color: '#991540'
    },
    1: {
      name: 1.2,
      color: '#991540'
    },
    2: {
      name: 3.2,
      color: '#991540'
    },
    3: {
      name: 4.8,
      color: '#b72933'
    },
    4: {
      name: 6.4,
      color: '#d54d33'
    },
    5: {
      name: 8,
      color: '#dd7145'
    },
    6: {
      name: 9.7,
      color: '#d49054'
    },
    7: {
      name: 11.3,
      color: '#ae9c75'
    },
    8: {
      name: 12.9,
      color: '#8fadaa'
    },
    9: {
      name: 14.5,
      color: '#a7d1df'
    },
    10: {
      name: 16.1,
      color: '#b7e2f6'
    },
  }
})

const generateColor = computed(() => {
  const color = Object.values(indexes.value[props.selectedInfoMap]).map(m => m.color).join(', ')
  return `linear-gradient(to right, ${color})`
})

</script>

<template>
  <div class="relative flex justify-between items-center rounded-b-3xl w-full h-8 px-2" :style="{ 'background': generateColor }">
    <div v-for="(item, chave) in Object.values(indexes[props.selectedInfoMap])" :key="chave">
      <div v-if="props.selectedInfoMap === 'windDirection'">
        <Icon class="text-black font-bold w-4 h-4" :icon="item.name" />
      </div>
      <div v-else class="text-[8px] font-bold">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style></style>