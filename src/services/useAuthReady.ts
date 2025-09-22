import { useEffect, useState } from "react";
import { supabase } from "../supabase/config";

export const useAuthReady = () => {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await supabase.auth.getSession();
      setAuthReady(true);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      setAuthReady(true);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return authReady;
};
