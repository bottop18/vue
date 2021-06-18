/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    // 该 dep 发布者的 id
    this.id = uid++
    // 存放订阅者
    this.subs = []
  }

  // 添加订阅者
  addSub(sub: Watcher) {
    this.subs.push(sub)
  }

    // 去除订阅者
  removeSub(sub: Watcher) {
    remove(this.subs, sub)
  }

  // 向订阅者中添加当前 dep
  // 在 Watcher 中也有这个操作，实现双向绑定
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

   // 通知 dep 中的所有 watcher，执行 watcher.update() 方法
  notify() {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async异步
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = []

export function pushTarget(target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
