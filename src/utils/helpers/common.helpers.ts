export const createQueryString = (
  name: string,
  value: string,
  _params?: URLSearchParams
) => {
  const params = new URLSearchParams(_params?.toString());
  params.set(name, value);
  return params.toString();
};

export const formatOTPCountdown = (countDown: number) =>
  `${Math.floor(countDown / 60)}m${countDown % 60 === 0 ? "" : countDown % 60 < 10 ? "0" : ""}${
    countDown % 60 === 0 ? "" : countDown % 60
  }${countDown % 60 === 0 ? "" : "s"}`;

export const formatLargeNumber = (value: number): string => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}m`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}k`;
  }
  return value.toString();
};

export const truncateString = (str?: string, maxLength: number = 50) => {
  if (!str) return "";
  if (str?.length <= maxLength) return str;
  else return str.slice(0, maxLength) + "...";
};

export const generateColorFromText = (text: string, opacity?: number) => {
  const hash = text
    .split("")
    .reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0);
  const hue = hash % 360;

  if (opacity !== undefined) {
    const clampedOpacity = Math.max(0, Math.min(1, opacity));
    return `hsla(${hue}, 70%, 50%, ${clampedOpacity})`;
  }

  return `hsl(${hue}, 70%, 50%)`;
};

export const getTextColorFromBgColor = (backgroundColor: string) => {
  const color = backgroundColor
    .slice(4, -1)
    .split(",")
    .map((x) => parseInt(x.trim(), 10));
  const brightness = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
  return brightness < 128 ? "white" : "black";
};

export function slugify(text?: string): string {
  if (!text) return "";

  const trimmedText = text.trim();
  if (trimmedText.length === 0) return "";

  const lastDotIndex = trimmedText.lastIndexOf(".");
  const hasExtension =
    lastDotIndex > 0 && lastDotIndex < trimmedText.length - 1;

  const namePart = hasExtension
    ? trimmedText.slice(0, lastDotIndex)
    : trimmedText;
  const extensionPart = hasExtension
    ? trimmedText.slice(lastDotIndex).toLowerCase()
    : "";

  const slugBase = namePart
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  if (slugBase.length === 0) return extensionPart;

  return `${slugBase}${extensionPart}`;
}

export function formatNumberToUnits(value: number): string {
  if (value < 1000) {
    return value.toString();
  }
  const units = ["K", "M", "B", "T"];
  let unitIndex = -1;
  let newValue = value;
  while (newValue >= 1000 && unitIndex < units.length - 1) {
    newValue /= 1000;
    unitIndex++;
  }
  return `${newValue.toFixed(1)}${units[unitIndex]}`;
}

export const getCurrencyByCountryTwoISO = (country = "US"): string => {
  const countryCurrencyMap: Record<string, string> = {
    US: "USD",
    GB: "GBP",
    DE: "EUR",
    FR: "EUR",
    NG: "NGN",
    JP: "JPY",
    IN: "INR",
  };
  return countryCurrencyMap[country] || "USD";
};

export const formatUserLanguages = (languages?: Array<string>) =>
  Array.isArray(languages)
    ? languages.join(", ")
    : Array.isArray(JSON.parse(languages || "[]"))
      ? JSON.parse(languages as any)?.join(", ")
      : "";

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const generateRandomInteger = (): number => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return (array[0] % 900000) + 100000;
};

export function deepDiff(obj1: any, obj2: any): any {
  const result: any = Array.isArray(obj1) ? [] : {};

  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      const val1 = obj1?.[key];
      const val2 = obj2[key];

      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (JSON.stringify(val1) !== JSON.stringify(val2)) {
          result[key] = val2;
        }
      } else if (
        val1 !== null &&
        val2 !== null &&
        typeof val1 === "object" &&
        typeof val2 === "object"
      ) {
        const diff = deepDiff(val1, val2);
        if (Object.keys(diff).length > 0) {
          result[key] = diff;
        }
      } else if (val1 !== val2) {
        result[key] = val2;
      }
    }
  }

  return result;
}

export const hasSQLLikeCode = (input: string) =>
  /create\s+or\s+replace|select\s+.+\s+from|insert\s+into/i.test(input);

export async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
