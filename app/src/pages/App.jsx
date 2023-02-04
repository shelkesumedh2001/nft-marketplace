import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { CreateNFT } from "./CreateNFT.jsx";
import { MyNFT } from "./MyNFT.jsx";
import { ResellNFT } from "./ResellNFT.jsx";
import { Navigation } from "./Navigation.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <Navigation />
            </div>

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="create-nft" element={<CreateNFT />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="my-nfts" element={<MyNFT />} />
                <Route path="resell-nft" element={<ResellNFT />} />
            </Routes>

        </BrowserRouter>
    );
}