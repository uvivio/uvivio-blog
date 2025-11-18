import PageLoader from "@/components/atoms/common/page-loader";
import { GeneratePageMetadata } from "@/utils/helpers";

export const metadata = GeneratePageMetadata({});

export default function Loading() {
  return <PageLoader text="Hold on, we're loading things up..." />;
}
