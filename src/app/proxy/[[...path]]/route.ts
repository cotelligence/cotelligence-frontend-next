import { NextRequest } from 'next/server';

// LOCAL DEV PROXY

export const GET = async (
  req: NextRequest,
  { params: { path } }: { params: { path: string[] } },
) => {
  const targetUrl = new URL(
    path.join('/') + req.nextUrl.search,
    'http://172.18.240.120:8080',
  );

  console.log(`[Redirect]${req.nextUrl} ==> ${targetUrl}`);

  const res = await fetch(targetUrl);

  return res;
};

export const POST = async (
  req: NextRequest,
  { params: { path } }: { params: { path: string[] } },
) => {
  const targetUrl = new URL(
    path.join('/') + req.nextUrl.search,
    'http://172.18.240.120:8080',
  );

  const data = await req.json();

  console.log(`[Redirect]${req.nextUrl} ==> ${targetUrl}`);

  console.log(data);

  const res = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res;
};

export const dynamic = 'force-dynamic';
