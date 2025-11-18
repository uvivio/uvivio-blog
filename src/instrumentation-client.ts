import * as Sentry from '@sentry/nextjs';

console.log('🔧 instrumentation-client.ts loaded');

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tunnel: '/monitoring',
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,

  beforeSend(event, hint) {
    console.log('⚡ beforeSend hook triggered');
    console.log('⚡ Event ID:', event.event_id);
    console.log('⚡ Error:', event.exception?.values?.[0]?.value);

    if (typeof window !== 'undefined') {
      fetch('/api/sentry-errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.event_id,
          message: event.exception?.values?.[0]?.value || event.message,
          exception: event.exception,
          request: event.request,
          user: event.user,
        }),
      }).catch((err) => {
        console.error('Failed to send error to API:', err);
      });
    }

    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
