<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-form :list="searchList" @search="onSearch">
          <a-button type="primary" @click="handleEdit">新增</a-button>
        </search-form>
      </div>

      <s-table
        style="margin-top: 10px;"
        ref="table"
        size="default"
        rowKey="key"
        :scroll="{x: 1500}"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>

          <div slot="tags" slot-scope="text, record, index" style="text-align: left">
            <a-tag
              v-for="(tag, i) in text && text.split(',')"
              :key="i"
              style="margin-bottom: 10px;"
              :color="['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'][i % 7]"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </div>
        <span slot="disable" slot-scope="text, record, index">
          <a-switch :checked="String(text) === '1'" checked-children="启用中" un-checked-children="禁用中"
                    @change="onDisableChange(record)"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical"/>
            <a @click="handleReset(record)">恢复密码</a>
            <a-divider type="vertical"/>
            <a @click="handleDel(record)">删除</a>
          </template>
        </span>
      </s-table>
      <create-form
        ref="modal"
        :tree-data="treeData"
        @saveSuccess="$refs.table.refresh()"
        @ok="handleOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { SearchForm, STable } from '@/components'
  import createForm from './component/CreateForm'
  import ButtonExport from '@/components/ButtonExport/ButtonExport'
  import { adminDelete, adminDisable, adminEnable, adminList, adminResetPass } from '@/api/adminService'
  import { sysMenus } from '@/api/system'
  import { arrayToTree } from '@/utils/util'

  const columns = [
    {
      title: '序号',
      scopedSlots: { customRender: 'serial' },
      width: '100px'
    },
    {
      title: '账号',
      dataIndex: 'uid',
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
      title: '账号状态',
      dataIndex: 'status',
      fixed: 'right',
      scopedSlots: { customRender: 'disable' }
    },{
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: '200px',
      scopedSlots: { customRender: 'action' }
    }
  ]

  export default {
    name: 'TableList',
    components: {
      STable,
      ButtonExport,
      SearchForm,
      createForm
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
        confirmLoading: false,
        mdl: null,
        columns,
        treeData: [],
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
    created() {
      this.getSysAllPermission()
    },
    methods: {
      async getSysAllPermission() {
        const { data } = await sysMenus()
        this.treeData = arrayToTree(data)
      },
      onSearch(params){
        this.queryParam = params;
        this.$refs.table.refresh(true)
      },
      handleEdit({id}) {
        this.$refs.modal.edit(id)
      },
      handleOk() {
        // 新增/修改 成功时，重载列表
        this.$refs.table.refresh()
      },
      handleDel({id}){
        this.$confirm({
          content: `是否确认删除此管理员？`,
          onOk: async () => {
            const result = await adminDelete([id])
            if (result.success) {
              this.$message.info(`删除成功`)
              await this.$refs.table.refresh()
            } else {
              this.$message.error(result.msg)
            }
          }
        })
      },
      handleReset({id}){
        this.$confirm({
          content: `是否恢复此管理员默认密码:qwer1234`,
          onOk: async () => {
            const result = await adminResetPass(id)
            if (result.success) {
              this.$message.info(`操作成功`)
              await this.$refs.table.refresh()
            } else {
              this.$message.error(result.msg)
            }
          }
        })
      },
      async onDisableChange(record) {
        if (record.status === 1) {
          this.$confirm({
            content: `禁用后用户不可登录系统,确定禁用吗？`,
            onOk: async () => {
              const result = await adminDisable(record.id)
              if (result.success) {
                this.$message.info(`禁用成功`)
                await this.$refs.table.refresh()
              } else {
                this.$message.error(result.msg)
              }
            }
          })
        } else {
          const result = await adminEnable(record.id)
          if (result.success) {
            this.$message.info(`启用成功`)
            await this.$refs.table.refresh()
          } else {
            this.$message.error(result.msg)
          }
        }
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
