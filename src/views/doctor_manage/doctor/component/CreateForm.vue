<template>
  <a-modal
    title="医生信息"
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
        <a-form-item label="医生姓名">
          <a-input placeholder="请输入医生姓名" v-decorator="['name', {rules: [{required: true, message: '请输入'}]}]" />
        </a-form-item>
        <a-form-item label="医生手机号">
          <a-input placeholder="请输入医生手机号" v-decorator="['phone', {rules: [{required: true, message: '请输入'}, MOBILE_VALIDATE]}]" />
        </a-form-item>
        <a-form-item label="医院">
          <a-select v-decorator="['hospitalId', {rules: [{required: true, message: '请输入'}]}]"
                    placeholder="请选择医院"
          >
            <a-select-option
              v-for="(item, index) in hospitalList"
              :key="index"
              :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="科室">
          <a-select v-decorator="['deptId', {rules: [{required: true, message: '请输入'}]}]"
                    placeholder="请选择科室"
          >
            <a-select-option
              v-for="(item, index) in departmentList"
              :key="index"
              :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="职称">
          <a-input placeholder="请输入职称" v-decorator="['title', {rules: [{required: true, message: '请输入'}]}]" />
        </a-form-item>
        <a-form-item label="疾病类型">
          <a-select v-decorator="['diseaseId', {rules: [{required: true, message: '请输入'}]}]"
                    @change="onDiseaseChange"
                    placeholder="请选择疾病类型"
          >
            <a-select-option
              v-for="(item, index) in diseaseList"
              :key="index"
              :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="疾病标签">
          <a-select
            v-decorator="['diseaseLabel', {rules: [{required: true, message: '请输入'}]}]"
            mode="tags"
            style="width: 100%"
            placeholder="请选择疾病标签"
            :maxTagCount="3"
          >
            <a-select-option
              v-for="(item, index) in diseaseLabelList"
              :key="index"
              :value="item">
              {{item}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="专业擅长">
          <a-textarea placeholder="请输入专业擅长" v-decorator="['major', {rules: [{required: true, message: '请输入'}]}]" />
        </a-form-item>
        <a-form-item label="个人简介">
          <a-textarea placeholder="请输入个人简介" v-decorator="['introduction', {rules: [{required: true, message: '请输入'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { dictDepartment, dictDisease, dictHospital } from '@/api/dictService'
import { MOBILE_VALIDATE } from '@/utils/validator'
// 表单字段
const fields = ['id', 'name', 'phone', 'hospitalId', 'deptId', 'title', 'diseaseId', 'major', 'introduction', 'diseaseLabel']

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
      departmentList: [],
      hospitalList: [],
      diseaseList: [],
      diseaseLabelList: [],
      MOBILE_VALIDATE: MOBILE_VALIDATE
    }
  },
  created () {
    dictDepartment().then(({data}) => {
      this.departmentList = data;
    });
    dictDisease().then(({data}) => {
      this.diseaseList = data;
    });
    dictHospital().then(({data}) => {
      this.hospitalList = data;
    })
    fields.forEach(v => this.form.getFieldDecorator(v))
    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    onDiseaseChange(e) {
      const finder = this.diseaseList.find(item => item.id === e);
      this.diseaseLabelList = finder.diseaseLabel
    },
  }
}
</script>
