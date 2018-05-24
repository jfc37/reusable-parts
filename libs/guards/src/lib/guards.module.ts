import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedGuard } from '@reusable-parts/guards/src/lib/authenticated/authenticated.guard';
import { FirebaseAuthService } from '@reusable-parts/guards/src/lib/services/firebase-auth.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthenticatedGuard, FirebaseAuthService, FirebaseAuthService],
})
export class GuardsModule {}
