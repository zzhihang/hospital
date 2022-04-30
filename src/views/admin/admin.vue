<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-form :list="searchList" @search="onSearch">
          <button-export
            style="margin-left: 8px"
            :ids="selectedIds"
            url="/sysdept/export"
          >导出</button-export>
        </search-form>
      </div>

      <s-table
        style="margin-top: 10px;"
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>

          <div slot="tags" slot-scope="text, record, index" style="text-align: left">
            <a-tag
              v-for="(tag, i) in text.split(',')"
              :key="tag"
              style="margin-bottom: 10px;"
              :color="['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'][i % 7]"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </div>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDetail(record)">编辑</a>
            <a-divider type="vertical"/>
            <a @click="handleDetail(record)">恢复密码</a>
            <a-divider type="vertical"/>
            <a @click="handleDetail(record)">删除</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>a

<script>
  import { SearchForm, STable } from '@/components'
  import { ENABLE_STATUS } from '@/utils/dict'
  import ButtonExport from '@/components/ButtonExport/ButtonExport'
  import { adminList } from '@/api/adminService'

  const columns = [
    {
      title: '序号',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: '账号',
      dataIndex: 'uid'
    },{
      title: '姓名',
      dataIndex: 'name'
    },{
      title: '联系方式',
      dataIndex: 'phone'
    },{
      title: '权限',
      dataIndex: 'permissionsStr',
      align: 'center',
      width: '600px',
      scopedSlots: { customRender: 'tags' }
    },{
      title: '操作',
      dataIndex: 'action',
      width: '200px',
      scopedSlots: { customRender: 'action' }
    }
  ]

  export default {
    name: 'TableList',
    components: {
      STable,
      ButtonExport,
      SearchForm
    },
    data() {
      return {
        searchList: [{
          field: 'uid',
          label: '账号'
        },{
          field: 'name',
          label: '姓名'
        },{
          field: 'phone',
          label: '联系方式',
        }],
        visible: false,
        popVisible: false,
        confirmLoading: false,
        mdl: null,
        columns,
        queryParam: {},
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          return adminList(requestParameters)
            .then(res => {
              return res.data
            })
        },
      }
    },
    methods: {
      onSearch(params){
        this.queryParam = params;
        this.$refs.table.refresh(true)
      },
      handleDetail({ id }) {
        this.$router.push({
          name: 'income', query: {
            id
          }
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  /deep/ .ant-form-item-children {
    display: flex;
  }

  /deep/ .ant-checkbox-group-item {
    display: block;
  }
</style>
