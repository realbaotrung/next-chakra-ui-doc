import get from 'lodash.get'
import uiJson from '../../i18n/ui.json'

// https://docs-lodash.com/v4/get/
export function t(str: string) {
  return get(uiJson, str)
}
