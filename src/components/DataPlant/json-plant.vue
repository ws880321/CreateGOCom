<template>
  <div class="data-box">
    <vue-json-editor :expandedOnStart="true" :value="json" :mode="'code'" :show-btns="true" lang="zh"
      @json-change="onJsonChange" @json-save="onJsonSave" @has-error="onError" class="json-wrap">
    </vue-json-editor>
  </div>
</template>

<script>
  import vueJsonEditor from 'vue-json-editor'
  export default {
    name: 'data-plant',
    data() {
      return {
        json2: null
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
        setTimeout(() => {
          this.json2 = v
        }, 0);

      }
    },
    components: {
      vueJsonEditor
    },
    methods: {
      onJsonChange(value) {
        this.$emit('getJson', value);
        console.log('value:', value);
      },
      onJsonSave(value) {
        console.log('value:', value);
      },
      onError(value) {
        console.log('value:', value);
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