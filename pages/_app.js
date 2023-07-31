import { AuthContextProvider } from "@/context/authContext";
import { StoreProvider } from "../store2/Store";
import "../styles/globals.css";
import Layout from "./components/Layout";
export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
    
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    
    </AuthContextProvider>
  )
}
