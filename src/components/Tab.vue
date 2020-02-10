<template>
  <div class="tab border-1px">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
       <router-link to="/comment">评论</router-link>
    </div>
    <div class="tab-item">
       <router-link to="/merchant">商家</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../styles/index.less';
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 1;
  // border-bottom: 1px solid rgba(7,17,27,0.1);
  .border-1px(rgba(7,17,27,0.1));
  .tab-item {
    flex: 1;
    text-align: center;
    &>a{
      display: block;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      color: rgb(77,85,93);
    }
     .router-link-exact-active,
      .router-link-active {
        color: rgb(240,20,20);
      }

  }
}

</style>
