<template>
  <div class="sales-radar">
    <div class="chart-wrapper">
      <vue-echart ref="chart" :options="options" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesRadar',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      options: {}
    }
  },
  mounted () {
    this.options = {
      radar: {
        name: {
          textStyle: {
            color: '#fff'
          }
        },
        indicator: this.data.indicator
      },
      series: [
        {
          name: '运营指标',
          type: 'radar',
          data: this.data.data
        }
      ]
    }
    window.addEventListener('resize', this.handlerResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handlerResize)
  },
  methods: {
    handlerResize () {
      this.$refs.chart.resize()
    }
  }

}
</script>

<style lang="scss" scoped>
.sales-radar {
  width: 100%;
  height: 800px;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
}

.chart-wrapper {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: hsla(0,0%,100%,.05);
}
</style>
