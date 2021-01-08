import React, { FC, PropsWithChildren } from 'react';

import { UserProvider } from './user';
import { IssuerProvider } from './issuer';
import { VerifierProvider } from './verifier';
import { HolderAppProvider } from './holderApp';
import { PresentationRequestPostResponseProvider } from './presentationRequestPostResponse';
import { PresentationProvider } from './presentation';
import { NoPresentationProvider } from './noPresentation';
import { CredentialProvider } from './credential';
import { CredentialStatusProvider } from './credentialStatus';

type ProviderProps = PropsWithChildren<{}>;

export const Provider: FC<ProviderProps> = ({ children = null }) => (
  <UserProvider>
    <VerifierProvider>
      <IssuerProvider>
        <HolderAppProvider>
          <CredentialProvider>
            <CredentialStatusProvider>
              <PresentationRequestPostResponseProvider>
                <PresentationProvider>
                  <NoPresentationProvider>
                    {children}
                  </NoPresentationProvider>
                </PresentationProvider>
              </PresentationRequestPostResponseProvider>
            </CredentialStatusProvider>
          </CredentialProvider>
        </HolderAppProvider>
      </IssuerProvider>
    </VerifierProvider>
  </UserProvider>
);
