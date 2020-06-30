import {
  OnInit,
  Directive,
  ViewChild,
  ElementRef,
  NgZone,
  EventEmitter,
  Output,
} from '@angular/core';
import {} from 'googlemaps';

import { FormControl } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';

@Directive({
  selector: '[appAddress]',
})
export class AddressDirective implements OnInit {
  // amg/core
  // zoom: number;
  // latitude: number;
  // longitude: number;
  // latlongs: any = [];
  // latlog: any = {};
  @Output() onSelect = new EventEmitter();

  @ViewChild('search')
  private searchElementRef: HTMLInputElement;
  // amg/core

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _elementRef: ElementRef
  ) {
    this.searchElementRef = _elementRef.nativeElement;
  }

  ngOnInit() {
    // amg/core

    // this.zoom = 4;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;
    //create search FormControl
    // this.searchControl = new FormControl();

    //set current position
    // this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef,
        {
          types: ['address'],
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.onSelect.emit(place);
          //set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          // this.zoom = 12;
        });
      });
    });
    // amg/core
  }
}
