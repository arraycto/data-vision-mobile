<template>
  <div class="sales-map">
    <div id="map_container"></div>
  </div>
</template>

<script>
export default {
  name: 'SalesMap',
  mounted () {
    this.drawChart()
    window.addEventListener('resize', this.handlerResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handlerResize)
  },
  methods: {
    // 初始化地图
    initBMap () {
      // 引入 common.js 可以简化地图创建的过程
      return this.$initMap({
        tilt: 0,
        heading: 0,
        center: [this.$mapv.utilCityCenter.getCenterByCityName('上海').lng - 15, this.$mapv.utilCityCenter.getCenterByCityName('上海').lat],
        zoom: 4,
        style: this.$purpleStyle,
        enableScrollWheelZoom: false,
        disableDragging: true
      })
    },
    // 准备数据源
    initData () {
      const cities = ['北京', '天津', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨', '长春', '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州', '武汉', '长沙', '广州', '南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐', '成都', '贵阳', '昆明', '拉萨', '海口']
      const data = []
      const center = this.$mapv.utilCityCenter.getCenterByCityName('上海')
      const nodeData = [
        { x: center.lng, y: center.lat }
      ]
      const edgeData = []
      for (let i = 0; i < 800; i++) {
        const start = this.$mapv.utilCityCenter.getCenterByCityName(cities[parseInt(cities.length * Math.random())])
        nodeData.push({ x: start.lng - 5 + 10 * Math.random(), y: start.lat - 5 + 10 * Math.random() })
        edgeData.push({ source: parseInt(i * Math.random()), target: 0 })
      }
      // 应用 mapv 中的边绑定
      const bundling = this.$mapv.utilForceEdgeBundling().nodes(nodeData).edges(edgeData)
      const results = bundling()
      for (let i = 0; i < results.length; i++) {
        const line = results[i]
        const coordinates = []
        for (let j = 0; j < line.length; j++) {
          coordinates.push([line[j].x, line[j].y])
        }
        data.push({
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        })
      }
      return data
    },
    // 绘制数据源
    setData (data, map) {
      const view = new this.$mapvgl.View({ map })

      const lineLayer = new this.$mapvgl.LineLayer({
        color: 'rgba(55, 50, 250, 0.3)',
        blend: 'lighter'
      })
      const linePointLayer = new this.$mapvgl.LinePointLayer({
        size: 8,
        speed: 20,
        color: 'rgba(255, 255, 0, 0.6)',
        animationType: this.$mapvgl.LinePointLayer.ANIMATION_TYPE_SMOOTH,
        shapeType: this.$mapvgl.LinePointLayer.SHAPE_TYPE_CIRCLE,
        blend: 'lighter'
      })
      lineLayer.setData(data)
      linePointLayer.setData(data)

      view.addLayer(lineLayer)
      view.addLayer(linePointLayer)
    },
    // 绘制图表
    drawChart () {
      const map = this.initBMap()
      map.disableDragging() // 禁用地图拖拽
      const data = this.initData()
      this.setData(data, map)
    },
    handlerResize () {
      this.drawChart()
    }
  }
}
</script>

<style lang="scss" scoped>
.sales-map {
  width: 100%;
  height: 600px;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;

  #map_container{
    width: 100%;
    height: 100%;
  }
}
</style>
