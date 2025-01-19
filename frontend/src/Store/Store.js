import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';

import { userDataWatcherSaga } from './watcherSaga';
import userDataSlice from './userRedux';


const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({

    reducer: {
   
       userData: userDataSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(userDataWatcherSaga);
export default Store


// import { configureStore } from "@reduxjs/toolkit";

// import userDataSlice from "./userDataSlice";

// const Store = configureStore({

//     reducer: {
//        userDataSlicekey:userDataSlice
//     }
// })
// export default Store