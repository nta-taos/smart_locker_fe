/* eslint-disable */
import { ComponentType } from 'react';

type LoaderDefaultOptions = {
  delay: number;
  minimumLoading: number;
};

type LoadComponent = () => Promise<{ default: ComponentType<any> }>;

type AnyProps = {
  [key: string]: any;
};

type TransactionItemType = {
  id: string;
  amount: number;
  type: number;
  description: string;
  date: string;
};

export type { LoaderDefaultOptions, LoadComponent, AnyProps, TransactionItemType };
