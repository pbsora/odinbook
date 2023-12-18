import { createContext } from "react";
import { AuthData } from "../../assets/Types & Interfaces";

export const UserContext = createContext<AuthData | undefined>(undefined);
