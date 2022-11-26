import { FormGroup } from '@angular/forms';

export class RegisterValidations {
  
  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        return { mustMatch: true };
      }
      return null;
    };
  }
}
