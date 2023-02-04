import { Link, Outlet } from "react-router-dom";

export function Layout({ ...pageProps }) {
    return (
      <>
          <div>
              <nav className="border-b p-6">
                  <p className="text-4xl font-bold">NFT Marketplace</p>
                  <div className="flex mt-4">
                      <Link to="/">
                          <a className="mr-4 text-pink-500">
                              Home
                          </a>
                      </Link>
                      <Link to="/create-nft">
                          <a className="mr-6 text-pink-500">
                              Sell NFT
                          </a>
                      </Link>
                      <Link to="/my-nfts">
                          <a className="mr-6 text-pink-500">
                              My NFTs
                          </a>
                      </Link>
                      <Link to="/dashboard">
                          <a className="mr-6 text-pink-500">
                              Dashboard
                          </a>
                      </Link>
                  </div>
              </nav>
              <Outlet {...pageProps} />
          </div>
      </>
    );
}