import { isIP } from 'node:net';

export interface DigitalOceanConfig {
  baseUrl: string | null;
  apiKey: string | null;
}

/**
 * Resolve the conversion worker endpoint without sending its bearer key over
 * plaintext HTTP. Public worker endpoints must use HTTPS. HTTP is allowed
 * only for explicit loopback development endpoints.
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
    // IPv6 loopback without brackets is a valid shorthand input too.
    const rawIpv6Loopback = hostPart === '::1';
    const hostWithoutPort = rawIpv6Loopback ? hostPart : hostPart.replace(/:\d+$/, '');
    const isLoopback = rawIpv6Loopback ||
      hostWithoutPort === 'localhost' ||
      hostWithoutPort === '127.0.0.1' ||
      hostWithoutPort === '[::1]';

    if (isLoopback && !/:\d+$/.test(hostPart)) {
      const safeHost = rawIpv6Loopback ? '[::1]' : hostPart;
      normalizedUrl = `http://${safeHost}:3001${normalizedUrl.slice(hostPart.length)}`;
    } else if (isLoopback || /:\d+$/.test(hostPart)) {
      normalizedUrl = `http://${normalizedUrl}`;
    } else {
      // Bare public IPs and hostnames default to HTTPS, never plaintext HTTP.
      normalizedUrl = `https://${normalizedUrl}`;
    }
  }

  try {
    const url = new URL(normalizedUrl);
    const hostname = url.hostname.toLowerCase();
    const isLoopback = hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '[::1]' ||
      hostname === '::1' ||
      (isIP(hostname) === 4 && hostname.startsWith('127.'));

    if (!url.hostname || !['http:', 'https:'].includes(url.protocol)) {
      return { baseUrl: null, apiKey: apiKey || null };
    }

    // Reject credentials in URLs and reject public HTTP endpoints because the
    // client sends a bearer API key in the Authorization header.
    if (url.username || url.password || url.search || url.hash) {
      return { baseUrl: null, apiKey: apiKey || null };
    }
    if (url.protocol === 'http:' && !isLoopback) {
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
