import {
  Component,
  OnInit,
  // amg/core,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';

import {} from 'googlemaps';

// amg/core
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';
// amg/core
import { MapsAPILoader } from '@agm/core';
// amg/core
// redux
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  ContactState,
  selectContactState,
} from './../../store/state/app.state';

import {
  AddContact,
  GetOneContact,
  ContactActionTypes,
  UpdateContact,
} from './../../store/actions/contact.actions';

// redux

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css'],
})
export class AddcontactComponent implements OnInit {
  submit = false;
  btnTitle = 'Submit';
  FormTitle = 'Add';
  displayImage;
  contactForm: FormGroup;
  selectedFile = null;
  contactFromState: Observable<any>;

  // amg/core
  // zoom: number;
  // latitude: number;
  // longitude: number;
  // latlongs: any = [];
  // latlog: any = {};
  searchControl: FormControl;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  // amg/core

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private activate_route: ActivatedRoute,
    private location: Location,
    // ngrx store
    private _store: Store<ContactState> // amg/core // private mapsAPILoader: MapsAPILoader, // private ngZone: NgZone
  ) {
    this.contactFromState = this._store.select(selectContactState);
  }

  ngOnInit() {
    // // amg/core

    // this.zoom = 4;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;
    // //create search FormControl
    // // this.searchControl = new FormControl();

    // //set current position
    // // this.setCurrentPosition();

    // //load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete = new google.maps.places.Autocomplete(
    //     this.searchElementRef.nativeElement,
    //     {
    //       types: ['address'],
    //     }
    //   );
    //   autocomplete.addListener('place_changed', () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }

    //       //set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });
    // // amg/core

    if (this.activate_route.snapshot.params['id']) {
      var id = this.activate_route.snapshot.params['id'];
      // console.log('id----------->>', id);
      this.btnTitle = 'Update';
      this.FormTitle = 'Update';
      this._store.dispatch(new GetOneContact(id));
    } else {
      // nothing
    }

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      // contactNo: ['', [Validators.required, Validators.minLength(4)]],
      contactImage: ['', [Validators.required]],
      contactNo: this.fb.array([this.fb.control('')], [Validators.required]),
    });

    this.contactFromState.subscribe((state) => {
      // console.log("login_state--------->>", state);
      if (state.type === ContactActionTypes.ADD_CONTACT) {
        var res = state.response;
        if (res.status === true) {
          // console.log('res.status === true');
          this._router.navigate(['/home']);
        }

        console.log('contactFormAdd_func_res_err', res.error);
      }
    });

    this.contactFromState.subscribe((state) => {
      // console.log("login_state--------->>", state);
      if (state.type === ContactActionTypes.UPDATE_CONTACT) {
        var res = state.response;
        if (res.status === true) {
          this._router.navigate(['/home']);
          console.log('updateContact_func_res', res);
        }
        console.log('updateContact_fun_err', res.error);
      }
    });
    this.contactFromState.subscribe((state) => {
      // console.log("login_state--------->>", state);
      if (state.type === ContactActionTypes.GET_ONE_CONTACT) {
        var res = state.response;
        if (res.status === true) {
          console.log('res.status === true');
          console.log('getOne_func_res', res);
          this.contactForm.get('name').patchValue(res.contact.name);
          this.contactForm.get('address').patchValue(res.contact.address);

          this.displayImage = res.contact.contactImage;
          // console.log('length-------->>', res.contact.contactNo.length);
          if (res.contact.contactNo.length > 1) {
            for (let i = 1; i < res.contact.contactNo.length; i++) {
              // console.log('i-------->>', i);
              this.addNewMobile();
              this.contactForm
                .get('contactNo')
                .patchValue(res.contact.contactNo);
            }
          } else {
            // console.log('else-------->>');
            this.contactForm.get('contactNo').patchValue(res.contact.contactNo);
          }
        }

        console.log('getOne_func_res_err', res.error);
        // this._router.navigate(["/taskapp"]);
      }
    });
  }
  // amg/core
  // private setCurrentPosition() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }

  // amg/core
  addressEventHandler(event) {
    console.log('home_addressEventHandler------>>', event.formatted_address);
    this.contactForm.get('address').patchValue(event.formatted_address);
  }
  get form() {
    return this.contactForm.controls;
  }

  get contactNo() {
    return this.contactForm.get('contactNo') as FormArray;
  }
  addNewMobile() {
    this.contactNo.push(this.fb.control(''));
  }
  removeMobile(i) {
    if (this.contactNo.length > 1) {
      const form = this.contactForm.get('contactNo') as FormArray;
      form.removeAt(i);
    }
  }

  onFileSelected(event) {
    // console.log('onFileSelected---->>');
    if (event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      this.contactForm.get('contactImage').setValue(imageFile);

      // console.log('this.selectedFile---->>', this.selectedFile);
    }
  }

  onSubmit() {
    this.submit = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }
    console.log('contactForm_onSubmit_call---->>');
    var data = this.contactForm.value;
    console.log('form_data---->>', data);
    // console.log('form_contact---->>', this.contactForm.get('contactNo').value);
    // console.log('form_image---->>', this.contactForm.get('contactImage').value);

    const formData = new FormData();

    formData.append('contactImage', this.contactForm.get('contactImage').value);
    formData.append('name', this.contactForm.get('name').value);
    formData.append('address', this.contactForm.get('address').value);
    // formData.append('contactNo', this.contactForm.get('contactNo').value);
    formData.append('contactNo', this.contactForm.get('contactNo').value);

    if (this.activate_route.snapshot.params['id']) {
      var id = this.activate_route.snapshot.params['id'];
      this.update_Contact(id, formData);
    } else {
      this._store.dispatch(new AddContact(formData));
    }
  }

  update_Contact(id, formData) {
    console.log('update_Contact_Function_call---->>');
    var updateObj = {
      id: id,
      formData: formData,
    };
    this._store.dispatch(new UpdateContact(updateObj));
  }
  goBack() {
    this.location.back();
  }
}
