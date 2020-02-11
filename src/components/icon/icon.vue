<template>
  <div class="icon" >
  </div>
</template>

<script>
export default {

  // data () {
  //   return {
  //     icon: ['decrease', 'descount', 'guarantee', 'invoice', 'special']
  //   }
  // },
  created () {
    this.icon = ['decrease', 'descount', 'special', 'invoice', 'guarantee']
    this.iconClassMap = ['icon1', 'icon2', 'icon3', 'icon4']
    // 子传父(在页面加载的时候就触发)
    this.$emit('fn', this.icon, this.iconClassMap)
  }
}
</script>

<style lang="less">
@import "../../styles/mixin.less";

  .icon {
        display: inline-block;
         margin-right: 6px;
         vertical-align: top;
         width: 16px;
         height: 16px;
         background-repeat: no-repeat;
         background-size: contain;
         // 不同图片对应不同的类
          &.icon1 {
            &.decrease {
               .bg-image2('decrease_1')
           }
           &.descount {
               .bg-image2('discount_1')
           }
           &.guarantee {
               .bg-image2('guarantee_1')
           }
           &.invoice {
               .bg-image2('invoice_1')
           }
           &.special {
               .bg-image2('special_1')
           }

          }
          &.icon2 {
               &.decrease {
                .bg-image2('decrease_2')
            }
            &.descount {
                .bg-image2('discount_2')
            }
            &.guarantee {
                .bg-image2('guarantee_2')
            }
            &.invoice {
                .bg-image2('invoice_2')
            }
            &.special {
                .bg-image2('special_2')
            }
          }

             &.icon3 {
               &.decrease {
                 .bg-image2('decrease_3')
             }
             &.descount {
                 .bg-image2('discount_3')
             }
             &.guarantee {
                 .bg-image2('guarantee_3')
             }
             &.invoice {
                 .bg-image2('invoice_3')
             }
             &.special {
                 .bg-image2('special_3')
             }
           }
            &.icon4 {
               &.decrease {
                 .bg-image2('decrease_4')
             }
             &.descount {
                 .bg-image2('discount_4')
             }
             &.guarantee {
                 .bg-image2('guarantee_4')
             }
             &.invoice {
                 .bg-image2('invoice_4')
             }
             &.special {
                 .bg-image2('special_4')
             }
       }
  }

</style>
