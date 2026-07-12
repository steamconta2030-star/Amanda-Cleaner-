// Analytics configuration — replace these two IDs when you have them.
// Meta Pixel ID: from https://business.facebook.com/events_manager
// GA4 Measurement ID: from https://analytics.google.com (looks like "G-XXXXXXX")
export const META_PIXEL_ID = ""; // e.g. "123456789012345"
export const GA4_MEASUREMENT_ID = ""; // e.g. "G-XXXXXXXX"

export const analyticsEnabled = () =>
  Boolean(META_PIXEL_ID) || Boolean(GA4_MEASUREMENT_ID);

// Fires a conversion event on both Meta Pixel and GA4 if configured.
// Safe to call from anywhere in the client — no-ops on server / when unset.
export function trackConversion(
  name: string,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as {
      fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
    };
    if (META_PIXEL_ID && w.fbq) {
      // Map to a standard Meta event where obvious, else CustomEvent
      const standard = ["Lead", "Purchase", "CompleteRegistration", "Contact", "Schedule"];
      if (standard.includes(name)) w.fbq("track", name, params);
      else w.fbq("trackCustom", name, params);
    }
    if (GA4_MEASUREMENT_ID && w.gtag) {
      w.gtag("event", name, params ?? {});
    }
  } catch {
    /* noop */
  }
}

// Snippets — inlined via dangerouslySetInnerHTML in __root.tsx
export const metaPixelSnippet = (id: string) => `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${id}');fbq('track','PageView');
`;

export const ga4Snippet = (id: string) => `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());gtag('config','${id}',{send_page_view:true});
`;
