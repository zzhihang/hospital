<template>
  <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false"
          title="每日收益统计"
          :style="{ height: '100%' }">
    <div slot="extra" style="height: inherit;">
      <a-range-picker :style="{width: '256px'}" v-model="date"/>
    </div>
    <div>
      <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
        <v-tooltip/>
        <v-axis/>
        <v-bar position="dateStr*shouyi"/>
      </v-chart>
    </div>
  </a-card>
</template>

<script>
  import { reportGain } from '@/api/reportService'

  const scale = [{
    dataKey: 'shouyi',
    tickInterval: 50,
    alias: '订单金额'
  }]

  export default {
    data() {
      return {
        data: [],
        scale,
        date: '',
        loading: true,
        height: 400
      }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData(params) {
        const { data } = await reportGain(params)
        this.loading = false;
        this.data = data;
      }
    },
    watch: {
      date(val){
        if(val.length){
          this.getData({startDate: val[0].format('yyyy-MM-DD'), endDate: val[1].format('yyyy-MM-DD')});
        }else {
          this.getData({});
        }
      }
    }
  }
</script>
