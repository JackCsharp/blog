import "./App.css";
import Router from "./Router";
import { AuthProvider } from "./common/AuthContext";
function App() {
    
    return <AuthProvider><Router></Router></AuthProvider>;
}

export default App;
