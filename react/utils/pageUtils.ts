import { split, trim, isEmpty } from 'ramda'
import { DEFAULT_PAGE_DATA } from './constants'

 export const getItemsPerPage = (itemsPerPage: string) => {

   if (!itemsPerPage) {
    return DEFAULT_PAGE_DATA
  }

   let pageData: any = {}
  split('|', itemsPerPage).forEach(pageInfo => {

     const splittedPageInfo = split(':', pageInfo)
      .map(page => trim(page))
      .filter(page => page !== '')

     if (splittedPageInfo.length === 2) {
      pageData[parseInt(splittedPageInfo[0], 10)] = parseInt(splittedPageInfo[1], 10)
    }
  })

   return !isEmpty(pageData) ? pageData : DEFAULT_PAGE_DATA
}