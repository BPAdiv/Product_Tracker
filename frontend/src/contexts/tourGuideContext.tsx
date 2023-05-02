import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Step } from "react-joyride";

type appState = {
  run: boolean;
  stepIndex: number;
  steps: Step[] | undefined;
  tourActive: boolean;
};

export interface TourGuideContextInterface {
  homeTour: appState;
  setHomeTour: Dispatch<SetStateAction<appState>>;
}

type TourGuideProviderProps = {
  children: ReactNode;
};

export const TourGuideContext = createContext<TourGuideContextInterface>(null!);

export default function TourGuideProvider({
  children,
}: TourGuideProviderProps) {
  const [homeTour, setHomeTour] = useState<appState>({
    run: false,
    stepIndex: 0,
    steps: [],
    tourActive: false,
  });

  return (
    <TourGuideContext.Provider value={{ homeTour, setHomeTour }}>
      {children}
    </TourGuideContext.Provider>
  );
}
