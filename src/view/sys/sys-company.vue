<template>
  <Card>
    <p slot="title">
      <CommonIcon type="_org" />
      机构管理
      <Checkbox v-model="edit" style="margin-left: 10px;">
        操作
      </Checkbox>
    </p>
    <div>
      <Tree :data="treeData" :render="renderContent" />
    </div>
    <SysCompanyModal ref="SysCompanyModal" :read-only="readOnly" :parent-id="parentId" @update-company="getCompanyTree" />
    <ConfirmModal ref="ConfirmModal" @on-confirm-handle="confirmDeleteHandle" />
  </Card>
</template>
<script>
import SysCompanyModal from '../../components/sys-company-modal/sys-company-modal'
import { companyTreeReq, companyDeleteReq } from '../../api/company'
import ConfirmModal from '../../components/confirm-modal/confirm-modal'
import { success } from '../../libs/commonUtils'

export default {
  name: 'SysCompany',
  components: { ConfirmModal, SysCompanyModal },
  data() {
    return {
      treeData: [
        {
          root: true,
          id: '',
          title: '',
          detail: {},
          expand: true,
          render: (h, { root, node, data }) => {
            return h('span', {
              style: {
                display: 'inline-block',
                width: '600px'
              }
            }, [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-home',
                    size: 18
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', data.title)
              ]),
              h('span', {
                style: {
                  display: 'inline-block',
                  float: 'right'
                }
              }, this.edit ? [
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'md-create',
                    type: 'primary'
                  }),
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => { this.editCompanyHandle(data.detail) }
                  }
                }, '修改'),
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-more',
                    type: 'primary'
                  }),
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => { this.viewCompanyHandle(data.detail) }
                  }
                }, '详情'),
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'md-add',
                    type: 'primary'
                  }),
                  style: {
                  },
                  on: {
                    click: () => { this.addCompanyHandle(data) }
                  }
                }, '新增')
              ] : [])
            ])
          },
          children: []
        }
      ],
      buttonProps: {
        type: 'default',
        size: 'small'
      },
      readOnly: false,
      parentId: '',
      id: '',
      edit: false
    }
  },
  created() {
    this.getCompanyTree()
  },
  methods: {
    getCompanyTree() {
      this.treeData[0].children = []
      companyTreeReq({}).then(res => {
        if (res.data) {
          const { id, fullName, children } = res.data
          this.treeData[0].id = id
          this.treeData[0].title = fullName
          this.treeData[0].detail = res.data
          if (children) {
            for (const item of children) {
              item.title = item.name
            }
            this.treeData[0].children = children
          }
        }
      })
    },
    addCompanyHandle(data) {
      this.readOnly = false
      this.parentId = data.id
      this.$refs.SysCompanyModal.openModal('新增', true, null)
    },
    editCompanyHandle(data) {
      this.readOnly = false
      this.parentId = data.parentId
      this.$refs.SysCompanyModal.openModal('修改', false, data)
    },
    viewCompanyHandle(data) {
      this.readOnly = true
      this.$refs.SysCompanyModal.openModal('详情', false, data)
    },
    deleteCompanyHandle(data) {
      this.id = data.id
      this.$refs.ConfirmModal.openConfirmModalHandle()
    },

    confirmDeleteHandle() {
      companyDeleteReq({ id: this.id }).then(res => {
        success(res.resultMessage)
        this.getCompanyTree()
      })
    },
    renderContent(h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '582px'
        }
      }, [
        h('span', [
          h('Icon', {
            props: {
              type: 'ios-cube',
              size: 15
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data.title)
        ]),
        h('span', {
          style: {
            display: 'inline-block',
            float: 'right'
          }
        }, this.edit ? [
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'md-create',
              type: 'primary'
            }),
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => { this.editCompanyHandle(data) }
            }
          }, '修改'),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-more',
              type: 'primary'
            }),
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => { this.viewCompanyHandle(data) }
            }
          }, '详情'),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-trash',
              type: 'primary'
            }),
            on: {
              click: () => { this.deleteCompanyHandle(data) }
            }
          }, '删除')
        ] : [])
      ])
    }
  }
}
</script>
<style lang="less">
</style>
