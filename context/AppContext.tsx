"use client"
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext } from "react"

interface AppContextType {
    user: ReturnType<typeof useUser>["user"];
    getToken: () => Promise<string | null>;
    router: ReturnType<typeof useRouter>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
      }
      return context;
}

export const AppContextProvider = ({ children }: { children: ReactNode}) => {
    const router = useRouter();
    const { user } = useUser();
    const { getToken } = useAuth();

    const value = {
        user,
        router,
        getToken
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}