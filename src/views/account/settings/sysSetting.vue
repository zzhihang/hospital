<template>
  <page-header-wrapper>
    <a-card title="移动端图片管理">
      <a-table :columns="columns" :data-source="dataSource" :pagination="false">
        <span slot="action" slot-scope="text, record">
          <template>
            <a-upload
              name="file"
              :show-upload-list="false"
              :beforeUpload="beforeUpload"
            >
              <a>更新</a>
            </a-upload>
          </template>
        </span>
        <span slot="img" slot-scope="text, record">
          <img class="table-image" :src="text" width="100" alt="">
        </span>
      </a-table>
    </a-card>
    <a-card title="客服电话设置">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item label="显示方式">
          <a-radio-group
            button-style="solid"
            v-model="customerType"
            @change="onRadioChange"
          >
            <a-radio-button value="txt">文本</a-radio-button>
            <a-radio-button value="img">图片</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="文本内容" v-if="customerType === 'txt'">
          <a-input placeholder="请输入文本内容" v-model="customerTel" />
        </a-form-item>
        <a-form-item label="客服图片" v-if="customerType === 'img'">
          <a-upload
            name="file2"
            :show-upload-list="false"
            :beforeUpload="beforeUpload2"
          >
            <img :src="customerImg" alt="" width="100" style="display: block;margin-bottom: 10px">
            <a-button>点击上传</a-button>
          </a-upload>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">保存</a-button>
          <a-button style="margin-left: 10px" @click="$router.go(-1)">取消</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import AvatarModal from './AvatarModal'
  import { baseMixin } from '@/store/app-mixin'
  import { saveCustomerImg, saveCustomerTel, sysSaveLogo, sysSettingGet } from '@/api/system'

  export default {
    mixins: [baseMixin],
    components: {
      AvatarModal
    },
    data() {
      this.formLayout = {
        labelCol: {
          xs: { span: 12 },
          sm: { span: 2 }
        },
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 6 }
        }
      }
      return {
        dataSource: [],
        columns: [{
          dataIndex: 'type',
          title: '类型'
        }, {
          dataIndex: 'img',
          title: '图片',
          scopedSlots: { customRender: 'img' }
        }, {
          dataIndex: 'action',
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }],
        customerType: 'txt',
        customerTel: '',
        customerImg: '',
        form: this.$form.createForm(this),
      }
    },
    created() {
      this.sysSettingGet();
    },
    methods: {
      async sysSettingGet(updateTable){
        const {data} = await sysSettingGet();
        this.dataSource = [];
        this.dataSource.push({
          type: '登录页面logo图',
          img: data.logo
        })
        if(updateTable === false){
          return
        }
        this.customerType = data.customerType;
        this.customerImg = data.customerImg;
        this.customerTel = data.customerTel;
      },
      onRadioChange(e){
        this.customerType = e.target.value;
      },
      async beforeUpload(file) {
        const formData = new FormData()
        formData.append('file', file)
        const {data} = await this.$http.post('/upload', formData, {
          contentType: false,
          processData: false,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        const result = await sysSaveLogo(data.url);
        if(result.success){
          this.$message.success('修改成功');
          this.sysSettingGet(false);
        }else{
          this.$message.error(result.msg);
        }
      },
      async beforeUpload2(file){
        const formData = new FormData()
        formData.append('file', file)
        const {data} = await this.$http.post('/upload', formData, {
          contentType: false,
          processData: false,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        this.customerImg = data.url
      },
      async onSubmit(){
        if(this.customerType === 'txt'){
          if(!this.customerTel){
            return this.$message.warning('请填写客服文本信息')
          }
          const result = await saveCustomerTel(this.customerTel)
          if(result.success){
            this.$message.success('操作成功，客服消息已更改为文本格式')
          }else{
            this.$message.error(result.msg)
          }
        }else{
          if(!this.customerImg){
            return this.$message.warning('请上传客服图片')
          }
          const result = await saveCustomerImg(this.customerImg)
          if(result.success){
            this.$message.success('操作成功，客服消息已更改为图片格式')
          }else{
            this.$message.error(result.msg)
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
