<template>
    <div style="display: inline;padding-top: 22px;">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>  
                    <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="getfunddata">刷新
                    </el-button>
            </el-form-item> 
            <el-form-item>
                    <small>共盈利<span style="color:#67C23A">{{funddata.todayIncameSum}}</span></small>
            </el-form-item>
        </el-form>
        <el-table
                :data="funddata.fundlist"
                v-loading="tableLoading"
                border
                size="mini"
                stripe
                style="width: 100%">

            <el-table-column
                    prop="fundName"
                    label="名称">
            </el-table-column>
            <el-table-column
                    prop="fundcode"
                    label="编码">
            </el-table-column>
            <el-table-column
                    prop="fundamount"
                    label="总值">
            </el-table-column>
            <el-table-column
                    prop="yingli"
                    label="盈利">
            </el-table-column>
            <el-table-column
                    prop="zhangfu"
                    label="涨幅">
            </el-table-column>
        </el-table>
    </div>
</template>

    <script>
    export default {
        data: function() {
            return {
                funddata:{
                    
                },
                tableLoading:false
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
                        }
                })
            },
            handleEdit(index, row){
                console.log(row)
            }
        },
        created: function(){
            // var timerId = window.setInterval(this.getfunddata,60*1000);
        }        
    }
    </script>
