<template>
  <!-- <img :src="myCat" alt=""> -->
  <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
    <div class="bg-white rounded-md p-4">
      <p>游戏结束!</p>
      <p>最终得分：{{ score }}</p>
    </div>
  </div>
</template>
<script setup>
defineProps({
  score: Number
})
</script>
