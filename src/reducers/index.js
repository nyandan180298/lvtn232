import tokenReducer from "reducers/token"
import khoReducer from "reducers/kho"
import orderReducer from "reducers/order"

const reducers = {
   token: tokenReducer,
   kho: khoReducer,
   order: orderReducer
}

export default reducers;