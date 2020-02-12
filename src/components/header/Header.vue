<template>
    <div class="header">
        <div class="content-wrapper">
            <img width="64px" height="64px" :src="sellers.avatar" />
            <div v-if="sellers.supports" class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{sellers.name}}</span><br>
                </div>
                    <div class="description">
                        {{sellers.description}}/{{sellers.deliveryTime}}送达
                    </div>
                    <div class="support">
                        <span class="icon" :class="icon[sellers.supports[0].type]"></span>
                        <span class="text">{{sellers.supports[0].description}}</span>
                    </div>
                </div>
            <div v-if="sellers.supports" class="support-count" @click = "toggleDetail">
                <span class="count">{{sellers.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click = "toggleDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{sellers.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="sellers.avatar" alt="" width="100%" height="100%">
        </div>
        <transition name="fade">
         <div class="detail" v-show="showDetail">
          <!-- css  sticky footer布局 -->
              <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{sellers.name}}</h1>
                    <div class="star-wrapper">
                      <star :size="48" :score="sellers.score"></star>
                    </div>
                    <!-- 标题 -->
                    <div class="title">
                        <!-- 使用div会比span在一些安卓手机上显示方面兼容性好-->
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <div class="supports" v-if="sellers.supports">
                        <div class="support-item" v-for="(item,index) in sellers.supports" :key ="index" >
                            <!-- <div class="icon" :class="icon[index]"></div> -->
                            <icon v-if="sellers" :class="[icon[index],iconClassMap[1]]" @fn="getData"></icon>
                            <span class="icon-text">{{item.description}}</span>
                        </div>
                    </div>
                     <div class="title">
                        <!-- 使用div会比span在一些安卓手机上显示方面兼容性好-->
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">{{sellers.bulletin}}</div>
                </div>
             </div>
          <div class="detail-close" @click="close">
              <i class="icon-close"></i>
          </div>
         </div>
        </transition>
    </div>
</template>

<script>
// 引入星星组件
import star from 'com/star/star'
// 引入icon组件
import icon from 'com/icon/icon'
export default {
  created () {
    // this.icon = ['decrease', 'descount', 'guarantee', 'invoice', 'special']
    // this.iconClassMap = ['icon1', 'icon2', 'icon3', 'icon4']
  },
  data () {
    return {
    //   icon: ['decrease', 'descount', 'guarantee', 'invoice', 'special'],
      icon: [],
      iconClassMap: [],
      showDetail: false
    }
  },
  methods: {
    toggleDetail () {
      this.showDetail = true
    },
    close () {
      this.showDetail = false
    },
    getData (icon, iconClassMap) {
      console.log(icon, iconClassMap)
      this.icon = icon
      this.iconClassMap = iconClassMap
    //   console.log('父组件中提供的方法')
    }
  },
  props: {
    sellers: {
      type: Object
    }
  },
  components: {
    // 注册star组件
    star,
    icon
  }
}
</script>

<style lang="less">
@import '../../styles/mixin.less';
.header {

    position:relative;
    background-color: rgba(7,17,27,0.5);
    overflow: hidden;
    .content-wrapper {
        position: relative;
        display: flex;
        img {
        padding: 24px 16px 16px 24px;
        border-radius: 2px;
        // float: left;
             }
        .content {
            display: inline-block;
            vertical-align: top;
            padding-top: 24px;
            flex: 1;
            .title {
                margin-top: 2px;
                .brand {
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    .bg-image('brand');
                    background-repeat: no-repeat;
                    background-size: 30px 18px;
                    margin-right: 12px;
                    vertical-align: top;

                }
                .name {
                font-size: 16px;
                color: rgb(255,255,255);
                font-weight: bold;
                line-height: 18px;
                }
            }
                .description {
                    font-size: 12px;
                    color:rgb(255,255,255);
                    font-weight: 200;
                    line-height: 12px;
                    margin-top: 8px;
                    margin-bottom: 10px;
                }
                .support {
                    .icon {
                        display: inline-block;
                        vertical-align: top;
                        margin-right: 4px;
                        width: 12px;
                        height: 12px;
                        background-size: contain;
                        vertical-align: center;

                        &.decrease {
                            .bg-image('decrease_1')
                        }
                        &.descount {
                            .bg-image('discount_1')
                        }
                        &.guarantee {
                            .bg-image('guarantee_1')
                        }
                        &.invoice {
                            .bg-image('invoice_1')
                        }
                        &.special {
                            .bg-image('special_1')
                        }
                    }
                    font-size: 10px;
                    color: rgb(255,255,255);
                    font-weight: 200;
                    line-height: 12px;
                }

        }
        .support-count {
            position:absolute;
            right: 12px;
            bottom: 24px;
            background-color: rgba(0,0,0,0.2);
            border-radius: 14px;
            padding: 0 6px 0 4px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: #fff;
            .count {
                margin-left: 10px;
                line-height: 1;
                font-size: 10px;
            }
            .icon-keyboard_arrow_right {
                vertical-align: middle;
                line-height: 1;
                font-size: 10px;
                margin-left: 2px;
            }
         }
    }
    .bulletin-wrapper {
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 12px;
            height: 28px;
            line-height: 28px;
            font-size: 10px;
            background-color: rgba(7,17,27,0.2);
        .bulletin-title {
            vertical-align: middle;
            display: inline-block;
            width: 22px;
            height: 12px;
            margin:0 4px;
            .bg-image('bulletin');
            background-size: contain;
            background-repeat: no-repeat;
        }
        i {
            position:absolute;
            right:6px;
            top: 10px;
        }
    }
    .background {
        // 设置背景图
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px)
    }
    // 渐变
    // 准备进入和完全离开的时候
      .fade-enter,
        .fade-leave-to {
          opacity: 0;
        }
        // 完全进入和准备离开的时候
        .fade-enter-to,
        .fade-leave {
          opacity: 1;
           background-color: rgba(7,17,27,0.5);
        }
        // 中间的展示过程
        .fade-enter-active,
        .fade-leave-active {
          transition: all 0.5s;
        }
    .detail {
        position: fixed;
        z-index: 200;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        overflow: auto;
        background-color: rgba(7,17,27,0.5);
        backdrop-filter: blur(10px);
        .detail-wrapper {
            // 最小高 撑开容器
            min-height: 100%;
            width: 100%;
            // background-color: rgba(7,17,27,0.8);
            // filter: blur(10px);
            .detail-main {
                // height: 100%;
                // width: 100%;
                margin-top: 64px;
                // 这里的padding-bottom是为了给×和底部留空间
                padding-bottom: 64px;
                .name {
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                    color: #fff;
                    line-height: 16px;
                }
                .star-wrapper {
                    text-align: center;
                    margin:32px 0;
                }
                .title {
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px auto;
                    .line {
                        flex: 1;
                        background-color: rgba(255,255,255,0.2);
                        height: 1px;
                        margin-top: 6px;
                    }
                    .text {
                        font-size: 14px;
                        padding: 0 12px;
                        font-weight: 700px;
                    }
                }
                .supports {
                    width: 80%;
                    margin: 0 auto;
                    .support-item {
                        width: 100%;
                        margin-bottom: 12px;
                        &:last-child {
                            margin-bottom:  0;
                        }

                        // .icon {
                        //     display: inline-block;
                        //     margin-right: 6px;
                        //     vertical-align: top;
                        //     width: 16px;
                        //     height: 16px;
                        //     background-repeat: no-repeat;
                        //     background-size: contain;
                        //     &.decrease {
                        //         .bg-image('decrease_1')
                        //     }
                        //     &.descount {
                        //         .bg-image('discount_1')
                        //     }
                        //     &.guarantee {
                        //         .bg-image('guarantee_1')
                        //     }
                        //     &.invoice {
                        //         .bg-image('invoice_1')
                        //     }
                        //     &.special {
                        //         .bg-image('special_1')
                        //     }
                        // }
                        .icon-text {
                            font-size: 12px;
                            line-height: 12px;
                            font-weight: 200;
                            color: rab(255,255,255);
                        }
                    }
                }
                .bulletin {
                    width: 80%;
                    margin: 0 auto;
                    font-size: 12px;
                    font-weight: 200;
                    color: rgb(255,255,255);
                    line-height: 24px;
                }
            }
        }
        .detail-close {
            position: relative;
            // 从底部向上拉64px
            width: 32px;
            height: 32px;
            margin: -64px auto 0 auto;
            clear: both;
            font-size: 32px;
        }
    }
}
</style>
