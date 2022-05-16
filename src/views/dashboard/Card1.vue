<template>
  <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="医生总量动态" :style="{ height: '100%' }">
    <div slot="extra" style="height: inherit;">
      <a-range-picker :style="{width: '256px'}" />
    </div>
    <div>
      <div>
        <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
          <v-tooltip />
          <v-axis />
          <v-line position="dateStr*count"  />
          <v-point position="dateStr*count" shape="circle" />
        </v-chart>
      </div>
    </div>
  </a-card>
</template>

<script>
  import { reportDoctor } from '@/api/reportService'

  const scale = [{
    dataKey: 'count',
    alias: '医生总量',
    min: 0,
  },{
    dataKey: 'dateStr',
    min: 0,
    max: 1,
  }];
  export default {
    data() {
      return {
        loading: true,
        data: [],
        scale,
        height: 400,
      };
    },
    created(){
      this.getData();
    },
    methods: {
      async getData() {
        const {data} = await reportDoctor();
        this.data = data;
        this.loading = !this.loading;
      }
    }
  }
</script>

<style lang="less" scoped>

</style>