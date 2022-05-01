<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-form :list="searchList" @search="onSearch">
          <a-button type="primary" @click="handleAudit">批量审核</a-button>
          <button-export
            style="margin-left: 8px"
            :ids="selectedIds"
            url="/doctorgs/export"
          >导出</button-export>
          <button-export
            style="margin-left: 8px"
            url="/admin/user/tz/export"
            bill-type="blog"
          >导入</button-export>
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
        <span slot="disable" slot-scope="text, record, index">
          <a-switch :checked="String(text) === '1'" checked-children="启用中" un-checked-children="禁用中"
                    @change="onDisableChange(record)"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">待审核</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { STable } from '@/components'
  import { ENABLE_STATUS } from '@/utils/dict'
  import ButtonExport from '@/components/ButtonExport/ButtonExport'
  import SearchForm from '@/components/SearchForm/SearchForm'
  import {
    doctorDisable,
    doctorEnable,
    doctorSave,
    hospitalDelete, serviceAudit, serviceDisable, serviceEnable,
    serviceList
  } from '@/api/doctorService'

  const columns = [
    {
      title: '序号',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: '医生姓名',
      dataIndex: 'doctorName'
    },
    {
      title: '医生手机号',
      dataIndex: 'doctorPhone'
    },
    {
      title: '服务项目',
      dataIndex: 'serviceItem',
    },{
      title: '金额',
      dataIndex: 'price',
    },{
      title: '出诊地点',
      dataIndex: 'addr',
    },{
      title: '服务说明',
      dataIndex: 'serviceDescr',
    },{
      title: '审核状态',
      dataIndex: 'auditStatus',
    },
    {
      title: '操作',
      dataIndex: 'status',
      scopedSlots: { customRender: 'disable' }
    },
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
          field: 'doctorNam',
          label: '医生姓名'
        },{
          field: 'doctorPhone',
          label: '医生手机号'
        },{
          field: 'serviceItem',
          label: '服务项目'
        },{
          field: 'addr',
          label: '出诊地点'
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
        queryParam: {},
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          return serviceList(requestParameters)
            .then(res => {
              return res.data
            })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    computed: {
      rowSelection() {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      selectedIds(){
        return this.selectedRows.map(item => item.id);
      }
    },
    methods: {
      onSearch(params){
        this.queryParam = params;
        this.$refs.table.refresh(true)
      },
      handleAudit() {
        if(!this.selectedIds.length){
          return this.$message.warn('请选择需要操作的数据')
        }
        this.$confirm({
          content: `审核任务`,
          cancelText: '通过',
          okText: '驳回',
          onOk: async () => {
            const result = await serviceAudit({
              auditType: '驳回',
              ids: this.selectedIds
            })
            if (result.success) {
              this.$message.info(`操作成功`)
              await this.$refs.table.refresh()
            } else {
              this.$message.error(result.msg)
            }
          },
          onCancel: async () => {
            const result = await serviceAudit({
              auditType: '通过',
              ids: this.selectedIds
            })
            if (result.success) {
              this.$message.info(`操作成功`)
              await this.$refs.table.refresh()
            } else {
              this.$message.error(result.msg)
            }
          }
        })
      },
      handleCancel() {
        this.visible = false
        const form = this.$refs.createModal.form
        form.resetFields() // 清理表单数据（可不做）
      },
      async onDisableChange(record) {
        if (record.status === 1) {
          this.$confirm({
            content: `禁用后项目在手机端不可购买，确认是否禁用？`,
            onOk: async () => {
              const result = await serviceDisable(record.id)
              if (result.success) {
                this.$message.info(`禁用成功`)
                await this.$refs.table.refresh()
              } else {
                this.$message.error(result.msg)
              }
            }
          })
        } else {
          const result = await serviceEnable(record.id)
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
