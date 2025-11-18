// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { notifyErrorChannel } from '@/utils/slack-notifier';
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  beforeSend: (event, hint) => {
    try {
      notifyErrorChannel(event, hint);
      console.log('⚡ beforeSend: Slack notification completed');
    } catch (error) {
      console.error('⚡ beforeSend: Slack notification failed:', error);
    }

    console.log('⚡ beforeSend: Returning event to Sentry');
    return event;
  },
});
