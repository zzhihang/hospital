<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-form :list="searchList" @search="onSearch">
          <a-button type="primary" @click="handleAdd">新增科室</a-button>
          <button-export
            style="margin-left: 8px"
            :ids="selectedIds"
            url="/sysdept/export"
          >导出</button-export>
          <button-import
            style="margin-left: 8px"
            url="/sysdept/import"
            @importSuccess="onSearch"
          >导入</button-import>
          <button-delete
            style="margin-left: 8px"
            url="/sysdept/delete"
            :ids="selectedIds"
            @deleteSuccess="onSearch"
          >
            删除
          </button-delete>
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
            <a @click="handleEdit(record)">编辑</a>
          </template>
        </span>
      </s-table>
      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        :create-user-id="createUserId"
        :create-user-url="createUserUrl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { STable } from '@/components'
  import { ENABLE_STATUS } from '@/utils/dict'
  import { userDisable, userEnable } from '@/api/userService'
  import CreateForm from './component/CreateForm'
  import ButtonExport from '@/components/ButtonExport/ButtonExport'
  import SearchForm from '@/components/SearchForm/SearchForm'
  import { departmentList, departmentSave } from '@/api/doctorService'
  import ButtonDelete from '@/components/ButtonDelete/ButtonDelete'
  import ButtonImport from '@/components/ButtonExport/ButtonImport'

  const columns = [
    {
      title: '序号',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: '科室名称',
      dataIndex: 'name'
    },
    {
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
      CreateForm,
      ButtonExport,
      ButtonDelete,
      ButtonImport,
      SearchForm
    },
    data() {
      return {
        searchList: [{
          field: 'name',
          label: '科室名称'
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
          return departmentList(requestParameters)
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
      handleAdd() {
        this.mdl = null
        this.visible = true
      },
      handleEdit (record) {
        this.visible = true
        this.mdl = { ...record }
      },
      handleOk() {
        const form = this.$refs.createModal.form
        this.confirmLoading = true
        form.validateFields(async (errors, values) => {
          if (!errors) {
            const result = await departmentSave(values)
            if(result.success){
              this.confirmLoading = false
              form.resetFields()
              this.$refs.table.refresh()
              this.$message.info('操作成功')
            }else{
              this.$message.error(result.msg);
            }
            this.visible = false;
          } else {
            this.confirmLoading = false
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
            content: `禁用后用户不能登录平台，后台不删除用户数据`,
            onOk: async () => {
              const result = await userDisable(record.id)
              if (result.success) {
                this.$message.info(`禁用成功`)
                await this.$refs.table.refresh()
              } else {
                this.$message.error(result.msg)
              }
            }
          })
        } else {
          const result = await userEnable(record.id)
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
