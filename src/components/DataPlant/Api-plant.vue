<template>
  <div class="data-box api-box">
    <div class="item">
      <div class="label">请求方式</div>
      <div class="item-c">
        <a-select defaultValue="GET" style="width: 120px;display: inline" @change="setApiType">
          <a-select-option :value="item.value" v-for="item in apiTypes">
            {{item.name}}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="item">
      <div class="label">请求地址</div>
      <div class="item-c">
        <a-input type="url" v-model="url"></a-input>
      </div>
      <a-button type="primary" @click='getData'>
        测试
      </a-button>
    </div>
    <div class="api-item-box" v-if="apiType=='GET'">

    </div>
    <div class="api-item-box" v-if="apiType=='POST'">
      <div class="item">
        <a-button class="editable-add-btn" @click="handleAdd" type="primary">
          添加参数
        </a-button>
      </div>
      <div class="item" v-if="dataSource.length">
        <div class="label">
          POST数据方式
        </div>
        <div class="item-c">
          <a-select :default-value="0" style="width: 100%" @change="contentTypeChange">
            <a-select-option :value="0">
              JSON
            </a-select-option>
            <a-select-option :value="2">
              form-data
            </a-select-option>
            <a-select-option :value="1">
              x-www-form-urlencoded
            </a-select-option>
          </a-select>

        </div>

      </div>
      <div class="item" v-if="dataSource.length">
        <div class="label">
          请求参数
        </div>
        <div class="table-box">
          <a-table bordered :data-source="dataSource" :columns="columns" :pagination='false'>
            <template slot="name" slot-scope="text, record">
              <a-input type="text" @change="mentionsNameChange" @focus="SetCurrentIndex(record.key)" />
            </template>
            <template slot="value" slot-scope="text, record">
              <a-mentions @change="mentionsChange" @focus="SetCurrentIndex(record.key)">
                <a-mentions-option value="afc163">
                  afc163
                </a-mentions-option>
                <a-mentions-option value="zombieJ">
                  zombieJ
                </a-mentions-option>
                <a-mentions-option value="yesmeck">
                  yesmeck
                </a-mentions-option>
              </a-mentions>
            </template>
            <template slot="operation" slot-scope="text, record">
              <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="() => onDelete(record.key)">
                <a href="javascript:;">Delete</a>
              </a-popconfirm>
            </template>
          </a-table>

        </div>

      </div>
    </div>
    <div class="item">
      <div class="label">
        测试数据数据
      </div>
      <div class="table-box">
        <vue-json-editor :expandedOnStart="true" v-model="testjson" :mode="'view'" lang="zh" class="json-wrap">
        </vue-json-editor>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import Qs from "qs"
  import vueJsonEditor from 'vue-json-editor'
  export default {
    name: 'data-plant',
    data() {
      return {
        apiType: 'GET', //请求类型
        value: '', // 全局变量
        url: '',  //请求地址
        currentIndex: 0, //当前修改项
        currentType: 0, //请求content-type
        apiTypes: [   //默认请求type list
          { name: 'GET', value: 'GET' },
          { name: 'POST', value: 'POST' },
        ], dataSource: [ //参数列表
          // {
          //   key: '0',
          //   name: 'Edward King 0',
          //   value: '32',
          // }
        ],
        count: 0,
        testjson: {},//测试数据
        columns: [  //参数表头
          {
            title: '参数名称',
            dataIndex: 'name',
            width: '30%',
            scopedSlots: { customRender: 'name' },
          },
          {
            title: '字段值',
            dataIndex: 'value',
            scopedSlots: { customRender: 'value' },
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
          }
        ],
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
    components: {
      vueJsonEditor
    },
    methods: {
      getData() {
        let data = {}
        this.dataSource.map(v => {
          data[v.name] = v.value
        })
        // 发送 POST 请求
        console.log(data)
        let _data = this.getPostData(this.currentType, data)
        console.log(_data, 8888)
        axios({
          headers: {
            'Content-Type': this.getContentType(this.currentType)
          },
          method: this.apiType,
          url: this.url,
          data: _data
        }).then(res => {
          this.testjson = res.data
        });
      },
      contentTypeChange(e) {

        this.currentType = e
      },
      getContentType(typeid) {
        let type = ''
        switch (typeid) {
          case 0:
            type = 'application/json'
            break;
          case 1:
            type = 'application/x-www-form-urlencoded'
            break;
          case 2:
            type = 'multipart/form-data'
            break;
          default:
            break;
        }
        console.log(typeid)
        return type
      },
      getPostData(typeid, _data) {
        let data = {}

        if (typeid == 0) {
          data = _data
        } else if (typeid == 1) {
          data = Qs.stringify(_data)
        } else if (typeid == 2) {
          data = new FormData()
          Object.keys(_data).forEach(v => {
            data.append(v, _data[v])
          })
          console.log(data)
        }
        return data
      },
      setApiType(value) {
        this.apiType = value
      }, onCellChange(key, dataIndex, value) {
        const dataSource = [...this.dataSource];
        const target = dataSource.find(item => item.key === key);
        if (target) {
          target[dataIndex] = value;
          this.dataSource = dataSource;
        }
      },

      SetCurrentIndex(e) {
        this.currentIndex = e
      },
      mentionsNameChange(e) {
        this.dataSource[this.currentIndex].name = e.target.value
      },
      mentionsChange(e) {
        this.dataSource[this.currentIndex].value = e
        console.log(this.dataSource);
      },
      onDelete(key) {
        const dataSource = [...this.dataSource];
        this.dataSource = dataSource.filter(item => item.key !== key);
        console.log(dataSource, 9999);
      },
      handleAdd() {
        const { count, dataSource } = this;
        const newData = {
          key: count,
          name: ``,
          value: '',
        };
        this.dataSource = [...dataSource, newData];
        this.count = count + 1;
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .api-box {
    .item {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .label {
        width: 120px;
        text-align: right;
        margin-right: 10px;
      }

      .item-c {
        flex: 1;
        text-align: left;
      }

      .table-box {
        flex: 1;
      }

      .json-wrap {
        height: 200px;
        overflow-y: auto;
      }


    }

    .api-item-box {
      display: flex;
      flex-direction: column;
    }
  }
</style>
<style>
  .jsoneditor-vue {
    height: 100%;
    overflow-y: auto;
    color: #fff;
  }

  div.jsoneditor-field,
  div.jsoneditor-value,
  div.jsoneditor td,
  div.jsoneditor th,
  div.jsoneditor textarea,
  .jsoneditor-expandable,
  .jsoneditor-schema-error {
    color: #fff
  }
</style>