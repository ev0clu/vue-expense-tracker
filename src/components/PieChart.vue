<script setup lang="ts">
import { ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useStore } from '@/composable/useStore'

ChartJS.register(ArcElement, Tooltip, Legend)

const { calculatedIncome, calculatedExpense } = useStore()

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
})

const chartData = {
  labels: ['Income', 'Expense'],
  datasets: [
    {
      label: 'Amount',
      data: [calculatedIncome.value, calculatedExpense.value],
      backgroundColor: ['rgb(16, 185, 129)', 'rgb(251, 113, 133)'],
      hoverOffset: 4,
    },
  ],
}
</script>

<template>
  <Pie id="pie-chart" :options="chartOptions" :data="chartData" />
</template>

<style scoped></style>
