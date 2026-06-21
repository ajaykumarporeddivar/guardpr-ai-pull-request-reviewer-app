import {
  teams,
  users,
  customRules,
  pullRequests,
} from '@/lib/data'; // Assuming these are defined and exported in src/lib/data.ts
import { ApiResponse, Team, DemoUser, CustomRule, PullRequest } from '@/lib/types';
import { NextRequest } from 'next/server';

type SearchableItem = Team | DemoUser | CustomRule | PullRequest;

export async function GET(request: NextRequest): Promise<Response> {
  console.log(JSON.stringify({ route: '/api/search', method: 'GET', ts: Date.now() }));
  try {
    const { searchParams } = request.nextUrl;
    const q = searchParams.get('q')?.toLowerCase() || '';
    const type = searchParams.get('type')?.toLowerCase(); // Optional filter for specific entity type

    let allSearchableItems: SearchableItem[] = [];

    if (!type || type === 'team' || type === 'teams') {
      allSearchableItems = allSearchableItems.concat(teams.map(t => ({ ...t, _type: 'team' as const })));
    }
    if (!type || type === 'user' || type === 'users') {
      allSearchableItems = allSearchableItems.concat(users.map(u => ({ ...u, _type: 'user' as const })));
    }
    if (!type || type === 'custom_rule' || type === 'custom_rules') {
      allSearchableItems = allSearchableItems.concat(customRules.map(cr => ({ ...cr, _type: 'custom_rule' as const })));
    }
    if (!type || type === 'pull_request' || type === 'pull_requests') {
      allSearchableItems = allSearchableItems.concat(pullRequests.map(pr => ({ ...pr, _type: 'pull_request' as const })));
    }

    let matchingItems: SearchableItem[] = [];

    if (!q) {
      // If query is empty, return the first 5 items from the combined list
      matchingItems = allSearchableItems.slice(0, 5);
    } else {
      matchingItems = allSearchableItems.filter(item => {
        if ('name' in item && item.name.toLowerCase().includes(q)) return true;
        if ('email' in item && item.email.toLowerCase().includes(q)) return true; // For users
        if ('title' in item && item.title.toLowerCase().includes(q)) return true; // For PRs, custom rules
        if ('description' in item && item.description?.toLowerCase().includes(q)) return true; // For custom rules
        return false;
      });
    }

    // Limit results to 20
    const results = matchingItems.slice(0, 20);

    return new Response(JSON.stringify({
      ok: true,
      data: {
        results: results,
        total: results.length,
        query: q,
      },
    } as ApiResponse<{ results: SearchableItem[]; total: number; query: string }>), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error(JSON.stringify({ route: '/api/search', error: String(e), ts: Date.now() }));
    return new Response(JSON.stringify({ ok: false, error: String(e) } as ApiResponse<null>), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}