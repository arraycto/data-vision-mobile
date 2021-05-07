<template>
  <div class="sales-line">
    <div class="chart-wrapper">
      <vue-echart ref="chart" :options="options"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesLine',
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
    const { axis, data1, data2, data3 } = this.data
    this.options = {
      title: {
        text: '分时访问&成交趋势图',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '2%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      color: ['rgb(0, 163, 233)', 'yellow', 'red'],
      xAxis: {
        type: 'category',
        data: axis,
        boundaryGap: false,
        axisLabel: {
          color: 'rgba(255,255,255)'
        },
        axisLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: 'rgba(255,255,255)'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        }
      },
      series: [
        {
          name: '访问量',
          type: 'line',
          data: data1,
          smooth: true,
          itemStyle: {
            opacity: 0
          }
        },
        {
          name: '成交量',
          type: 'line',
          data: data2,
          smooth: true,
          itemStyle: {
            opacity: 0
          }
        },
        {
          name: 'KPI',
          type: 'line',
          data: data3,
          smooth: true,
          itemStyle: {
            opacity: 0
          }
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
.sales-line {
  width: 100%;
  height: 500px;
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
