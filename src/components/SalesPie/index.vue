<template>
  <div class="sales-pie">
    <div class="chart-wrapper" v-for="(item,index) in options" :key="index">
      <vue-echart ref="chart" :options="item"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesPie',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      options: []
    }
  },
  mounted () {
    const options = []
    this.data.forEach((item) => {
      const option = {
        title: {
          text: item.name,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            type: 'pie',
            name: item.name,
            radius: ['65%', '80%'],
            avoidLabelOverlap: false,
            label: {
              position: 'center',
              formatter: `${item.total}`,
              color: '#fff',
              fontSize: 16,
              fontWeight: 500
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: item.data[0],
                name: '数据',
                itemStyle: {
                  color: 'rgb(0, 140, 217)'
                }
              },
              {
                value: item.data[1],
                name: '数据',
                itemStyle: {
                  color: 'rgb(35, 69, 145)'
                }
              }
            ]
          }
        ]
      }
      options.push(option)
    })
    this.options = options
    window.addEventListener('resize', this.handlerResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handlerResize)
  },
  methods: {
    handlerResize () {
      const length = this.options.length
      for (let i = 0; i < length; i++) {
        this.$refs.chart[i].resize()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sales-pie{
  width: 100%;
  height: 400px;
  padding: 20px 10px 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  .chart-wrapper{
    flex: 1;
    width: 100%;
    height: 100%;
    margin: 0 10px;
    padding: 20px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, .05);
  }
}
</style>
