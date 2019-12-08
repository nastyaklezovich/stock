import { Directive, ElementRef, OnInit, Input } from "@angular/core";
import { AuthService } from "../services";
import { RoleType } from "../models";

@Directive({
  selector: "[hideIfUnauthorized]"
})
export class hideIfUnauthorizedDirective implements OnInit {
  @Input("hideIfUnauthorized") requiredRole: RoleType;

  constructor(private el: ElementRef, private authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.hasPermission(this.requiredRole)) {
      this.el.nativeElement.style.display = "none";
    }
  }
}
