大全

# API

## $attrs、$listeners使用

### $attrs

父 子 孙

父传递:data="me"，子用 v-bind="$attrs" 孙：$attrs.data

### $listeners

父 子 孙

父传递@myEvent="myEvent"，子用 v-on="$listener" 孙：this.$emit('myEvent')

## $attrs、$listeners使用原理

1. 要获取上下文