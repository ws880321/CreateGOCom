<template>
  <div class="data-box">
    <a-select :defaultValue="0" style="width: 120px;display: inline" @change="setCurrentType">
      <a-select-option :value="item.value" v-for="item in dataType">
        {{item.name}}
      </a-select-option>
    </a-select>
    <div class="data-box" v-if="currentType==0">
      <JsonPlant :json='json' @getJson="getJson" />
    </div>

  </div>
</template>

<script>
  import JsonPlant from './json-plant.vue'
  export default {
    name: 'data-plant',
    data() {
      return {
        currentType: 0,
        dataType: [
          { name: '静态数据', value: 0 },
          { name: 'API接口', value: 1 },
        ]
        // json: [{ a: 123 }]
      }
    },
    props: {
      json: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    watch: {
      json: function (v) {
        console.log(v, 222)
        this.json2 = v
      }
    },
    components: {
      JsonPlant
    },
    methods: {
      getJson(value) {
        this.$emit('getJson', value);
      },
      setCurrentType(v) {
        this.currentType = v
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .json-wrap {
    text-align: left;
  }
</style>