# tree example(for production)

1. loading html
2. skip item template
3. enter into tree.js
4. mount Vue on '#demo'
5. Vue(full mode) comilper **item template**  strings into JavaScript render functions
6. update **item template**  to  dom

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Vue.js tree view example</title>
    <style>
      body {
        font-family: Menlo, Consolas, monospace;
        color: #444;
      }
      .item {
        cursor: pointer;
      }
      .bold {
        font-weight: bold;
      }
      ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: dot;
      }
    </style>
    <!-- Delete ".min" for console warnings in development -->
    <script src="../../dist/vue.js"></script>
  </head>
  <body>

    <!-- item template -->
    <script type="text/x-template" id="item-template">
      <li>
        <div
          :class="{bold: isFolder}"
          @click="toggle"
          @dblclick="changeType">
          {{model.name}}
          <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
        </div>
        <ul v-show="open" v-if="isFolder">
          <item
            class="item"
            v-for="model in model.children"
            :model="model">
          </item>
          <li class="add" @click="addChild">+</li>
        </ul>
      </li>
    </script>
      
      
      
      
      
	<!--实际html 元素-->
    <p>(You can double click on an item to turn it into a folder.)</p>

    <!-- the demo root element -->
    <ul id="demo">
      <item
        class="item"
        :model="treeData">
      </item>
    </ul>
      
      
      
      

    <!-- demo code -->
    <script src="tree.js"></script>
  </body>
</html>


```

```js
// demo data
var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}

// define the item component
Vue.component('item', {
  template: '#item-template',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }
})

// boot up the demo
var demo = new Vue({
  el: '#demo',
  data: {
    treeData: data
  }
})

```

