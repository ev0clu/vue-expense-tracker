<script setup lang="ts">
import PieChart from '@/components/PieChart.vue'
</script>

<template>
  <div class="chart">
    <PieChart />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .chart {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: auto;
    margin: auto;
  }
}
</style>
