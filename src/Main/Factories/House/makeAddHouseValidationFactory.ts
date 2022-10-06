import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../Presentation/Helpers/Validators'
import { Validation } from '../../../Presentation/protocols/Validation'

export const makeAddHouseValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'region', 'yearFundation', 'lordName']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
