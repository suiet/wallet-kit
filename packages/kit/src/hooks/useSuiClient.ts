import { useContext } from "react";
import { SuiClientContext } from "../contexts/SuiClientContext";

/**
 * Return a SuiClient instance with the current chain's rpcUrl
 */
export const useSuiClient = () => {
  return useContext(SuiClientContext);
};
