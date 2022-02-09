import React, { FC, PropsWithChildren } from 'react';

import { UserProvider } from './user';
import { IssuerProvider } from './issuer';
import { VerifierProvider } from './verifier';
import { HolderAppProvider } from './holderApp';
import { PresentationRequestPostDtoProvider } from './presentationRequestPostDto';
import { PresentationProvider } from './presentation';
import { NoPresentationProvider } from './noPresentation';
import { CredentialProvider } from './credential';
import { CredentialStatusProvider } from './credentialStatus';

type ProviderProps = PropsWithChildren<Record<string, unknown>>;

export const Provider: FC<ProviderProps> = ({ children = null }) => (
  <UserProvider>
    <VerifierProvider>
      <IssuerProvider>
        <HolderAppProvider>
          <CredentialProvider>
            <CredentialStatusProvider>
              <PresentationRequestPostDtoProvider>
                <PresentationProvider>
                  <NoPresentationProvider>
                    {children}
                  </NoPresentationProvider>
                </PresentationProvider>
              </PresentationRequestPostDtoProvider>
            </CredentialStatusProvider>
          </CredentialProvider>
        </HolderAppProvider>
      </IssuerProvider>
    </VerifierProvider>
  </UserProvider>
);
