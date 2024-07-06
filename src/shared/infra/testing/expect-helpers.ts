import { isValidationOptions } from "class-validator";
import { ClassValidatorFields } from "../../domain/validators/class-validator-fields";
import { EntityValidationError } from "../../domain/validators/validation.error";
import { FieldsErrors } from "../../domain/validators/validator-fields-interface";

type Expected = | {
  validator: ClassValidatorFields<any>;
  data: any;
} | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors): any {
    // if (received.name?.length === 2) {
    //   console.log('');
    //   console.log('@expect.extend');
    //   console.log('expected: ', expected);
    //   console.log('received: ', received);
    // }
    if (typeof expected === 'function') {
      try {
        // console.log('expected(): ', expected());
        expected();
        // if (received.name?.length === 2) {
        //   console.log('passou por expected()');
        // }
        return isValid();
      } catch (err) {
        // if (received.name?.length === 2) {
        //   console.log('err: ', err);
        // }
        const error = err as EntityValidationError;
        // if (received.name?.length === 2) {
        //   console.log('error: ', error);
        //   console.log('error.error: ', error.error);
        //   console.log('received: ', received);
        // }


        return assertContainsErrorsMessages(error.error, received);
      }
    } else {
      // console.log('else');
      const { validator, data } = expected;
      // console.log('validator: ', validator);
      // console.log('data: ', data);
      const validated = validator.validate(data);

      if (validated) {
        return isValid();
      }

      return assertContainsErrorsMessages(validator.errors, received);
    }
  },
});



function assertContainsErrorsMessages(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  // if (received.name?.length === 2) {
  //   console.log('@assertContainsErrorsMessages');
  //   console.log('isMatch: ', isMatch);
  // }

  return isMatch
    ? isValid()
    : {
      pass: false,
      message: () => {
        `The validation errors not contains ${JSON.stringify(
          received,
        )}. Current: ${JSON.stringify(expected)}`
      }
    }
}


function isValid() {
  // return { pass: false, message: () => "Some message text for error" };
  return { pass: true, message: () => "" };
}
// expect(expected).assert(received);