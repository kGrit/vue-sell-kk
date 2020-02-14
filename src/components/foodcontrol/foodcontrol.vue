<template>
  <div class="foodcontrol">
    <transition name="move">
      <div class="food-decrease " v-show="food.count" @click="desCar">
         <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="food-num" v-show="food.count">{{food.count}}</div>
    <div class="food-add icon-add_circle" @click="addCar"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    addCar () {
      if (!this.food.count) {
        // vue中动态添加属性要放在ref中
        // this.food.count = 1
        // console.log(34)
        // console.log(this.food)
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    desCar () {
      this.food.count--
      if (this.food.count <= 0) {
        this.food.count = 0
      }
    }
  }

}
</script>

<style lang="less">
.foodcontrol {
  font-size: 0;
    // .fade-enter,
    // .fade-leave-to {
    //   transition: all 0.4s linear;
    //   opacity: 0;
    //   transform:  translate3D(24px,0,0);
    // }
    // .fade-enter-to {
    //   transition: all 0.4s linear;
    //   opacity: 1;
    //   transform:  translate3D(0px,0,0);
    // }
  .food-decrease {
    display:inline-block;
    font-size: 0;
    // 这里加padding是为了加大用户的点击范围
    padding: 6px;
    color: #00a0dc;
    .inner {
      display:inline-block;
      transition: all 0.4s linear;
      display:inline-block;
      color: #00a0dc;
      font-size: 24px;
      transform: rotate(0);
    }
    // &.move-leave-to,&.move-enter-to {
    //   transform: rotate(0);
    // }
    // 添加平移和旋转效果 &指的是food-decrease且
    &.move-enter-active, &.move-leave-active {
        transition: all 0.4s linear;
    }
    &.move-enter, &.move-leave-active {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner {
          transform: rotate(180deg);
        }
    }
  }
  .food-num {
    display:inline-block;
    font-size: 10px;
    height: 30px;
    line-height: 36px;
    color: rgb(147,153,159);
    vertical-align: top;

  }
  .food-add {
    display:inline-block;
    font-size: 24px;
    padding: 6px;
    color: #00a0dc;

  }
}

</style>
