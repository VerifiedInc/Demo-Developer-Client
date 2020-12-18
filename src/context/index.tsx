import React, { FC, PropsWithChildren } from 'react';

import { UserProvider } from './user';
import { IssuerProvider } from './issuer';
import { VerifierProvider } from './verifier';

type ProviderProps = PropsWithChildren<{}>;

export const Provider: FC<ProviderProps> = ({ children = null }) => (
  <UserProvider>
    <VerifierProvider>
      <IssuerProvider>
        {children}
      </IssuerProvider>
    </VerifierProvider>
  </UserProvider>
);
