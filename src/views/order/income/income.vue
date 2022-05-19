<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-table
        style="margin-top: 10px"
        row-key="id"
        :pagination="false"
        :columns="goodsColumns"
        :data-source="tableData">
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import Vue from 'vue'
  import { orderInfo, orderList } from '@/api/orderService'
  import { getTextByValue } from '@/utils/dictUtils'

  export default {
    data() {
      return {
        goodsColumns: [{
          title: '操作时间',
          dataIndex: 'utime'
        }, {
          title: '订单编号',
          dataIndex: 'orderNo'
        }, {
          title: '就诊人姓名',
          dataIndex: 'patientName'
        }, {
          title: '就诊人联系方式',
          dataIndex: 'patientPhone'
        }, {
          title: '就诊时间',
          dataIndex: 'businessTime'
        }, {
          title: '医生手机号',
          dataIndex: 'doctorPhone'
        }, {
          title: '金额',
          dataIndex: 'price'
        }, {
          title: '订单状态',
          dataIndex: 'orderStatus',
          customRender: (text) => getTextByValue(text, 'ORDER_STATUS')
        }, {
          title: '服务项目',
          dataIndex: 'serviceItem'
        }],
        tableData: []
      }
    },
    created(){
      if(this.$route.query.shouyiDate){
        orderList({shouyiDate: this.$route.query.shouyiDate}).then(({data}) => {
          this.tableData = data.records;
        })
      }
      if(this.$route.query.shouyiDoctorId){
        orderList({shouyiDoctorId: this.$route.query.shouyiDoctorId}).then(({data}) => {
          this.tableData = data.records;
        })
      }
    }
  }
</script>