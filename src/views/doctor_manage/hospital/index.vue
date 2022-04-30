<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-form :list="searchList" @search="onSearch">
          <a-button type="primary" v-allow="15" @click="handleAdd">新增医院</a-button>
          <button-export
            style="margin-left: 8px"
            :ids="selectedIds"
            url="/syshospital/export"
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
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical"/>
            <a @click="handleDel(record)">删除</a>
          </template>
        </span>
      </s-table>
      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { STable } from '@/components'
  import { ENABLE_STATUS } from '@/utils/dict'
  import CreateForm from '../modules/CreateHospitalForm'
  import ButtonExport from '@/components/ButtonExport/ButtonExport'
  import SearchForm from '@/components/SearchForm/SearchForm'
  import { hospitalDelete, hospitalList, hospitalSave } from '@/api/doctorService'

  const columns = [
    {
      title: '序号',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: '医院名称',
      dataIndex: 'name'
    },
    {
      title: '医院地址',
      dataIndex: 'addr'
    },
    {
      title: '备注',
      dataIndex: 'descr',
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
      SearchForm
    },
    data() {
      return {
        searchList: [{
          field: 'name',
          label: '医院名称'
        },{
          field: 'addr',
          label: '医院地址'
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
          return hospitalList(requestParameters)
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
            debugger
            const result = await hospitalSave(values)
            if(result.success){
              // 重置表单数据
              form.resetFields()
              this.$refs.table.refresh()
              this.$message.info('操作成功')
              this.visible = false;
            }else{
              this.$message.error(result.msg)
            }
            this.confirmLoading = false
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
      async handleDel(record) {
        this.$confirm({
          content: `确定删除吗`,
          onOk: async () => {
            const result = await hospitalDelete(record.id)
            if (result.success) {
              this.$message.info(`删除成功`)
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
