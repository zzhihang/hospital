<template>
  <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="就诊人总量/就诊端用户总量动态"
          :style="{ height: '100%' }">
    <div slot="extra" style="height: inherit;">
      <a-range-picker :style="{width: '256px'}" v-model="date"/>
    </div>
    <div>
      <div>
        <v-chart :force-fit="true" :height="height" :data="data" :scale="scale">
          <v-tooltip/>
          <v-axis/>
          <v-legend/>
          <v-line position="dateStr*num" color="field"/>
          <v-point position="dateStr*num" color="field" :size="4" :v-style="style" :shape="'circle'"/>
        </v-chart>
      </div>
    </div>
  </a-card>
</template>

<script>
  import { reportUser } from '@/api/reportService'

  const DataSet = require('@antv/data-set')

  export default {
    data() {
      return {
        data: [],
        scale: [{
          dataKey: 'dateStr',
          min: 0,
          max: 1
        }],
        loading: true,
        height: 400,
        date: '',
        style: { stroke: '#fff', lineWidth: 1 }
      }
    },
    created(){
      this.getData();
    },
    methods: {
      async getData(params) {
        const {data} = await reportUser(params);
        const dv = new DataSet.View().source(data)
        //https://github.com/viserjs/viser/issues/136
        dv.transform({
          type: 'rename',
          map: {
            count: '就诊人总量',
            userCount: '就诊端用户总量',
          }
        });
        dv.transform({
          type: 'fold',
          fields: ['就诊人总量', '就诊端用户总量'],
          key: 'field',
          value: 'num',
        })
        this.data = dv.rows
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
