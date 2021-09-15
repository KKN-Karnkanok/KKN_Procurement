import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  
  constructor(private modalService: NgbModal) { }

  
// modal Open Success
modalOpenSuccess(modalSuccess) {
  this.modalService.open(modalSuccess, {
    centered: true,
    windowClass: 'modal modal-success'
  });
  }
  
  // modal Open Danger
  modalOpenDanger(modalDanger) {
  this.modalService.open(modalDanger, {
    centered: true,
    windowClass: 'modal modal-danger'
  });
  }
  
  // modal Open Info
  modalOpenInfo(modalInfo) {
  this.modalService.open(modalInfo, {
    centered: true,
    windowClass: 'modal modal-info'
  });
  }
  
  // modal Open Warning
  modalOpenWarning(modalWarning) {
  this.modalService.open(modalWarning, {
    centered: true,
    windowClass: 'modal modal-warning'
  });
  }
  
  // modal Open Dark
  modalOpenDark(modalDark) {
  this.modalService.open(modalDark, {
    centered: true,
    windowClass: 'modal modal-dark'
  });
  }
  
  modalOpenPrimary(modalPrimary) {
    this.modalService.open(modalPrimary, {
      centered: true,
      windowClass: 'modal modal-primary'
    });
  }
  
  ngOnInit(): void {
  }

}
