<template>
    <div style="display: inline;padding-top: 22px;">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>  
                    <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="getfunddata">刷新
                    </el-button>
            </el-form-item> 
            <el-form-item>  
                    <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="generateNewFundJson">生成今日配置
                    </el-button>
            </el-form-item> 
            <el-form-item label="自动刷新">
                    <el-switch
                    v-model="autoRefresh"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="switchAutoreRefresh">
                    </el-switch>
            </el-form-item> 
            <el-form-item label="桌面提示">  
                    <el-switch
                    v-model="desktopPrompt"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="switchDesktopPrompt">
                    </el-switch>
            </el-form-item> 
            <el-form-item>
                    <small>共盈利<span :class="yingliClass">{{funddata.todayIncameSum}}</span></small>
            </el-form-item>
        </el-form>
        <el-table
                :data="funddata.fundlist"
                v-loading="tableLoading"
                border
                size="mini"
                style="width: 100%"
                :row-class-name="tableRowClassName">

            <el-table-column
                    prop="fundName"
                    sortable
                    label="名称">
            </el-table-column>
            <el-table-column
                    prop="fundcode"
                    label="编码">
            </el-table-column>
            <el-table-column
                    prop="fundamount"
                    sortable
                    label="总值">
            </el-table-column>
            <el-table-column
                    prop="yingli"
                    sortable
                    label="盈利">
            </el-table-column>
            <el-table-column
                    prop="zhangfu"
                    sortable
                    label="涨幅">
            </el-table-column>
        </el-table>
    </div>
</template>

    <script>
    const path = require('path')
    export default {
        data: function() {
            return {
                funddata:{
                    
                },
                tableLoading:false,
                yingliClass:'up-color',
                autoRefresh:false,
                autoRefreshId:null,
                desktopPrompt:false
            } 
        },
        methods: {
            getfunddata(){
                this.tableLoading = true;
                this.getRequest("/api/finance/refreshFundData").then(resp=> {
                    this.tableLoading = false;
                    if (resp && resp.status == 200) {
                        var data = resp.data;
                        this.funddata = resp.data
                        if(this.desktopPrompt){
                            this.notifyMe();
                        }
                        if(this.funddata.todayIncameSum>=0){
                            this.yingliClass='up-color'
                        }else{
                            this.yingliClass='down-color'
                        }
                        }
                })
            },
            generateNewFundJson(){
                this.getRequest("/api/finance/generateNewFundJson").then(resp=> {
                    if (resp && resp.status == 200) {
                        var data = resp.data;
                        this.$message({message: resp.data});
                        }
                })
            },
            tableRowClassName({row, rowIndex}) {
                if (row.yingli >= 0) {
                    return 'up-row';
                } else {
                    return 'down-row';
                }
            },
            handleEdit(index, row){
                console.log(row)
            },
            notifyMe() {
                    // 先检查浏览器是否支持
                    if(!("Notification" in window)) {
                        alert("This browser does not support desktop notification");
                    }

                    // 检查用户是否同意接受通知
                    else if(Notification.permission === "granted") {
                        // If it's okay let's create a notification
                        var notification = new Notification(this.funddata.todayIncameSum); 
                    }

                    // 否则我们需要向用户获取权限
                    else if(Notification.permission !== 'denied') {
                        Notification.requestPermission(function(permission) {
                            if(permission === "granted") {
                                var notification = new Notification(this.funddata.todayIncameSun); 
                            }
                        });
                    }

            },
            switchAutoreRefresh(){
                if(this.autoRefresh){
                    this.autoRefreshId = window.setInterval(this.getfunddata,60*1000);
                    console.log("打开定时刷新："+this.autoRefreshId)
                }else{
                    window.clearInterval(this.autoRefreshId)
                    console.log("关闭定时刷新："+this.autoRefreshId)
                }                
            },
            switchDesktopPrompt(){
            }
        },
        created: function(){
            this.getfunddata()
        },
        destroyed: function(){
            if(this.autoRefreshId){
                clearInterval(this.autoRefreshId); 
                console.log("关闭定时刷新："+this.autoRefreshId)
            }
        }        
    }
    </script>


<style>
    .up-color{
        color:#F56C6C
    }
    .down-color{
        color:#67C23A
    }
    .el-table .up-row {
        color: #F56C6C;
    }

    .el-table .down-row {
        color: #67C23A;
    }
</style>
