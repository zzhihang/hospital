<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-descriptions title="基本信息">
        <a-descriptions-item label="操作时间">{{data.utime}}</a-descriptions-item>
        <a-descriptions-item label="订单编号">{{data.orderNo}}</a-descriptions-item>
        <a-descriptions-item label="订单状态">{{data.orderStatus}}</a-descriptions-item>
        <a-descriptions-item label="就诊人姓名">{{data.patientName}}</a-descriptions-item>
        <a-descriptions-item label="就诊人联系方式">{{data.patientPhone}}</a-descriptions-item>
        <a-descriptions-item label="就诊时间">{{data.businessTime}}</a-descriptions-item>
        <a-descriptions-item label="医生姓名">{{data.doctorName}}</a-descriptions-item>
        <a-descriptions-item label="医生手机号">{{data.doctorPhone}}</a-descriptions-item>
        <a-descriptions-item label="服务项目">{{data.serviceItem}}</a-descriptions-item>
        <a-descriptions-item label="金额">{{data.price}}</a-descriptions-item>
        <a-descriptions-item label="出诊地点">{{data.addr}}</a-descriptions-item>
        <a-descriptions-item label="服务说明">{{data.serviceDescr}}</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { orderInfo } from '@/api/orderService'

  export default {
    components: {
    },
    data() {
      return {
        data: {},
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      async getUserInfo() {
        const { data } = await orderInfo(this.$route.query.id)
        this.data = data;
      },
    }
  }
</script>
