import { createContext, useContext, useEffect, useState } from 'react';
import { fakeFetchCrypto, fetchAssets } from '../api.js';
import { percentDifference } from '../utils.js';

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [editCryptoId, setEditCryptoId] = useState(null);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  function deleteAsset(id) {
    setAssets((prev) => prev.filter((e) => e.id !== id));
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const assets = await fetchAssets();
      const { result } = await fakeFetchCrypto();
      setCrypto(result);
      setAssets(mapAssets(assets, result));
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  const editAssets = (editedAsset) => {
    const newArray = assets.map((asset) => (asset.id === editedAsset.id ? editedAsset : asset));
    setAssets((prev) => mapAssets(newArray, crypto));
  };

  return (
    <CryptoContext.Provider
      value={{
        loading,
        crypto,
        assets,
        editAssets,
        addAsset,
        deleteAsset,
        drawer,
        setDrawer,
        editCryptoId,
        setEditCryptoId,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
