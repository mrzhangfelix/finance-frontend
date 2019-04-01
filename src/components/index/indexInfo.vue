<template>
    <el-row style="margin-top:20px">
        <el-col :span="12" v-for="o in indexData" :key="o[0]">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{o.name}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <img :src= o.img class="image">
                <div class="text item">
                    现值：{{o.price}}<br> 
                    百分比：{{o.arrow=='↑'?'+':'-'}}{{(o.percent*100).toFixed(2)}}%<br> 
                    涨跌：{{o.updown}}{{o.arrow}}<br> 
                    成交量：{{o.volume}}<br> 
                    成交额：{{o.turnover}}<br> 
                    时间：{{o.time}}
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
                        for(var key in this.indexData){
                            this.indexData[key]['img']="/api/finance/getImg?imgName="+this.indexData[key].code
                        }
                        }
                })
            }
    },
    created: function(){
        this.getindexdata()
    }
}
</script>
