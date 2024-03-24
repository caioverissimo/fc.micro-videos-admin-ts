
export type FieldsErrors = {
  [field: string]: string[];
};

export interface IValidatorFields<PropsValidated> {
  errors: FieldsErrors | null;
  validatedData: PropsValidated | null;
  validate(data: any): boolean;
}


// *** version on Repo oficial
// import { Notification } from './notification';

// export type FieldsErrors =
//   | {
//       [field: string]: string[];
//     }
//   | string;

// export interface IValidatorFields {
//   validate(notification: Notification, data: any, fields: string[]): boolean;
// }