import { createContext, useContext, useState, ReactNode } from "react";

type Market = "developed" | "emergent";
const Ctx = createContext<{ market: Market; setMarket: (m: Market) => void }>({
  market: "developed",
  setMarket: () => {},
});

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarket] = useState<Market>("developed");
  return <Ctx.Provider value={{ market, setMarket }}>{children}</Ctx.Provider>;
}

export const useMarket = () => useContext(Ctx);
