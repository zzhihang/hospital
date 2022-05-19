<template>
  <a-modal
    title="就诊人信息"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item>
          <a-input style="display: none" v-decorator="['id']" />
        </a-form-item>
        <a-form-item label="就诊人姓名">
          <a-input placeholder="请输入姓名" v-decorator="['name', {rules: [{required: true, message: '请输入'}]}]" />
        </a-form-item>
        <a-form-item label="就诊人性别">
          <a-select v-decorator="['sex', {rules: [{required: true, message: '请输入'}]}]"
                    placeholder="请选择性别"
          >
            <a-select-option
              v-for="(item, index) in SEX_TYPE"
              :key="index"
              :value="item.value">
              {{item.text}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="身份证号">
          <a-input placeholder="请输入身份证号" v-decorator="['idNumber', {rules: [{required: true, message: '请输入'}, IDCARD_VALIDATE]}]" />
        </a-form-item>
        <a-form-item label="所在地区">
          <a-input placeholder="请输入所在地区" v-decorator="['province', {rules: [{required: true, message: '请输入'}]}]" />
        </a-form-item>
        <a-form-item label="就诊人关系">
          <a-input placeholder="请输入就诊人关系" v-decorator="['relationship', {rules: [{required: true, message: '请输入'}]}]" />
        </a-form-item>
        <a-form-item label="就诊人联系方式">
          <a-input placeholder="请输入联系方式" v-decorator="['phone', {rules: [{required: true, message: '请输入'}, MOBILE_VALIDATE]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { SEX_TYPE } from '@/utils/dict'
import { IDCARD_VALIDATE, MOBILE_VALIDATE } from '@/utils/validator'
// 表单字段
const fields = ['id', 'name', 'sex', 'idNumber', 'relationship', 'phone', 'province']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    },
    createUserId: {},
    createUserUrl: {}
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
      form: this.$form.createForm(this),
      SEX_TYPE: SEX_TYPE,
      MOBILE_VALIDATE: MOBILE_VALIDATE,
      IDCARD_VALIDATE: IDCARD_VALIDATE
    }
  },
  created () {
    fields.forEach(v => this.form.getFieldDecorator(v))
    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
}
</script>
