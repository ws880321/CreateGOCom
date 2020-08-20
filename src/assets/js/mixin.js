
import {
  mapState,
  mapMutations
} from 'vuex'
const mixin = {
  props: ['cid'],
  computed: {
    ...mapState('GoCom', ['list']),
    eventflag: function () {
      this.$nextTick(() => {
        if (this.cid) {
          return this.list.filter(v => v.cid == this.cid)[0].actionSource
        } else {
          return ''
        }
      })
    },
    newStyle: function () {
      let currentCom = this.list.filter(v => v.cid == this.cid)[0]
      let newData = {}
      Object.assign(this.attrData, currentCom ? currentCom.baseData : {})
      Object.keys(this.attrData).map(v => {
        newData[v] = this.attrData[v] + 'px'
      })
      return newData
    },
    newOptionData: function () {
      let currentCom = this.list.filter(v => v.cid == this.cid)[0]
      let newData = {}
      Object.assign(newData, this.optionData, currentCom ? currentCom.optionData : {})
      return newData
    },
    newSourceData: function () {
      let currentCom = this.list.filter(v => v.cid == this.cid)[0]
      let newData = {}
      Object.assign(newData, this.sourceData, currentCom ? currentCom.sourceData : {})
      return newData
    },
    currentCom: function () {
      return this.list.filter(v => v.cid == this.cid)[0]
    }


  },
  watch: {
    newSourceData: {
      handler: function (v) {
        setTimeout(() => {
          this.updata()
        }, 0);
      },
      deep: true
    },
    newOptionData: {
      handler: function (v) {
        setTimeout(() => {
          this.updata()
        }, 0);
      },
      deep: true
    },
    eventflag: {
      handler: function (v) {
        let functionName = 'updata'
        this[functionName]()
      },
      deep: true
    },

  },
  methods: {
    ...mapMutations('GoCom', ['setActionData', 'updataActionData']),
    updataAction(actions) {
      let actionsList = actions ? actions : this.actionsData
      actionsList.forEach(item => {
        if (item.type === 'receive') {
          this.setActionData([item, this.functionData])
        }
      });
    }
  },
  mounted() {
    this.updataAction()
  }
}
export default mixin