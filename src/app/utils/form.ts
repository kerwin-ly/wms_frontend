import { FormGroup } from '@angular/forms';
import { forEach } from 'lodash';

export function isValid(form: FormGroup): boolean {
  forEach(form.controls, (item) => {
    item.markAsDirty();
    item.updateValueAndValidity();
  });
  return form.valid;
}
