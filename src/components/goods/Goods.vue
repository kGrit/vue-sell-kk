<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul v-if="goods">
        <li v-for="(item,index) in goods" :key="index">
          <!-- 自定fn事件用来子传父 -->
          <span class="menu-text">
            <icon v-show="item.type>0" :class="[icon[item.type],iconClassMap[3]]" @fn="getData" ></icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
import icon from '../icon/icon.vue'
export default {
  data () {
    return {
      goods: [],
      icon: [],
      iconClassMap: []
    }
  },
  async created () {
    // this.iconClassMap = ['icon1', 'icon2', 'icon3', 'icon4']
    try {
      const { data, status, statusText } = await this.$axios.get('goods')
      // console.log(res)
      if (status === 200) {
        this.goods = data
        console.log(data)
      } else {
        console.log(statusText)
      }
    } catch (e) {
      console.log(e)
    }
  },
  props: {
    sellers: {
      type: Object
    }
  },
  components: {
    icon
  },
  methods: {
    getData (icon, iconClassMap) {
      // console.log(icon, iconClassMap)
      this.icon = icon
      this.iconClassMap = iconClassMap
      // console.log('父组件中提供的方法')
    }
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
      flex: 1
    }
  }
</style>
