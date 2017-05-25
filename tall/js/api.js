var ygAjax = {};
var ygAxios ={};
ygAjax.post = function (options) {
    options = options || {};
    options.type = "POST";
    options.dataType = options.dataType || "json";

    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.open("POST", options.url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(options.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }
}

ygAjax.Environment = "DEV";
if (ygAjax.Environment == "DEV") {
    ygAjax.domain = {
        getAreaList: 'http://testmeow.api.yiguo.com/api/Area/GetAreaList', //查询区域列表
        getLaunchCommodityList: 'http://testmeow.api.yiguo.com/api/LaunchCommodity/GetLaunchCommodityList', //查询投放商品列表
        getCommodityInfo: 'http://testmeow.api.yiguo.com/api/LaunchCommodity/SearchCommodity', //新增商品时查询商品详情
        getaddCommodity: 'http://testmeow.api.yiguo.com/api/LaunchCommodity/AddLaunchCommodity', //新增投放商品
        getupdateCommodity: 'http://testmeow.api.yiguo.com/api/LaunchCommodity/UpdateLaunchCommodity', //修改投放商品
        getBatchUpdateLaunchCommodity: 'http://testmeow.api.yiguo.com/api/LaunchCommodity/BatchUpdateLaunchCommodity', //批量修改投放商品
        getcheckCommodity: 'http://testmeow.api.yiguo.com/api/LaunchCommodity/Check', //验证数据
    }
} else {
    ygAjax.domain = {
        getAreaList: 'http://meow.api.yiguo.com/api/Area/GetAreaList', //查询区域列表
        getLaunchCommodityList: 'http://meow.api.yiguo.com/api/LaunchCommodity/GetLaunchCommodityList', //查询投放商品列表
        getCommodityInfo: 'http://meow.api.yiguo.com/api/LaunchCommodity/SearchCommodity', //新增商品时查询商品详情
        getaddCommodity: 'http://meow.api.yiguo.com/api/LaunchCommodity/AddLaunchCommodity', //新增投放商品
        getupdateCommodity: 'http://meow.api.yiguo.com/api/LaunchCommodity/UpdateLaunchCommodity', //修改投放商品
        getBatchUpdateLaunchCommodity: 'http://meow.api.yiguo.com/api/LaunchCommodity/BatchUpdateLaunchCommodity', //批量修改投放商品
        getcheckCommodity: 'http://meow.api.yiguo.com/api/LaunchCommodity/Check', //验证数据
    }
}


//查询区域列表
ygAjax.areaList = function () {
    var data = {};
    ygAjax.post({
        url: ygAjax.domain.getAreaList,
        data,
        success: function (res) {
            var jsonRes = JSON.parse(res);
            var options = [];
            for (i in jsonRes.data.areaList) {
                options.push({
                    value: jsonRes.data.areaList[i].id,
                    label: jsonRes.data.areaList[i].areaName
                });
                console.log(jsonRes.data.areaList[i]);
            }
            console.log(options);
            return options;
        }
    })
}

ygAxios.areaList = function () {
    axios.post(ygAjax.domain.getAreaList, {})
        .then((resData) => {
            this.$nextTick(function () {
                this.options = resData.data.data.areaList;
            });
        })
        .catch(() => {
            debugger;
        });
}


// //商品列表
// ygAxios.commodityList = function (basicReqData) {

//     var req = {
//         resourceIdType: "ZYW0001",
//         activityDate: "2017-05-05",
//         launchAreas: "ae5cb03e-9564-41dc-9ad6-0a62648bb79c",
//         pageIndex: 1,
//         pageSize: 200
//     };
//     ygAjax.post({
//         url: ygAjax.domain.getLaunchCommodityList,
//         data: req,
//         success: function (res) {
//             console.log(res);
//         }
//     });
// }