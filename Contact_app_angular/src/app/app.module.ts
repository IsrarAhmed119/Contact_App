import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// agm/core
import { AgmCoreModule } from '@agm/core';
// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { HomeComponent } from './componets/home/home.component';
import { AddcontactComponent } from './componets/addcontact/addcontact.component';

// services
import { TokenInterceptorService } from './services/toeken-interceptor/token-interceptor.service';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { UserService } from './services/userServices/user.service';
import { ContactService } from './services/contcatServices/contact.service';

// redux
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '../app/store/state/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from './store/effects/user.effects';
import { ContactEffects } from './store/effects/contact.effects';
import { ProfileComponent } from './componets/profile/profile.component';
import { AddressDirective } from './directives/address.directive';

// redux

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AddcontactComponent,
    ProfileComponent,
    AddressDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([UserEffects, ContactEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNoxWXagcapR0tH-bxnJFPK28y_Oro2O0',
      libraries: ['places'],
    }),
  ],
  providers: [
    UserService,
    ContactService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
