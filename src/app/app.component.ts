import {
  Component,
  NgZone, ChangeDetectorRef,
  OnInit, AfterViewInit
} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
// import VectorLayer from 'ol/layer/Vector';
// import Style from 'ol/style/Style';
// import Icon from 'ol/style/Icon';
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Xaviera';
  // Step 1:
  // Create a property to track whether the menu is open.
  // Start with the menu collapsed so that it does not
  // appear initially when the page loads on a small screen!
  public isMenuCollapsed = true;

  private map: Map = new Map({});

  constructor(
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    // setTimeout(()=>this.mapReady.emit(this.Map));
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
      layer: 'EMAP2',
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
      attributions: `© <a href="https://emap.nlsc.gov.tw">臺灣通用電子地圖</a>`,
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

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: myWMTS
        })
      ],
      view: new View({
        center: olProj.fromLonLat([121.520425, 25.052688]),
        zoom: 20
      }),
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });
  }
}
