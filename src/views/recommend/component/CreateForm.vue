<template>
  <a-modal
    title="推荐医生"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item label="医生姓名">
          <a-select v-decorator="['doctorId', {rules: [{required: true, message: '请输入'}]}]"
                    @change="onDiseaseChange"
                    :filter-option="filterOption"
                    placeholder="请选择医生姓名"
                    :options="doctorList"
                    show-search
          >
          </a-select>
        </a-form-item>
        <a-form-item label="医生手机号">
          <a-input disabled v-decorator="['phone']"/>
        </a-form-item>
        <a-form-item label="医院">
          <a-input disabled v-decorator="['hospitalName']"/>
        </a-form-item>
        <a-form-item label="科室">
          <a-input disabled v-decorator="['deptName']"/>
        </a-form-item>
        <a-form-item label="职称">
          <a-input disabled v-decorator="['title']"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import { dicDoctor } from '@/api/dictService'
  // 表单字段
  const fields = ['name', 'phone', 'hospitalName', 'deptName', 'doctorId', 'title']

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
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        }
      }
      return {
        form: this.$form.createForm(this),
        doctorList: [],
        diseaseLabel: ''
      }
    },
    created() {
      dicDoctor().then(({ data }) => {
        data.forEach(item => {
          item.label = item.name
          item.value = item.id
        })
        this.doctorList = data
      })
      fields.forEach(v => this.form.getFieldDecorator(v))
    },
    methods: {
      filterOption(inputValue, option) {
        return option.data.props.name.indexOf(inputValue.trim()) >= 0
      },
      onDiseaseChange(e, option) {
        const doctorInfo = option.data.props
        this.form.setFieldsValue(pick(doctorInfo, fields))
      }
    }
  }
</script>
