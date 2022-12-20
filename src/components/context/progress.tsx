import { createContext } from "react";

type ProgressContext = {
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
};

export const ProgressContext = createContext<ProgressContext>({
    progress: 0,
    setProgress: () => 0,
});
