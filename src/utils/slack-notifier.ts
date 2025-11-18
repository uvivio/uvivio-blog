'use server';
import { ISlackPlayload, sendSlackMessage } from '@/actions/send-slack-message';
import type { ErrorEvent, EventHint } from '@sentry/nextjs';

export async function notifyErrorChannel(
  event: ErrorEvent,
  hint?: EventHint
): Promise<void> {
  const error = hint?.originalException as Error | undefined;

  const errorStack =
    error?.stack ??
    (event.exception?.values?.[0]?.stacktrace?.frames
      ? formatStackTrace(event.exception.values[0].stacktrace.frames)
      : undefined);

  try {
    const data: ISlackPlayload = {
      event_id: event.event_id,
      name: error?.name || event.exception?.values?.[0]?.type || 'Error',
      message:
        error?.message ||
        event.exception?.values?.[0]?.value ||
        event.message ||
        'Unknown error',
      stack: truncateText(errorStack || '', 2000),
      url:
        event.request?.url ||
        (typeof window !== 'undefined' ? window.location.href : undefined) ||
        '',
      user: {
        email: event.user?.email,
        username: event.user?.username,
        id: event.user?.id as string,
      },
      timestamp: new Date().toISOString(),
    };

    const result = await sendSlackMessage(data);

    if (!result?.success) {
      console.error(' Client: Slack notification failed:', result?.error);
    } else {
      console.log(' Client: Slack notification sent successfully!');
    }
  } catch (error) {
    console.error(' Client: Failed to call server action:', error);
  }
}

function formatStackTrace(frames: any[]): string {
  try {
    return frames
      .map((frame: any) => {
        const filename = frame.filename || 'unknown';
        const func = frame.function || 'anonymous';
        const line = frame.lineno || '?';
        const col = frame.colno || '?';
        return `  at ${func} (${filename}:${line}:${col})`;
      })
      .reverse()
      .join('\n');
  } catch {
    return 'Stack trace unavailable';
  }
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '\n... (truncated)';
}
