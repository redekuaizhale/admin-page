<template>
  <div class="user-avator-dropdown">
    <Dropdown trigger="click" @on-click="handleClick">
      <span class="login-title">
        您好,{{ userName }}
      </span>
      <Icon type="ios-arrow-down"/>
      <DropdownMenu slot="list">
        <DropdownItem name="info">
          <common-icon :size="15" type="_personinfo"/>
          个人信息
        </DropdownItem>
        <DropdownItem name="password">
          <common-icon :size="15" type="_password"/>
          修改密码
        </DropdownItem>
        <DropdownItem name="logout">
          <common-icon :size="15" type="_logout"/>
          退出登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <ConfirmModal
      ref="confirmModal"
      title="退出确认"
      desc="您点击了退出登录按钮，是否确认退出？"
      @on-confirm-handle="logout"
    />
  </div>
</template>

<script>
import CommonIcon from '../../../common-icon/common-icon'
import ConfirmModal from '../../../confirm-modal/confirm-modal'

export default{
  name: 'User',
  components: { ConfirmModal, CommonIcon },
  data() {
    return {
      userName: '张三',
      logoutModalVisiable: false
    }
  },
  methods: {
    logout() {
      this.utils.removeCookie(this.config.userTokenKey)
      this.utils.removeCookie(this.config.userNameKey)
      this.utils.routerPush('login')
      location.reload()
    },
    handleClick(name) {
      if (name === 'logout') {
        this.$refs.confirmModal.openConfirmModalHandle()
      }
    }
  }
}
</script>

<style lang="less">
  .user-avator-dropdown{
    .login-title{
      font-size: 14px;
      font-weight: 600;
      color: rgba(0,0,0,.65);
      cursor: pointer;
    }
  }
</style>
