<template>
  <div class="cnt h-full relative grid gap-2 grid-cols-4" ref="cnt">
    <!-- 展示底部格子 -->
    <div v-show="!lazyShow" v-for="(item, index ) in boxLists" class="box rounded-md "
      :style="{ width: itemWidth + 'px', height: itemWidth + 'px' }">
    </div>

    <!-- 展示值 -->
    <div v-show="!lazyShow" v-for="(item, index ) in valLists"
      class="val rounded-md absolute flex justify-center items-center p-2"
      :class="item.val ? getClass(item.val) : 'hide'" :style="{
        transform: `translate(${(item.moveIndex % rowLen) * (itemWidth + 10)}px, ${parseInt(item.moveIndex / rowLen) * (1 / rowLen) * cntWidth}px) `, width: itemWidth + 'px', height: itemWidth + 'px'
      }">
      <!-- {{ item.val ? item.val : '' }} -->
      <img v-if="item.val" :src="getSrc(item.val)" alt="">
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '@/utils/listenTouch.js'
import EventBus from '@/utils/eventBus.js'

import haicaoPng from '@/assets/haicao.png'
import xiaPng from '@/assets/xia.png'
import xiaoyuPng from '@/assets/xiaoyu.png'
import jinliyuPng from '@/assets/jinliyu.png'
import wuguiPng from '@/assets/wugui.png'
import shuimuPng from '@/assets/shuimu.png'
import zhangyuPng from '@/assets/zhangyu.png'
import haitunPng from '@/assets/haitun.png'
import shayuPng from '@/assets/shayu.png'
import jingyuPng from '@/assets/jingyu.png'
import longPng from '@/assets/long.png'
import supermanPng from '@/assets/superman.png'
// 定义传参方法
const emit = defineEmits(['gameOver', 'scoreChange'])
// 定义行个数
const rowLen = 4
// 定义画数组
const boxLists = new Array(rowLen * rowLen).fill(0)
// 定义数组
const valLists = ref([])
// lazy show
const lazyShow = ref(true)

// 定义cnt宽高和item的宽高
// 定义cnt
const cnt = ref(null)
const cntWidth = ref(0)
const itemWidth = ref(0)

//获取dom和渲染
onMounted(() => {
  getCntWidth()
  lazyShow.value = false
})
// 初始化
const init = () => {
  valLists.value = new Array(rowLen * rowLen).fill(0).map((item, index) => ({
    val: 0,
    moveIndex: index
  }))
  // 初始化数组
  randomNums()
  randomNums()

  // 测试代码
  // valLists.value[0] = {
  //   val: 2,
  //   moveIndex: 0
  // }
  // valLists.value[1] = {
  //   val: 4,
  //   moveIndex: 1
  // }
  // valLists.value[2] = {
  //   val: 8,
  //   moveIndex: 2
  // }
  // valLists.value[4] = {
  //   val: 16,
  //   moveIndex: 4
  // }
  // valLists.value[5] = {
  //   val: 32,
  //   moveIndex: 5
  // }
  // valLists.value[6] = {
  //   val: 64,
  //   moveIndex: 6
  // }
  // valLists.value[7] = {
  //   val: 128,
  //   moveIndex: 7
  // }
  // valLists.value[8] = {
  //   val: 256,
  //   moveIndex: 8
  // }
  // valLists.value[9] = {
  //   val: 512,
  //   moveIndex: 9
  // }
  // valLists.value[10] = {
  //   val: 1024,
  //   moveIndex: 10
  // }
  // valLists.value[11] = {
  //   val: 2048,
  //   moveIndex: 11
  // }
  // valLists.value[12] = {
  //   val: 4096,
  //   moveIndex: 12
  // }
}

// 获取宽高
const getCntWidth = () => {
  cntWidth.value = cnt.value.clientWidth
  itemWidth.value = (cnt.value.clientWidth - 2 * 16) / rowLen
}

// 生成 2或4 
const randomNums = () => {
  console.log('randomNums')
  // 如果不存在0时
  if (valLists.value.every(item => item.val !== 0)) {
    // 且每一个元素上下左右都不同
    let noSame = true
    for (let i = 0; i < rowLen * rowLen; i++) {
      // 该元素之上的值如果相等 则跳出
      let topInxdex = i - rowLen;
      if (topInxdex > -1 && (valLists.value[i].val = valLists.value[topInxdex].val)) {
        noSame = false
        break
      }

      // 该元素之下的值如果相等 则跳出
      let botInxdex = i + rowLen;
      if (botInxdex < valLists.value.length && (valLists.value[i].val = valLists.value[botInxdex].val)) {
        noSame = false
        break
      }

      // 该元素之左的值如果相等 则跳出
      let leftInxdex = i - 1;
      if (leftInxdex > -1 && (parseInt(i / rowLen) === parseInt(leftInxdex / rowLen)) && (valLists.value[i].val = valLists.value[leftInxdex].val)) {
        noSame = false
        break
      }

      // 该元素之右的值如果相等 则跳出
      let rightInxdex = i + 1;
      if (rightInxdex < valLists.value.length && (parseInt(i / rowLen) === parseInt(rightInxdex / rowLen)) && (valLists.value[i].val = valLists.value[rightInxdex].val)) {
        noSame = false
        break
      }
    }
    if (noSame) {
      return false
    }

  }
  // 生成随机数 生成2的概率越大越难
  const num = Math.random() > 0.7 ? 2 : 4

  // 生成随机序号的方法
  const createIndex = () => {
    // 筛选剩余空位
    let arr = valLists.value.filter(item => item.val === 0)
    // 随机一个序号
    const index = parseInt(Math.random() * arr.length)
    // 返回真实的序号值
    return arr[index]['moveIndex']
  }
  // 生成随机序号
  const index = createIndex()
  // 放入数组
  valLists.value[index] = {
    val: num,
    moveIndex: index
  }
  return true
}

// 生成对应src
const getSrc = (val) => {
  let map = {
    2: haicaoPng,
    4: xiaPng,
    8: xiaoyuPng,
    16: jinliyuPng,
    32: wuguiPng,
    64: shuimuPng,
    128: zhangyuPng,
    256: haitunPng,
    512: shayuPng,
    1024: jingyuPng,
    2048: longPng,
    4096: supermanPng,
  }
  return val in map ? map[val] : '-'
}

// 生成对应class
const getClass = (val) => {
  let map = {
    2: 'bg2',
    4: 'bg4',
    8: 'bg8',
    16: 'bg16',
    32: 'bg32',
    64: 'bg64',
    128: 'bg128',
    256: 'bg256',
    512: 'bg512',
    1024: 'bg1024',
    2048: 'bg2048',
    4096: 'bg4096',
  }
  return val in map ? map[val] : '-'
}
// 成功调用的方法
const gameOver = () => {
  emit('gameOver')
}
// 执行初始化
init()
// 暴露init
defineExpose({
  init
})

// 接收注册事件
// 监听滑动向上
EventBus.$on('touchToTop', () => {
  console.log('touchToTop')
  let flag = arrToTop()
  continueGame(flag)
})
// 监听滑动向下
EventBus.$on('touchToBot', () => {
  console.log('touchToBot')
  let flag = arrToBot()
  continueGame(flag)
})
// 监听滑动向左
EventBus.$on('touchToLeft', () => {
  console.log('touchToLeft')
  let flag = arrToLeft()
  continueGame(flag)
})
// 监听滑动向右
EventBus.$on('touchToRight', () => {
  console.log('touchToRight')
  let flag = arrToRight()
  continueGame(flag)

})

// 是否继续游戏
const continueGame = (isMove) => {
  setTimeout(() => {
    // randomNums()
    if (!isMove) {
      return
    }
    let flag = randomNums()
    // 是否还能生成随机数，不能则游戏结束
    if (!flag) {
      gameOver()
    }
  }, 250)
}

// 分数改变事件
const scoreChange = (val) => {
  emit('scoreChange', val * 5)
}

// 定义定时器
const firstTime = 50
const secondTime = 150
// 数组向左的事件
const arrToLeft = () => {
  let isMove = false
  for (let i = 0; i < rowLen; i++) {
    let arr = new Array(rowLen).fill(0)
    for (let j = 0; j < rowLen - 1; j++) {
      // 获取真实数组的序号
      let index = i * rowLen + j
      // 获取当前
      let tempItem = valLists.value[index]
      // 获取当前下一个
      let tempItemNext = valLists.value[index + 1]
      arr[j] = tempItem.val
      arr[j + 1] = tempItemNext.val
      if (tempItem.val === tempItemNext.val && tempItem.val !== 0) {
        tempItemNext.moveIndex = tempItem.moveIndex
        arr[j] = tempItem.val * 2
        arr[j + 1] = 0

        isMove = true
        // 分数改变事件
        scoreChange(arr[j])

        setTimeout(() => {
          tempItemNext.val = 0
          tempItem.val = tempItem.val * 2
          tempItemNext.moveIndex = index + 1
        }, firstTime)
        j++
      }

      // 末尾开始移动0位的
      if (j === rowLen - 2 || j === rowLen - 1) {
        let newArr = new Array(rowLen).fill(0)
        let sort = 0
        arr.forEach(item => {
          if (item !== 0) {
            newArr[sort] = item
            sort++
          }
        })
        let k = 0

        while (k < rowLen) {
          let index2 = i * rowLen + k
          let num = newArr[k]
          let newItem = valLists.value[index2]
          if (newItem.val !== num || newItem.moveIndex !== index2) {
            isMove = true
          }
          setTimeout(() => {
            newItem.val = num
            newItem.moveIndex = index2
          }, firstTime)
          k++
        }
      }
    }
  }
  return isMove
}

// 数组向右的事件
const arrToRight = () => {
  let isMove = false
  for (let i = 0; i < rowLen; i++) {
    let arr = new Array(rowLen).fill(0)
    for (let j = rowLen - 1; j > 0; j--) {
      // 获取真实数组的序号
      let index = i * rowLen + j
      // 获取当前
      let tempItem = valLists.value[index]
      // 获取当前下一个
      let tempItemNext = valLists.value[index - 1]
      arr[j] = tempItem.val
      arr[j - 1] = tempItemNext.val
      if (tempItem.val === tempItemNext.val && tempItem.val !== 0) {
        tempItemNext.moveIndex = tempItem.moveIndex
        arr[j] = tempItem.val * 2
        arr[j - 1] = 0

        isMove = true
        // 分数改变事件
        scoreChange(arr[j])

        setTimeout(() => {
          tempItemNext.val = 0
          tempItem.val = tempItem.val * 2
          tempItemNext.moveIndex = index - 1
        }, firstTime)
        j--
      }

      if (j === 0 || j === 1) {
        let newArr = new Array(rowLen).fill(0)
        let sort = rowLen - 1
        for (let i = rowLen - 1; i >= 0; i--) {
          if (arr[i] !== 0) {
            newArr[sort] = arr[i]
            sort--
          }
        }

        let k = 0
        while (k < rowLen) {
          let index2 = i * rowLen + k
          let num = newArr[k]
          let newItem = valLists.value[index2]
          if (newItem.val !== num || newItem.moveIndex !== index2) {
            isMove = true
          }
          setTimeout(() => {
            newItem.val = num
            newItem.moveIndex = index2
          }, secondTime)
          k++
        }
      }
    }
  }
  return isMove
}


// 数组向上的事件
const arrToTop = () => {
  let isMove = false
  for (let i = 0; i < rowLen; i++) {
    let arr = new Array(rowLen).fill(0)
    for (let j = 0; j < rowLen - 1; j++) {
      // 获取真实数组的序号
      let index = j * rowLen + i
      // 获取当前
      let tempItem = valLists.value[index]
      // 获取当前下一个
      let tempItemNext = valLists.value[index + rowLen]
      arr[j] = tempItem.val
      arr[j + 1] = tempItemNext.val
      if (tempItem.val === tempItemNext.val && tempItem.val !== 0) {
        tempItemNext.moveIndex = tempItem.moveIndex
        arr[j] = tempItem.val * 2
        arr[j + 1] = 0

        isMove = true
        // 分数改变事件
        scoreChange(arr[j])
        setTimeout(() => {
          tempItemNext.val = 0
          tempItem.val = tempItem.val * 2
          tempItemNext.moveIndex = index + rowLen
        }, firstTime)
        j++
      }

      if (j === rowLen - 2 || j === rowLen - 1) {
        let newArr = new Array(rowLen).fill(0)
        let sort = 0
        arr.forEach(item => {
          if (item !== 0) {
            newArr[sort] = item
            sort++
          }
        })
        let k = 0

        while (k < rowLen) {
          let index2 = k * rowLen + i
          let num = newArr[k]
          if (valLists.value[index2].val !== num || valLists.value[index2].moveIndex !== index2) {
            console.log(isMove)
            isMove = true
          }
          setTimeout(() => {
            valLists.value[index2].val = num
            valLists.value[index2].moveIndex = index2
          }, secondTime)
          k++
        }
      }
    }
  }
  return isMove
}

// 数组向下的事件
const arrToBot = () => {
  let isMove = false
  for (let i = 0; i < rowLen; i++) {
    let arr = new Array(rowLen).fill(0)
    for (let j = rowLen - 1; j > 0; j--) {
      // 获取真实数组的序号
      let index = j * rowLen + i
      // 获取当前
      let tempItem = valLists.value[index]
      // 获取当前下一个
      let tempItemNext = valLists.value[index - rowLen]
      arr[j] = tempItem.val
      arr[j - 1] = tempItemNext.val
      if (tempItem.val === tempItemNext.val && tempItem.val !== 0) {
        tempItemNext.moveIndex = tempItem.moveIndex
        arr[j] = tempItem.val * 2
        arr[j - 1] = 0

        isMove = true
        // 分数改变事件
        scoreChange(arr[j])
        setTimeout(() => {
          tempItemNext.val = 0
          tempItem.val = tempItem.val * 2
          tempItemNext.moveIndex = index - rowLen
        }, firstTime)
        j--
      }

      if (j === 0 || j === 1) {
        let newArr = new Array(rowLen).fill(0)
        let sort = rowLen - 1
        for (let i = rowLen - 1; i >= 0; i--) {
          if (arr[i] !== 0) {
            newArr[sort] = arr[i]
            sort--
          }
        }
        let k = 0

        while (k < rowLen) {
          let index2 = k * rowLen + i
          let num = newArr[k]
          if (valLists.value[index2].val !== num || valLists.value[index2].moveIndex !== index2) {
            isMove = true
          }
          setTimeout(() => {
            valLists.value[index2].val = num
            valLists.value[index2].moveIndex = index2
          }, secondTime)
          k++
        }
      }
    }
  }
  return isMove
}
</script>

<style scoped>
/* .cnt {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3) inset;
} */

.box {
  box-shadow: 2px 2px 2px #999 inset, 3px 4px 4px #000;
  transition: all .3s;
  /* background-color: rgba(0, 0, 0, 0.7); */
}

.val {
  /* background: rgba(0, 0, 0, 0.3); */
  transition: all .2s;
}

.val.hide {
  opacity: 0;
  /* transition: all 0s; */
}

.val.bg2 {
  background-color: rgb(238, 228, 218);
}

.val.bg4 {
  background-color: rgb(237, 224, 200);
}

.val.bg8 {
  background-color: rgb(242, 224, 121);
}

.val.bg16 {
  background-color: rgb(245, 149, 99);
}

.val.bg32 {
  background-color: rgb(246, 124, 95);
}

.val.bg64 {
  background-color: rgb(246, 94, 59);
}

.val.bg128 {
  background-color: rgb(242, 177, 121);
}

.val.bg256 {
  background-color: rgb(237, 204, 97);
}

.val.bg512 {
  background-color: rgb(110, 128, 128);
}

.val.bg1024 {
  background-color: rgb(113, 213, 238);

}

.val.bg2048 {
  background-color: rgb(30, 128, 128);
}

.val.bg4096 {
  background-color: rgb(169, 153, 207);
}
</style>