

declare module '*.css' {
  const content: string & {
    [key: string]: string;
    [Symbol.toPrimitive](hint: 'default' | 'string' | 'number'): string;
  };
  export default content;
}

declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}