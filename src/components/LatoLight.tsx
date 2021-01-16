import React, { FC, PropsWithChildren } from 'react';

import './LatoLight.css';

export type LatoLightProps = PropsWithChildren<{
  className?: string;
}>;

const LatoLight: FC<LatoLightProps> = ({ children = null, className = undefined }) => {
  return <span className={className ? `lato-light ${className}` : 'lato-light'}>{children}</span>;
};

export default LatoLight;
