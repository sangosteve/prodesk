import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { AuthProvider } from "./contexts/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
