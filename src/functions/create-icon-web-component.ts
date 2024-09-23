import r2wc from '@r2wc/react-to-web-component';
import React from 'react';
import { SVGIconProps } from '@patternfly/react-icons/dist/esm/createIcon';

export function CreateIconWebComponent( icon:React.ComponentClass<SVGIconProps> ):CustomElementConstructor{
  return r2wc( icon );
}