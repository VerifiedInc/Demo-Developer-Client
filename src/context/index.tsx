import React, { FC, PropsWithChildren } from 'react';

import { UserProvider } from './user';
import { IssuerProvider } from './issuer';
import { VerifierProvider } from './verifier';
import { HolderAppProvider } from './holderApp';
import { PresentationRequestPostResponseProvider } from './presentationRequestPostResponse';
import { PresentationProvider } from './presentation';

type ProviderProps = PropsWithChildren<{}>;

export const Provider: FC<ProviderProps> = ({ children = null }) => (
  <UserProvider>
    <VerifierProvider>
      <IssuerProvider>
        <HolderAppProvider>
          <PresentationRequestPostResponseProvider>
            <PresentationProvider>
              {children}
            </PresentationProvider>
          </PresentationRequestPostResponseProvider>
        </HolderAppProvider>
      </IssuerProvider>
    </VerifierProvider>
  </UserProvider>
);
