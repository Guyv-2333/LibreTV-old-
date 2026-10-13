import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  let cloudflareContextAvailable = false;
  let bindingPasswordPresent = false;

  try {
    const env = getCloudflareContext().env as unknown as Record<string, unknown>;
    cloudflareContextAvailable = true;
    bindingPasswordPresent =
      typeof env.PASSWORD === 'string' && env.PASSWORD.length > 0;
  } catch {
    // 无法取得 Cloudflare 运行时上下文
  }

  return NextResponse.json({
    cloudflareContextAvailable,
    bindingPasswordPresent,
    processPasswordPresent:
      typeof process.env.PASSWORD === 'string' &&
      process.env.PASSWORD.length > 0,
  });
}
