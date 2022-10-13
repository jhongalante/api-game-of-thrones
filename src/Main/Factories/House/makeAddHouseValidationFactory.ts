import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../Presentation/Helpers/Validators'
import { Validation } from '../../../Presentation/Protocols/Validation'

export const makeAddHouseValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'region', 'yearFundation', 'actualLordName']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
