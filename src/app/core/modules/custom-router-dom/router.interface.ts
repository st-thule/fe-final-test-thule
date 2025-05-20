import { JSX, LazyExoticComponent } from 'react';

export interface PageRoute {
  path: string;
  element?: LazyExoticComponent<() => JSX.Element>;
  isProtected?: boolean;
  isPublic?: boolean;
  redirect?: string;
  children?: PageRoute[];
  loader?: () => Promise<unknown>;
}
