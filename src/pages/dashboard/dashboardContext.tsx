import { createContext, useContext } from "react";

export type DashboardUser = { email: string; role: string; phone?: string | null };
export type DashboardCompany = {
  name?: string | null;
  memberNumber: string;
  planType: string;
  credits: number;
  cardOnFile: boolean;
  billingEmail?: string | null;
  billingPhone?: string | null;
};

export type DashboardMe = { user: DashboardUser; company: DashboardCompany };

export const DashboardContext = createContext<{
  me: DashboardMe;
  refreshMe: () => Promise<void>;
} | null>(null);

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardContext.Provider");
  return ctx;
}

