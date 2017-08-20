import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-run-add',
  templateUrl: './run-add.component.html',
  styleUrls: ['./run-add.component.scss']
})
export class RunAddComponent {
  @Input() displayModal = false;
  @Output() updateDisplayModal = new EventEmitter();
  @Output() submitForm = new EventEmitter();

  constructor() { }

  toggleModal() {
    if (this.displayModal) {
      if (document.body.classList.contains('overflow-hidden')) {
          document.body.classList.remove('overflow-hidden');
      }
      this.displayModal = false;
      this.updateDisplayModal.emit(this.displayModal);
    }
    else {
      if (!document.body.classList.contains('overflow-hidden')) {
         document.body.classList.add('overflow-hidden');
      }
      this.displayModal = true;
    }
  }

  onSubmit(form) {
    this.toggleModal();
    this.submitForm.emit(form);
    console.log(form, "from add run")
  }

}
