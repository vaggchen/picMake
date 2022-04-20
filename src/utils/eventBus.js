import mitt from 'mitt'

// 示例话vuex
const emitter = mitt()

// 接收对象
const bus = {}

// 重定义方法
bus.$on = emitter.on
bus.$emit = emitter.emit

export default bus