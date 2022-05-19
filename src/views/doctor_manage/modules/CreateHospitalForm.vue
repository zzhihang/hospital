<template>
  <a-modal
    title="医院信息"
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
        <a-form-item label="医院名称">
          <a-input placeholder="请输入医院名称" v-decorator="['name', {rules: [{required: true, message: '请输入'}]}]" />
        </a-form-item>
        <a-form-item label="医院地址">
          <a-input placeholder="请输入医院地址" v-decorator="['addr', {rules: [{required: true, message: '请输入'}]}]" />
        </a-form-item>
        <a-form-item label="备注">
          <a-textarea placeholder="请输入备注" v-decorator="['descr']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
// 表单字段
const fields = ['name', 'addr', 'descr', 'id']

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
      form: this.$form.createForm(this)
    }
  },
  created () {
    fields.forEach(v => this.form.getFieldDecorator(v))
    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    onCopy(e) {
      this.$message.info('复制成功')
    }
  }
}
</script>
