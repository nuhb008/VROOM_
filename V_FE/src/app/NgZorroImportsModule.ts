import { NgModule } from '@angular/core'

// NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n'
import { NzTableModule } from 'ng-zorro-antd/table'


@NgModule({
  exports: [
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzSelectModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzUploadModule,
    NzTableModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ]
})
export class NgZorroImportsModule {}
