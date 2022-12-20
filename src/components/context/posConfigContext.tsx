import React, { createContext } from "react";

export type POSConfig = {
    type: "input" | "integration";
    integration?: string;
    posID?: string;
    posToken?: string;
} | null;

type POSConfigContext = {
    pos: POSConfig;
    setPos: React.Dispatch<React.SetStateAction<POSConfig>>;
};

export const POSConfigContext = createContext<POSConfigContext>({
    pos: null,
    setPos: () => null,
});
