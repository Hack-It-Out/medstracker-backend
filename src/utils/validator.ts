/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsTime(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTime',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return true; // Skip validation if value is empty or undefined

          // Regular expression to validate the time format "HH:mm"
          const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

          return typeof value === 'string' && timeRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid time in the format HH:mm`;
        },
      },
    });
  };
}
