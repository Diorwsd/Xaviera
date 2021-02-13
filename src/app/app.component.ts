import {
  Component,
  NgZone, ChangeDetectorRef,
  OnInit, AfterViewInit
} from '@angular/core';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import VectorLayer from 'ol/layer/Vector';
// import Style from 'ol/style/Style';
// import Icon from 'ol/style/Icon';
// import OSM from 'ol/source/OSM';
// import * as olProj from 'ol/proj';
// import TileLayer from 'ol/layer/Tile';
// import {Coordinate} from 'ol/coordinate';
// import { ScaleLine, defaults as DefaultControls} from 'ol/control';
// import proj4 from 'proj4';
// import Projection from 'ol/proj/Projection';
// import {register}  from 'ol/proj/proj4';
// import {ScaleLine, defaults as DefaultControls} from 'ol/control';
// import WMTS from 'ol/source/WMTS';
// import WMTSTileGrid from 'ol/tilegrid/WMTS';
// import {getTopLeft, getWidth} from 'ol/extent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Xaviera';
  public isMenuCollapsed = true;

  constructor(
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }


}
