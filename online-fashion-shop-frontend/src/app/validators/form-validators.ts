import { FormControl, FormGroup, ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

export class FormValidators {
    // whitespace validation
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors {
        if((control.value != null) && (control.value.trim().length==0)){
            return {'notOnlyWhiteSpace': true};
        }else{
            // return {'notOnlyWhiteSpace': false};
            return {};
        }
    }

    static onlyChar(): ValidationErrors {
      return (control: FormControl): { [key: string]: boolean } | null => {
        if (control.value == '') return null;
  
        let re = new RegExp('^[a-zA-Z ]*$');
        if (re.test(control.value)) {
          return null;
        } else {
          return { onlyChar: true };
        }
      };
    }

    static match(controlName: string, checkControlName: string): ValidatorFn {
      return (controls: AbstractControl) => {
        const control = controls.get(controlName);
        const checkControl = controls.get(checkControlName);
        if (checkControl!.errors && !checkControl!.errors["matching"]) {
          return null;
        }
        if (control!.value !== checkControl!.value) {
          controls.get(checkControlName)!.setErrors({ notMatching: true });
          return { notMatching: true };
        } else {
          return null;
        }
      };
    }
    static confirmPasswordValidator(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
        let control = formGroup.controls[controlName];
        let matchingControl = formGroup.controls[matchingControlName]
        if (
          matchingControl.errors &&
          !matchingControl.errors["confirmPasswordValidator"]
        ) {
          return;
        }
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmPasswordValidator: true });
        } else {
          matchingControl.setErrors(null);
        }
      };
    }
    
    
}
