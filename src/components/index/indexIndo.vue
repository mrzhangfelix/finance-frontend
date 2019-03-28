<template>
    <el-row style="margin-top:20px">
        <el-col :span="6" v-for="o in indexData" :key="o[0]">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{o[0]}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div class="text item">
                    现值：{{o[3]}}<br> 
                    成交量：{{o[8]}}<br> 
                    成交额：{{o[9]}}<br> 
                    日期：{{o[30]}}<br> 
                    时间：{{o[31]}}
                    <!-- {{currentDate}} -->
                </div>
            </el-card>
        
        </el-col>
    </el-row>
    
</template>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .box-card {
    margin: 5px;
  }
</style>

<script>
export default {
    data() {
        return {
            indexData:{},
            currentDate: new Date()
        };
    },
    methods: {
            getindexdata(){
                this.getRequest("/api/finance/getIndexInfo").then(resp=> {
                    if (resp && resp.status == 200) {
                        var data = resp.data;
                        this.indexData = resp.data
                        }
                })
            }
    },
    created: function(){
        this.getindexdata()
    }
}
</script>
