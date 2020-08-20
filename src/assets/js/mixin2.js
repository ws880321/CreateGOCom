
import {
  mapState,
  mapMutations
} from 'vuex'
const mixin2 = {
  data() {
    return {
      actions: {
        source: {},
        implement: {}
      },
      actionTarget: null
    }
  },
  props: ['cid'],
  computed: {
    ...mapState('GoCom', ['list', 'selectd']),
    targetList: function () {
      return this.list.filter(v => v.cid != this.cid)
    }
  },
  watch: {
    list: {
      handler: function (v) {
        if (this.selectd.includes(this.cid) && this.selectd.length == 1) {
          this.attrData = this.list.filter(k => k.cid == this.cid)[0].baseData
          Object.assign(this.sourceData, this.list.filter(k => k.cid == this.cid)[0].sourceData)
          Object.assign(this.optionData, this.list.filter(k => k.cid == this.cid)[0].optionData)
        }
      },
      deep: true
    },
    selectd: {
      handler: function (v) {
        if (this.selectd.includes(this.cid) && this.list.length) {
          this.attrData = this.list.filter(k => k.cid == this.cid)[0].baseData
          Object.assign(this.sourceData, this.list.filter(k => k.cid == this.cid)[0].sourceData)
          Object.assign(this.optionData, this.list.filter(k => k.cid == this.cid)[0].optionData)

        }
      },
      deep: true
    },
  },
  methods: {
    ...mapMutations('GoCom', ['updataBaseData', 'updataOptionData', 'updataSourceData', 'setSelect', 'setActionSource', 'setActions']),
    setActionSource(v) {
      this.actions.source = this.actionsData.filter(k => k.actiontype == v)[0]
    },
    setActionTarget(e) {
      this.actionTarget = this.list.filter(v => v.cid == e)[0]
      this.targetCid = e
    },
    getActions(functionName) {
      this.actions.implement = this.actionTarget.functionData.filter(k => k.functionName == functionName)[0]
      this.actions.implement.cid = this.targetCid
      this.setActions(this.actions)
    },
    updata(e) {
      if (!this.selectd.includes(this.cid)) {
        this.setSelect(this.cid)
      }
      if (e == 1) {
        this.updataBaseData({
          cid: this.cid,
          baseData: this.attrData
        })
      } else if (e == 2) {
        this.updataOptionData({
          cid: this.cid,
          optionData: this.optionData
        })
      }
      else if (e == 3) {
        this.updataSourceData({
          cid: this.cid,
          sourceData: this.sourceData
        })
      }
    },
  },


}
export default mixin2