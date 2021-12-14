<template>
  <div class="standardStatistics" :style="'height:' + bodyHeight + 'px'">
    <div class="header">
      <div>
        <div class="standard">
          <div>
            <img src="./assets/image/standard.png" alt="" />
          </div>
          <div class="standardText">数据标准</div>
        </div>
      </div>
      <div class="total">
        <div>总数/条</div>
        <div>{{ boardData.total }}</div>
      </div>
      <div class="total">
        <div>已发布/条</div>
        <div>{{ boardData.published }}</div>
      </div>
      <div class="total">
        <div>待发布/条</div>
        <div>{{ boardData.unPublished }}</div>
      </div>
    </div>
    <div class="content" :style="`height:${bodyHeight - 200}px`">
      <div>
        <div class="title">
          <span class="icon">
            <span class="font">
              标准热度
            </span>
            <a-tooltip>
              <span slot="title" style="color:#fff;font-size:1rem;">
                以云图的方式展示热门数据标准。
              </span>
              <a-icon type="question-circle" style="cursor: pointer;" />
            </a-tooltip>
          </span>
          <a-select
            placeholder="显示条数"
            size="small"
            style="width:10rem;height:1.5rem;margin-right:1.4286rem"
            v-model="labelCount"
            @change="countChange"
          >
            <a-select-option value="5">
              5条
            </a-select-option>
            <a-select-option value="10">
              10条
            </a-select-option>
            <a-select-option value="15">
              15条
            </a-select-option>
            <a-select-option value="20">
              20条
            </a-select-option>
          </a-select>
        </div>
        <div id="wordCloud"></div>
      </div>
      <div>
        <div class="title">
          <span class="icon">
            <span class="font">
              标准目录分布
            </span>
            <a-tooltip>
              <span slot="title" style="color:#fff;font-size:1rem;">
                统计一级目录下的数据标准占比情况。
              </span>
              <a-icon type="question-circle" style="cursor: pointer;" />
            </a-tooltip>
          </span>
        </div>
        <div id="pieChart">2</div>
      </div>
      <div>
        <div class="title">
          <span class="icon">
            <span class="font">
              标准趋势
            </span>
            <a-tooltip>
              <span slot="title" style="color:#fff;font-size:1rem;">
                统计指定时间内已发布的数据标准总数变化趋势。
              </span>
              <a-icon type="question-circle" style="cursor: pointer;" />
            </a-tooltip>
          </span>
          <a-range-picker
            format="YYYY-MM-DD"
            valueFormat="YYYY-MM-DD"
            @change="timeChange"
            style="width:14rem;margin-top:1.1429rem;margin-right:1.4286rem"
            size="small"
            v-model="date"
            :allowClear="false"
          />
        </div>
        <div id="lineChart">3</div>
      </div>
    </div>
  </div>
</template>

<script>
import "echarts-wordcloud/dist/echarts-wordcloud.min";
const baseURL = "/zuul/lmanage/dataStandard/statistics";
function GetDateStr(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
  return y + "-" + m + "-" + d;
}
export default {
  name: "standardStatistics",
  data() {
    return {
      wordCloud: null,
      pieChart: null,
      lineChart: null,
      // list: [
      //   {
      //     value: "50",
      //     name: "准驾车型"
      //     // textStyle: {
      //     //   shadowBlur: 4,
      //     //   shadowColor: "#ECEFFF",
      //     //   shadowOffsetY: 14,
      //     //   color: "#0aa1ed",
      //     // },
      //   }, // 50
      //   { value: "30", name: "区域名称" },
      //   { value: "29", name: "用户编号" },
      //   { value: "28", name: "机构编号" },
      //   { value: "27", name: "卡口编号" },
      //   { value: "26", name: "警员名称" },
      //   { value: "25", name: "警员标号" },
      //   { value: "24", name: "违法编号" },
      //   { value: "23", name: "违法名称" },
      //   { value: "22", name: "卡口编号" },
      //   { value: "21", name: "卡口名称" },
      //   { value: "20", name: "用户名称" },
      //   { value: "16", name: "道路代码" },
      //   { value: "15", name: "违法地点" },
      //   { value: "14", name: "定位信息" },
      //   { value: "13", name: "车辆编号" },
      //   { value: "12", name: "驾驶证编号" },
      //   { value: "11", name: "身份证" },
      //   { value: "10", name: "违法类型" },
      //   { value: "9", name: "违法编号" }
      // ],
      labelCount: "20",
      startTime: "",
      endTime: "",
      boardData: {},
      list: [],
      catalogList: [],
      date: [GetDateStr(-30), GetDateStr(0)]
    };
  },
  methods: {
    wordCloudInit() {
      this.$http({
        method: "get",
        params: {
          topN: this.labelCount
        },
        url: baseURL + "/heat"
      }).then(res => {
        if (res.data.success) {
          this.list = res.data.data;
          // console.log(this.list);
          var wordCloudData = this.list.map(item => {
            return {
              name: item.name,
              value: item.hitCount
            };
          });
          console.log(wordCloudData);
        }
        this.wordCloud = this.echarts.init(document.getElementById("wordCloud"));
        let option = {
          tooltip: {
            show: true,
            borderColor: "#fe9a8bb3",
            borderWidth: 1,
            // padding: [10, 15, 10, 15],
            confine: true,
            backgroundColor: "rgba(255, 255, 255, .9)",
            textStyle: {
              color: "#426ab3",
              lineHeight: 22
            },
            formatter: function(params) {
              var result = "";
              var dotHtml =
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8;"></span>';
              result += dotHtml + params.data.name + "  " + params.data.value + "条";
              return result;
            },
            extraCssText: "box-shadow: 0 4px 20px -4px rgba(199, 206, 215, .7);border-radius: 4px;"
          },
          series: [
            {
              type: "wordCloud",
              // The shape of the "cloud" to draw. Can be any polar equation represented as a
              // callback function, or a keyword present. Available presents are circle (default),
              // cardioid (apple or heart shape curve, the most known polar equation), diamond (
              // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

              shape: "pentagon",

              // A silhouette image which the white area will be excluded from drawing texts.
              // The shape option will continue to apply as the shape of the cloud to grow.

              // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
              // Default to be put in the center and has 75% x 80% size.

              left: "center",
              top: "center",
              width: "100%",
              height: "100%",
              right: null,
              bottom: null,

              // Text size range which the value in data will be mapped to.
              // Default to have minimum 12px and maximum 60px size.

              sizeRange: [14, 50],

              // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

              rotationRange: [0, 0],
              rotationStep: 0,

              // size of the grid in pixels for marking the availability of the canvas
              // the larger the grid size, the bigger the gap between words.

              gridSize: 25,

              // set to true to allow word being draw partly outside of the canvas.
              // Allow word bigger than the size of the canvas to be drawn
              drawOutOfBound: false,

              // If perform layout animation.
              // NOTE disable it will lead to UI blocking when there is lots of words.
              layoutAnimation: true,

              // Global text style
              textStyle: {
                fontFamily: "PingFangSC-Semibold",
                fontWeight: 600,
                color: function(params) {
                  let colors = [
                    "#EE4A4B",
                    "#465668",
                    "#A1AEB5",
                    "#F2813D",
                    "#89A8F9",
                    "#65E4C3",
                    "#8674F1",
                    "#F9C566",
                    "#8CD95F",
                    "#73DDFF",
                    "#58D5FF"
                  ];
                  return colors[parseInt(Math.random() * 10)];
                }
              },
              emphasis: {
                focus: "none"
              },

              // Data is an array. Each array item must have name and value property.
              data: wordCloudData
            }
          ]
        };
        this.wordCloud.setOption(option);
      });
    },
    pieChartInit() {
      this.$http(baseURL + "/catalogRatio").then(res => {
        if (res.data.success) {
          this.catalogList = res.data.data;
        }
        console.log(this.catalogList);
        var catalogList = this.catalogList.map(item => {
          return {
            name: item.catalogName,
            value: item.count
          };
        });
        console.log(catalogList);
        this.pieChart = this.echarts.init(document.getElementById("pieChart"));
        let option;

        option = {
          title: {
            left: "center"
          },
          tooltip: {
            trigger: "item",
            textStyle: {
              color: "#426ab3"
            },
            formatter: function(params) {
              var result = "";
              var dotHtml =
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8;"></span>';
              result += dotHtml + params.data.name + "  " + params.data.value + "条";
              return result;
            }
          },
          legend: {
            // orient: "vertical",
            left: "left"
          },
          series: [
            {
              name: "标准目录分布",
              type: "pie",
              radius: "50%",
              center: ["50%", "60%"],
              data: catalogList,
              label: {
                formatter: "{b}:{d}%"
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };

        option && this.pieChart.setOption(option);
      });
    },
    lineChartInit() {
      this.$http({
        method: "get",
        url: baseURL + "/trend",
        params: {
          startTime: this.date[0] ? this.date[0] : "",
          endTime: this.date[1] ? this.date[1] : ""
        }
      }).then(res => {
        var list = res.data.data;
        var timeList = list.map(item => {
          return item.releaseTime;
        });
        var count = list.map(item => {
          return item.standardCount;
        });
        this.lineChart = this.echarts.init(document.getElementById("lineChart"));
        let option = {
          backgroundColor: "transparent",
          tooltip: {
            trigger: "axis",
            // backgroundColor: "#39CCDD",
            show: true,
            formatter: function(params) {
              var result = "";
              var dotHtml =
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8;"></span>';
              params.forEach(function(item) {
                result += "发布日期 : " + item.axisValue + "</br>" + "数量 : " + dotHtml + item.data +"条";
              });
              return result;
            },
            textStyle: {
              color: "#426ab3"
            },
            axisPointer: {
              lineStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "red"
                    },
                    {
                      offset: 0.5,
                      color: "#48b3FF"
                    },
                    {
                      offset: 1,
                      color: "#d9efff"
                    }
                  ],
                  global: false
                }
              }
            }
          },
          grid: {
            top: "5%",
            left: "8%",
            right: "3%",
            bottom: "8%"
            // containLabel: true
          },
          xAxis: [
            {
              type: "category",
              color: "#59588D",
              axisLine: {
                show: true
              },
              axisLabel: {
                color: "#282828"
              },
              splitLine: {
                // show: true
              },

              axisTick: {
                show: false
              },
              // boundaryGap: true,
              // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              data: timeList
            }
          ],

          yAxis: [
            {
              type: "value",
              min: 0,
              splitNumber: 4,
              splitLine: {
                show: true
              },
              axisLine: {
                show: true
              },
              axisLabel: {
                show: true,
                // margin: 20,
                textStyle: {
                  color: "#737373"
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(131,101,101,0.2)",
                  type: "dashed"
                }
              }
            }
          ],
          series: [
            {
              name: "",
              type: "bar",
              // smooth: true, //是否平滑
              showAllSymbol: true,
              symbol: "circle",
              symbolSize: 5,

              lineStyle: {
                normal: {
                  color: "#48B3FF"
                }
              },
              label: {
                show: false,
                position: "top",
                textStyle: {
                  color: "#48B3FF"
                }
              },

              itemStyle: {
                // color: "#FFF",
                borderColor: "#48B3FF",
                borderWidth: 2
              },
              tooltip: {
                show: true
              },
              areaStyle: {
                normal: {
                  color: new this.echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "rgba(195,230,255,1)"
                      },
                      {
                        offset: 1,
                        color: "rgba(195,230,255,0.1)"
                      }
                    ],
                    false
                  ),
                  shadowColor: "rgba(195,230,255,0.1)",
                  shadowBlur: 20
                }
              },
              // data: [55, 35, 62, 55, 97, 64, 44, 66, 78, 82, 33, 77],
              data: count
            }
          ]
        };
        option && this.lineChart.setOption(option);
      });
    },
    countChange() {
      console.log(this.labelCount);
      this.wordCloudInit();
    },
    timeChange(date) {
      this.lineChartInit();
    },
    // getWordCloudData() {},
    getBoardData() {
      this.$http.get(baseURL + "/board").then(res => {
        if (res.data.success) {
          this.boardData = res.data.data;
          // console.log(this.boardData);
        }
      });
    }
  },
  computed: {
    bodyHeight() {
      return this.$store.state.app.bodyHeight;
    }
  },
  mounted() {
    this.wordCloudInit();
    this.pieChartInit();
    this.lineChartInit();
    this.getBoardData();
  }
};
</script>

<style scoped lang="less">
.standardStatistics {
  background: #36d1dc; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #5b86e5, #36d1dc); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #5b86e5,
    #36d1dc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.header {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 12.5rem;
  padding: 1.25rem 1.875rem;
  margin: 0 auto;
  color: #fff;
  .standardText {
    text-align: center;
    font-size: 20px;
  }
  .total {
    :nth-child(1) {
      font-size: 1.25rem;
      margin-top: 1.875rem;
      font-weight: 400;
    }
    :nth-child(2) {
      font-size: 3.125rem;
      font-weight: bold;
    }
  }
}
.content {
  display: flex;
  justify-content: space-around;
  padding: 3.125rem;
  div {
    width: 31.25rem;
    height: 31.25rem;
    // background-color: #e8e8e8;
    margin-top: 1.25rem;
    .title {
      // text-align: center;
      color: #fff;
      font-weight: bold;
      font-size: 1.285714rem;
      height: 2.857143rem;
      display: flex;
      justify-content: space-between;
      .icon {
        color: rgb(126, 106, 106);
        margin-left: 1.4286rem;
        margin-top: 1rem;
        font-size: 1rem;
        .font {
          color: #fff;
          font-weight: bold;
          font-size: 1.2857rem;
        }
      }
    }
    #wordCloud {
      // border: 1px solid #0aa1ed;
      box-shadow: 1px 1px 10px #1994c5;
      // background-color: #fff;
      // width: 90%;
      height: 90%;
      border-radius: 25px;
      padding: 1.25rem 1.25rem;
    }
    #pieChart {
      height: 90%;
      box-shadow: 1px 1px 10px #1994c5;
      // background-color: #fff;
      // width: 90%;
      padding: 2.5rem 1.875rem;
      height: 90%;
      border-radius: 1.5625rem;
    }
    #lineChart {
      height: 90%;
      box-shadow: 1px 1px 10px #1994c5;

      // background-color: #fff;
      // width: 90%;
      padding: 2.5rem 1.875rem;
      height: 90%;
      border-radius: 1.5625rem;
    }
  }
}
</style>
