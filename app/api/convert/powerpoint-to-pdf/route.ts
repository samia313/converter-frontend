import { POST as convertPowerPointToPdf } from '../ppt-to-pdf/route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90;

// Keep the legacy endpoint compatible while routing through the same validated converter.
export async function POST(request: Request) {
  return convertPowerPointToPdf(request);
}
