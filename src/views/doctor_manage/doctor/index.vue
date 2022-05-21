<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-form :list="searchList" @search="onSearch">
          <a-button type="primary"  @click="handleAdd">新增医生</a-button>
          <button-export
            style="margin-left: 8px"
            :ids="selectedIds"
            url="/doctor/export"
          >导出</button-export>
          <button-export
            style="margin-left: 8px"
            url="/admin/user/tz/export"
          >导入</button-export>
          <button-delete
            style="margin-left: 8px"
            url="/doctor/delete"
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
        :scroll="{x: 1500}"
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
            <a @click="handleDetail(record)">查看</a>
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
  import CreateForm from './component/CreateForm'
  import ButtonExport from '@/components/ButtonExport/ButtonExport'
  import SearchForm from '@/components/SearchForm/SearchForm'
  import {
    doctorDisable,
    doctorEnable,
    doctorList,
    doctorSave,
    hospitalDelete
  } from '@/api/doctorService'
  import ButtonDelete from '@/components/ButtonDelete/ButtonDelete'

  const columns = [
    {
      title: '序号',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: '医生姓名',
      dataIndex: 'name'
    },
    {
      title: '医生手机号',
      dataIndex: 'phone'
    },
    {
      title: '医院',
      dataIndex: 'hospitalName',
    },{
      title: '科室',
      dataIndex: 'deptName',
    },{
      title: '职称',
      dataIndex: 'title',
    },{
      title: '疾病类型',
      dataIndex: 'diseaseName',
    },{
      title: '疾病标签',
      dataIndex: 'diseaseLabel',
    },
    {
      title: '账号状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'disable' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '200px',
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]

  export default {
    name: 'TableList',
    components: {
      STable,
      CreateForm,
      ButtonExport,
      SearchForm,
      ButtonDelete
    },
    data() {
      return {
        searchList: [{
          field: 'name',
          label: '医生姓名'
        },{
          field: 'phone',
          label: '医生手机号'
        },{
          field: 'hospitalName',
          label: '医院'
        },{
          field: 'deptName',
          label: '科室'
        },{
          field: 'diseaseName',
          label: '疾病标签'
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
          return doctorList(requestParameters)
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
        this.selectedRows = [];
        this.selectedRowKeys = [];
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
            if(values.diseaseLabel.length > 3){
              this.confirmLoading = false
              return this.$message.warning('最多选择三个疾病标签，请调整');
            }
            if(values.diseaseLabel.join){
              values.diseaseLabel = values.diseaseLabel.join(',');
            }
            const result = await doctorSave(values)
            if(result.success){
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
      handleDetail({ id }) {
        this.$router.push({
          name: 'DoctorDetail', query: {
            id
          }
        })
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
      async onDisableChange(record) {
        if (record.status === 1) {
          this.$confirm({
            content: `禁用后用户不可在手机端正常登录，确认是否禁用`,
            onOk: async () => {
              const result = await doctorDisable(record.id)
              if (result.success) {
                this.$message.info(`禁用成功`)
                await this.$refs.table.refresh()
              } else {
                this.$message.error(result.msg)
              }
            }
          })
        } else {
          const result = await doctorEnable(record.id)
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
