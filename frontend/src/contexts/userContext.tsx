import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type User = {
  _id: string;
  email: string;
  userName: string;
  telegramId?: string;
  role?: string;
  phoneNumber?: string;
  country?: string;
};
export interface UserContextInterface {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextInterface>(null!);

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
