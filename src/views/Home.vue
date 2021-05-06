<template>
  <div class="home">
    <div class="loading" v-if="loading">
      加载中...
    </div>
    <div class="container" v-else>
      <div class="header-wrapper">
        <div class="title">慕课外卖数据大屏</div>
        <div class="sub-title">移动报表</div>
        <div class="date">{{date}}</div>
      </div>
      <div class="content-wrapper">
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from '@/apis'

export default {
  name: 'Home',
  data () {
    return {
      data: null,
      loading: true
    }
  },
  computed: {
    date () {
      const date = new Date()
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      m = m < 10 ? `0${m}` : m
      d = d < 10 ? `0${d}` : d
      return `${y}-${m}-${d}`
    }
  },
  mounted () {
    getData().then((res) => {
      this.loading = false
      this.data = res
    })
  }
}
</script>

<style lang="scss" scoped>
.loading{
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #fff;
  background: #031639;
}

.container{
  min-height: 100vh;
  width: 100%;
  background-color: #022770;
  background-image: url(~@/assets/images/bg.jpg);
  background-repeat:  no-repeat;
  background-size: 100%;
  overflow: auto;

  .header-wrapper {
    width: 100%;
    padding: 50px 24px 24px;
    box-sizing: border-box;
    color: #fff;

    .title {
      font-size: 48px;
      font-weight: 500;
    }
    .sub-title {
      font-size: 36px;
      margin-top: 20px;
    }
    .date {
      font-size: 24px;
      font-weight: 300;
      color: rgba(255,255,255,.5);
      margin-top: 40px;
    }
  }

  .content-wrapper {
    height: 100%;
    width: 100%;
  }
}
</style>
