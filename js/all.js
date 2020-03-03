// 地圖設定
let base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 7,
    maxZoom: 18
});

let map = L.map("map", {
    layers: [base],
    center: new L.LatLng(23.817844, 119.990917),
    zoom: 5,
});

let myRenderer = L.canvas({
    padding: 0
});

console.log(house)

let circleMarkerOptions = null;
let infoStr = '';

// 渲染
let markers = [];
for (var i = 0; i < house.length; i++) {
    // 內文
    infoStr =
        '<div class="border-bottom font-weight-bolder">' + house[i].ShelterName + '</div>' +
        '<div class="border-bottom">地址 : ' + house[i].Address + '</div>' +
        '<div class="border-bottom">電話 : ' + house[i].Tel + '</div>' +
        '<div class="border-bottom">網站 : ' + '<a href="' + house[i].link + '">連結</a>' + '</div>' +
        '<div class="border-bottom my-1">備註 : ' + house[i].Memo + '</div>';

    circleMarkerOptions = {
        weight: 2,
        fillColor: "orange",
        color: "black",
        opacity: 1,
        fillOpacity: .4
    };
    markers.push(L.circleMarker(getRandomLatLng(), circleMarkerOptions).addTo(map).bindPopup(infoStr));
};

// 取得座標
function getRandomLatLng() {
    return [
        house[i].LAT, house[i].LNG
    ];
};