import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {} from 'googlemaps';
import {
  faMapMarked,
  faMapMarker,
  faMapMarkerAlt,
  faMapPin,
  faMapSigns,
  faSearchLocation
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})

export  class  HomeComponent  implements  AfterViewInit {
  faLocation=faMapMarkerAlt;
  faLocation2=faMapPin
  @ViewChild('addresstext') addresstext!:  ElementRef;
  @ViewChild('gmap') gmapElement:  any;

  ngAfterViewInit():  void {
    this.getPlaceAutocomplete();
  }
  getPlaceAutocomplete() {
    const  autocomplete  =  new  google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: { country:  'US' },
        types: ['establishment', 'geocode']
      });

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const  place  =  autocomplete.getPlace();
      // @ts-ignore
      const  myLatlng  =  place.geometry.location;
      const  mapOptions  = {
        zoom:  15,
        center:  myLatlng
      };
      const  map  =  new  google.maps.Map(this.gmapElement.nativeElement, mapOptions);
      const  marker  =  new  google.maps.Marker({
        position:  myLatlng,
        title:  place.name
      });
      marker.setMap(map);
    });
  }
}

// export class HomeComponent implements OnInit {
//
//   faLocation=faMapMarkerAlt;
//   faLocation2=faMapPin
//   constructor() { }
//   @ViewChild('gmap') gmapElement: any;
//   @ViewChild('addresstext') addresstext!: ElementRef;
//   map!: google.maps.Map;
//
//   ngOnInit(): void {
//
//     const mapProperties = {
//       center: new google.maps.LatLng(46.768911, 23.590308),
//       zoom: 16,
//       mapTypeId: google.maps.MapTypeId.ROADMAP,
//       fullscreenControl: false,
//       styles: [
//         {
//           "elementType": "all",
//           "featureType": "all",
//           "stylers": [
//             {"saturation": "-100"}
//           ]
//         }
//       ]
//     };
//     // this.map = new google.maps.Map(this.gmapElement.nativeElement,    mapProperties);
//     setTimeout(() => {
//       // @ts-ignore
//       this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProperties);
//     }, 1000);
//
//   }
//
// }
