import { createContext } from "react";

export const sharedData = createContext<any>({ selectedChart: "CpuChart", data: null, config: {}})
