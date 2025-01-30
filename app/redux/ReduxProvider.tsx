'use client';
import { Provider } from 'react-redux';
import  store  from './store/strore';
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}