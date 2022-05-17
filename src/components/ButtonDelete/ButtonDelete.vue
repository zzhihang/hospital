<template>
  <div style="display: inline-block">
    <a-button type="primary" @click="deleteClick">
      <slot></slot>
    </a-button>
  </div>
</template>

<script>
  import request from '@/utils/request'

  export default {
    props: {
      url: {
        type: String,
        default: ''
      },
      ids: {
        type: Array,
        default: []
      },
    },
    methods: {
      async deleteClick(){
        if(!this.ids.length){
          return this.$message.warning(`请选择要操作的数据`)
        }
        this.$confirm({
          content: `确定删除吗？`,
          onOk: async () => {
            const result = await request({
              url: this.url,
              method: 'post',
              data: {ids: this.ids}
            })
            if (result.success) {
              this.$message.info(`删除成功`)
              this.$emit('deleteSuccess')
              //await this.$refs.table.refresh()
            } else {
              this.$message.error(result.msg)
            }
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  /deep/.ant-input-affix-wrapper .ant-input-suffix{
    right: 0;
  }
</style>