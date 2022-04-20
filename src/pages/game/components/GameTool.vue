<template>
  <div class="title px-4 h-32 flex items-end relative">
    <!-- <img class="h-8 mb-4" :src="tipPng" alt=""> -->
    <img :src="p2048JPEG" alt="" class="h-full m-auto" />
    <img @click="clickReStart" class="h-8 mb-4 absolute bottom-2 right-5" :src="reStartPng" alt="">
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
</template>

<script setup>
import { computed } from '@vue/reactivity';
import p2048JPEG from '@/assets/2048.jpeg'
import tipPng from '@/assets/tip.png'
import reStartPng from '@/assets/reStart.png'

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
</script>
<style scoped>
.tool {
  border-top: 1px solid #ccc;
}

.tool .btn {
  border-left: 1px solid #ccc;
}
</style>