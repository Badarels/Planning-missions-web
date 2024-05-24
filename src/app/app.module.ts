import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { AuthetificationModule } from './authentification/authetification.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonContentTypeInterceptor } from './shared/helper/jsonContentType.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersPipe } from './pipe/users.pipe';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    AuthetificationModule, 
    NgbModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    NgbDropdownModule,
    NgbModule,
  ],
  providers: [ 
    {provide: HTTP_INTERCEPTORS, useClass: JsonContentTypeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  
})

export class AppModule { }
