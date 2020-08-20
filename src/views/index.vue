<template>
    <div :style="newStyle" ref="chart" class="charts"></div>
</template>
<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import mixin from '../assets/js/mixin.js'
    export default {
        mixins: [mixin],
        data() {
            return {
                myChart: null,
                options: null,
                //组件属性
                attrData: {
                    left: 0,
                    top: 0,
                    width: 300,
                    height: 200,
                },
                optionData: {
                    barColor: {
                        name: '背景颜色',
                        value: '#1890ff',
                    }
                },
                //组件数据
                sourceData: { xAxisData: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"], yAxisData: [5, 20, 36, 10, 10, 20] },
                actionsData: [
                    { actionName: '单柱点击', actiontype: 'click', type: 'receive', bindKey: this.cid, bindVal: false },
                    { actionName: '单柱双击', actiontype: 'dbclick', type: 'receive', bindKey: this.cid, bindVal: false }],
                functionData: [
                    { actionName: '更新', type: 'export', functionName: 'updata' }
                ],
            };
        },
        watch: {
        },
        methods: {
            updata() {
                if (this.myChart) {
                    this.myChart.clear();
                    this.myChart.setOption(this.getOptions(this.newOptionData, this.newSourceData))
                    this.myChart.resize();
                }
            },
            getOptions(charsAttrData, sourceData) {
                return {
                    tooltip: {},
                    xAxis: {
                        data: sourceData.xAxisData
                    },
                    color: [charsAttrData.barColor.value],
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: sourceData.yAxisData
                    }]
                }

            },
            initCharts() {
                let myChart = this.$echarts.init(this.$refs.chart);
                this.myChart = myChart
                // 绘制图表
                let options = this.getOptions(this.optionData, this.sourceData)
                this.options = options
                myChart.setOption(options);
                let _this = this
                myChart.on('click', function () {
                    _this.updataActionData(_this.actionsData[0])
                    _this.actionsData[0].bindVal = !_this.actionsData[0].bindVal
                })
            },
        },
        mounted() {
            this.initCharts();
        }
    }
</script>
<style scoped="">
    .charts {
        position: absolute;
    }
</style>