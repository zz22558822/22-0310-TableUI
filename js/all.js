// 資料存放至 data
let data;
// 刷新的AXAJ資料 以利用於比對
let dataNew;

// 獲取資料 API JSON檔案
function getData() {
    //開啟讀取動畫
    openLoading();
    let xhr = new XMLHttpRequest();
    xhr.open('GET','https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json',true);
    
    xhr.send(null);
    
    xhr.onload = function(){
        data = JSON.parse(xhr.responseText);
        data = data.features;
        

        //關閉讀取動畫
        closeLoading();
    }
}

// 全域變數來存放日期格式
let timeDetails = {};
function getDay() {
    //先創建一個Date實體
    let time = new Date();

    timeDetails = {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        date: time.getDate(),
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
        day: time.getDay(),
    };
    return time.toLocaleString();
}

// 判斷日期
function ifDay(day) {
    if (day == 1){
        return '一'
    }else if (day == 2){
        return '二'
    }else if (day == 3){
        return '三'
    }else if (day == 4){
        return '四'
    }else if (day == 5){
        return '五'
    }else if (day == 6){
        return '六'
    }else{
        return '日'
    }
}




// 篩選城市 並渲染
function renderList(city){
    // 空字串放置累加資料
    var str = '';
    // 篩選後的區域資料 方便用來進一步列表渲染區域
    citieData = [];

    document.querySelector('.list').innerHTML = str;

    //篩選縣市 列表
    upcitie();

    //關閉讀取動畫
    closeLoading();

}




// 列表選單的開關
let groupClose = 0
let orderClose = 0
let staffClose = 0
let conditionClose = 0

// document.querySelector('.list li').addEventListener('click',function (e){
//     if (e.target.nodeName !== 'A') {
//         console.log("並非點擊 A ，點到",e.target);
//         return;
//     }else{
//         console.log(e.path[0])
//         document.querySelector('.list-div').classList.remove('close')
//     }
    
// });


//開關選單
document.querySelector('.list').addEventListener('click',function (e){
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
        // 判定位置只在 A區塊
        console.log("並非點擊 A ，點到",e.target);
        console.log("e.target.nodeName : ",e.target.nodeName);
        console.log("e.path : ",e.path);

        //如果不是點擊選單中，則關閉選單
        if (e.target.nodeName !== 'SELECT') {
            closeList();
        }
        return;
    }else if (e.path[0].className == 'group' && groupClose === 0) {
        console.log('開啟組別');
        closeList();
        document.querySelector('.group-div').classList.remove('close')
        groupClose = 1
    }else if (e.path[0].className == 'group' && groupClose === 1) {
        console.log('關閉組別');
        document.querySelector('.group-div').classList.add('close')
        groupClose = 0
    }else if (e.path[0].className == 'order' && orderClose === 0) {
        console.log('開啟工單');
        closeList();
        document.querySelector('.order-div').classList.remove('close')
        orderClose = 1
    }else if (e.path[0].className == 'order' && orderClose === 1) {
        console.log('關閉工單');
        document.querySelector('.order-div').classList.add('close')
        orderClose = 0
    }else if (e.path[0].className == 'staff' && staffClose === 0) {
        console.log('開啟人員');
        closeList();
        document.querySelector('.staff-div').classList.remove('close')
        staffClose = 1
    }else if (e.path[0].className == 'staff' && staffClose === 1) {
        console.log('關閉人員');
        document.querySelector('.staff-div').classList.add('close')
        staffClose = 0
    }else if (e.path[0].className == 'condition' && conditionClose === 0) {
        console.log('開啟狀況');
        closeList();
        document.querySelector('.condition-div').classList.remove('close')
        conditionClose = 1
    }else if (e.path[0].className == 'condition' && conditionClose === 1) {
        console.log('關閉狀況');
        document.querySelector('.condition-div').classList.add('close')
        conditionClose = 0
    }
});

//收合全部Menu
function closeList(e) {
    groupClose = 0
    orderClose = 0
    staffClose = 0
    conditionClose = 0
    document.querySelector('.group-div').classList.add('close')
    document.querySelector('.order-div').classList.add('close')
    document.querySelector('.staff-div').classList.add('close')
    document.querySelector('.condition-div').classList.add('close')
}























// 開啟讀取動畫
function openLoading() {
    document.querySelector('.loading').classList.remove('disNone');
    //console.log('開始載入');
}
// 關閉讀取動畫
function closeLoading() {
    document.querySelector('.loading').classList.add('disNone');
    //console.log('關閉載入');
}






// 開關主選單的狀態
var listSwitch = 0;
// 開關主選單
document.querySelector('.black').addEventListener('click',function(e){
    e.preventDefault();

    //開關初始化 待刪除
    init()
    closeList();

    if (listSwitch === 0) {
        e.target.classList.remove('fa-caret-left');
        e.target.classList.add('fa-caret-right');
        document.querySelector('.frame').classList.add('close')
        document.querySelector('.map').classList.add('closeMap')
        document.querySelector('.black').classList.add('closeBtn')
        document.querySelector('.header').classList.add('close')
        listSwitch += 1
    }else{
        e.target.classList.remove('fa-caret-right');
        e.target.classList.add('fa-caret-left');
        document.querySelector('.frame').classList.remove('close')
        document.querySelector('.map').classList.remove('closeMap')
        document.querySelector('.black').classList.remove('closeBtn')
        document.querySelector('.header').classList.remove('close')
        listSwitch = 0;
    }

})


// 每10s 重新 updata
setInterval("updata()","10000");
// 每0.5s 刷新一次時間顯示
setInterval("dataTiem()","500");
function dataTiem() {
    document.querySelector('.day').textContent = getDay();
    // 星期 判斷成中文顯示
    document.querySelector('.week span').textContent = ifDay(timeDetails.day)
}
// 10秒更新資料的手法
function updata() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET','https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json',true);
    xhr.send(null);
    xhr.onload = function(){
        dataNew = JSON.parse(xhr.responseText);
        dataNew = dataNew.features;

        // 比對 如有API資料異動 則刷新資料 並取代現有舊資料
        if (JSON.stringify(data) !== JSON.stringify(dataNew)) {
            console.log('資料發生異動');
            // 深層複製 新資料到舊資料當中
            data = JSON.parse(JSON.stringify(dataNew))
        }
    }

}



// 初始化
function init() {
    //獲取資料
    getData();
    // 當前日期
    document.querySelector('.day').textContent = getDay();
    // 星期 判斷成中文顯示
    document.querySelector('.week span').textContent = ifDay(timeDetails.day)

}

init();









































