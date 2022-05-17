<template>
  <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="医生总量动态" :style="{ height: '100%' }">
    <div slot="extra" style="height: inherit;">
      <a-range-picker :style="{width: '256px'}" v-model="date"/>
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
        date: '',
      };
    },
    created(){
      this.getData();
    },
    methods: {
      async getData(params) {
        const {data} = await reportDoctor(params);
        this.data = data;
        this.loading = false;
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

<style lang="less" scoped>

</style>