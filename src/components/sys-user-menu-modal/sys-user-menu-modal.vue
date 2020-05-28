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
import { userHasMenusReq } from '../../api/userMenu'
import ModalFooter from '../modal-footer/modal-footer'

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
        userEntity: {
          id: this.checkedId
        }
      }
      userHasMenusReq(request).then(res => {
        this.treeData = res.data
      })
    },
    modalSubmitHandle() {

    },
    treeCheckHandle(checkedTree) {
      this.checkedTree = []
      if (checkedTree.length > 0) {
        checkedTree.map(item => {
          this.checkedTree.push({
            id: item.id
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
