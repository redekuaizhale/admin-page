<template>

  <Card>
    <p slot="title">
      <CommonIcon type="_org"/>
      机构管理
    </p>
    <div>
      <Tree :data="treeData" :render="renderContent"/>
    </div>
    <SysCompanyModal ref="SysCompanyModal" :read-only="readOnly" :parent-id="parentId"/>
  </Card>
</template>
<script>
import CommonIcon from '../../components/common-icon/common-icon'
import SysCompanyModal from '../../components/sys-company-modal/sys-company-modal'
import { companyTreeReq } from '../../api/company'

export default {
  name: 'SysCompany',
  components: { SysCompanyModal, CommonIcon },
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
                width: '500px'
              }
            }, [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
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
              }, [
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
                    click: () => { this.append(data) }
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
              ])
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
      parentId: ''
    }
  },
  created() {
    this.getCompanyTree()
  },
  methods: {
    getCompanyTree() {
      companyTreeReq({}).then(res => {
        if (res.data) {
          const { id, fullName, children } = res.data
          this.treeData[0].id = id
          this.treeData[0].title = fullName
          this.treeData[0].detail = res.data
          if (children) {
            this.treeData[0].children = children
          }
        }
      })
    },
    addCompanyHandle(data) {
      this.parentId = data.id
      this.$refs.SysCompanyModal.openModal('新增', true, null)
    },
    editCompanyHandle(data) {
      const { nodeKey, parentId } = data
      this.parentId = parentId
      const curData = nodeKey === 0 ? data.detail : data
      curData.area = this.utils.splitArea(curData.area)

      console.info('curData', curData)
      this.$refs.SysCompanyModal.openModal('修改', false, curData)
    },
    renderContent(h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '482px'
        }
      }, [
        h('span', [
          h('Icon', {
            props: {
              type: 'ios-paper-outline'
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
        }, [
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'md-create',
              type: 'primary'
            }),
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => { this.append(data) }
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
              click: () => { this.remove(root, node, data) }
            }
          }, '详情'),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-trash',
              type: 'primary'
            }),
            on: {
              click: () => { this.remove(root, node, data) }
            }
          }, '删除')
        ])
      ])
    },
    append(data) {
      const children = data.children || []
      children.push({
        title: 'appended node',
        expand: true
      })
      this.$set(data, 'children', children)
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    }
  }
}
</script>
<style lang="less">
</style>
