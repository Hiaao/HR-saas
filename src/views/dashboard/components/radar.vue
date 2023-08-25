<template>
  <!-- 雷达图组件 -->
  <div ref="myDiv" class="radar-container" />
</template>

<script>
// import echarts from 'echarts'// 完整加载
// 按需加入
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts' // 引入雷达图
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components' // 引入如标题等功能的组件
import { CanvasRenderer } from 'echarts/renderers' // Canvas渲染器很重要的一步
echarts.use([RadarChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer]) // 注册使用
export default {
  // 当页面渲染完毕通过mounted(页面渲染完毕)执行,获取数据
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv)
    // 按需加载

    myChart.setOption({
      title: {
        text: 'Basic Radar Chart'
      },
      legend: {
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style>
.radar-container {
  width: 600px;
  height: 400px;
}
</style>
