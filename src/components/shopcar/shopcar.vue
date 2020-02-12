<template>
  <div class="shopcar">
      <div class="content">
        <div class="content-left">
          <div class="icon-wrapper">
            <div class="icon">
              <i class="icon-shopping_cart"></i>
            </div>
          </div>
          <div class="price">55</div>
          <div class="desc"></div>
        </div>
        <div class="content-right"></div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
  .shopcar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 20;
    height: 48px;
    .content {
      display: flex;
      background-color: #141d27;
      height: 100%;
      font-size: 0;
      .content-left {
        flex: 1;
        .icon-wrapper {
          display: inline-block;
          // width 包 padding,border
          box-sizing: border-box;
          position: relative;
          top: -24px;
          margin: 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #141d27;
          .icon {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background-color: #2b343c;
            .icon-shopping_cart {
              line-height: 44px;
              vertical-align: bottom;
             color: #80858a;
             font-size: 26px;
           }
          }

        }
        .price {
          display: inline-block;
          // margin-top: 14px;
          position: relative;
          top: 8px;
          font-size: 16px;
          color: #80858a;
          font-weight: 700;
          line-height: 12px;
          padding: 8px;
          padding-right: 12px;
          border-right: 1px solid #80858a;
        }
      }
      .content-right {
        width: 105px;
        background-color: #fff;
      }
    }
  }

</style>
