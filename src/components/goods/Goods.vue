<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper" >
      <ul v-if="goods">
        <!-- 当currentIndex->右边的模块的值 和 index左边的值相等时 添加高亮效果 -->
        <!-- 动态添加class类用{} -->
        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index)">
          <!-- 自定fn事件用来子传父 -->
          <span class="menu-text">
            <icon v-show="item.type>0" :class="[icon[item.type],iconClassMap[3]]" @fn="getData" ></icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <!-- food-list-hook 带有hook就是一个标识,指的是这个class只是为了js选择用 -->
        <li v-for="(goods,index) in goods" :key="index" class="food-list food-list-hook">
              <div class="title">{{goods.name}}</div>
              <ul>
                <li v-for="(item,index) in goods.foods" :key="index" class="food-item border-1px">
                  <div>
                <img :src="item.icon" alt="" width="100px" class="food-icon">
              </div>
              <div class="conent">
                  <h1 class="name">{{item.name}}</h1>
                  <div class="description">{{item.description}}</div>
                  <div>
                    <span class="sellcount">月售{{item.sellCount}}份</span>
                    <span class="rating">好评率{{item.rating}}%</span>
                  </div>
                  <div class="price-all">
                    <span class="price">¥{{item.price}} </span>
                    <span v-show="item.oldPrice!==''" class="old-price">¥{{item.oldPrice}}</span>
                  </div>
                </div>
                </li>
              </ul>
          </li>
      </ul>
    </div>
    <shopcar></shopcar>
  </div>
</template>

<script>
import icon from '../icon/icon.vue'
import BScroll from '@better-scroll/core'
import shopcar from 'com/shopcar/shopcar.vue'
export default {
  data () {
    return {
      goods: [],
      icon: [],
      iconClassMap: [],
      // 每个区间的高度
      listHeight: [],
      // 获取实时高度
      scrollY: 0
    }
  },
  async created () {
    // this.iconClassMap = ['icon1', 'icon2', 'icon3', 'icon4']
    try {
      const { data, status, statusText } = await this.$axios.get('goods')
      // console.log(res)
      if (status === 200) {
        this.goods = data
        // console.log(data)
        this.$nextTick(() => {
          // 获取数据之后就根据高度添加滚动
          this._initScroll()
          // 计算高度
          this._calculateHeight()
        })
      } else {
        console.log(statusText)
      }
    } catch (e) {
      console.log(e)
    }
  },
  computed: {
    currentIndex () {
      // 遍历lineHeight的高度
      console.log(this.listHeight)
      for (let i = 0; i < this.listHeight.length; i++) {
        console.log(1)
        // 获取前一个的高度
        let height1 = this.listHeight[i]
        // 获取后一个的高度
        let height2 = this.listHeight[i + 1]

        // 当i为最后一个时, i+1为undefined 所以要判断 !height[i+1]为true就代表是最后一个
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // 如果在这个区间内,
          return i
        }
      }
      return 0
    }
  },
  methods: {
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        // 获取实时位置(better-scroller内置)
        probeType: 3
      })
      // better-scroller的on方法
      this.foodsScroll.on('scroll', (pos) => {
        // 将滚动的纵坐标赋值给scrolly
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      // 这里foodlist获取的li元素代表了每一个分类的大模块(例如热销榜,单人精彩套餐)
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      // 遍历每一个li模块
      for (let i = 0; i < foodList.length; i++) {
        // 拿到每个模块
        let item = foodList[i]
        // 将每一个模块的高度累加
        height += item.clientHeight
        // 将累加后的值存放到listHeight中,此时listHeight中就拿到了每个模块的高度
        this.listHeight.push(height)
        // console.log(this.listHeight)
      }
    },
    selectMenu (index) {
      // console.log(index)
      // 传来了左边点击时的index,获取右边元素列表
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      // 跳转的元素
      let el = foodList[index]
      // better-scroll中的方法,跳到哪个元素,多长时间
      this.foodsScroll.scrollToElement(el, 300)
    },
    getData (icon, iconClassMap) {
      // console.log(icon, iconClassMap)
      this.icon = icon
      this.iconClassMap = iconClassMap
      // console.log('父组件中提供的方法')
    }
  },

  props: {
    sellers: {
      type: Object
    }
  },
  components: {
    icon,
    shopcar
  }
}

</script>

<style lang="less">
@import '../../styles/index.less';
  .goods {
    // 定位, 向上
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    display: flex;
    // 超出部分隐藏
    overflow: hidden;
    .menu-wrapper {
     // flex三个属性: 1.等分 2.内容不足时缩放情况 3.占位空间
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      .menu-item {
        &.current {
          position: relative;
          margin-top: -1px;
          background-color: #fff;
          .border-last();
          .menu-text {
            font-weight: 700;
          }
        }
      }
      li {
             display: table;
             height: 54px;
             width: 56px;
             text-align: center;
             padding:0 12px;
              .menu-text {
                 display: table-cell;
                  vertical-align: middle;
                  line-height: 14px;
                  font-weight: 200;
                  color: #000;
                  font-size: 12px;
                  .border-1px(rgba(1,17,27,0.1));
              .icon {
                      margin-right: 1px;
                      // vertical-align: middle;
                    }
                }
          }
      }

    .foods-wrapper {
      flex: 1;
      min-width: 340px;
      .title {
        height: 26px;
        line-height: 26px;
        padding-left: 14px;
        background-color: #f3f5f7;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147,153,159)
      }
      .food-item {
          display: flex;
          margin: 18px;
          margin-bottom: 0;
          padding-bottom: 18px;
          .border-1px(rgba(7,17,27,0.1));
          &:last-child {
            .border-last();
          }
        .food-icon {
            flex: 0, 0, 57px;
            // margin: 18px;
        }
        .conent {
          flex: 1;
          margin-left: 10px;
          .name {
              font-size: 14px;
              color: rgb(7,17,27);
              line-height: 14px;
          }
          .description,.sellcount,.rating {
            margin: 8px 0;
            font-size:10px;
            color: rgb(147,153,159);
            line-height: 12px;
          }
          .rating {
            margin-left: 12px;
          }
          .price {
            line-height: 24px;
            font-size: 14px;
            color: rgb(221, 73, 73);
            font-weight: 700;
          }
          .old-price {
             line-height: 24px;
             font-size: 10px;
             color: rgb(147,153,159);
             font-weight: 700;
             text-decoration: line-through;
          }
        }

      }
    }
  }

</style>
