import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./routers";
import AuthProvider from "./provider/AuthProvider";

function App() {
  return (
    <>
        <AuthProvider router={router}>
            <RouterProvider router={router} />
        </AuthProvider>
    </>
  )
}

export default App
