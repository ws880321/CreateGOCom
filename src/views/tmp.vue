<template>
    <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="样式" key="1">
            <a-collapse v-model="activeKey">
                <a-collapse-panel header="基础属性" key="1">
                    <a-form-model layout="inline" :model="attrData">
                        <a-form-model-item :label="item" v-for="item in Object.keys(attrData)">
                            <a-input-number id="inputNumber" v-model="attrData[item]" step='1' @change="updata(1)" />
                            <!-- <a-input v-model="tmpChange[item]" type="" placeholder="input placeholder" /> -->
                        </a-form-model-item>
                    </a-form-model>
                </a-collapse-panel>
                <a-collapse-panel header="图表样式" key="3">
                    <a-form-model layout="inline" :model="optionData">
                        <a-form-model-item :label="optionData[item].name" v-for="item in Object.keys(optionData)">
                            <a-input v-model="optionData[item].value" placeholder="input placeholder"
                                @change="updata(2)" />
                        </a-form-model-item>
                    </a-form-model>
                </a-collapse-panel>
            </a-collapse>
        </a-tab-pane>
        <a-tab-pane tab="数据" key="2">
            <!-- <a-form class="a-form">
                <a-form-model-item :label="item" v-for="(item,index) in sourceData.xAxisData">
                    <a-input v-model="sourceData.yAxisData[index]" @change="updata(3)" />
                </a-form-model-item>
            </a-form> -->
            <dataPlant :json="sourceData" @getJson="getJson" />
        </a-tab-pane>
        <a-tab-pane tab="交互" key="3">
            <div class="">
                交互名称:
                <a-select style="width: 120px;display: inline" @change="setActionSource">
                    <a-select-option :value="item.actiontype" v-for="item in actionsData">
                        {{item.actionName}}
                    </a-select-option>
                </a-select>
            </div>
            <div class="">
                目标组件:
                <a-select style="width: 120px;display: inline" @change="setActionTarget">
                    <a-select-option :value="item.cid" v-for="item in targetList">
                        {{item.name}}
                    </a-select-option>
                </a-select>
            </div>
            <div class="">
                执行操作:
                <a-select style="width: 120px;display: inline" @change="getActions">
                    <a-select-option :value="item.functionName" v-for="item in functionData">
                        {{item.actionName}}
                    </a-select-option>
                </a-select>
            </div>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import mixin2 from '../assets/js/mixin2.js'
    import dataPlant from '../components/DataPlant'
    export default {
        mixins: [mixin2],
        name: 'line1-tmp',
        data() {
            return {
                optionData: {
                    barColor: {
                        name: '背景颜色',
                        value: '#1890ff',
                    },
                },
                attrData: {
                    left: 10,
                    top: 10,
                    width: 300,
                    height: 200
                },
                //组件数据
                sourceData: {
                    xAxisData: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                    yAxisData: [5, 20, 36, 10, 10, 20]
                },
                visible: false,
                activeKey: 1,
                form: {
                    fieldA: '',
                    fieldB: '',
                },
                actionsData: [{ actionName: '单柱点击', actiontype: 'click', type: 'receive', bindKey: this.cid, bindVal: false },
                { actionName: '单柱双击', actiontype: 'dbclick', type: 'receive', bindKey: this.cid, bindVal: false }],
                functionData: [{ actionName: '更新', type: 'export', functionName: 'updata' }],
                targetCid: null

            }
        },
        watch: {


        },

        mounted() {
        },
        computed: {
        },
        methods: {
            getJson(value) {
                this.sourceData = value
                this.updata(3)
            },
            formItemLayout() {
                return {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
            }
        },

        components: {
            dataPlant
        },
    }
</script>
<style lang="less">
    .right-bar {
        top: 52px !important;
        background-color: #212b42;
        width: 300px !important;
        right: 0;

        .panel-title {
            color: #ffffff;
            font-size: 14px;
            font-weight: normal;
            line-height: 30px;
            padding: 10px 20px;
        }

        .ant-drawer-content-wrapper {
            width: 300px !important;

            .ant-drawer-body {
                padding: 0;
            }
        }

        .ant-drawer-content {
            background-color: #293552;
        }
    }
</style>
<style>
    .a-form {
        padding: 10px;
        background-color: #fff;
        ;
    }

    .right-bar .ant-tabs-tab {
        background-color: #091633;
        margin: 0;
        width: 100px;
        box-sizing: border-box;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #8b8da1;
        height: 38px;
        padding-top: 0;
        padding-bottom: 0;
        line-height: 38px;
        ;

    }

    .right-bar .ant-tabs-tab-active {
        background-color: #293552;
        color: #fff;
    }

    .right-bar .ant-tabs-top .ant-tabs-ink-bar-animated,
    .right-bar .ant-tabs-bottom .ant-tabs-ink-bar-animated {
        background-color: #293552;
        ;
    }

    .right-bar .ant-tabs-bar {
        margin: 0;

    }
</style>