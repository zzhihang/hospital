<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-table
        ref="table"
        size="default"
        :columns="columns"
        :dataSource="list"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">更新</a>
          </template>
        </span>
      </a-table>
    </a-card>
    <create-form
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @ok="handleOk"
      @cancel="handleCancel"
    />
  </page-header-wrapper>
</template>

<script>
  import { dictAllList, dictSave } from '@/api/dictService'
  import CreateForm from './component/CreateForm'

  export default {
    components: {
      CreateForm
    },
    data() {
      return {
        advanced: false,
        visible: false,
        confirmLoading: false,
        mdl: null,
        columns: [
          {
            title: '类型',
            dataIndex: 'name',
            width: '300px'
          },{
            title: '细节',
            dataIndex: 'val',
          },{
            title: '操作',
            width: '150px',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ],
        list: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handleEdit (record) {
        this.visible = true
        this.mdl = { ...record }
      },
      query(){
        this.getList();
      },
      reset(){
        this.queryParam = {};
        this.query()
      },
      handleCancel() {
        this.visible = false
        const form = this.$refs.createModal.form
        form.resetFields() // 清理表单数据（可不做）
      },
      handleOk() {
        const form = this.$refs.createModal.form
        this.confirmLoading = true
        form.validateFields(async (errors, values) => {
          if (!errors) {
            const result = await dictSave(values)
            if (result.success) {
              this.confirmLoading = false
              form.resetFields()
              this.getList()
              this.$message.info('操作成功')
            } else {
              this.$message.error(result.msg);
            }
            this.visible = false;
          } else {
            this.confirmLoading = false
          }
        })
      },
      async getList() {
        const requestParameters = Object.assign({}, this.queryParam)
        const { data } = await dictAllList(requestParameters)
        this.list = data
      },
    }
  }
</script>
