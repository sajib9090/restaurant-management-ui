import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <HelmetProvider>
      <Toaster position="top-right" richColors />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}></RouterProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </>
);
