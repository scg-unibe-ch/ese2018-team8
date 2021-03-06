import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.alertservice';

/**
 * Alert component provides alert messages for success as well as for error events.
 * Messages are retrieved from alert service.
 */
@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
