import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./services/supabase.js";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

//ONLY catch errors while react is rendering, event handlers/in useEffect/async will not be caught by the error boundary, needs the error returned by the useQuery for example.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
