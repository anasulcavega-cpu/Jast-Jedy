import ReactGA from 'react-ga4';

export const GA_MEASUREMENT_ID = 'G-MG1J8R44K2';
export const GTM_CONTAINER_ID = 'GTM-KCHNV34X';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

let isInitialized = false;

/**
 * Initialize Google Analytics 4 (GA4) once
 */
export const initGA = () => {
  if (isInitialized) return;
  try {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    isInitialized = true;
  } catch (err) {
    console.warn('Google Analytics 4 initialization warning:', err);
  }
};

/**
 * Send SPA page view event to GA4 and Google Tag Manager (GTM)
 * @param path Internal route path (e.g. '/catalogo', '/calificar', '/cotizador')
 * @param title Page title (e.g. 'Catálogo de Postres')
 */
export const trackPageView = (path: string, title?: string) => {
  try {
    initGA();
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title || document.title,
    });

    // Push to Google Tag Manager dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'virtual_page_view',
        page_path: path,
        page_title: title || document.title,
      });
    }
  } catch (err) {
    console.warn('GA4/GTM trackPageView error:', err);
  }
};

/**
 * Track custom user engagement events in GA4 and GTM
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  try {
    initGA();
    ReactGA.event({
      action,
      category,
      label,
      value,
    });

    // Push to Google Tag Manager dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: action,
        event_category: category,
        event_label: label,
        event_value: value,
      });
    }
  } catch (err) {
    console.warn('GA4/GTM trackEvent error:', err);
  }
};
