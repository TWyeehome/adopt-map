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


let circleMarkerOptions = null;
let infoStr = '';
let redNum = 0;
let greenNum = 0;

// 右上標籤
L.Control.Watermark = L.Control.extend({
    onAdd: function(map) {
        let layer = L.DomUtil.create('div');
        layer.innerHTML =
            '<section id="loading" class="bg-white rounded p-2" style="opacity:0.95;">' +
            '<h2>Loading......</h2>' +
            '</section>';
        return layer;
    },
    onRemove: function(map) {
        // Nothing to do here
    }
});
L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
};
L.control.watermark({
    position: 'topright',
}).addTo(map);

let home = new XMLHttpRequest();
home.open('GET', 'https://script.google.com/macros/s/AKfycbzSD0z0YC-ExNrS4s3OxJR8knvLm5cHxQzAE0Y1MtWKenWWI_to/exec?url=https://asms.coa.gov.tw/Amlapp/App/Handler_ENRF/MapApiCity1.ashx', true);
home.send(null);
home.onload = () => {
    let homeData = JSON.parse(home.responseText);
    console.log(homeData);

    document.getElementById('loading').style.display = 'none'

    // 渲染
    let markers = [];
    for (var i = 0; i < homeData.length; i++) {
        // 內文
        infoStr =
            '<div class="border-bottom font-weight-bolder">' + homeData[i].ShelterName + '</div>' +
            '<div class="border-bottom">地址 : ' + homeData[i].Address + '</div>' +
            '<div class="border-bottom">電話 : ' + homeData[i].Tel + '</div>' +
            '<div class="border-bottom">網站 : ' + '<a href="' + homeData[i].link + '">連結</a>' + '</div>' +
            '<div class="border-bottom">留容最大值 : ' + homeData[i].MaxAmls + '</div>' +
            '<div class="border-bottom">在養數 : ' + homeData[i].cnt + '</div>' +
            '<div class="border-bottom">備註 : ' + homeData[i].Memo + '</div>';

        // marker 顏色判定
        if (homeData[i].cnt > homeData[i].MaxAmls) {
            redNum += 1;
            circleMarkerOptions = {
                weight: 2,
                fillColor: "red",
                color: "black",
                opacity: 1,
                fillOpacity: .8
            };
            markers.push(L.circleMarker(getRandomLatLng(), circleMarkerOptions).addTo(map).bindPopup(infoStr));

        } else {
            greenNum += 1;
            circleMarkerOptions = {
                weight: 2,
                fillColor: "green",
                color: "black",
                opacity: 1,
                fillOpacity: .8
            };
            markers.push(L.circleMarker(getRandomLatLng(), circleMarkerOptions).addTo(map).bindPopup(infoStr));
        }
    };

    // 取得座標
    function getRandomLatLng() {
        return [
            homeData[i].LAT, homeData[i].LNG
        ];
    };

    // 左下
    L.Control.Watermark = L.Control.extend({
        onAdd: function(map) {
            let layer = L.DomUtil.create('div');
            layer.innerHTML =
                '<section class="bg-white rounded p-2" style="opacity:0.95;">' +
                '<div>全台收容所數 : ' + homeData.length + '</div>' +
                '<div>綠標(收容所未爆滿) : ' + greenNum + '</div>' +
                '<div>紅標(收容所已爆滿) : ' + redNum + '</div>' +
                '</section>';
            return layer;
        },
        onRemove: function(map) {
            // Nothing to do here
        }
    });
    L.control.watermark = function(opts) {
        return new L.Control.Watermark(opts);
    };
    L.control.watermark({
        position: 'bottomleft',
    }).addTo(map);


};