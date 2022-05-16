<template>
  <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false"
          title="就诊人总量/就诊端用户总量动态"
          :style="{ height: '100%' }">
    <div slot="extra" style="height: inherit;">
      <a-range-picker :style="{width: '256px'}"/>
    </div>
    <div>
      <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
        <v-tooltip/>
        <v-axis/>
        <v-bar position="year*sales"/>
      </v-chart>
    </div>
  </a-card>
</template>

<script>
  import { reportGain } from '@/api/reportService'

  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 }
  ]

  const scale = [{
    dataKey: 'sales',
    tickInterval: 20,
    alias: '订单金额'
  }]

  export default {
    data() {
      return {
        data,
        scale,
        loading: false,
        height: 400
      }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        const { data } = await reportGain()

      }
    }
  }
</script>
