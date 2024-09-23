import { css } from '@lithium-framework/core';

export const BaseStyle:any = css`
  :host{
    display: inline-block;
    contain: content;
  }

  :host([hidden]) { 
    display: none;
  }
`;