import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { loginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { RegisterPartTwoComponent } from './register-part-two/register-part-two.component';
import { RouterModule } from '@angular/router';
import { LoginGuardService } from './services/login-guard.service';
import { ProfileService } from './services/profile.service';
import { RegisterPartThreeComponent } from './register-part-three/register-part-three.component';
import { AskComponent } from './ask/ask.component';
import { AskService } from './services/ask.service';
import { TestComponent } from './test/test.component';
import { MyAskComponent } from './my-ask/my-ask.component';
import { BidComponent } from './bid/bid.component';
import { BidService } from './services/bid.service';
import { ParallaxTestComponent } from './parallax-test/parallax-test.component';
import { ImageTestComponent } from './image-test/image-test.component';
import { FileUploadModule } from 'ng2-file-upload';
import { DialogComponent } from './dialog/dialog.component';
import {MatCardModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogProfileComponent } from './dialog-profile/dialog-profile.component';
import { MessageAllComponent } from './message.all/message.all.component';
import { MessageWithComponent } from './message.with/message.with.component';
import { KeysPipe } from './pipes/keys.pipe';
import {MessageService} from './services/message.service';
import { FileDropModule } from 'ngx-file-drop';
import { ProfileImageDialogComponent } from './profile-image-dialog/profile-image-dialog.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { ProfileLinkDialogComponent } from './profile-link-dialog/profile-link-dialog.component';
import { ProfileEducationDialogComponent } from './profile-education-dialog/profile-education-dialog.component';
import { ProfileDescriptionDialogComponent } from './profile-description-dialog/profile-description-dialog.component';
import { ProfileCityDialogComponent } from './profile-city-dialog/profile-city-dialog.component';
import { HomeGuardService } from './services/home-guard.service';
import {ImgFallbackModule} from 'ngx-img-fallback';
import {ScrollEventModule} from 'ngx-scroll-event';
import { RateComponent } from './rate/rate.component';
import { RateService } from './services/rate.service';
import { FillPipe } from './pipes/fill.pipe';
import { StrangerProfileComponent } from './stranger-profile/stranger-profile.component';
import { StrangerProfileRateDialogComponent } from './stranger-profile-rate-dialog/stranger-profile-rate-dialog.component';
import {FirebaseMessagingService} from './services/firebase.messaging.service';

import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import * as firebase from 'firebase';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { MyAsksComponent } from './my-asks/my-asks.component';
import { MyAskSelectBidDialogComponent } from './my-ask-select-bid-dialog/my-ask-select-bid-dialog.component';
import { ProfileCreateCompanyDialogComponent } from './profile-create-company-dialog/profile-create-company-dialog.component';
import { ProfileEditCompanyDialogComponent } from './profile-edit-company-dialog/profile-edit-company-dialog.component';


//git add foldery/pliki
//git commit -m "wiadomosc"
//git push tff master

//git pull origin master
firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    loginComponent,
    RegisterPartTwoComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent,
    RegisterPartThreeComponent,
    AskComponent,
    TestComponent,
    MyAskComponent,
    BidComponent,
    ParallaxTestComponent,
    ImageTestComponent,
    DialogComponent,
    MyDialogComponent,
    DialogProfileComponent,
    MessageAllComponent,
    MessageWithComponent,
    KeysPipe,
    ProfileImageDialogComponent,
    ProfileLinkDialogComponent,
    ProfileEducationDialogComponent,
    ProfileDescriptionDialogComponent,
    ProfileCityDialogComponent,
    RateComponent,
    FillPipe,
    StrangerProfileComponent,
    StrangerProfileRateDialogComponent,
    MyAsksComponent,
    MyAskSelectBidDialogComponent,
    ProfileCreateCompanyDialogComponent,
    ProfileEditCompanyDialogComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FileUploadModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FileDropModule,
    ImgFallbackModule,
    ScrollEventModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
  }),
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent},
      { path: 'registerP2',
          canActivate: [ LoginGuardService ],
          component: RegisterPartTwoComponent },
      { path: 'registerP3',
          canActivate: [ LoginGuardService ],
          component: RegisterPartThreeComponent },
      { path: 'messages', canActivate: [ LoginGuardService ], component: MessageAllComponent },
      { path: 'message/:id', canActivate: [ LoginGuardService ], component: MessageWithComponent },
      { path: 'login', component: loginComponent },
      { path: 'image', component: ImageTestComponent },
      { path: 'dialog', component: DialogComponent },
      { path: 'dialogProfile', component: DialogProfileComponent },
      { path: 'ProfileImageDialog', component: ProfileImageDialogComponent },
      { path: 'ProfileLinkDialog', component: ProfileLinkDialogComponent },
      { path: 'ProfileEducationDialog', component: ProfileEducationDialogComponent },
      { path: 'ProfileDescriptionDialog', component: ProfileDescriptionDialogComponent },
      { path: 'ProfileCityDialog', component: ProfileCityDialogComponent },
      { path: 'MyAskSelectBidDialog', component: MyAskSelectBidDialogComponent },
      { path: 'profile/:id', component: StrangerProfileComponent },
      { path: 'ProfileCreateCompanyDialog', component: ProfileCreateCompanyDialogComponent },
      { path: 'StrangerProfileRateDialog', component: StrangerProfileRateDialogComponent },
      { path: 'ProfileEditCompanyDialog', component: ProfileEditCompanyDialogComponent },
      { path: 'rate/:id', component: RateComponent },
      { path: 'ask', canActivate: [ LoginGuardService ], component: AskComponent },
      { path: 'myAsk/:id', canActivate: [ LoginGuardService ], component: MyAskComponent },
      { path: 'myAsks', canActivate: [ LoginGuardService ], component: MyAsksComponent },
      { path: 'bid', canActivate: [ LoginGuardService ], component: BidComponent },
      { path: "test", component: TestComponent },
      { path: 'home', canActivate: [HomeGuardService], component: HomeComponent },
      { path: 'profile',
          canActivate: [ LoginGuardService ],
          component: ProfileComponent },
      { path: 'parallax', component: ParallaxTestComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,

    },
    LoginGuardService,
    ProfileService,
    AskService,
    BidService,
    MessageService,
    HomeGuardService,
    RateService,
    FirebaseMessagingService,
    AngularFireDatabase

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
