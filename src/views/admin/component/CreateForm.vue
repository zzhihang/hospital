<template>
  <a-modal
    title="添加管理员"
    :width="900"
    :height="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    cancelText="取消"
    okText="保存"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form" v-bind="formLayout">
      <a-form-item label="姓名">
        <a-input placeholder="请输入姓名" v-decorator="['name', {rules: [{required: true, message: '请输入'}]}]" />
      </a-form-item>
      <a-form-item label="账号">
        <a-input placeholder="请输入账号" v-decorator="['uid', {rules: [{required: true, message: '请输入'}]}]" />
      </a-form-item>
      <a-form-item label="联系方式">
        <a-input placeholder="请输入联系方式" v-decorator="['phone', {rules: [{required: true, message: '请输入'}]}]" />
      </a-form-item>
      <div class="my-card">
        <a-card title="权限分配：" style="width: 450px" :headStyle="{fontWeight: 'bold'}">
          <a-tree
            checkable
            :defaultExpandAll="true"
            :tree-data="treeData"
            :replaceFields="{title:'name', key:'id' }"
            v-model="checkedKeys"
          >
            <template #title0010><span style="color: #1890ff">sss</span></template>
          </a-tree>
        </a-card>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
  import Vue from 'vue'
  import { Tree } from 'ant-design-vue'
  import { adminInfo, adminSave } from '@/api/adminService'

  Vue.use(Tree)
  export default {
    name: 'RoleModal',
    props: {
      treeData: {
        type: Array,
        default: []
      },
    },
    data () {
      this.formLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        }
      }
      return {
        visible: false,
        checkedKeys: [],
        form: this.$form.createForm(this),
        userInfo: {},
      }
    },
    methods: {
      edit (id) {
        if(id){
          adminInfo(id).then(({data}) => {
            this.userInfo = data;
            this.form.setFieldsValue(this.userInfo);
            this.checkedKeys = data.permissions.map(item => item.id)
          })
        }else{
          this.userInfo = {};
          this.form.resetFields();
          this.checkedKeys = [];
        }
        this.visible = true
      },
      close () {
        this.$emit('close');
        this.visible = false
      },
      handleOk () {
        this.form.validateFields(async (err, values) => {
          values.permissionIds = this.checkedKeys;
          if(this.userInfo.id){
            values.id = this.userInfo.id;
          }
          if (!err) {
            const result = await adminSave(values)
            if(result.success){
              this.$message.success('保存成功');
              this.$emit('saveSuccess')
              this.close();
            }else{
              this.$message.error(result.msg);
            }
          }
        })
      },
      handleCancel () {
        this.close()
      },

    }
  }
</script>

<style lang="less" scoped>
  .my-card{
    overflow-y: scroll;
    max-height: 550px;
    /deep/.ant-card{
      margin: 0 auto;
    }
  }
</style>
