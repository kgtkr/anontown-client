import * as CryptoJS from "crypto-js";
import { Env } from "../env";

export function getCamoUrl(url: string): string {
  // 既にHTTPSなら
  if (url.startsWith("https://")) {
    return url;
  }

  const digest = CryptoJS.HmacSHA1(url, Env.camo.key);
  const utf8Url = CryptoJS.enc.Utf8.parse(url);
  const hexUrl = CryptoJS.enc.Hex.stringify(utf8Url);
  return `${Env.camo.origin}/${digest.toString()}/${hexUrl}`;
}
