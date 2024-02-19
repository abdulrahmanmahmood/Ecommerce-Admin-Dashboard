'use client'
// import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

export default function StoreProvider({ children }) {
  // const storeRef = useRef()
  // if (!storeRef.current) {
  //   // Create the store instance the first time this renders
  //   storeRef.current = makeStore()
  // }

  return <Provider store={store}>{children}</Provider>
}



// 'use client'
// import { useRef } from 'react'
// import { Provider } from 'react-redux'
// import { makeStore } from './store'
// import { initializeCount } from './slices/coutnerSlice'

// export default function StoreProvider({ count, children }) {
//   const storeRef = useRef(null)
//   if (!storeRef.current) {
//     storeRef.current = makeStore()
//     storeRef.current.dispatch(initializeCount(count))
//   }

//   return <Provider store={storeRef.current}>{children}</Provider>
// }