<script setup lang="ts">
  import Chart from 'primevue/chart'
  import { ref, onMounted, watch } from 'vue'
  import { colord } from 'colord'

  onMounted(() => {
    const documentStyle = getComputedStyle(document.body)

    colors.value = generateColorsVariant(documentStyle.getPropertyValue('--primary-color'))
    chartData.value = setChartData()
  })

  interface Props {
    datas?: Record<string, number>
  }

  const props = defineProps<Props>()

  watch(
    () => props.datas,
    () => {
      chartData.value = setChartData()
    },
    { deep: true },
  )
  const chartData = ref()
  const colors = ref<string[]>([])
  const chartOptions = ref({
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
  })

  const generateColorsVariant = (colorHex: string, numberOfColors = 10) => {
    let color = colord(colorHex)
    const colors = [colorHex]

    for (let i = 0; i < numberOfColors; i++) {
      color = color.rotate(-30)
      colors.push(color.toHex())
    }

    return colors
  }

  const setChartData = () => {
    return {
      datasets: [
        {
          data: props.datas ? Object.values(props.datas) : [],
          backgroundColor: colors.value,
        },
      ],
      labels: props.datas ? Object.keys(props.datas) : [],
    }
  }
</script>

<template>
  <Chart v-if="chartData" type="pie" :data="chartData" :options="chartOptions" />
</template>
