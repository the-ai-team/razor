import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface ToastPortal {
  portalId: string;
  loaded: boolean;
}

export function useToastPortal(): ToastPortal {
  const [loaded, setLoaded] = useState(false);
  const portalId = useMemo(() => `toast-portal-${uuidv4()}`, []);

  useEffect(() => {
    const div = document.createElement('div');
    div.id = portalId;
    document.body.prepend(div);
    setLoaded(true);

    return () => {
      document.body.removeChild(div);
    };
  }, [portalId]);

  return { portalId, loaded };
}
