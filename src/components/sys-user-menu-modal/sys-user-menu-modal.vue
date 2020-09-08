<!--
 vue description

 @author zhanghui
 @date 2020-05-28
 @company Dingxuan
!-->
<template>
  <div>
    <Modal v-model="modalVisiable" draggable width="800">
      <p slot="header">
        <span>
          用户菜单
        </span>
      </p>
      <div>
        <Tree :data="treeData" show-checkbox @on-check-change="treeCheckHandle"/>
      </div>
      <ModalFooter
        slot="footer"
        :submit-loading="submitLoading"
        @cancel="modalVisiable = false"
        @submit="modalSubmitHandle"
      />
    </Modal>
  </div>
</template>

<script>
import { userHasMenusReq, editUserHasMenusReq } from '../../api/userMenu'
import ModalFooter from '../modal-footer/modal-footer'
import { removeArrayRepeat } from '../../libs/commonUtils'

export default {
  name: 'SysUserMenuModal',
  components: { ModalFooter },
  props: {
    checkedId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      modalVisiable: false,
      treeData: [],
      submitLoading: false,
      checkedTree: []
    }
  },
  methods: {
    openModal() {
      this.modalVisiable = true
      this.getTreeData()
    },
    getTreeData() {
      const request = {
        userId: this.checkedId
      }
      userHasMenusReq(request).then(res => {
        this.treeData = res.data
      })
    },
    modalSubmitHandle() {
      this.submitLoading = true
      const request = {
        menuIdList: this.checkedTree,
        userId: this.checkedId
      }
      editUserHasMenusReq(request).then(res => {
        this.$Message.success(res.resultMessage)
      }).finally(() => {
        this.submitLoading = false
        this.modalVisiable = false
      })
    },
    treeCheckHandle(checkedTree) {
      this.checkedTree = []
      const list = []
      if (checkedTree.length > 0) {
        checkedTree.map(item => {
          list.push(item.id)
          if (item.parentId !== this.config.TREE_ROOT) {
            list.push(item.parentId)
          }
        })
        this.checkedTree = removeArrayRepeat(list)
      }
    }
  }
}
</script>

<style scoped>

</style>
