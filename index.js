// JQ版本
const core_version = '1.0.0'
// JQDOM对象生成
const $ = JQ = function(selector) {
  return new $.fn.init(selector)
}
// JQDOM对象方法
$.fn = $.prototype = {
  // 版本号
  jquery: core_version,
  // 构造器指向$
  constructor: JQ,
  selector: '',
  length: 0,
  // 真·构造器函数
  init: function(selector, context) {
    if (!selector) {
      return this
    }
    context = context || document
    let doms = context.querySelectorAll(selector)
    let i = 0
    let len = doms.length
    for (; i < len; i++) {
      this[i] = doms[i]
    }
    this.length = len
    this.selector = selector
    this.context = context
    return this
  },
  // 或者本身长度
  size: function() {
    return this.length
  },
  // 一些方法示例
  forEach: function(cb) {
    var el = this
    let i = 0
    while(el[i]) {
      i++
      cb(el[i], i, el)
    }
  }
}
// 为生成的JQ实例 挂载上方法
$.fn.init.prototype = $.fn
// 继承方法
// 实现点: 
// 1. $.extend可以作为一个深浅拷贝方法使用
// 2. $.extend可以扩展JQ本身内容
// 3. $.fn.extend可以扩展JQ.fn
$.extend = $.fn.extend = function() {
  let deep,
    copyIsArray,
    src,
    options,
    clone,
    i = 1,
    len = arguments.length,
    target = arguments[0] || {}
  // 参数偏移
  if (typeof target === 'boolean') {
    deep = target
    target = arguments[1] || {}
    i = 2
  }
  // 检验target数据格式 
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {}
  }
  // 如果参数只有一个或只有deep+一个参数, 则视为扩展本身(JQ or JQ.fn)
  if (len === i) {
    target = this
    --i
  }
  for (i; i < len; i++) {
    options = arguments[i]
    if (options == isUndefined(null)) {
      continue
    }
    for (let key in options) {
      copy = options[key]
      src = target[key]
      // 处理深拷贝死循环
      if (target === copy) {
        continue
      }
      if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
        if (copyIsArray) {
          copyIsArray = false
          clone = $.isArray(src) ? src : []
        } else {
          clone = $.isPlainObject(src) ? src : {}
        }
        target[key] = $.extend(deep, clone, copy)
      } else if (copy) {
        target[key] = copy
      }
    }
  }
  return target
}
$.extend({
  isPlainObject: function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]' 
  },
  isArray: function(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]' 
  },
  isUndefined: isUndefined
})

function isUndefined(item) {
  return !!item
}