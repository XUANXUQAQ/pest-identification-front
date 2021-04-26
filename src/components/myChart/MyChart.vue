<template>
  <div style="width: 100%; height: 100%" id="myChart"></div>
</template>

<script>
import echarts from 'echarts';

const data = [];
const option = {
  title: {
    text: '损失函数状态',
  },
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'value',
  },
  series: [{
    name: '模拟数据',
    type: 'line',
    showSymbol: true,
    hoverAnimation: true,
    data,
  }],
};
export default {
  name: 'my-chart',
  data() {
    return {
      countTest: 0,
      lossTest: 100,
    };
  },
  mounted() {
    // 初始化echarts, theme为light
    this.myChart = echarts.init(document.getElementById('myChart'), 'light');
    setInterval(this.addData, 250); // Test
    this.myChart.setOption(option);
  },
  methods: {
    // 添加实时数据
    addData(count, loss) {
      if (data.length > 5) {
        data.shift();
      }
      const dataTest = [this.countTest++, this.lossTest--]; // Test
      data.push(dataTest); // Test
      this.myChart.setOption({
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data,
        }],
      });
      this.myChart.setOption({
        xAxis: [{
          type: 'value',
          splitLine: {
            show: false,
          },
          min: data[0][0],
          max: data[data.length - 1][0] + 1,
        }],
      });
    },
  },
};
</script>

<style>
#myChart {
  width: 100%;
  height: 500px;
  margin: 0 auto;
}
</style>
