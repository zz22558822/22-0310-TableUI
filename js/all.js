// 資料存放至 data
let data;

// 細分區域後的資料 存在 groupData
let groupData = [];
// 細分區域後的資料 存在 orderData
let orderData = [];
// 細分區域後的資料 存在 staffData
let staffData = [];
// 細分區域後的資料 存在 condition
let conditionData = [];

// 刷新的AXAJ資料 以利用於比對
let dataNew;


// 暫存選項區域  開關記憶選項 and 選擇了什麼 待製作
// 暫存選項組別
var localGroup = localStorage.getItem('group');
// 暫存選項工單
var localOrder = localStorage.getItem('order');
// 暫存選項人員
var localStaff = localStorage.getItem('staff');
// 暫存選項狀況
var localCondition = localStorage.getItem('condition');


if (localCity == '' || localCity == null) {
    localStorage.setItem('city','全部區域');
    localCity = localStorage.getItem('city');
};
if (localCitie == '' || localCitie == null) {
    localStorage.setItem('citie','全部區域');
    localCitie = localStorage.getItem('citie');
};
if (localCity == '' || localCity == null) {
    localStorage.setItem('city','全部區域');
    localCity = localStorage.getItem('city');
};
if (localCitie == '' || localCitie == null) {
    localStorage.setItem('citie','全部區域');
    localCitie = localStorage.getItem('citie');
};
if (localCity == '' || localCity == null) {
    localStorage.setItem('city','全部區域');
    localCity = localStorage.getItem('city');
};
if (localCitie == '' || localCitie == null) {
    localStorage.setItem('citie','全部區域');
    localCitie = localStorage.getItem('citie');
};
if (localCity == '' || localCity == null) {
    localStorage.setItem('city','全部區域');
    localCity = localStorage.getItem('city');
};
if (localCitie == '' || localCitie == null) {
    localStorage.setItem('citie','全部區域');
    localCitie = localStorage.getItem('citie');
};










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
        
        // 刷新左側選單
        upAllMenu();

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












// --------------------(AJAX 資料篩選)--------------------
// 篩選組別資料到左側選單列表
function upGroupMenu() {
    // 因為資料會異動 所以必須要清空此變數內的檔案否則會被無限累加
    let selectGroup = '<option value="全部組別">全部組別</option>';
    // 先準備空陣列，它是篩選後的資料庫
    let allZone = [];
    // 這使用indexOf的特性 如果沒重複資料 就會判定為-1 利用這個來讓allZone 增加陣列
    for (let i = 0; i < data.length; i++) {
        // 到時候需要更換 data[i].properties.county 為 組別的 JSON 位置
        if (allZone.indexOf(data[i].properties.county) === -1 && data[i].properties.county !== '') {
            allZone.push(data[i].properties.county);
        }
    }
    for (let i = 0; i < allZone.length ; i++) {
        // 改為使用ES6的樣板字面值
        selectGroup += `<option value="${allZone[i]}">${allZone[i]}</option>`;
    }
    document.querySelector('.group-list').innerHTML = selectGroup
}
// 篩選工單資料到左側選單列表
function upOrderMenu() {
    // 因為資料會異動 所以必須要清空此變數內的檔案否則會被無限累加
    let selectOrder = '<option value="全部工單">全部工單</option>';
    // 先準備空陣列，它是篩選後的資料庫
    let allZone = [];
    // 這使用indexOf的特性 如果沒重複資料 就會判定為-1 利用這個來讓allZone 增加陣列
    for (let i = 0; i < data.length; i++) {
        // 到時候需要更換 data[i].properties.county 為 工單的 JSON 位置
        if (allZone.indexOf(data[i].properties.cunli) === -1 && data[i].properties.cunli !== '') {
            allZone.push(data[i].properties.cunli);
        }
    }
    for (let i = 0; i < allZone.length ; i++) {
        // 改為使用ES6的樣板字面值
        selectOrder += `<option value="${allZone[i]}">${allZone[i]}</option>`;
    }
    document.querySelector('.order-list').innerHTML = selectOrder
}
// 篩選人員資料到左側選單列表
function upStaffMenu() {
    // 因為資料會異動 所以必須要清空此變數內的檔案否則會被無限累加
    let selectStaff = '<option value="全部人員">全部人員</option>';
    // 先準備空陣列，它是篩選後的資料庫
    let allZone = [];
    // 這使用indexOf的特性 如果沒重複資料 就會判定為-1 利用這個來讓allZone 增加陣列
    for (let i = 0; i < data.length; i++) {
        // 到時候需要更換 data[i].properties.county 為 人員的 JSON 位置
        if (allZone.indexOf(data[i].properties.name) === -1 && data[i].properties.name !== '') {
            allZone.push(data[i].properties.name);
        }
    }
    for (let i = 0; i < allZone.length ; i++) {
        // 改為使用ES6的樣板字面值
        selectStaff += `<option value="${allZone[i]}">${allZone[i]}</option>`;
    }
    document.querySelector('.staff-list').innerHTML = selectStaff
}
// 篩選狀況資料到左側選單列表
function upConditionMenu() {
    // 因為資料會異動 所以必須要清空此變數內的檔案否則會被無限累加
    let selectCondition = '<option value="全部狀況">全部狀況</option>';
    // 先準備空陣列，它是篩選後的資料庫
    let allZone = [];
    // 這使用indexOf的特性 如果沒重複資料 就會判定為-1 利用這個來讓allZone 增加陣列
    for (let i = 0; i < data.length; i++) {
        // 到時候需要更換 data[i].properties.county 為 狀況的 JSON 位置
        if (allZone.indexOf(data[i].properties.id) === -1 && data[i].properties.id !== '') {
            allZone.push(data[i].properties.id);
        }
    }
    for (let i = 0; i < allZone.length ; i++) {
        // 改為使用ES6的樣板字面值
        selectCondition += `<option value="${allZone[i]}">${allZone[i]}</option>`;
    }
    document.querySelector('.condition-list').innerHTML = selectCondition
}





// --------------------(監聽)--------------------
// 監聽 組別 List 切換的部分
document.querySelector('.group-list').addEventListener('change',function (e) {
    //篩選組別 並渲染點擊的組別
    renderListGroup(e.target.value);
})
// 監聽 工單 List 切換的部分
document.querySelector('.order-list').addEventListener('change',function (e) {
    //篩選工單 並渲染點擊的工單
    renderListOrder(e.target.value);
})
// 監聽 人員 List 切換的部分
document.querySelector('.staff-list').addEventListener('change',function (e) {
    //篩選人員 並渲染點擊的人員
    renderListStaff(e.target.value);
})
// 監聽 狀況 List 切換的部分
document.querySelector('.condition-list').addEventListener('change',function (e) {
    //篩選狀況 並渲染點擊的狀況
    renderListCondition(e.target.value);
})


// --------------------(渲染)--------------------
// 篩選 組別 並渲染
function renderListGroup(options){
    // num累加用
    let num = 1;
    // 空字串放置累加資料
    let str = `
    <tr class="Y1">
        <td class="X1">生產日期</td>
        <td class="X2">工單號碼</td>
        <td class="X3">料號</td>
        <td class="X4">品名</td>
        <td class="X5">規格</td>
        <td class="X6">單位</td>
        <td class="X7">客戶</td>
        <td class="X8">製程序號</td>
        <td class="X9">作業編號</td>
        <td class="X10">作業說明</td>
        <td class="X11">組別</td>
        <td class="X12">預計產量</td>
        <td class="X13">報工數量</td>
        <td class="X14">作業者</td>
        <td class="X15">人員名稱</td>
        <td class="X16">工時(分)</td>
        <td class="X17">狀態</td>
        <td class="X18">開始時間</td>
        <td class="X19">結束時間</td>
        <td class="X20">已移交量</td>
        <td class="X21">變動工時(分)</td>
        <td class="X22">固定工時(分)</td>
    </tr>
    `;

    // 篩選後的資料 方便用來進一步列表渲染
    groupData = [];

    // 從全部資料 累加渲染資料到str
    for (let i = 0; i < (data.length); i++) {
        if ('全部組別' == options) {

            num++;
            str += `
            <tr class="Y${num}">
                <td class="X1">2022/03/09</td>
                <td class="X2">T612-220100243</td>
                <td class="X3">03911085R</td>
                <td class="X4">EKM0095中置馬達連接線EBC121加工</td>
                <td class="X5">02002532R半成品</td>
                <td class="X6">PCS</td>
                <td class="X7">A02514</td>
                <td class="X8">60</td>
                <td class="X9">99CS03</td>
                <td class="X10">塑膠射出</td>
                <td class="X11">TW1921</td>
                <td class="X12">4100</td>
                <td class="X13">0</td>
                <td class="X14">T01631</td>
                <td class="X15">謝越勇</td>
                <td class="X16">${num}</td>
                <td class="X17">生產</td>
                <td class="X18">10:03</td>
                <td class="X19"></td>
                <td class="X20">2680</td>
                <td class="X21">1.666667</td>
                <td class="X22">60</td>
            </tr>
            `;
        }else if (data[i].properties.county == options) {
            // 將區域資料累加到 groupData 當中
            groupData.push(data[i])
            num++;
            str += `
            <tr class="Y${num}">
                <td class="X1">2022/03/09</td>
                <td class="X2">T612-220100243</td>
                <td class="X3">03911085R</td>
                <td class="X4">EKM0095中置馬達連接線EBC121加工</td>
                <td class="X5">02002532R半成品</td>
                <td class="X6">PCS</td>
                <td class="X7">A02514</td>
                <td class="X8">60</td>
                <td class="X9">99CS03</td>
                <td class="X10">塑膠射出</td>
                <td class="X11">TW1921</td>
                <td class="X12">4100</td>
                <td class="X13">0</td>
                <td class="X14">T01631</td>
                <td class="X15">謝越勇</td>
                <td class="X16">${num}</td>
                <td class="X17">生產</td>
                <td class="X18">10:03</td>
                <td class="X19"></td>
                <td class="X20">2680</td>
                <td class="X21">1.666667</td>
                <td class="X22">60</td>
            </tr>
            `;
        }

    }
    document.querySelector('table').innerHTML = str;
}

// 篩選 工單 並渲染
function renderListOrder(options){
    // num累加用
    let num = 1;
    // 空字串放置累加資料
    let str = `
    <tr class="Y1">
        <td class="X1">生產日期</td>
        <td class="X2">工單號碼</td>
        <td class="X3">料號</td>
        <td class="X4">品名</td>
        <td class="X5">規格</td>
        <td class="X6">單位</td>
        <td class="X7">客戶</td>
        <td class="X8">製程序號</td>
        <td class="X9">作業編號</td>
        <td class="X10">作業說明</td>
        <td class="X11">組別</td>
        <td class="X12">預計產量</td>
        <td class="X13">報工數量</td>
        <td class="X14">作業者</td>
        <td class="X15">人員名稱</td>
        <td class="X16">工時(分)</td>
        <td class="X17">狀態</td>
        <td class="X18">開始時間</td>
        <td class="X19">結束時間</td>
        <td class="X20">已移交量</td>
        <td class="X21">變動工時(分)</td>
        <td class="X22">固定工時(分)</td>
    </tr>
    `;

    // 篩選後的資料 方便用來進一步列表渲染
    orderData = [];

    // 從全部資料 累加渲染資料到str
    for (let i = 0; i < (data.length); i++) {
        if ('全部工單' == options) {

            num++;
            str += `
            <tr class="Y${num}">
                <td class="X1">2022/03/09</td>
                <td class="X2">T612-220100243</td>
                <td class="X3">03911085R</td>
                <td class="X4">EKM0095中置馬達連接線EBC121加工</td>
                <td class="X5">02002532R半成品</td>
                <td class="X6">PCS</td>
                <td class="X7">A02514</td>
                <td class="X8">60</td>
                <td class="X9">99CS03</td>
                <td class="X10">塑膠射出</td>
                <td class="X11">TW1921</td>
                <td class="X12">4100</td>
                <td class="X13">0</td>
                <td class="X14">T01631</td>
                <td class="X15">謝越勇</td>
                <td class="X16">${num}</td>
                <td class="X17">生產</td>
                <td class="X18">10:03</td>
                <td class="X19"></td>
                <td class="X20">2680</td>
                <td class="X21">1.666667</td>
                <td class="X22">60</td>
            </tr>
            `;
        }else if (data[i].properties.cunli == options) {
            // 將區域資料累加到 groupData 當中
            orderData.push(data[i])
            num++;
            str += `
            <tr class="Y${num}">
                <td class="X1">2022/03/09</td>
                <td class="X2">T612-220100243</td>
                <td class="X3">03911085R</td>
                <td class="X4">EKM0095中置馬達連接線EBC121加工</td>
                <td class="X5">02002532R半成品</td>
                <td class="X6">PCS</td>
                <td class="X7">A02514</td>
                <td class="X8">60</td>
                <td class="X9">99CS03</td>
                <td class="X10">塑膠射出</td>
                <td class="X11">TW1921</td>
                <td class="X12">4100</td>
                <td class="X13">0</td>
                <td class="X14">T01631</td>
                <td class="X15">謝越勇</td>
                <td class="X16">${num}</td>
                <td class="X17">生產</td>
                <td class="X18">10:03</td>
                <td class="X19"></td>
                <td class="X20">2680</td>
                <td class="X21">1.666667</td>
                <td class="X22">60</td>
            </tr>
            `;
        }

    }
    document.querySelector('table').innerHTML = str;
}

// 篩選 人員 並渲染
function renderListStaff(options){
    // num累加用
    let num = 1;
    // 空字串放置累加資料
    let str = `
    <tr class="Y1">
        <td class="X1">生產日期</td>
        <td class="X2">工單號碼</td>
        <td class="X3">料號</td>
        <td class="X4">品名</td>
        <td class="X5">規格</td>
        <td class="X6">單位</td>
        <td class="X7">客戶</td>
        <td class="X8">製程序號</td>
        <td class="X9">作業編號</td>
        <td class="X10">作業說明</td>
        <td class="X11">組別</td>
        <td class="X12">預計產量</td>
        <td class="X13">報工數量</td>
        <td class="X14">作業者</td>
        <td class="X15">人員名稱</td>
        <td class="X16">工時(分)</td>
        <td class="X17">狀態</td>
        <td class="X18">開始時間</td>
        <td class="X19">結束時間</td>
        <td class="X20">已移交量</td>
        <td class="X21">變動工時(分)</td>
        <td class="X22">固定工時(分)</td>
    </tr>
    `;

    // 篩選後的資料 方便用來進一步列表渲染
    staffData = [];

    // 從全部資料 累加渲染資料到str
    for (let i = 0; i < (data.length); i++) {
        if ('全部人員' == options) {

            num++;
            str += `
            <tr class="Y${num}">
                <td class="X1">2022/03/09</td>
                <td class="X2">T612-220100243</td>
                <td class="X3">03911085R</td>
                <td class="X4">EKM0095中置馬達連接線EBC121加工</td>
                <td class="X5">02002532R半成品</td>
                <td class="X6">PCS</td>
                <td class="X7">A02514</td>
                <td class="X8">60</td>
                <td class="X9">99CS03</td>
                <td class="X10">塑膠射出</td>
                <td class="X11">TW1921</td>
                <td class="X12">4100</td>
                <td class="X13">0</td>
                <td class="X14">T01631</td>
                <td class="X15">謝越勇</td>
                <td class="X16">${num}</td>
                <td class="X17">生產</td>
                <td class="X18">10:03</td>
                <td class="X19"></td>
                <td class="X20">2680</td>
                <td class="X21">1.666667</td>
                <td class="X22">60</td>
            </tr>
            `;
        }else if (data[i].properties.name == options) {
            // 將區域資料累加到 groupData 當中
            staffData.push(data[i])
            num++;
            str += `
            <tr class="Y${num}">
                <td class="X1">2022/03/09</td>
                <td class="X2">T612-220100243</td>
                <td class="X3">03911085R</td>
                <td class="X4">EKM0095中置馬達連接線EBC121加工</td>
                <td class="X5">02002532R半成品</td>
                <td class="X6">PCS</td>
                <td class="X7">A02514</td>
                <td class="X8">60</td>
                <td class="X9">99CS03</td>
                <td class="X10">塑膠射出</td>
                <td class="X11">TW1921</td>
                <td class="X12">4100</td>
                <td class="X13">0</td>
                <td class="X14">T01631</td>
                <td class="X15">謝越勇</td>
                <td class="X16">${num}</td>
                <td class="X17">生產</td>
                <td class="X18">10:03</td>
                <td class="X19"></td>
                <td class="X20">2680</td>
                <td class="X21">1.666667</td>
                <td class="X22">60</td>
            </tr>
            `;
        }
    }
    document.querySelector('table').innerHTML = str;
}

// 篩選 人員 並渲染
function renderListCondition(options){
    // num累加用
    let num = 1;
    // 空字串放置累加資料
    let str = `
    <tr class="Y1">
        <td class="X1">生產日期</td>
        <td class="X2">工單號碼</td>
        <td class="X3">料號</td>
        <td class="X4">品名</td>
        <td class="X5">規格</td>
        <td class="X6">單位</td>
        <td class="X7">客戶</td>
        <td class="X8">製程序號</td>
        <td class="X9">作業編號</td>
        <td class="X10">作業說明</td>
        <td class="X11">組別</td>
        <td class="X12">預計產量</td>
        <td class="X13">報工數量</td>
        <td class="X14">作業者</td>
        <td class="X15">人員名稱</td>
        <td class="X16">工時(分)</td>
        <td class="X17">狀態</td>
        <td class="X18">開始時間</td>
        <td class="X19">結束時間</td>
        <td class="X20">已移交量</td>
        <td class="X21">變動工時(分)</td>
        <td class="X22">固定工時(分)</td>
    </tr>
    `;

    // 篩選後的資料 方便用來進一步列表渲染
    conditionData = [];

    // 從全部資料 累加渲染資料到str
    for (let i = 0; i < (data.length); i++) {
        if ('全部狀況' == options) {

            num++;
            str += `
            <tr class="Y${num}">
                <td class="X1">2022/03/09</td>
                <td class="X2">T612-220100243</td>
                <td class="X3">03911085R</td>
                <td class="X4">EKM0095中置馬達連接線EBC121加工</td>
                <td class="X5">02002532R半成品</td>
                <td class="X6">PCS</td>
                <td class="X7">A02514</td>
                <td class="X8">60</td>
                <td class="X9">99CS03</td>
                <td class="X10">塑膠射出</td>
                <td class="X11">TW1921</td>
                <td class="X12">4100</td>
                <td class="X13">0</td>
                <td class="X14">T01631</td>
                <td class="X15">謝越勇</td>
                <td class="X16">${num}</td>
                <td class="X17">生產</td>
                <td class="X18">10:03</td>
                <td class="X19"></td>
                <td class="X20">2680</td>
                <td class="X21">1.666667</td>
                <td class="X22">60</td>
            </tr>
            `;
        }else if (data[i].properties.id == options) {
            // 將區域資料累加到 groupData 當中
            conditionData.push(data[i])
            num++;
            str += `
            <tr class="Y${num}">
                <td class="X1">2022/03/09</td>
                <td class="X2">T612-220100243</td>
                <td class="X3">03911085R</td>
                <td class="X4">EKM0095中置馬達連接線EBC121加工</td>
                <td class="X5">02002532R半成品</td>
                <td class="X6">PCS</td>
                <td class="X7">A02514</td>
                <td class="X8">60</td>
                <td class="X9">99CS03</td>
                <td class="X10">塑膠射出</td>
                <td class="X11">TW1921</td>
                <td class="X12">4100</td>
                <td class="X13">0</td>
                <td class="X14">T01631</td>
                <td class="X15">謝越勇</td>
                <td class="X16">${num}</td>
                <td class="X17">生產</td>
                <td class="X18">10:03</td>
                <td class="X19"></td>
                <td class="X20">2680</td>
                <td class="X21">1.666667</td>
                <td class="X22">60</td>
            </tr>
            `;
        }
    }
    document.querySelector('table').innerHTML = str;
}

// 全部渲染 but 還沒作暫存 所以預設都是全部
function renderListAll() {
    renderListGroup();
    renderListOrder();
    renderListStaff();
    renderListCondition();
}






















// --------------------(開關)--------------------
// 列表選單的開關
let groupClose = 0
let orderClose = 0
let staffClose = 0
let conditionClose = 0

//開關選單
document.querySelector('.list').addEventListener('click',function (e){
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
        // // 判定位置只在 A區塊
        // console.log("並非點擊 A ，點到",e.target);
        // console.log("e.target.nodeName : ",e.target.nodeName);
        // console.log("e.path : ",e.path);

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






















// --------------------(Loading動畫)--------------------
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





// --------------------(主選單)--------------------
// 開關主選單的狀態
let listSwitch = 0;
// 開關主選單
document.querySelector('.black').addEventListener('click',function(e){
    e.preventDefault();

    // 關閉所有子選單
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

// --------------------(自動化刷新)--------------------
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
            
            // 刷新全部左側選單
            upAllMenu();
        }
    }
}
// 刷新全部左側選單
function upAllMenu() {
    upGroupMenu();
    upOrderMenu();
    upStaffMenu();
    upConditionMenu();
}



// --------------------(初始化)--------------------
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









































