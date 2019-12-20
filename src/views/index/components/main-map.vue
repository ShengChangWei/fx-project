<template>
  <div ref="mapContainer"
       class="map-container clearfix">
    <div class="time-line clearfix">
      <scroll-pane style="height: 100%;">
        <div v-for="(item, index) in timeList"
             :key="index"
             class="time-item">
          <div class="line-progress">
            <div class="line"></div>
            <div class="circle"></div>
          </div>
          <div class="time">{{ item.time }}</div>
        </div>
      </scroll-pane>
    </div>
    <div class="left-map">
      <div class="tab clearfix">
        <div class="active">雨情</div>
        <div>水情</div>
      </div>
      <e-vue-esrimapjs :isProxy="false"
                       :initExtent="initExtent2"
                       :geoUrl="'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'"
                       :mapUrl="'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'"
                       :submapUrl="['https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer']"
                       @mapReady="onLeftMapReady($event)">
      </e-vue-esrimapjs>
    </div>
    <div class="right-map">
      <div class="tab clearfix">
        <div class="active">积水过程</div>
        <div>三维视图</div>
      </div>
      <e-vue-esrimapjs :isProxy="false"
                       :initExtent="initExtent2"
                       :geoUrl="'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'"
                       :mapUrl="'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'"
                       :submapUrl="['https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer']">
      </e-vue-esrimapjs>
    </div>

    <div ref="mapTip"
         class="map-tip">

    </div>
  </div>
</template>

<script>
import scrollPane from '@/components/ScrollPane/index.vue';
import configService from '@/services/config.service.js';
import rainStation from './js/rain-station.js';
// import * as echarts from 'echarts';
export default {
  name: 'main-map',
  components: {
    scrollPane
  },
  data() {
    return {
      geoUrl:
        'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
      initExtent2: {
        xmax: 12956358.562350443,
        xmin: 12917912.048921607,
        ymax: 4889169.547162806,
        ymin: 4849333.283426176
      },
      timeList: [
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        },
        {
          time: '08:00:00'
        }
      ],
      map: '',
      mapComponent: '',
      areaLayer: '',
      areaSymbol: '',
      stationLayer: '',
      stationSymbol: '',
      imageLayer: '',
      textLayer: '',
      rainStation: rainStation.result.list,
      textTipContainer: '',
      testMap: ''
    };
  },
  created() {
    console.log(rainStation);
  },
  methods: {
    /**
     * 地图加载完成
     * @param $event
     */
    onLeftMapReady($event) {
      this.mapComponent = $event;
      this.map = this.mapComponent.map;
      this.testMap = this.mapComponent.map;
      this.textTipContainer = document.createElement('div');
      this.textTipContainer.id = 'textTipContainer';
      this.initLayers();
      this.initSymbols();
      this.queryBoundaryLine();
      this.showStation();
      this.showImage();
      this.map.on('zoom-start', this.hideTip.bind(this));
      this.map.on('zoom-end', this.showTip.bind(this));
      this.map.on('pan', this.hideTip.bind(this));
      this.map.on('pan-end', this.showTip.bind(this));
    },
    /**
     * 初始化图层信息
     */
    initLayers() {
      this.areaLayer = new this.mapComponent.GraphicsLayer();
      this.stationLayer = new this.mapComponent.GraphicsLayer();
      this.textLayer = new this.mapComponent.GraphicsLayer();
      this.imageLayer = new this.mapComponent.MapImageLayer();
      this.stationLayer.on('click', evt => {
        console.log(evt);
      });
      this.map.on('zoom-end', evt => {
        console.log(evt);
      });
      this.stationLayer.on('mouse-over', evt => {
        this.map.setMapCursor('pointer');
      });
      this.stationLayer.on('mouse-out', evt => {
        this.map.setMapCursor('auto');
      });
      this.map.addLayers([
        this.areaLayer,
        this.imageLayer,
        this.stationLayer,
        this.textLayer
      ]);
    },
    initSymbols() {
      this.areaSymbol = new this.mapComponent.SimpleFillSymbol({
        type: 'esriSFS',
        style: 'esriSFSSolid',
        color: [10, 244, 235, 30],
        outline: {
          type: 'esriSLS',
          color: [10, 244, 235, 255],
          width: 2
        }
      });
      this.stationSymbol = new this.mapComponent.SimpleMarkerSymbol({
        // 点符号
        color: [39, 188, 255, 255],
        size: 9,
        type: 'esriSMS',
        style: 'esriSMSCircle'
      });
    },
    /**
     *
     * 边界查询（县界和乡镇区域）
     */
    queryBoundaryLine() {
      const query = new this.mapComponent.Query();
      query.where = '2 > 1';
      query.outSpatialReference = this.map.spatialReference;
      query.returnGeometry = true;
      query.outFields = ['*'];
      const areaQueryTask = new this.mapComponent.QueryTask(
        configService.map.areaMapServer
      );
      areaQueryTask.execute(query, areas => {
        areas.features.forEach(area => {
          area.symbol = this.areaSymbol;
          this.areaLayer.add(area);
        });
      });
    },
    showStation() {
      this.rainStation.forEach((station, index) => {
        const point = new this.mapComponent.Point(
          station.lgtd,
          station.lttd,
          this.map.SpatialReference
        );
        const dataGra = new this.mapComponent.Graphic(
          point,
          this.stationSymbol,
          station
        );
        this.render();

        this.stationLayer.add(dataGra);
      });
    },
    showImage() {
      const image = new this.mapComponent.MapImage({
        extent: new this.mapComponent.Extent(this.initExtent2),
        href: require('@/assets/images/pc/map.png')
      });
      this.imageLayer.addImage(image);
    },
    render() {
      this.rainStation.forEach(station => {
        const [x, y] = this.mapComponent.WebMercatorUtils.lngLatToXY(
          station.lgtd,
          station.lttd
        );
        const textTip = document.createElement('div');
        textTip.className = 'essence-map-tip';
        const screenPoint = this.map.toScreen(
          new this.mapComponent.Point(x, y, this.map.spatialReference)
        );
        textTip.style.top = screenPoint.y + 'px';
        textTip.innerText = station.stnm;
        textTip.style.left = screenPoint.x + 'px';
        this.textTipContainer.appendChild(textTip);
      });

      this.map.__container.appendChild(this.textTipContainer);
    },
    hideTip() {
      this.textTipContainer.style.display = 'none';
    },
    showTip() {
      this.textTipContainer = document.createElement('div');
      this.render();
    }
  }
};
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 10px 10px 0 10px;
  /deep/ {
    .essence-map-tip {
      position: absolute;
      top: 100px;
      padding: 2px 10px;
      background-color: #fff;
      color: #fff;
      transform: translate(-50%, -40px);
      background-color: rgba(4, 44, 88, 0.8);
      border: 1px solid #27bcff;
      border-radius: 2px;
      white-space: nowrap;
      &::before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-top: 1px solid #27bcff;
        border-left: 1px solid #27bcff;
        background-color: rgba(4, 44, 88, 1);
        left: 50%;
        transform: translate(-50%, 18px) rotate(-135deg);
        // transform: translate(-50%);
      }
    }
  }
  .time-line {
    height: 50px;
    width: 100%;
    .time-item {
      display: inline-block;
      &:first-of-type {
        .line-progress {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
      }
      .line-progress {
        padding: 8px 0;
        position: relative;
        background: rgba(10, 37, 58, 0.5);

        .line {
          width: 100%;
          height: 2px;
          background-color: #5a73c7;
          position: relative;
        }
        .circle {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #27bcff;
          left: 50%;
          top: 3px;
          transform: translate(-50%);
        }
      }

      .time {
        padding: 0 30px;
      }
    }
  }
  .left-map,
  .right-map {
    float: left;
    width: 50%;
    height: calc(100% - 50px);
    border: 2px solid #29588c;
    border-bottom: 0;
    position: relative;
    .tab {
      position: absolute;
      z-index: 1;
      > div {
        float: left;
        padding: 10px 30px;
        font-size: 16px;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
        &.active,
        &:hover {
          background: rgba(14, 32, 69, 0.8);
          color: #fff;
          border-bottom: 2px solid #27bcff;
        }
      }
    }
  }
  .left-map {
    border-right: 0;
    border-bottom: 0;
  }
}
</style>
