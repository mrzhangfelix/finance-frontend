<template>
  <div>
    <h1>折线图</h1>
    <el-button size="mini" type="danger" @click="getYingliList">刷新</el-button>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>


<script>
  export default {
    data: function () {
      this.chartSettings = {
        xAxisType: 'time'
      }
      return {
        chartData: {
          columns: ['time', 'quantity'],
          rows: []
        }
      }
    },
    methods: {
            getYingliList(){
                this.getRequest("/api/finance/getYingliList").then(resp=> {
                    if (resp && resp.status == 200) {
                        var data = resp.data;
                        this.chartData.rows = resp.data
                        }
                })
            }
    },
    created: function(){
        this.getYingliList()
    }
  }
</script>
