import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

import { TileSettings } from './tile-settings';

@Component({
  selector: 'map-root',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(
    private router: Router
  ) {
  }

  id: number;

  // tile options
  tileSettings: TileSettings = new TileSettings;

  // leaflet options
  leafletZoom: number = 10;
  leafletCenter = L.latLng([47.1028, 17.9093]);
  leafletOptions = {
    zoom: this.leafletZoom,
    center: this.leafletCenter
  }

  // layers
  layers: L.Layer[];

  // replace the layer using the current settings
  generateLayer(): void {
    const tileLayer = L.tileLayer(this.tileSettings.urlAPI + this.tileSettings.urlParameter,
      {
        minZoom: 2,
        maxZoom: 20
      }
    );

    this.layers = [tileLayer];
  }

  // handle initialization

  ngOnInit(): void {
    this.generateLayer();

    const route: string = this.router.url;
    // split into elements
    const elements: string[] = route.split('/');

    if (elements.length == 4) {
      // retrieve stuff for leaflet setup
      this.leafletCenter = L.latLng([Number(elements[2]), Number(elements[3])]);
      this.leafletZoom = Number(elements[1]);
    }
  }

  // define some event handlers for the map
  onMapReady(map: L.Map): void {
    map.on('zoomend moveend', this.leafletEvent, this);

    // determine location
    const pos: L.LatLng = map.getCenter();
    const location: string = '/' + map.getZoom() + '/' + pos.lat + '/' + pos.lng;

    this.router.navigate([location]);
    // console.log('location : ' + location);
  }

  // event handler
  leafletEvent(e: L.LeafletEvent): void {
    // determine location
    const pos: L.LatLng = e.target.attributionControl._map.getCenter();
    const location: string = '/' + e.target.attributionControl._map.getZoom() + '/' + pos.lat + '/' + pos.lng;

    this.router.navigate([location]);
    // console.log('location : ' + location);
  }
}
