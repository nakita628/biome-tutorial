import Script from "next/script"

export default function Document() {
  return <Script src="/script.js" strategy="beforeInteractive" />
}
