<template>
  <Layout class="main">
    <Sider v-model="collapsed" :collapsed-width="64" :style="{overflow: 'hidden'}" width="256px;" hide-trigger collapsible class="left-sider">
      <side-menu ref="sideMenu" :collapsed="collapsed" accordion @turn-to-page="turnToPage">
        <div v-if="!collapsed" class="logo-con">
          <div class="title">
            {{ projecName }}
          </div>
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user />
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <router-view />
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import User from './components/user'
import './main.less'

export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    User
  },
  data() {
    return {
      isFullscreen: false
    }
  },
  computed: {
    collapsed() {
      return this.$store.state.collapsed
    },
    projecName() {
      return this.config.TITLE
    }
  },
  methods: {
    turnToPage(route) {
      this.$router.push({ name: route })
    },
    handleCollapsedChange(state) {
      this.$store.dispatch('setCollapsed', state)
    },
    handleClick(item) {
      this.turnToPage(item)
    }
  }
}
</script>
