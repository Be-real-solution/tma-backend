import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ async: false })
export class IsLatitudeConstraint implements ValidatorConstraintInterface {
	validate(latitude: any) {
		return typeof latitude === 'number' && latitude >= -90 && latitude <= 90
	}

	defaultMessage() {
		return 'Latitude must be a number between -90 and 90'
	}
}

export function IsLatitude(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsLatitudeConstraint,
		})
	}
}

@ValidatorConstraint({ async: false })
export class IsLongitudeConstraint implements ValidatorConstraintInterface {
	validate(longitude: any) {
		return typeof longitude === 'number' && longitude >= -180 && longitude <= 180
	}

	defaultMessage() {
		return 'Longitude must be a number between -180 and 180'
	}
}

export function IsLongitude(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsLongitudeConstraint,
		})
	}
}
