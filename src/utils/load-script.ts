export function loadScript(src: string, container: HTMLElement): HTMLScriptElement {
  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.src = src
  container.appendChild(script)
  return script
}
