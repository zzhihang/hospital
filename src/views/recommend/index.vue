<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-table
        style="margin-top: 10px;"
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data-source="tableData"
        :pagination="false"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">更改</a>
          </template>
        </span>
      </a-table>
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
  import CreateForm from './component/CreateForm'
  import SearchForm from '@/components/SearchForm/SearchForm'
  import { recommendList, recommendSave } from '@/api/recommendService'

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
      title: '医院',
      dataIndex: 'hospitalName',
    },{
      title: '科室',
      dataIndex: 'deptName',
    },{
      title: '职称',
      dataIndex: 'title',
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
      CreateForm,
      SearchForm
    },
    data() {
      return {
        visible: false,
        confirmLoading: false,
        mdl: null,
        tableData: [],
        columns,
      }
    },
    created(){
      this.getList();
    },
    methods: {
      getList(){
        recommendList().then(({data}) => {
          this.tableData = data;
        })
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
            values.id = this.mdl.id;
            const result = await recommendSave(values)
            if(result.success){
              form.resetFields()
              this.getList();
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
