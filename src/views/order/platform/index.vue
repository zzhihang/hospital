<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-form :list="searchList" @search="onSearch">
          <button-export
            style="margin-left: 8px"
            :ids="selectedIds"
            url="/sysdept/export"
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
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDetail(record)">收益详情</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>a

<script>
  import { STable } from '../../../components'
  import { ENABLE_STATUS } from '../../../utils/dict'
  import SearchForm from '../../../components/SearchForm/SearchForm'
  import ButtonExport from '@/components/ButtonExport/ButtonExport'
  import { orderList } from '@/api/orderService'
  import { ORDER_STATUS } from '@/utils/dict'

  const columns = [
    {
      title: '序号',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: '结算时间',
      dataIndex: 'orderNo'
    },{
      title: '当天累计已完成订单',
      dataIndex: 'patientName'
    },{
      title: '当日累计收益',
      dataIndex: 'patientPhone'
    },{
      title: '当日累计互联网信息服务费',
      dataIndex: 'businessTime'
    },{
      title: '当日累计人力服务公司挂靠医生服务信息费',
      dataIndex: 'doctorName'
    },{
      title: '操作',
      dataIndex: 'action',
      width: '200px',
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
          field: 'doctorName',
          label: '医生姓名'
        },{
          field: 'doctorPhone',
          label: '医生手机号'
        },{
          field: 'timeQuery',
          label: '结算时间',
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
          name: 'income', query: {
            id
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
