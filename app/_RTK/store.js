import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './slices/tokenSlice';
// import tokenSlice from './slices/tokenSlice';
import visitorReducer from './slices/visitorSlice'


export const store = configureStore({
    reducer: {
      token:tokenReducer,
      // counter:couterReducer,
      visitor:visitorReducer
    },
  })



// import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './slices/coutnerSlice'

// export const makeStore = () => {
//   return configureStore({
//     reducer: {

//       counter:counterReducer
//     },
//   })
// }