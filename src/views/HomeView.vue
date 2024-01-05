<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="container flex flex-col items-center">
    <header class="flex justify-end	py-9 px-6 w-screen">
      <input type="checkbox" value="light" class="toggle theme-controller"/>
    </header>
    <Icon icon="line-md:sun-rising-loop" width="270" height="270" color="#FDB441" fill="#FDB441"/>
    <div class="info-clima text-center pt-1">
      <span class="text-[4rem] font-bold">28º</span>
      <div class="flex gap-2">
        <span class="text-base font-medium">Máx: 24º</span>
        <span class="text-base font-medium">Min: 19º</span>
      </div>
    </div>
  </div>
</template>
