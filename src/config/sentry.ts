import * as Sentry from '@sentry/node';

export function initSentry() {
  Sentry.init({
    dsn: 'https://d1a847e9dd10c1ee174ec641e0f78105@o4504663060578304.ingest.us.sentry.io/4507919120465920',
    tracesSampleRate: 1.0,
  });
}