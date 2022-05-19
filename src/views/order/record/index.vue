<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-form :list="searchList" @search="onSearch">
          <button-export
            style="margin-left: 8px"
            :ids="selectedIds"
            url="/admin/order/export"
          >导出</button-export>
        </search-form>
      </div>

      <s-table
        style="margin-top: 10px;"
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :scroll="{x: 2500}"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleDetail(record)">查看</a>
          <a-divider v-if="record.orderStatus === 'JXZ'" type="vertical" />
          <a v-if="record.orderStatus === 'JXZ'" @click="handleRefund(record)">退款</a>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { STable } from '../../../components'
  import { ENABLE_STATUS } from '../../../utils/dict'
  import SearchForm from '../../../components/SearchForm/SearchForm'
  import ButtonExport from '@/components/ButtonExport/ButtonExport'
  import { orderList, orderRefund } from '@/api/orderService'
  import { ORDER_STATUS } from '@/utils/dict'
  import { getTextByValue } from '@/utils/dictUtils'

  const columns = [
    {
      title: '序号',
      scopedSlots: { customRender: 'serial' },
      width: '100px'
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo'
    },{
      title: '就诊人姓名',
      dataIndex: 'patientName'
    },{
      title: '就诊人联系方式',
      dataIndex: 'patientPhone'
    },{
      title: '就诊时间',
      dataIndex: 'businessTime'
    },{
      title: '医生姓名',
      dataIndex: 'doctorName'
    },{
      title: '医生手机号',
      dataIndex: 'doctorPhone'
    },{
      title: '金额',
      dataIndex: 'price'
    },{
      title: '订单状态',
      dataIndex: 'orderStatus',
      customRender: (text) => getTextByValue(text, 'ORDER_STATUS')
    },{
      title: '操作时间',
      dataIndex: 'utime'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: '150px',
      scopedSlots: { customRender: 'action' }
    }
  ]

  export default {
    name: 'TableList',
    components: {
      STable,
      ButtonExport,
      SearchForm
    },
    data() {
      return {
        searchList: [{
          field: 'orderNo',
          label: '订单编号'
        },{
          field: 'patientPhone',
          label: '就诊人联系方式'
        },{
          field: 'doctorPhone',
          label: '医生手机号'
        },{
          field: 'orderStatus',
          label: '订单状态',
          type: 'select',
          options: ORDER_STATUS
        },{
          field: 'timeQuery',
          label: '操作时间',
          type: 'dateRange',
        }],
        ENABLE_STATUS: [{text: '全部', value: ''}].concat(ENABLE_STATUS),
        visible: false,
        editTemplateVisible: false,
        exportSmsVisible: false,
        popVisible: false,
        confirmLoading: false,
        mdl: null,
        mdl2: null,
        createUserId: '',
        createUserUrl: '',
        columns,
        ctime: '',
        queryParam: {},
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          return orderList(requestParameters)
            .then(res => {
              return res.data
            })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    methods: {
      onSearch(params){
        this.queryParam = params;
        this.$refs.table.refresh(true)
      },
      handleDetail({ id }) {
        this.$router.push({
          name: 'OrderDetail', query: {
            id
          }
        })
      },
      handleRefund({id, orderStatus}){
        this.$confirm({
          content: `订单状态为${getTextByValue(orderStatus, 'ORDER_STATUS')}，确认是否退款？`,
          onOk: async () => {
            const result = await orderRefund(id)
            if (result.success) {
              this.$message.info(`操作成功`)
              await this.$refs.table.refresh()
            } else {
              this.$message.error(result.msg)
            }
          }
        })
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      }
    }
  }
</script>
<style lang="less" scoped>
  /deep/ .ant-form-item-children {
    display: flex;
  }

  /deep/ .ant-checkbox-group-item {
    display: block;
  }
</style>
