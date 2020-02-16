<template>
  <div class="shopcar">
      <div class="content" @click = "toggleList">
        <div class="content-left">
          <div class="icon-wrapper">
            <div class="icon" :class="{'highlight': foodsCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight': foodsCount>0}"></i>
              <div class="num" v-if="foodsCount>0">{{foodsCount}}</div>
            </div>
          </div>
          <div class="price" :class="{'highlight': priceCount>0}">¥{{priceCount}}</div>
          <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" :class="payClass" @click.stop.prevent ="pay">{{payDesc}}</div>
      </div>
      <transition name="flod">
        <div class="shopcar-list" v-show="showList">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listConent">
            <ul>
              <li class="food border-1px" v-for="(food,index) in shopCount" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>¥{{food.price*food.count}}</span>
                  <div class="control-wrapper">
                  <foodcontrol :food = "food"></foodcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <transition name="mask">
        <div class="list-mask" v-show="!flod" @click="flodList"> </div>
      </transition>
  </div>
</template>

<script>
import foodcontrol from 'com/foodcontrol/foodcontrol.vue'
import BScroll from '@better-scroll/core'
export default {
  data () {
    return {
      flod: true,
      showList: false
    }
  },
  props: {
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    shopCount: {
      type: Array,
      default () {
        return [
          // 写的假的
          {
            price: 12,
            count: 1
          },
          {
            price: 23,
            count: 3
          }
        ]
      }
    }
  },
  methods: {
    // 这里是点击下面conent的切换list显示隐藏,进行监听
    toggleList () {
      if (!this.priceCount) {
        return
      }
      this.flod = !this.flod
    },
    empty () {
      // 清空按钮就是将food中每一项里面的count清零
      this.shopCount.forEach(food => {
        food.count = 0
      })
    },
    flodList () {
      this.flod = true
    },
    pay () {
      alert(`你需要支付${this.priceCount}元和${this.deliveryPrice}元`)
    }
  },
  computed: {
    // 商品总价
    priceCount () {
      // console.log(this.shopCount)
      let priceCount = 0
      this.shopCount.forEach((item) => {
        priceCount += item.price * item.count
      })
      return priceCount
    },
    foodsCount () {
      let count = 0
      this.shopCount.forEach((item) => {
        count += item.count
      })
      return count
    },
    payDesc () {
      if (this.priceCount === 0) {
        return `满${this.minPrice}元起送`
      } else if (this.priceCount < this.minPrice) {
        let diff = this.minPrice - this.priceCount
        return `还差${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.priceCount < this.minPrice) {
        return 'nenough'
      } else {
        return 'enough'
      }
    }
  },
  // 通过监听数据
  watch: {
    // 监听总价
    priceCount (newValue, oldValue) {
      // console.log('新价格' + newValue + '==' + oldValue)
      if (!newValue) {
        console.log(this.priceCount)
        // console.log(1)
        this.flod = true
        this.showList = false
        // console.log(this.showList)
      } else {
        this.showList = !this.flod
        // 滚动效果
        if (this.showList) {
          if (!this.scroll) {
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.listConent, {
                click: true
              })
            })
          } else {
            this.scroll.refresh()
          }
        }
      }
      // console.log(this.showList, this.flod)
    },
    // 由于监听没有缓存机制,不能自动判断到点击content的时候flod变化,不能自动触发上面的priceCount监听,所以这里还要监听flod变化,做上面相同操作
    flod (newValue, oldvaue) {
      if (!this.priceCount) {
        console.log(this.priceCount)
        // console.log(1)
        this.flod = true
        this.showList = false
        // console.log(this.showList)
      } else {
        this.showList = !this.flod
        // console.log(this.showList, this.flod)
        if (this.showList) {
          if (!this.scroll) {
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.listConent, {
                click: true
              })
            })
          } else {
            this.scroll.refresh()
          }
        }
      }
    }
  },
  components: {
    foodcontrol
  }

}
</script>

<style lang='less' scoped>
@import '../../styles/mixin.less';
  .shopcar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 40;
    height: 48px;
    .content {
      display: flex;
      background-color: #141d27;
      height: 100%;
      font-size: 0;
      z-index: 30;
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
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background-color: #2b343c;
            &.highlight {
              background-color: #00a0dc;
            }
            .num {
              position: absolute;
              right: -6px;
              top: -6px;
              background-color:red;
              border-radius: 444px;
              width: 24px;
              height: 14px;
              line-height: 14px;
              color: #fff;
              font-size: 10px;
            }
            .icon-shopping_cart {
              line-height: 44px;
              vertical-align: bottom;
             color: #80858a;
             font-size: 26px;
              &.highlight {
                color: #fff;
              }
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
          padding-right: 10px;
          border-right: 1px solid #3f4040;
          &.highlight {
            color: #fff;
          }
        }
        .desc {
          // vertical-align: top;
          margin: 14px 0 14px 10px;
          display: inline-block;
          position: relative;
          top: 6px;
          font-size: 12px;
          color: #80858a;
          line-height: 12px;
          font-weight: 700;
        }
      }
      .content-right {
        width: 105px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        &.nenough {
        background-color: #2b333b;
        color: #80858a;
        }
        &.enough {
          background-color: rgb(30, 155, 30);
          color: #fff;
        }
      }
    }
    .shopcar-list {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      // 把自己隐藏在car下面
      z-index: -5;
      transform: translate3d(0,-100%,0);
      transition: all 0.4s linear;
      &.flod-enter, &.flod-leave-to {
        transform: translate3d(0,0,0)
      }
      .list-header {
        height: 40px;
        line-height: 40px;
        padding:0 18px;
        background-color: #f3f5f7;
        border: 2px solid rgba(7,17,27,0.1);
        .title {
          float: left;
          font-size: 14px;
          font-weight: 200;
          color: rgb(7,17,27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0,160,220);
        }
      }
      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background-color: #fff;
        .food {
          // display: flex;
          height: 48px;
          line-height: 48px;
          background-color: #fff;
          .border-1px(rgba(7,17,27,0.1));
          .name {
            // flex: 1;
            float: left;
            font-size: 13px;
            color: rgb(7,17,27)
          }
          .price {
            float: right;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240,20,20)
          }
          .control-wrapper {
            box-sizing: border-box;
            float: right;
            padding-top: 4px;
            height: 45px;
            .foodcontrol {
            transform: scale(0.7);

            }
          }
        }
      }
     }
    }
    .list-mask {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: -10;
      background-color: rgba(7,17,27,0.6);
      transition: all 1s;
      opacity: 1;
      backdrop-filter: blur(10px);
      &.mask-enter,&.mask-leave-to {
        transition: all 1s;
        opacity: 0;
      }
      // &.mask-enter-active,&.mask-leave-active {
      //   transition: all 1s;
      //   opacity: 0.5;
      // }
    }

</style>
