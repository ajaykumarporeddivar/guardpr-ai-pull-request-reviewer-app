import {
  teams,
  users,
  customRules,
  pullRequests,
  reviewComments,
  STATS,
} from '@/lib/data'; // Assuming these are defined and exported in src/lib/data.ts
import { ApiResponse } from '@/lib/types';
import { NextRequest } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(): Promise<Response> {
  console.log(JSON.stringify({ route: '/api/data', method: 'GET', ts: Date.now() }));
  try {
    const data = {
      teams,
      users,
      customRules,
      pullRequests,
      reviewComments,
      stats: STATS,
    };

    return new Response(JSON.stringify({
      ok: true,
      data: {
        ...data,
        totalTeams: teams.length,
        totalUsers: users.length,
        totalCustomRules: customRules.length,
        totalPullRequests: pullRequests.length,
        totalReviewComments: reviewComments.length,
      },
    } as ApiResponse<typeof data>), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    });
  } catch (e) {
    console.error(JSON.stringify({ route: '/api/data', error: String(e), ts: Date.now() }));
    return new Response(JSON.stringify({ ok: false, error: String(e) } as ApiResponse<null>), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    });
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  console.log(JSON.stringify({ route: '/api/data', method: 'POST', ts: Date.now() }));
  try {
    const body = await request.json();
    return new Response(JSON.stringify({
      ok: true,
      message: 'Demo mode — data not persisted',
      received: body,
    } as ApiResponse<any>), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    });
  } catch (e) {
    console.error(JSON.stringify({ route: '/api/data', error: String(e), ts: Date.now() }));
    return new Response(JSON.stringify({ ok: false, error: String(e) } as ApiResponse<null>), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    });
  }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}