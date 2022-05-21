<template>
  <page-header-wrapper>
    <div class="account-settings-info-view">
      <a-row :gutter="16" type="flex" justify="center">
        <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">
          <a-form layout="vertical">
            <a-form-item
              label="原密码"
              :required="true"
            >
              <a-input-password v-model="oldPass" placeholder="请输入原密码"/>
            </a-form-item>

            <a-form-item
              label="新密码"
              :required="true"
            >
              <a-input-password v-model="newPass" placeholder="请输入新密码"/>
            </a-form-item>
            <a-form-item
              label="确认密码"
              :required="true"
            >
              <a-input-password v-model="checkPass" placeholder="请再次确认密码"/>
            </a-form-item>


            <a-form-item style="text-align: center">
              <a-button type="primary" @click="onSaveClick">保存</a-button>
              <a-button style="margin-left: 10px;" @click="$router.go(-1)">取消</a-button>
            </a-form-item>
          </a-form>

      </a-col>
      <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <!--<div class="ant-upload-preview" @click="$refs.modal.edit(1)" >-->
          <!--<div class="mask">-->
            <!--<a-icon type="plus" />-->
          <!--</div>-->
          <!--<img :src="option.img"/>-->
        <!--</div>-->
      </a-col>

      </a-row>

    </div>
  </page-header-wrapper>
</template>

<script>
  import { baseMixin } from '@/store/app-mixin'
  import md5 from 'md5'
  import { adminChangePassword } from '@/api/adminService'

  export default {
    mixins: [baseMixin],
    data() {
      return {
        oldPass: '',
        newPass: '',
        checkPass: ''
      }
    },
    created() {

    },
    methods: {
      async onSaveClick() {
        const params = {
          oldPass: this.oldPass,
          newPass: this.newPass
        }
        if(!this.oldPass.length || !this.newPass.length || !this.checkPass.length){
          return this.$message.warning('请填写必填项')
        }
        if (this.newPass !== this.checkPass) {
          return this.$message.error('两次输入密码不一致，请检查！')
        }
        params.oldPass = md5(params.oldPass)
        params.newPass = md5(params.newPass)
        const result = await adminChangePassword(params)
        if (result.success) {
          this.$message.success('操作成功')
        } else {
          this.$message.error(result.msg)
        }
      }
    }
  }
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
