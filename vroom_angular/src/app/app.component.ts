import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// NG-ZORRO Modules
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NzLayoutModule,    // Ensure layout module is imported here
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzUploadModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Fix typo: `styleUrl` to `styleUrls`
})
export class AppComponent {
  title = 'vroom_angular';
}
