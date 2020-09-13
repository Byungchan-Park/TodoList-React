import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import todoReducer from "./store/modules/todoList"
import { Provider } from "react-redux"
import App from "./App"

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(todoReducer, devTools)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
