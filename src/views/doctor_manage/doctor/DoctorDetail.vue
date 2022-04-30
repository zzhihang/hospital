<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-descriptions title="基本信息">
        <a-descriptions-item label="医生姓名">{{data.name}}</a-descriptions-item>
        <a-descriptions-item label="医生手机号">{{data.phone}}</a-descriptions-item>
        <a-descriptions-item label="医院">{{data.hospitalName}}</a-descriptions-item>
        <a-descriptions-item label="科室">{{data.deptName}}</a-descriptions-item>
        <a-descriptions-item label="职称">{{data.title}}</a-descriptions-item>
        <a-descriptions-item label="疾病类型">{{data.diseaseName}}</a-descriptions-item>
        <a-descriptions-item label="疾病标签">{{data.diseaseLabel}}</a-descriptions-item>
        <a-descriptions-item label="专业擅长">{{data.major}}</a-descriptions-item>
        <a-descriptions-item label="个人简介">{{data.introduction}}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <div class="title">服务项目列表</div>
      <a-table
        style="margin-top: 10px"
        row-key="id"
        :pagination="false"
        :columns="goodsColumns"
        :data-source="tableData">
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import Vue from 'vue'
  import { userDisable, userEnable, userQuery, userSaveServiceRate } from '@/api/userService'
  import EditServiceRate from '@/views/user/modules/EditServiceRate'
  import { doctorInfo } from '@/api/doctorService'

  export default {
    components: {
      EditServiceRate
    },
    data() {
      return {
        data: {},
        goodsColumns: [{
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
        }],
        tableData: [],
        visible: false,
        confirmLoading: false,
        mdl: null,
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      async getUserInfo() {
        const { data } = await doctorInfo(this.$route.query.id)
        this.data = data.doctor;
        this.tableData = data.gsList;
      },
      handleOk () {
        const form = this.$refs.createModal.form
        this.confirmLoading = true
        form.validateFields(async (errors, values) => {
          if (!errors) {
            values.id = this.data.id;
            const result = await userSaveServiceRate(values);
            if(result.success){
              this.$message.info('修改成功')
              this.visible = false
              this.confirmLoading = false
              form.resetFields()
              await this.getUserInfo();
            }else{
              this.$message.error(result.msg);
            }
          } else {
            this.confirmLoading = false
          }
        })
      },
      onEditClick(){
        this.mdl = null
        this.visible = true
      },
      handleCancel () {
        this.visible = false
        const form = this.$refs.createModal.form
        form.resetFields() // 清理表单数据（可不做）
      },
    }
  }
</script>

<style lang="less" scoped>
  .title {
    color: rgba(0, 0, 0, .85);
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  .my-style{
      /deep/.ant-descriptions-item{
        display: flex;
        align-items: center;
      }
  }

</style>
