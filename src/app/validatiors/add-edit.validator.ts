// import { FormControl } from '@angular/forms';
// import { Technology } from '../models/technology.model';

// export const nameValidator = (technologies: Technology[]) => {
//   return (control: FormControl): { [key: string]: any } | null => {
//     const test = technologies?.find(
//       (technology) => technology.name === control.value.name
//     );

//     if (test) {
//       console.log({ test, technologies });

//       return { mustNotMatch: true };
//     }
//     return null;
//   };
// };
