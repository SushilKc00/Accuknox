import ReactDOM from "react-dom/client";
import App from "./App/App.tsx";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./Redux/index.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId="268886241889-458i1bi0bi0fuupba1bsc42ddi807tbl.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
