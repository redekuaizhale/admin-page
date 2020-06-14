<template>
  <Card>
    <p slot="title">
      {{ title }}
    </p>
    <div class="content">
      <span class="num-total">
        25,848
      </span>
      <div>

      </div>
      <div>

      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'HomeCardTotal',
  props: {
    title: {
      type: String,
      default: ''
    }

  },
  data() {
    return {

    }
  }

}
</script>

<style lang="less">
  .HomeCardTotal{
    .content{
        border-bottom: 1px solid #e8eaec;
    }
  }

</style>
