

$('body').append(`<div id="yyApp"  >
<el-dialog :visible.sync="dialogVisible" size="full" :close-on-click-modal="false" :show-close="true" :close-on-press-escape="false">
    <my-warp :code="code"></my-warp>
</el-dialog>
</div>`);


var vm = new Vue({
    el: '#yyApp',
    data: {
        code: 0,
        name:'',
        dialogVisible:false
    },    
    components: {
        'my-warp': extensionsWrap
    },
    methods: {
        closewrap: function () {            
            this.dialogVisible = false;
        },
        openwrap: function () {            
            this.dialogVisible = true;
        }
    }
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.info(message);    
    
    vm.code =message.code;
    vm.name =message.name;
    vm.openwrap();
    sendResponse({
        response: "message success"
    });

});


function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}