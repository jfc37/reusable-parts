import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { fuseAnimations } from '@reusable-parts/fuse';

@Component({
  selector: 'stateless-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class StatelessWelcomeComponent implements OnChanges {
  /**
   * Name of the application being welcomed to
   */
  @Input()
  public name: string;

  /**
   * Description of the application
   */
  @Input()
  public description: string;

  /**
   * Logo url
   */
  @Input()
  public logoUrl: string;

  public welcomeMessage = 'Welcome';

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.name) {
      this.welcomeMessage = `Welcome to ${this.name}`;
    } else {
      this.welcomeMessage = 'Welcome';
    }
  }
}
