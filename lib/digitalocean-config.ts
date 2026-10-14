import { isIP } from 'node:net';

export interface DigitalOceanConfig {
  baseUrl: string | null;
  apiKey: string | null;
}

/**
 * Support both the current variable names and the older names documented in
 * the deployment guide. A raw droplet IP/host:port is HTTP by default; use a
 * full HTTPS URL when a TLS proxy/domain is configured.
 */
export function getDigitalOceanConfig(): DigitalOceanConfig {
  const configuredUrl = (
    process.env.DIGITALOCEAN_CONVERTER_URL ||
    process.env.DIGITALOCEAN_DROPLET_IP ||
    process.env.CONVERTER_API_URL ||
    ''
  ).trim();
  const apiKey = (
    process.env.DIGITALOCEAN_CONVERTER_API_KEY ||
    process.env.DIGITALOCEAN_API_KEY ||
    process.env.CONVERTER_API_KEY ||
    ''
  ).trim();

  if (!configuredUrl) return { baseUrl: null, apiKey: apiKey || null };

  let normalizedUrl = configuredUrl;
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    const hostPart = normalizedUrl.split('/')[0];
    const hostWithoutPort = hostPart.replace(/:\d+$/, '');
    const isIpOrLocal = isIP(hostWithoutPort) !== 0 || hostWithoutPort === 'localhost';
    if (isIpOrLocal && !/:\d+$/.test(hostPart)) normalizedUrl = `http://${hostPart}:3001${normalizedUrl.slice(hostPart.length)}`;
    else if (isIpOrLocal || /:\d+$/.test(hostPart)) normalizedUrl = `http://${normalizedUrl}`;
    else normalizedUrl = `https://${normalizedUrl}`;
  }

  try {
    const url = new URL(normalizedUrl);
    if (!['http:', 'https:'].includes(url.protocol) || !url.hostname) {
      return { baseUrl: null, apiKey: apiKey || null };
    }
    let pathname = url.pathname.replace(/\/+$/, '');
    if (pathname.endsWith('/convert')) pathname = pathname.slice(0, -'/convert'.length);
    return {
      baseUrl: `${url.origin}${pathname}`.replace(/\/+$/, ''),
      apiKey: apiKey || null,
    };
  } catch {
    return { baseUrl: null, apiKey: apiKey || null };
  }
}
