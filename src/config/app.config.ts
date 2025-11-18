import { env } from '@/env';

const config = {
  media_upload_service: env.NEXT_PUBLIC_MEDIA_SERVICE_URL!,
  media_upload_service_api_key: env.NEXT_PUBLIC_MEDIA_SERVICE_API_KEY!,
};
export default config;
