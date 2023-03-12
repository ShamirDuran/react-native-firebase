import {createContext, ReactNode, useCallback, useState} from 'react';
import {LoadingScreen} from '../screens/LoadingScreen';

type LoadingProviderProps = {
  children: ReactNode;
};

type LoadingContextProps = {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  setLoading: () => {},
});

export const LoadingProvider = ({children}: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  return (
    <LoadingContext.Provider value={{isLoading, setLoading}}>
      {children}
      <LoadingScreen visible={isLoading} />
    </LoadingContext.Provider>
  );
};
