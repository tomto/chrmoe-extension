var extensionsWrap = {
    props: ['code'],
    data: function () {
        return {
            dialogVisible: false,
            rowdialogVisible: false,
            searchform: {
                activityDate: null,
                activityCode: '',
                areaCode: null,
            },
            searchrules: {
                activityDate: [{
                    type: 'date',
                    required: true,
                    message: '请选择日期',
                    trigger: 'change'
                }],
                areaCode: [{
                    type: 'array',
                    required: true,
                    message: '请至少选择一个店/仓',
                    trigger: 'change'
                }]
            },
            tableform: {
                activityId: null,
                planName: null
            },
            tablerules: {
                activityId: [{
                    type: 'string',
                    required: true,
                    message: '活动ID不能为空',
                    trigger: 'change'
                }],
                planName: [{
                    type: 'string',
                    required: true,
                    message: '投放任务名称不能为空/仓',
                    trigger: 'change'
                }]
            },
            rowform: {
                commodityName: '',
                commodityTitle: '',
                omRecommendPrice: 0,
                omRecommendDailyLimitNum: 0,
                omRecommendTotalLimitNum: 0,
                priceCopywriting: 0,
                channel: 0
            },
            rowrules: {
                commodityName: [{
                    type: 'string',
                    required: true,
                    message: '猫超商品名称不能为空',
                    trigger: 'blur'
                }],
                commodityTitle: [{
                    required: true,
                    message: '活动ID不能为空',
                    trigger: 'blur'
                }],
                omRecommendPrice: [{
                    required: true,
                    message: '运营建议价不能为空2',
                    trigger: 'blur'
                }],
                omRecommendDailyLimitNum: [{
                    type: 'string',
                    required: true,
                    message: '活动ID不能为空',
                    trigger: 'blur'
                }],
                omRecommendTotalLimitNum: [{
                    type: 'string',
                    required: true,
                    message: '投放任务名称不能为空/仓',
                    trigger: 'blur'
                }],
                priceCopywriting: [{
                    type: 'string',
                    required: true,
                    message: '投放任务名称不能为空/仓',
                    trigger: 'blur'
                }],
                channel: [{
                    type: 'string',
                    required: true,
                    message: '投放任务名称不能为空/仓',
                    trigger: 'blur'
                }]
            },
            options: null,
            tableData3: null,
            multipleSelection: [],
            activityCodeEnum: [{
                text: "今日疯抢",
                value: "ZYW0001"
            }, {
                text: "每日抢鲜",
                value: "ZYW0002"
            }]
        };
    },
    watch: {
        searchform: {
            handler: function (newvalue) {
                this.search('searchform');
            },
            deep: true
        }


    },
    mounted: function () {
        this.$nextTick(() => {
            axios.post(ygAjax.domain.getAreaList, {})
                .then((resData) => {
                    this.$nextTick(function () {
                        this.options = resData.data.data.areaList;
                    });
                })
                .catch(() => {});
        });
        this.searchform.activityCode = this.code;
    },
    methods: {
        search: function (from) {
            this.$refs[from].validate((valid) => {
                if (valid) {
                    var req = {
                        resourceIdType: this.searchform.activityCode,
                        activityDate: this.searchform.activityDate.getFullYear() + "-" + (this.searchform.activityDate.getMonth() + 1) + "-" + this.searchform.activityDate.getDate(),
                        launchAreas: this.searchform.areaCode.join(),
                        pageIndex: 1,
                        pageSize: 200
                    };
                    axios.post(ygAjax.domain.getLaunchCommodityList, req)
                        .then((resData) => {
                            this.$nextTick(function () {
                                this.tableData3 = resData.data.data.commodityInfoList;
                            });
                        })
                        .catch(() => {});
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        commit: function (form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    var req = {
                        resourceIdType: this.searchform.activityCode,
                        activityDate: this.searchform.activityDate.getFullYear() + "-" + (this.searchform.activityDate.getMonth() + 1) + "-" + this.searchform.activityDate.getDate(),
                        launchAreas: this.searchform.areaCode.join(),
                        pageIndex: 1,
                        pageSize: 200
                    };
                    axios.post(ygAjax.domain.getLaunchCommodityList, req)
                        .then((resData) => {
                            this.$nextTick(function () {
                                this.tableData3.push(resData.data.data.commodityInfoList);
                            });
                        })
                        .catch(() => {});
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        editRow(row, event, column) {
            console.log(row);
            if (row) {
                this.$refs.multipleTable.toggleRowSelection(row);
                this.rowform = row;
                this.rowdialogVisible = true;
            }
        },
        saveRow(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    var req = {
                        resourceIdType: this.searchform.activityCode,
                        activityDate: this.searchform.activityDate.getFullYear() + "-" + (this.searchform.activityDate.getMonth() + 1) + "-" + this.searchform.activityDate.getDate(),
                        launchAreas: this.searchform.areaCode.join(),
                        pageIndex: 1,
                        pageSize: 200
                    };
                    axios.post(ygAjax.domain.getLaunchCommodityList, req)
                        .then((resData) => {
                            this.$nextTick(function () {
                                this.tableData3 = resData.data.data.commodityInfoList;
                            });
                        })
                        .catch(() => {});
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetRow(form) {
            this.$refs[form].resetFields();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },
    template: `<div class="extensions">
           <el-form ref="searchform" :model="searchform" :rules="searchrules" >            
            <el-row :gutter="2"> 
               <el-col :span="4">                    
                    <el-form-item prop="activityCode">
                        <el-select :plain="true" v-model="searchform.activityCode" placeholder="活动类型">
                            <el-option
                            v-for="item in activityCodeEnum"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                            </el-option>
                        </el-select>                     
                    </el-form-item>                       
                </el-col>                                
                <el-col :span="4">                    
                    <el-form-item prop="activityDate">
                            <el-date-picker v-model="searchform.activityDate" :editable="false" type="date" placeholder="活动时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="4">                    
                    <el-form-item prop="areaCode">
                        <el-select :plain="true" v-model="searchform.areaCode" multiple placeholder="活动店/仓(多选)">
                            <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.areaName"
                            :value="item.id">
                            </el-option>
                        </el-select>                     
                    </el-form-item>                       
                </el-col>                       
                <el-col :span="4">
                    <el-form-item>                    
                        <el-button :plain="true" type="info" icon="search" @click="search('searchform')">搜索</el-button>
                    </el-form-item>
                </el-col>                                    
            </el-row>
        </el-form>
        <el-form ref="tableform" :model="tableform" :rules="tablerules">
            <el-row :gutter="2">
                <el-col :span="4">                    
                    <el-form-item prop="activityId">
                         <el-input v-model="tableform.activityId" placeholder="活动ID"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">                    
                    <el-form-item prop="planName">
                        <el-input v-model="tableform.planName" placeholder="投放任务名称"></el-input>
                    </el-form-item>                       
                </el-col>                       
                <el-col :span="4">
                    <el-form-item>
                        <el-button :plain="true" type="info" @click="commit('tableform')">提交选中商品</el-button>
                    </el-form-item>
                </el-col>    
            </el-row>
        </el-form>

        <el-row :gutter="2">            
            <el-table ref="multipleTable" :data="tableData3" :stripe="true" border tooltip-effect="dark" @selection-change="handleSelectionChange" @row-click="editRow">
                <el-table-column  type="selection" fixed width="55">全选</el-table-column>
                <el-table-column label="活动日期" width="200" >
                    <template scope="scope">{{ scope.row.activityDate }}</template>
                </el-table-column>
                <el-table-column prop="areaName" label="活动区/仓" show-overflow-tooltip></el-table-column>
                <el-table-column prop="commodityId" label="猫超商品ID" show-overflow-tooltip></el-table-column>                
                <el-table-column prop="commodityName" label="猫超商品名称"></el-table-column>                                               
                <el-table-column prop="commodityTitle label="商品标题"  v-if="searchform.activityCode=='ZYW0002'"></el-table-column>                
                <el-table-column prop="omRecommendPrice" label="运营建议价" ></el-table-column>
                <el-table-column prop="omRecommendDailyLimitNum" label="运营建议每日限购数" ></el-table-column>
                <el-table-column prop="omRecommendTotalLimitNum" label="运营建议活动商品数" ></el-table-column>
                <el-table-column prop="priceCopywriting" label="超市首页价格文案" v-if="searchform.activityCode=='ZYW0002'"></el-table-column>                
                <el-table-column prop="channel" label="优惠渠道" ></el-table-column>
            </el-table>   
        </el-row>   


     
<el-dialog title="编辑商品信息" :visible.sync="rowdialogVisible" size="tiny" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" :modal-append-to-body="false" :lock-scroll="true">
  <el-form ref="rowform" :model="rowform" :rules="rowrules">
    <el-form-item label="猫超商品名称" prop="commodityName" label-width="120px">
        <el-input v-model="rowform.commodityName" placeholder="猫超商品名称"></el-input>    
    </el-form-item>  
    <el-form-item label="商品标题" prop="commodityTitle" v-if="searchform.activityCode=='ZYW0002'" label-width="120px">
        <el-input v-model="rowform.commodityTitle" placeholder="商品标题"></el-input>
    </el-form-item>  
    <el-form-item label="运营建议价" prop="omRecommendPrice" label-width="120px">
        <el-input v-model="rowform.omRecommendPrice" placeholder="运营建议价"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="saveRow('rowform')">保存</el-button>
        <el-button @click="resetRow('rowform')">重置</el-button>    
    </el-form-item>
  </el-form>
</el-dialog>
    </div>`

}