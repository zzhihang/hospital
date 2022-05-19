<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-form :list="searchList" @search="onSearch">
          <button-export
            style="margin-left: 8px"
            :ids="selectedIds"
            url="/userpatient/export"
          >导出</button-export>
          <button-export
            style="margin-left: 8px"
            url="/userpatient/export"
            bill-type="blog"
          >导入</button-export>
          <button-delete
            style="margin-left: 8px"
            url="/userpatient/delete"
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
        :scroll="{x: 2500}"
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
  import { STable } from '../../../components'
  import { ENABLE_STATUS } from '../../../utils/dict'
  import CreateForm from './component/CreateForm'
  import ButtonExport from '../../../components/ButtonExport/ButtonExport'
  import SearchForm from '../../../components/SearchForm/SearchForm'
  import { patientList, patientSave } from '@/api/customerService'
  import { SEX_TYPE } from '@/utils/dict'
  import ButtonDelete from '@/components/ButtonDelete/ButtonDelete'

  const columns = [
    {
      title: '序号',
      scopedSlots: { customRender: 'serial' },
      width: '100px'
    },
    {
      title: '就诊人姓名',
      dataIndex: 'name',
      width: '200px'
    },{
      title: '就诊端用户手机号',
      dataIndex: 'userPhone',
      width: '200px'
    },{
      title: '就诊人联系方式',
      dataIndex: 'phone',
      width: '200px'
    },{
      title: '就诊人性别',
      dataIndex: 'sex',
      width: '150px'
    },{
      title: '身份证号',
      dataIndex: 'idNumber',
      width: '200px'
    },{
      title: '出生日期',
      dataIndex: 'birthday',
      width: '150px'
    },{
      title: '所在地区',
      dataIndex: 'province',
      width: '200px'
    },{
      title: '就诊人关系',
      dataIndex: 'relationship',
      width: '100px'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: '100px',
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
      SearchForm
    },
    data() {
      return {
        searchList: [{
          field: 'name',
          label: '就诊人姓名'
        },{
          field: 'sex',
          label: '就诊人性别',
          type: 'select',
          options: SEX_TYPE
        },{
          field: 'province',
          label: '所在地区'
        },{
          field: 'phone',
          label: '就诊人联系方式',
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
          return patientList(requestParameters)
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
            const result = await patientSave(values)
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
