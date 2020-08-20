<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible width="360">
      <tmp :cid="1"></tmp>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px" class="c-conten">
        <com :cid="1"></com>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  import com from './views/index.vue'
  import tmp from './views/tmp.vue'
  export default {
    name: 'app',
    data() {
      return {
        collapsed: false,
      };
    },
    mounted() {
      this.createComponent('Echart.Bar.Normal', {
        dev: true, cid: 1
      })
    },
    components: {
      com, tmp
    }
  }
</script>

<style>
  .c-conten {
    position: relative;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>