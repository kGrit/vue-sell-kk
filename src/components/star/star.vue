<template>
<div class="star" :class="starType">
  <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>

</div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      // 变成整数或者.5 变成0.5倍数的值
      let score = Math.floor(this.score * 2) / 2
      // 判断是整数还是小数
      let hasDecimal = score % 1 !== 0
      // 算出整数
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        // 将整数的星星放入数组
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        // 半星
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        // 补全五颗星
        result.push(CLS_OFF)
      }
      return result
      // 在上面遍历这个result, 就可以取到on,half,off
    }
  }
}
</script>

<style lang="less">
@import "../../styles/mixin.less";
.star {
  .star-item {
    display: inline-block;
    background-repeat:no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: contain;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image1('star48_on')
      }
      &.half {
        .bg-image1('star48_half')
      }
      &.off {
        .bg-image1('star48_off')
      }
    }
  }
  &.star-36 {
      .star-item {
      width: 15px;
      height: 15px;
      margin-right: 16px;
      background-size: contain;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image1('star36_on')
      }
      &.half {
        .bg-image1('star36_half')
      }
      &.off {
        .bg-image1('star36_off')
      }
    }

  }
  &.star-24 {
     .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: contain;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          .bg-image1('star24_on')
        }
        &.half {
          .bg-image1('star24_half')
        }
        &.off {
          .bg-image1('star24_off')
        }
    }

  }
}

</style>
