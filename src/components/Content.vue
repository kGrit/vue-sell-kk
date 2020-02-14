<template>
  <div class="content">
    <!-- 这是内容区域 -->
    <router-view :sellers="this.sellers"></router-view>
  </div>
</template>

<script>
export default {
  props: {
    sellers: {
      type: Object
    }
  }

}
</script>

<style>

</style>
