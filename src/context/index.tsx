import React, { FC, PropsWithChildren } from 'react';

import { UserProvider } from './user';
import { IssuerProvider } from './issuer';
import { VerifierProvider } from './verifier';
import { HolderAppProvider } from './holderApp';

type ProviderProps = PropsWithChildren<{}>;

export const Provider: FC<ProviderProps> = ({ children = null }) => (
  <UserProvider>
    <VerifierProvider>
      <IssuerProvider>
        <HolderAppProvider>
          {children}
        </HolderAppProvider>
      </IssuerProvider>
    </VerifierProvider>
  </UserProvider>
);
