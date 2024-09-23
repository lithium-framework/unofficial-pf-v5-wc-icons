export function register( name:string , webComponent:CustomElementConstructor ){
  customElements.define( name , webComponent)
}