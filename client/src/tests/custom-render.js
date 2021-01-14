import React from "react";
import { render } from "@testing-library/react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
// Import your own reducer
import rootReducer from "../reducers";
import thunk from "redux-thunk";

function customRender(
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };
