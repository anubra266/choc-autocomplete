import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "../components/ui/provider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
)
