<template>
  <a-form layout="inline" ref="searchForm">
    <a-row :gutter="48">
      <template v-for="(item, index) in list">
        <a-col :md="8" :sm="24" :key="index">
          <a-form-item :label="item.label">
            <a-select v-if="item.type === 'select'"
                      v-model="queryParams[item.field]"
                      :placeholder="`请选择${item.label}`"
                      default-value=""
            >
              <a-select-option
                v-for="(child, index) in item.options"
                :key="index"
                :value="child.value">
                {{child.text}}
              </a-select-option>
            </a-select>
            <a-range-picker
              v-else-if="item.type === 'dateRange'"
              @change="onPickerChange"
              v-model:value="queryParams[item.field]"
              placeholder="请选择起始时间"
            />
            <a-input v-else v-model="queryParams[item.field]" :placeholder="`请输入${item.label}`"/>
          </a-form-item>
        </a-col>
      </template>
      <a-col :md="24" :sm="24" class="action-box">
        <div>
          <slot></slot>
        </div>
        <div>
          <a-button type="primary" @click="search">查询</a-button>
          <a-button style="margin-left: 8px" @click="reset">重置</a-button>
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'SearchForm',
    props: {
      list: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        queryParams: {}
      }
    },
    methods: {
      reset() {
        this.queryParams = {};
        this.$emit('search', {});//重置查询条件同时重置表格
      },
      search() {
        const params = this.queryParams
        this.$emit('search', params)
      },
      onPickerChange(e){//这样写可能会报错,但是目前看来不影响什么,先这样吧.
        if(e){
          e[0] = e[0].format('YYYY-MM-DD');
          e[1] = e[1].format('YYYY-MM-DD');
        }
      }
    },
    watch: {
      list: {
        handler() {
          const queryParams = {}
          this.list.forEach(item => {
            queryParams[item.field] = ''
          })
          this.queryParams = queryParams
        },
        immediate: true,
        deep: true
      }
    }
  }
</script>

<style lang="less" scoped>
  .action-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>