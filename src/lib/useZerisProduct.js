import { useEffect, useState } from 'react';
import { getZerisProduct } from './zerisCatalog';

// Hook que devuelve los datos del producto (incluyendo URL de la imagen
// destacada) para un slug dado en zeriscoffee.com.
// Cachea automáticamente (24h en localStorage). Si falla, devuelve null
// para que el caller pinte un placeholder.
export function useZerisProduct(slug) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!slug) {
      setProduct(null);
      return;
    }
    let cancelled = false;
    getZerisProduct(slug).then((p) => {
      if (!cancelled) setProduct(p);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return product;
}
