<template>
    <div style="display: inline;padding-top: 22px;">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>  
                    <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="getfunddata">获取数据
                    </el-button>
            </el-form-item>  
            <el-form-item>  
                <el-button size="mini" type="danger" @click="updatefundjson">更新配置文件</el-button>
            </el-form-item>  
            <el-form-item>  
                <el-button size="mini" type="danger" @click="adddialogVisible=true">添加一组数据</el-button>
            </el-form-item>  
        </el-form>
        <el-tag style="margin-bottom: 10px">时间：{{funddata.gztime}}</el-tag>
        <el-tag type="success">共盈利：{{funddata.todayIncameSum}}</el-tag>
        <el-table
                :data="funddata.fundlist"
                v-loading="tableLoading"
                border
                size="mini"
                stripe
                style="width: 100%">

            <el-table-column
                    prop="fundName"
                    width="170"
                    label="名称">
            </el-table-column>
            <el-table-column
                    prop="fundcode"
                    width="65"
                    label="编码">
            </el-table-column>
            <el-table-column
                    prop="fundamount"
                    width="100"
                    label="总值">
            </el-table-column>
          <el-table-column
            prop="holdShare"
            width="100"
            label="份额">
          </el-table-column>
            <el-table-column
              width="65"
                    prop="add"
                    label="定投">
            </el-table-column>
            <el-table-column
              width="75"
                    prop="amountChange"
                    label="买入金额">
            </el-table-column>
            <el-table-column
              width="75"
                    prop="shareChange"
                    label="卖出份额">
            </el-table-column>
            <el-table-column
              width="75"
                    prop="yingli"
                    label="昨日盈利">
            </el-table-column>
          <el-table-column
            width="75"
            prop="gusuanzhi"
            label="昨日估值">
          </el-table-column>
            <el-table-column
              width="75"
                    prop="zhangfu"
                    label="昨日涨幅">
            </el-table-column>
          <el-table-column
            label="七日内买入"
          >
            <template slot-scope="scope">
              金额：{{JSON.stringify(scope.row.buyamount7)}}<br>
              份额：{{JSON.stringify(scope.row.buyshare7)}}
            </template>
          </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="50">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                :title=editForm.fundcode
                :visible.sync="editdialogVisible"
                width="30%"
                center
                >
                <el-form :model="editForm" label-width="120px">
                        
                        <el-form-item label="现持有总值">
                                <el-input v-model="editForm.fundamount"></el-input>
                        </el-form-item>
                        <el-form-item label="定投">
                                <el-input v-model="editForm.add"></el-input>
                        </el-form-item>
                        <el-form-item label="今日买入金额">
                                <el-input v-model="editForm.amountChange"></el-input>
                        </el-form-item>
                        <el-form-item label="今日卖出份额">
                                <el-input v-model="editForm.shareChange"></el-input>
                        </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="editdialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="changeJsonByCode">确 定</el-button>
                </span>
        </el-dialog>
        <el-dialog
                title="添加一组数据"
                :visible.sync="adddialogVisible"
                width="30%"
                center
                >
                <el-form :model="addForm" label-width="120px">
                        <el-form-item label="编码">
                                <el-input v-model="addForm.fundcode"></el-input>
                        </el-form-item>
                        <el-form-item label="持有总值">
                                <el-input v-model="addForm.fundamount"></el-input>
                        </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="adddialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addJsondata">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

    <script>
    export default {
        data: function() {
            return {
                funddata:{
                    
                },
                tableLoading:false,
                editdialogVisible:false,
                adddialogVisible:false,
                editForm:{
                    fundcode:'',
                    fundamount:'',
                    add:'',
                    amountChange:'',
                    shareChange:''
                },
                addForm:{
                    fundcode:'',
                    fundamount:''
                }
            } 
        },
        methods: {
            getfunddata(){
                this.tableLoading = true;
                this.getRequest("/api/finance/getTodayfundjson").then(resp=> {
                    this.tableLoading = false;
                    if (resp && resp.status == 200) {
                        var data = resp.data;
                        this.funddata = resp.data
                        }
                })
            },
            updatefundjson(){
                this.getRequest("/api/finance/updatefundjson").then(resp=> {
                    if (resp && resp.status == 200) {
                        var data = resp.data;
                        this.$message({message: resp.data});
                        this.getfunddata()
                        }
                })
            },
            handleEdit(index, row){
                this.editForm.fundcode=row.fundcode
                this.editForm.fundamount=row.fundamount
                this.editForm.add=row.add
                this.editForm.amountChange=row.amountChange
                this.editForm.shareChange=row.shareChange
                this.editdialogVisible=true
            },
            changeJsonByCode(){
                this.postRequest("/api/finance/changeJsonByCode",this.editForm).then(resp=>{
                    if (resp && resp.status == 200) {
                        var data = resp.data;
                        this.$message({message: resp.data});
                        this.getfunddata()
                        }
                })
            },
            addJsondata(){
                this.postRequest("/api/finance/addJsonData",this.addForm).then(resp=>{
                    if (resp && resp.status == 200) {
                        var data = resp.data;
                        this.$message({message: resp.data});
                        this.getfunddata()
                        }
                })
            }
        },
        created: function(){
            this.getfunddata()
        }      
    }
    </script>
