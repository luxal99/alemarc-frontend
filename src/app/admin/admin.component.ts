import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {VerifyService} from '../service/verify.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  @ViewChild('target', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(private authService: AuthService, private router: Router, private verifyTokenService: VerifyService,
              private cvRef: ViewContainerRef, private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.verifyToken();
  }

  ngAfterViewInit(): void {
    this.loadOverviewComponent();
  }

  verifyToken() {
    this.verifyTokenService.verifyToken().subscribe((resp) => {

    }, () => {
      this.router.navigate(['/login']);
    });
  }

  async loadOverviewComponent() {
    this.entry.clear();
    const {OverviewComponent} = await import('./overview/overview.component');
    const factory = this.resolver.resolveComponentFactory(OverviewComponent);
    this.entry.createComponent(factory);
  }
}

