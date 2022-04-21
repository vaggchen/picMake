<template>
  <div class="title px-4 h-32 flex items-end relative">
    <img id="tip" class="h-8 mb-4" :src="tipPng" alt="">
    <img :src="p2048JPEG" alt="" class="h-full m-auto" />
    <img id="reStart" class="h-8 mb-4 " :src="reStartPng" alt="">
  </div>
  <div class="p-2 flex ">
    <!-- 左侧监听步数 -->
    <div class="w-full-1/2 text-center">
      <p>得分</p>
      <p class="text-green-600">{{ score }}</p>
    </div>
    <!-- 右侧重新开始 -->
    <div class="w-full-1/2 text-center btn">
      <p>最高分</p>
      <p class="text-red-400">{{ maxScore }}</p>
    </div>
  </div>
  <!-- 提示组件 -->
  <Tip @click="closeTip" v-if="tipShow" />
</template>

<script setup>
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
import p2048JPEG from '@/assets/2048.jpeg'
import tipPng from '@/assets/tip.png'
import reStartPng from '@/assets/reStart.png'
import EventBus from '@/utils/eventBus.js'
import Tip from './Tip.vue'
// 接收入参
const props = defineProps({
  score: {
    type: [Number, Object],
    default: 0
  }
})
// 定义传参方法
const emit = defineEmits(['reStart'])

// 计算步数输出
const maxScore = computed(() => {
  // 获取历史最高分
  let _score = localStorage.getItem('haiyang_2048_maxScore')
  // 不存在则赋值 且生成haiyang_2048_maxScore
  if (!_score) {
    localStorage.setItem('haiyang_2048_maxScore', props.score)
    _score = props.score
  }
  // 比较后更新历史最高分
  if (props.score > _score) {
    _score = props.score
    localStorage.setItem('haiyang_2048_maxScore', _score)
  }
  return _score
})

// 点击重新开始
const clickReStart = () => {
  emit('reStart')
}
// 点击tip
const clickTip = (flag) => {
  tipShow.value = flag
}

// 设置tip展示
const tipShow = ref(false)
// 设置点击即可手动关闭
const closeTip = () => {
  tipShow.value = false
}

// 接收注册事件
EventBus.$on('touchReStart', () => {
  // alert('touchReStart')
  clickReStart()
})
// 接收注册事件
EventBus.$on('touchTip', (flag) => {
  // alert('touchReStart')
  clickTip(flag)
})
</script>
<style scoped>
.tool {
  border-top: 1px solid #ccc;
}

.tool .btn {
  border-left: 1px solid #ccc;
}
</style>