<template>
  <div id="bar" style="width: 50%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    props: ["xValues", "yValues"],
    data() {
      return {
        option : {
          color: ['#d84430'],
          tooltip: {
            show: true
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              inside: true,
              verticalAlign: 'bottom',
              lineHeight: 40,
              color: 'rgba(60, 60, 60, 1)',
              formatter: function (value, index) {   // 设置y轴文字的颜色
                if (index > 2) {
                  return '{first|' + value + '}'
                } else {
                  return '{other|' + value + '}'
                }
              },
              rich: {
                other: {
                  color: 'rgba(60, 60, 60, 1)',
                  opacity: 1
                },
                first: {
                  color: 'rgba(60, 60, 60, 1)'
                }
              }
            },
            data: [1,1,1],
          },
          xAxis: {
            nameTextStyle: {
              color: 'rgba(60, 60, 60, 1)',
              align: 'right'
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: 'rgba(60, 60, 60, 1)'
            },
          },
          grid: {
            top: '0%',
            bottom: '0%',
            left: '10%',
            right: '0%'
          },
          series: [{
            name: '预警排行榜',
            barWidth: 15,
            type: 'bar',
            data: [1,1,1],
            itemStyle: {
              normal: {
                borderRadius: [3, 20, 20, 3],
                color: function (params) {   // 设置柱形图的颜色
                  if (params.dataIndex === 5) {
                    return '#d84430'
                  } else if (params.dataIndex === 4) {
                    return '#f38237'
                  } else if (params.dataIndex === 3) {
                    return '#e2aa20'
                  } else {
                    return '#608289'
                  }
                }
              },
            }
          }]
        }
      };
    },
    created() {
      console.log("created");
    },
    beforeMount() {
      console.log("beforeMount");
    },
    mounted() {
      console.log("mounted");
      console.log(this.option.yAxis.data);
      console.log(this.option.series[0].data);
      this.initEchart();
    },
    
    watch: {
      xValues(newDatax) {
        console.log(newDatax);
        this.option.series[0].data = newDatax;
      },
      yValues(newDatay) {
        console.log(newDatay);
        this.option.yAxis.data = newDatay;
      }
    },
    methods: {
      async load() {
        this.charts = echarts.init(document.getElementById('bar')); 
      //   var option = {
      //   title: {
      //     text: 'ECharts Getting Started Example'
      //   },
      //   tooltip: {},
      //   legend: {
      //     data: ['sales']
      //   },
      //   xAxis: {
      //     data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
      //   },
      //   yAxis: {},
      //   series: [
      //     {
      //       name: 'sales',
      //       type: 'bar',
      //       data: [5, 20, 36, 10, 10, 20]
      //     }
      //   ]
      // };
        // var option = {
        //   color: ['#d84430'],
        //   tooltip: {
        //     show: true
        //   },
        //   yAxis: {
        //     axisTick: {
        //       show: false
        //     },
        //     axisLine: {
        //       show: false,
        //     },
        //     axisLabel: {
        //       inside: true,
        //       verticalAlign: 'bottom',
        //       lineHeight: 40,
        //       color: 'rgba(60, 60, 60, 1)',
        //       formatter: function (value, index) {   // 设置y轴文字的颜色
        //         if (index > 2) {
        //           return '{first|' + value + '}'
        //         } else {
        //           return '{other|' + value + '}'
        //         }
        //       },
        //       rich: {
        //         other: {
        //           color: 'rgba(60, 60, 60, 1)',
        //           opacity: 1
        //         },
        //         first: {
        //           color: 'rgba(60, 60, 60, 1)'
        //         }
        //       }
        //     },
        //     data: this.yValue
        //   },
        //   xAxis: {
        //     nameTextStyle: {
        //       color: 'rgba(60, 60, 60, 1)',
        //       align: 'right'
        //     },
        //     splitLine: {
        //       show: false,
        //     },
        //     axisLine: {
        //       show: false,
        //     },
        //     axisLabel: {
        //       color: 'rgba(60, 60, 60, 1)'
        //     },
        //   },
        //   grid: {
        //     top: '0%',
        //     bottom: '0%',
        //     left: '10%',
        //     right: '0%'
        //   },
        //   series: [{
        //     name: '预警排行榜',
        //     barWidth: 15,
        //     type: 'bar',
        //     data: this.xValue,
        //     itemStyle: {
        //       normal: {
        //         borderRadius: [3, 20, 20, 3],
        //         color: function (params) {   // 设置柱形图的颜色
        //           if (params.dataIndex === 5) {
        //             return '#d84430'
        //           } else if (params.dataIndex === 4) {
        //             return '#f38237'
        //           } else if (params.dataIndex === 3) {
        //             return '#e2aa20'
        //           } else {
        //             return '#608289'
        //           }
        //         }
        //       },
        //     }
        //   }]
        // };
        // 使用刚指定的配置项和数据显示图表。
        await this.charts.setOption(this.option);
        window.addEventListener('resize', () => {
          this.charts.resize()
        })
      },
      async initEchart() {
        this.charts = echarts.init(document.getElementById('bar'));

        await this.charts.setOption(this.option);
        window.addEventListener('resize', () => {
          this.charts.resize()
        })
      },
    }
  }
</script>
