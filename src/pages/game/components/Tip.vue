<template>
  <div id="modalTip"
    class="absolute top-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 z-20">
    <div class="bg-white rounded-md py-4 grid grid-cols-2">
      <div class="flex items-center mb-2 px-4" v-for="(item, index) in map">
        <div class="w-8">
          <img :src="item" class="h-8 m-auto" alt="">
        </div>
        <div class="w-8 text-right ml-2">
          {{ index }}
        </div>
      </div>
    </div>
    <div>
      <img class="h-12 mt-4 m-auto " :src="closePng" alt="">
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
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

import closePng from '@/assets/close.png'
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
onMounted(() => {
  //手指接触reStart
  document.querySelector('#modalTip').addEventListener("touchstart", function (e) {
    // 阻止浏览器默认
    e.preventDefault()
    EventBus.$emit('touchTip', false)
  }, { passive: false });
})
</script>