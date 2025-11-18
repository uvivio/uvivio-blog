'use server';

import { APP_NAME } from '@/config';
import { env } from '@/env';
import { WebClient } from '@slack/web-api';

const SENTRY_SLACK_BOT_TOKEN = env.SENTRY_SLACK_BOT_TOKEN;
const SENTRY_SLACK_ERRORS_CHANNEL_ID = env.SENTRY_SLACK_ERRORS_CHANNEL_ID;
const SLACK_APP_NAME = APP_NAME;
const SLACK_ENVIRONMENT =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';
const SENTRY_ORG = env.SENTRY_ORG;
const SENTRY_PROJECT = env.SENTRY_PROJECT;

export interface ISlackPlayload {
  name: string;
  message: string;
  stack: string;
  url: string;
  timestamp: string;
  type?: string;
  event_id?: string;
  user?: {
    email?: string;
    username?: string;
    id?: string;
  };
}

const slack = new WebClient(SENTRY_SLACK_BOT_TOKEN);

export async function sendSlackMessage(data: ISlackPlayload) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('⏭️  Skipping Slack notification (not in production)');
    return;
  }

  try {
    const sentryIssueUrl = data.event_id
      ? `https://sentry.io/organizations/${SENTRY_ORG}/issues/?project=${SENTRY_PROJECT}&query=${data.event_id}`
      : undefined;

    const result = await slack.chat.postMessage({
      channel: SENTRY_SLACK_ERRORS_CHANNEL_ID,
      text: `🚨 Error in \`${SLACK_APP_NAME}\` (${SLACK_ENVIRONMENT})`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `🚨 Error in ${SLACK_APP_NAME}`,
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Environment:*\n${SLACK_ENVIRONMENT}`,
            },
            {
              type: 'mrkdwn',
              text: `*Error Type:*\n${data.name}`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n${data.message || data.type}`,
          },
        },
        ...(data.url
          ? [
              {
                type: 'section' as const,
                fields: [
                  {
                    type: 'mrkdwn' as const,
                    text: `*URL:*\n${data.url}`,
                  },
                ],
              },
            ]
          : []),
        ...(data.user
          ? [
              {
                type: 'section' as const,
                fields: [
                  {
                    type: 'mrkdwn' as const,
                    text: `*User:*\n${data.user.email || data.user.username || data.user.id || 'Anonymous'}`,
                  },
                ],
              },
            ]
          : []),
        {
          type: 'rich_text',
          elements: [
            {
              type: 'rich_text_preformatted',
              elements: [
                {
                  type: 'text',
                  text: `STACK TRACE:\n${data.stack}`,
                },
              ],
            },
          ],
        },
        {
          type: 'divider',
        },
        ...(sentryIssueUrl
          ? [
              {
                type: 'actions' as const,
                elements: [
                  {
                    type: 'button' as const,
                    text: {
                      type: 'plain_text' as const,
                      text: '🔍 View in Sentry',
                      emoji: true,
                    },
                    url: sentryIssueUrl,
                    style: 'primary' as const,
                  },
                ],
              },
            ]
          : []),
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Event ID: \`${data.event_id || 'N/A'}\` | ${new Date().toISOString()}`,
            },
          ],
        },
      ],
    });

    console.log(' Message sent successfully!', result.ts);
    return { success: true, timestamp: result.ts };
  } catch (error) {
    console.error(' Failed to send message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
