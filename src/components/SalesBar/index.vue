<template>
  <div class="sales-bar">
    <div class="chart-wrapper">
      <vue-echart ref="chart" :options="options"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesBar',
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
    const num = this.data.data1.reduce((a, b) => a + b, 0) + this.data.data2.reduce((a, b) => a + b, 0)
    this.options = {
      title: {
        text: `今日销售额：${num}元`,
        textStyle: {
          color: '#fff'
        }
      },
      color: ['#c23632', '#038cd9'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '2%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      yAxis: {
        type: 'category',
        data: this.data.axis,
        axisLabel: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '平台流量',
          type: 'bar',
          data: this.data.data1
        },
        {
          name: '外部流量',
          type: 'bar',
          data: this.data.data2
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
.sales-bar {
  width: 100%;
  height: 650px;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
}

.chart-wrapper {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: hsla(0,0%,100%,.05);
}
</style>
