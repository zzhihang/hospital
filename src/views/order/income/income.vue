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

  export default {
    data() {
      return {
        goodsColumns: [{
          title: '操作时间',
          dataIndex: 'utime'
        }, {
          title: '订单编号',
          dataIndex: 'price'
        }, {
          title: '就诊人姓名',
          dataIndex: 'addr'
        }, {
          title: '就诊人联系方式',
          dataIndex: 'serviceDescr'
        }, {
          title: '就诊时间',
          dataIndex: 'serviceDescr'
        }, {
          title: '医生手机号',
          dataIndex: 'serviceDescr'
        }, {
          title: '金额',
          dataIndex: 'serviceDescr'
        }, {
          title: '订单状态',
          dataIndex: 'serviceDescr'
        }, {
          title: '服务项目',
          dataIndex: 'serviceDescr'
        }],
        tableData: []
      }
    },
    created(){

    }
  }
</script>