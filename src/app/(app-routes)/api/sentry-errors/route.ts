import { notifyErrorChannel } from '@/utils/slack-notifier';
import { ErrorEvent } from '@sentry/nextjs';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(' /api/sentry-errors - Received error notification');
    console.log(' Event ID:', body.eventId);

    const event = {
      event_id: body.eventId,
      message: body.message,
      exception: body.exception,
      request: body.request,
      user: body.user,
    };

    await notifyErrorChannel(event as ErrorEvent, {
      originalException: new Error(body.message),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('/api/sentry-errors - Failed to process error:', error);
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
