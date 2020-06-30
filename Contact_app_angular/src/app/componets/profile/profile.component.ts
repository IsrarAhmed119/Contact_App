import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @Input() userName: string;
  @Input() userEmail: string;
  @Output() logoutVar = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
    console.log('Profile----->>', this.userName, this.userEmail);
  }

  logoutEvent() {
    // console.log('logoutEvent__call----->>');
    this.logoutVar.emit(true);
  }
}
