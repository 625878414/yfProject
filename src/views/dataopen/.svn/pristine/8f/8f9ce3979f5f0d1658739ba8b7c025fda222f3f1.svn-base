<style scoped>

</style>
<template>
    <div id="api-dashboard">
        <div class="page-content-body">
            <a-tabs default-active-key="1" @change="callback">
                <a-tab-pane key="1" tab="全局概览">
                    <a-alert
                        message="你有7条未处理的api申请，请您及时处理。立即审批"
                        banner
                        closable
                    />
                    <a-row :gutter="[16, 16]">
                        <a-col :md="16">
                            <a-card style="height:400px">
                                <a-row :gutter="16">
                                    <a-col :md="8">
                                        <a-row :gutter="[16, 16]">
                                            <a-col :md="24">
                                                <a-card style="height:105px">
                                                    <p>Card content</p>
                                                </a-card>
                                            </a-col>
                                            <a-col :md="24">
                                                <a-card style="height:105px">
                                                    <p>Card content</p>
                                                </a-card>
                                            </a-col>
                                            <a-col :md="24">
                                                <a-card style="height:105px">
                                                    <p>Card content</p>
                                                </a-card>
                                            </a-col>
                                        </a-row>
                                    </a-col>
                                    <a-col :md="16">
                                        <div id="container" />
                                    </a-col>
                                </a-row>
                            </a-card>
                        </a-col>
                        <a-col :md="8">
                            <a-card
                                style="width:100%"
                                :tab-list="tabListNoTitle"
                                :active-tab-key="noTitleKey"
                                @tabChange="key => onTabChange(key, 'noTitleKey')"
                            >
                                <p v-if="noTitleKey === 'article'">
                                    <a-table :columns="columns1" :data-source="data1" :pagination="false">
                                        <a slot="name" slot-scope="text">{{ text }}</a>
                                        <span slot="customTitle">
                                            <a-icon type="smile-o"/>
                                            Name
                                        </span>
                                        <span slot="tags" slot-scope="tags">
                                            <a-tag v-for="tag in tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'" >
                                                {{ tag.toUpperCase() }}
                                            </a-tag>
                                        </span>
                                    </a-table>
                                </p>
                                <p v-else-if="noTitleKey === 'app'">
                                    app content
                                </p>
                                <a slot="tabBarExtraContent" href="#">More</a>
                            </a-card>
                        </a-col>
                    </a-row>
                    <a-row :gutter="[16, 16]">
                        <a-col :md="16">
                            <a-card title="错误类型分部" style="height:400px">
                                <div id="container_pie" />
                            </a-card>
                        </a-col>
                        <a-col :md="8">
                            <a-card title="失败率TOP10" style="height:400px">
                                <a-table :columns="columns2" :data-source="data2" :pagination="false">
                                    <a slot="name" slot-scope="text">{{ text }}</a>
                                    <span slot="customTitle">
                                            <a-icon type="smile-o"/>
                                            Name
                                        </span>
                                    <span slot="tags" slot-scope="tags">
                                            <a-tag v-for="tag in tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'" >
                                                {{ tag.toUpperCase() }}
                                            </a-tag>
                                        </span>
                                </a-table>
                            </a-card>
                        </a-col>
                    </a-row>
                </a-tab-pane>
                <a-tab-pane key="2" tab="我的概览" force-render>
                    Content of Tab Pane 2
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
export default {
    name: "dashboard",
    data() {
        return {
            tabListNoTitle: [
                {
                    key: 'article',
                    tab: '调用用户TOP10',
                },
                {
                    key: 'app',
                    tab: '调用量TOP10',
                },
            ],
            key: 'tab1',
            noTitleKey: 'article',
            columns1: [
                {
                    title: '排名',
                    dataIndex: 'key',
                    key: 'key',
                }, {
                    title: '用户',
                    key: 'tags',
                    dataIndex: 'tags',
                    scopedSlots: { customRender: 'tags' },
                }, {
                    title: '调用次数',
                    dataIndex: 'age',
                    key: 'age',
                }
            ],
            data1: [
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    tags: ['John Brown'],
                }, {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    tags: ['Jim Green'],
                }, {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    tags: ['Joe Black'],
                },{
                    key: '4',
                    name: 'Joe Black',
                    age: 32,
                    tags: ['Joe Black'],
                }
            ],
            columns2: [
                {
                    title: '排名',
                    dataIndex: 'key',
                    key: 'key',
                }, {
                    title: '接口',
                    key: 'tags',
                    dataIndex: 'tags',
                    scopedSlots: { customRender: 'tags' },
                }, {
                    title: '调用次数',
                    dataIndex: 'age',
                    key: 'age',
                }, {
                    title: '失败率',
                    dataIndex: 'age',
                    key: 'age',
                }
            ],
            data2: [
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    tags: ['John Brown'],
                }, {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    tags: ['Jim Green'],
                }, {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    tags: ['Joe Black'],
                },{
                    key: '4',
                    name: 'Joe Black',
                    age: 32,
                    tags: ['Joe Black'],
                }
            ],
            chartData:[
                {
                    "Year": 2016,
                    "Number of incidents": "13,488",
                    "Deaths": "34,676",
                    "Injuries": "39,851"
                },
                {
                    "Year": 2015,
                    "Number of incidents": "14,852",
                    "Deaths": "38,464",
                    "Injuries": "43,960"
                },
                {
                    "Year": 2014,
                    "Number of incidents": "16,860",
                    "Deaths": "43,566",
                    "Injuries": "41,061"
                },
                {
                    "Year": 2013,
                    "Number of incidents": "11,996",
                    "Deaths": "22,234",
                    "Injuries": "37,666"
                },
                {
                    "Year": 2012,
                    "Number of incidents": "8,500",
                    "Deaths": "15,436",
                    "Injuries": "25,486"
                },
                {
                    "Year": 2011,
                    "Number of incidents": "5,071",
                    "Deaths": "8,228",
                    "Injuries": "14,652"
                },
                {
                    "Year": 2010,
                    "Number of incidents": "4,822",
                    "Deaths": "7,727",
                    "Injuries": "15,860"
                },
                {
                    "Year": 2009,
                    "Number of incidents": "4,719",
                    "Deaths": "9,271",
                    "Injuries": "19,128"
                },
                {
                    "Year": 2008,
                    "Number of incidents": "4,803",
                    "Deaths": "9,135",
                    "Injuries": "18,984"
                },
                {
                    "Year": 2007,
                    "Number of incidents": "3,241",
                    "Deaths": "12,858",
                    "Injuries": "22,453"
                },
                {
                    "Year": 2006,
                    "Number of incidents": "2,749",
                    "Deaths": "9,362",
                    "Injuries": "15,551"
                },
                {
                    "Year": 2005,
                    "Number of incidents": "2,009",
                    "Deaths": "6,313",
                    "Injuries": "12,769"
                },
                {
                    "Year": 2004,
                    "Number of incidents": "1,162",
                    "Deaths": "5,718",
                    "Injuries": "11,817"
                },
                {
                    "Year": 2003,
                    "Number of incidents": "1,262",
                    "Deaths": "3,278",
                    "Injuries": "7,091"
                },
                {
                    "Year": 2002,
                    "Number of incidents": "1,332",
                    "Deaths": "4,799",
                    "Injuries": "7,103"
                },
                {
                    "Year": 2001,
                    "Number of incidents": "1,907",
                    "Deaths": "7,743",
                    "Injuries": "21,151"
                },
                {
                    "Year": 2000,
                    "Number of incidents": "1,813",
                    "Deaths": "4,402",
                    "Injuries": "5,869"
                },
                {
                    "Year": 1999,
                    "Number of incidents": "1,395",
                    "Deaths": "3,388",
                    "Injuries": "5,341"
                },
                {
                    "Year": 1998,
                    "Number of incidents": 933,
                    "Deaths": "4,688",
                    "Injuries": "8,183"
                },
                {
                    "Year": 1997,
                    "Number of incidents": "3,200",
                    "Deaths": "10,928",
                    "Injuries": "9,174"
                },
                {
                    "Year": 1996,
                    "Number of incidents": "3,056",
                    "Deaths": "6,965",
                    "Injuries": "10,781"
                },
                {
                    "Year": 1995,
                    "Number of incidents": "3,081",
                    "Deaths": "6,094",
                    "Injuries": "14,288"
                },
                {
                    "Year": 1994,
                    "Number of incidents": "3,458",
                    "Deaths": "7,691",
                    "Injuries": "7,573"
                },
                {
                    "Year": 1993,
                    "Number of incidents": 747,
                    "Deaths": "2,669",
                    "Injuries": "5,600"
                },
                {
                    "Year": 1992,
                    "Number of incidents": "5,073",
                    "Deaths": "9,745",
                    "Injuries": "9,927"
                },
                {
                    "Year": 1991,
                    "Number of incidents": "4,683",
                    "Deaths": "8,429",
                    "Injuries": "7,591"
                },
                {
                    "Year": 1990,
                    "Number of incidents": "3,887",
                    "Deaths": "7,148",
                    "Injuries": "6,128"
                },
                {
                    "Year": 1989,
                    "Number of incidents": "4,323",
                    "Deaths": "8,136",
                    "Injuries": "5,512"
                },
                {
                    "Year": 1988,
                    "Number of incidents": "3,720",
                    "Deaths": "7,189",
                    "Injuries": "6,860"
                },
                {
                    "Year": 1987,
                    "Number of incidents": "3,184",
                    "Deaths": "6,476",
                    "Injuries": "5,769"
                },
                {
                    "Year": 1986,
                    "Number of incidents": "2,860",
                    "Deaths": "4,976",
                    "Injuries": "5,814"
                },
                {
                    "Year": 1985,
                    "Number of incidents": "2,915",
                    "Deaths": "7,094",
                    "Injuries": "5,130"
                },
                {
                    "Year": 1984,
                    "Number of incidents": "3,495",
                    "Deaths": "10,450",
                    "Injuries": "5,291"
                },
                {
                    "Year": 1983,
                    "Number of incidents": "2,870",
                    "Deaths": "9,444",
                    "Injuries": "4,047"
                },
                {
                    "Year": 1982,
                    "Number of incidents": "2,545",
                    "Deaths": "5,135",
                    "Injuries": "3,342"
                },
                {
                    "Year": 1981,
                    "Number of incidents": "2,585",
                    "Deaths": "4,851",
                    "Injuries": "3,337"
                },
                {
                    "Year": 1980,
                    "Number of incidents": "2,662",
                    "Deaths": "4,391",
                    "Injuries": "3,645"
                },
                {
                    "Year": 1979,
                    "Number of incidents": "2,661",
                    "Deaths": "2,100",
                    "Injuries": "2,502"
                },
                {
                    "Year": 1978,
                    "Number of incidents": "1,526",
                    "Deaths": "1,459",
                    "Injuries": "1,600"
                },
                {
                    "Year": 1977,
                    "Number of incidents": "1,319",
                    "Deaths": 456,
                    "Injuries": 518
                },
                {
                    "Year": 1976,
                    "Number of incidents": 923,
                    "Deaths": 672,
                    "Injuries": 755
                },
                {
                    "Year": 1975,
                    "Number of incidents": 740,
                    "Deaths": 617,
                    "Injuries": 617
                },
                {
                    "Year": 1974,
                    "Number of incidents": 580,
                    "Deaths": 542,
                    "Injuries": 763
                },
                {
                    "Year": 1973,
                    "Number of incidents": 473,
                    "Deaths": 370,
                    "Injuries": 495
                },
                {
                    "Year": 1972,
                    "Number of incidents": 496,
                    "Deaths": 566,
                    "Injuries": 408
                },
                {
                    "Year": 1971,
                    "Number of incidents": 470,
                    "Deaths": 173,
                    "Injuries": 82
                },
                {
                    "Year": 1970,
                    "Number of incidents": 651,
                    "Deaths": 171,
                    "Injuries": 192
                }
            ],
            pieData: [
                { item: '超时', count: 40, percent: 0.4 },
                { item: '超出限制', count: 21, percent: 0.21 },
                { item: '禁用', count: 17, percent: 0.17 },
                { item: '未认证', count: 13, percent: 0.13 },
                { item: '参数错误', count: 9, percent: 0.09 },
            ],
        };
    },
    mounted(){
        this.renderChart()
        this.renderPie()
    },
    methods: {
        callback(key) {
            console.log(key);
        },
        onTabChange(key, type) {
            console.log(key, type);
            this[type] = key;
        },
        renderChart(){
            let ds= new DataSet() ;
            const chart = new Chart({
                container: 'container',
                autoFit: true,
                height: 330,
                syncViewPadding: true,
            });

            chart.scale({
                Deaths: {
                    sync: true,
                    nice: true,
                },
                death: {
                    sync: true,
                    nice: true,
                },
            });


            const dv1 = ds.createView().source(this.chartData);
            dv1.transform({
                type: 'map',
                callback: (row) => {
                    if (typeof (row.Deaths) === 'string') {
                        row.Deaths = row.Deaths.replace(',', '');
                    }
                    row.Deaths = parseInt(row.Deaths, 10);
                    row.death = row.Deaths;
                    row.year = row.Year;
                    return row;
                }
            });
            const view1 = chart.createView();
            view1.data(dv1.rows);
            view1.axis('Year', {
                subTickLine: {
                    count: 3,
                    length: 3,
                },
                tickLine: {
                    length: 6,
                },
            });
            view1.axis('Deaths', {
                label: {
                    formatter: text => {
                        return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                    }
                }
            });
            view1.line().position('Year*Deaths');


            const dv2 = ds.createView().source(dv1.rows);
            dv2.transform({
                type: 'regression',
                method: 'polynomial',
                fields: ['year', 'death'],
                bandwidth: 0.1,
                as: ['year', 'death']
            });

            const view2 = chart.createView();
            view2.axis(false);
            view2.data(dv2.rows);
            view2.line().position('year*death').style({
                stroke: '#969696',
                lineDash: [3, 3]
            })
                .tooltip(false);
            view1.annotation().text({
                content: '趋势线',
                position: ['1970', 2500],
                style: {
                    fill: '#8c8c8c',
                    fontSize: 14,
                    fontWeight: 300
                },
                offsetY: -70
            });
            chart.render();
        },
        renderPie(){
            const chart = new Chart({
                container: 'container_pie',
                autoFit: true,
                height: 350,
            });
            chart.data(this.pieData);
            chart.scale('percent', {
                formatter: (val) => {
                    val = val * 100 + '%';
                    return val;
                },
            });
            chart.coordinate('theta', {
                radius: 0.75,
                innerRadius: 0.9,
            });
            chart.tooltip({
                showTitle: false,
                showMarkers: false,
                itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
            });
            // 辅助文本
            chart.annotation()
                .text({
                    position: ['50%', '50%'],
                    content: '主机',
                    style: {
                        fontSize: 14,
                        fill: '#8c8c8c',
                        textAlign: 'center',
                    },
                    offsetY: -20,
                })
                .text({
                    position: ['50%', '50%'],
                    content: '200',
                    style: {
                        fontSize: 20,
                        fill: '#8c8c8c',
                        textAlign: 'center',
                    },
                    offsetX: -10,
                    offsetY: 20,
                })
                .text({
                    position: ['50%', '50%'],
                    content: '台',
                    style: {
                        fontSize: 14,
                        fill: '#8c8c8c',
                        textAlign: 'center',
                    },
                    offsetY: 20,
                    offsetX: 20,
                });
            chart
                .interval()
                .adjust('stack')
                .position('percent')
                .color('item')
                .label('percent', (percent) => {
                    return {
                        content: (data) => {
                            return `${data.item}: ${percent * 100}%`;
                        },
                    };
                })
                .tooltip('item*percent', (item, percent) => {
                    percent = percent * 100 + '%';
                    return {
                        name: item,
                        value: percent,
                    };
                });

            chart.interaction('element-active');

            chart.render();
        }
    },

};
</script>
