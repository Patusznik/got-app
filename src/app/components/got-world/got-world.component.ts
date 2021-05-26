import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-got-world',
  templateUrl: './got-world.component.html',
  styleUrls: ['./got-world.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GotWorldComponent {}
