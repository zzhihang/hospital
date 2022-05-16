<template>
  <div>
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
      <a-row :gutter="24" type="flex">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
         <Card1 />
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
         <Card2 />
        </a-col>
      </a-row>
      <a-row :gutter="24" type="flex"  :style="{ marginTop: '24px' }">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <Card3 />
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <Card4 />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { baseMixin } from '@/store/app-mixin'
  import Card1 from '@/views/dashboard/Card1'
  import Card2 from '@/views/dashboard/Card2'
  import Card3 from '@/views/dashboard/Card3'
  import Card4 from '@/views/dashboard/Card4'

export default {
  name: 'Analysis',
  mixins: [baseMixin],
  components: {
    Card1,
    Card2,
    Card3,
    Card4
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
</style>
