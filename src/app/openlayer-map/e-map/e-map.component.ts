import {
  Component,
  NgZone, ChangeDetectorRef,
  OnInit, AfterViewInit
} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
// import {Coordinate} from 'ol/coordinate';
// import { ScaleLine, defaults as DefaultControls} from 'ol/control';
// import proj4 from 'proj4';
// import Projection from 'ol/proj/Projection';
// import {register}  from 'ol/proj/proj4';
import {ScaleLine, defaults as DefaultControls} from 'ol/control';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {getTopLeft, getWidth} from 'ol/extent';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

@Component({
  selector: 'app-e-map',
  templateUrl: './e-map.component.html',
  styleUrls: ['./e-map.component.scss']
})
export class EMapComponent implements OnInit, AfterViewInit {
  // public isMenuCollapsed = true;

  private map: Map = new Map({});

  constructor(
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    // setTimeout(()=>this.mapReady.emit(this.Map));

    const ximpleComTw = new Feature({
      geometry: new Point(olProj.fromLonLat([121.54087, 25.05455])),
    });
    ximpleComTw.setStyle(new Style({
      image: new Icon({
        crossOrigin: 'anonymous',
        src: 'assets/image/ximple_logo.png',
        scale: 0.8,
      }),
    }));

    if (this.map) {
      const layers = this.map.getLayers();
      if (layers) {
        const markMe = layers.getArray().find(it => it.get(`id`) === `markMe`);
        if (markMe) {
          const mmm = markMe as VectorLayer;
          mmm.getSource().addFeature(ximpleComTw);
        }
      }
    }

  }

  initMap(): void {
    const zoomLoop = 21;
    const proj3857 = olProj.get(`EPSG:3857`);
    const projectionExtent = proj3857.getExtent();
    const size = getWidth(projectionExtent) / 256;
    const resolutions = new Array(zoomLoop);
    const matrixIds = new Array(zoomLoop);
    for (let z = 0; z < zoomLoop; ++z) {
      // generate resolutions and matrixIds arrays for this WMTS
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }

    const sourceExampleFromNlsc = new WMTS({
      url: `https://wmts.nlsc.gov.tw/wmts/EMAP5/default/EPSG:3857/{TileMatrix}/{TileRow}/{TileCol}`,
      layer: 'EMAP',
      crossOrigin: 'anonymous',
      requestEncoding: 'REST',
      matrixSet: 'GoogleMapsCompatible',
      format: 'image/png',
      // transparente: true,
      projection: proj3857,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions,
        matrixIds
      }),
      style: 'default',
      // maxZoom: 20
    });

    const myWMTS = new WMTS({
      attributions: `© <a href="https://maps.nlsc.gov.tw/">臺灣通用電子地圖</a>`,
      url: `https://wmts.nlsc.gov.tw/wmts`,
      layer: `EMAP2`,
      matrixSet: 'EPSG:3857',
      format: 'image/png',
      projection: proj3857,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions,
        matrixIds
      }),
      style: 'default',
    });

    const photoWMTSSource = new WMTS({
      attributions: `© <a href="https://maps.nlsc.gov.tw/">臺灣通用電子地圖</a>`,
      url: `https://wmts.nlsc.gov.tw/wmts`,
      layer: `PHOTO2`,
      matrixSet: 'EPSG:3857',
      format: 'image/png',
      projection: proj3857,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions,
        matrixIds
      }),
      style: 'default',
    });

    const layerEMAP2 = new TileLayer({
      source: myWMTS
    });
    layerEMAP2.set(`id`, `EMAP2`);

    const layerPHOTO2 = new TileLayer({
      source: photoWMTSSource,
      visible: false
    });
    layerPHOTO2.set(`id`, `PHOTO2`);

    const markLayer = new VectorLayer({
      source: new VectorSource({
        features: []
      })
    });
    markLayer.set(`id`, 'markMe');

    this.map = new Map({
      target: 'map',
      layers: [
        layerEMAP2,
        layerPHOTO2,
        markLayer
      ],
      view: new View({
        center: olProj.fromLonLat([121.54087, 25.05455]),
        zoom: 20
      }),
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });
  }

  onLayer(id: string): void {
    if (id) {
      if (this.map) {
        const layers = this.map.getLayers();

        if (layers) {
          for (const layer of layers.getArray()) {
            // console.log(`layer type:${typeof(layer)}`);
            // console.log(`instanceof type: ${layer instanceof VectorLayer}`);
            if (layer instanceof TileLayer) {
              if (layer.get(`id`) === id) {
                layer.setVisible(true);
              } else {
                layer.setVisible(false);
              }
            }
          }
        }
      }
    }
  }
}
