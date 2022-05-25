<template>
  <a-modal
    title="创建用户"
    :width="540"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item>
          <a-input style="display: none;" v-decorator="['id']"/>
        </a-form-item>
        <a-form-item :label="field">
          <a-input-number
            v-if="model && [1,2,3].includes(model.id)"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
            :min="0"
            :max="100"
            v-decorator="['val', {rules: [{required: true, message: '请输入'}]}]"
          />
          <a-input-number
            v-else
            :min="0"
            v-decorator="['val', {rules: [{required: true, message: '请输入'}]}]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  // 表单字段
  const fields = ['id', 'val']

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
    data() {
      this.formLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 11 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        },
        field: ''
      }
      return {
        form: this.$form.createForm(this)
      }
    },
    created() {
      fields.forEach(v => this.form.getFieldDecorator(v))
      // 当 model 发生改变时，为表单设置值
      this.$watch('model', () => {
        this.field = this.model.name
        this.model && this.form.setFieldsValue(pick(this.model, fields))
      })
    }
  }
</script>
