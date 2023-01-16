import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout.jsx";
import Home from "./Home.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { CreateNFT } from "./CreateNFT.jsx";
import { MyNFT } from "./MyNFT.jsx";
import { ResellNFT } from "./ResellNFT.jsx";

export default function App() {
    return (
      <BrowserRouter>
          <Routes path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="create-nft" element={<CreateNFT />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="my-nfts" element={<MyNFT />} />
              <Route path="resell-nft" element={<ResellNFT />} />
          </Routes>
      </BrowserRouter>
    );
}