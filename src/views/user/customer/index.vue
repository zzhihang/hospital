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

        <span slot="headimgurl" slot-scope="text, record, index">
            <a-avatar :src="text" />
        </span>

        <span slot="status" slot-scope="text, record">
          <template>
            <a-switch :checked="String(text) === '1'" checked-children="启用中" un-checked-children="禁用中"
                      @change="onDisableChange(record)"/>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { STable } from '@/components'
  import ButtonExport from '@/components/ButtonExport/ButtonExport'
  import SearchForm from '@/components/SearchForm/SearchForm'
  import { customerDisable, customerEnable, customerList } from '@/api/customerService'

  const columns = [
    {
      title: '序号',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: '就诊端微信昵称',
      dataIndex: 'nickname'
    },
    {
      title: '头像',
      dataIndex: 'name',
      scopedSlots: { customRender: 'headimgurl' }
    },
    {
      title: '就诊端用户手机号',
      dataIndex: 'phone'
    },
    {
      title: '操作',
      dataIndex: 'status',
      width: '200px',
      scopedSlots: { customRender: 'status' }
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
          field: 'phone',
          label: '就诊端用户手机号'
        }],
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
          return customerList(requestParameters)
            .then(res => {
              return res.data
            })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    methods: {
      async onDisableChange(record) {
        if (record.status === 1) {
          this.$confirm({
            content: `禁用后用户在手机端将无法登录，确定禁用吗？`,
            onOk: async () => {
              const result = await customerDisable(record.id)
              if (result.success) {
                this.$message.info(`禁用成功`)
                await this.$refs.table.refresh()
              } else {
                this.$message.error(result.msg)
              }
            }
          })
        } else {
          const result = await customerEnable(record.id)
          if (result.success) {
            this.$message.info(`启用成功`)
            await this.$refs.table.refresh()
          } else {
            this.$message.error(result.msg)
          }
        }
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
