import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzUploadModule } from 'ng-zorro-antd/upload'
registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()]
 
};
