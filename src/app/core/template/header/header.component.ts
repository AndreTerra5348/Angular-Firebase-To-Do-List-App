import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isAuthorized: boolean = false;
  isAtListPage: boolean = false;

  private routeEventSubscription: Subscription;

  constructor(private authService: AuthService,
    private router: Router) {
    authService.getAuthorized().subscribe(isAuthorized => this.isAuthorized = isAuthorized);
    this.routeEventSubscription = router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event as NavigationEnd)
      )
      .subscribe(event => this.isAtListPage = event.urlAfterRedirects.includes("/todo-list"));
  }

  logout(): void {
    this.authService.logout().then(() => this.router.navigate(['sign-in']));
  }

  ngOnDestroy(): void {
    this.routeEventSubscription.unsubscribe();
  }
}
