/**
 * @jest-environment jsdom
 */

import { getAllByTestId, screen, waitFor } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import Bills from "../containers/Bills.js"
import { ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import userEvent from '@testing-library/user-event'
import mockStore from '../__mocks__/store'

import router from "../app/Router.js";

// describe("Given I am connected as an employee", () => {
//   describe("When I am on Bills Page", () => {
//     test("Then bill icon in vertical layout should be highlighted", async () => {

//       Object.defineProperty(window, 'localStorage', { value: localStorageMock })
//       window.localStorage.setItem('user', JSON.stringify({
//         type: 'Employee'
//       }))
//       const root = document.createElement("div")
//       root.setAttribute("id", "root")
//       document.body.append(root)
//       router()
//       window.onNavigate(ROUTES_PATH.Bills)
//       await waitFor(() => screen.getByTestId('icon-window'))
//       const windowIcon = screen.getByTestId('icon-window')
//       //to-do write expect expression
//       expect(windowIcon.classList.contains('active-icon')).toEqual(true)
//     })
//     test("Then bills should be ordered from earliest to latest", () => {
//       document.body.innerHTML = BillsUI({ data: bills })
//       const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
//       const antiChrono = (a, b) => ((a < b) ? 1 : -1)
//       console.log(dates)
//       const datesSorted = [...dates].sort(antiChrono)
//       expect(dates).toEqual(datesSorted)
//     })
//   })
// })


// test d'intégration GET

describe('Given I am connected as Employee', () => {
  describe('When I click on the icon eye', () => {
    test('A modal should open', async () => {


      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
  
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
  
      const billContainer = new Bills({
        document, 
        onNavigate, 
        store: null, 
        localStorage: localStorageMock
      })
  
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
  
      $.fn.modal = jest.fn();
      const handleClickIconEye  = jest.fn((e) => billContainer.handleClickIconEye(e.target))
  
      const eyeIcon = screen.getAllByTestId('icon-eye')[0];
      expect(eyeIcon).toBeTruthy();
      eyeIcon.addEventListener('click', handleClickIconEye)
      userEvent.click(eyeIcon)
  
      expect(handleClickIconEye).toHaveBeenCalled()
      expect(screen.getAllByText('Justificatif')).toBeTruthy()

      // créer un store et appeler la fonction getBills
      
      // Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      // window.localStorage.setItem('user', JSON.stringify({
      //   type: 'Employee'
      // }))
      // document.body.innerHTML = BillsUI(bills[0])
      // const onNavigate = (pathname) => {
      //   document.body.innerHTML = ROUTES({ pathname })
      // }
      // const store = null
      // const bill = new Bills({
      //   document, onNavigate, store: null, bills:bills, localStorage: window.localStorage
      // })
      // const getBills = bill.getBills(store)



    })
  })
})