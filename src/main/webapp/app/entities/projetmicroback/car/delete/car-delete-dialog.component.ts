import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICar } from '../car.model';
import { CarService } from '../service/car.service';

@Component({
  templateUrl: './car-delete-dialog.component.html',
})
export class CarDeleteDialogComponent {
  car?: ICar;

  constructor(protected carService: CarService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.carService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
