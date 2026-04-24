#!/usr/bin/env python3
import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

SECRETS_PATH = os.path.expanduser(
    os.environ.get('DATAFORSEO_SECRETS_PATH', '~/.proofpilot/secrets/dataforseo_direct.env')
)
API_BASE = 'https://api.dataforseo.com'

ENDPOINTS = {
    'ranked_keywords': '/v3/dataforseo_labs/google/ranked_keywords/live',
    'competitors_domain': '/v3/dataforseo_labs/google/competitors_domain/live',
    'relevant_pages': '/v3/dataforseo_labs/google/relevant_pages/live',
    'domain_rank_overview': '/v3/dataforseo_labs/google/domain_rank_overview/live',
    'domain_intersection': '/v3/dataforseo_labs/google/domain_intersection/live',
    'referring_domains': '/v3/backlinks/referring_domains/live',
    'anchors': '/v3/backlinks/anchors/live',
    'domain_pages_summary': '/v3/backlinks/domain_pages_summary/live',
    'llm_top_domains': '/v3/ai_optimization/llm_mentions/top_domains/live',
}


def load_creds():
    env_login = os.environ.get('DFS_LOGIN') or os.environ.get('DATAFORSEO_LOGIN')
    env_password = os.environ.get('DFS_PASSWORD') or os.environ.get('DATAFORSEO_PASSWORD')
    if env_login and env_password:
        return env_login, env_password
    if not os.path.exists(SECRETS_PATH):
        raise SystemExit(
            'Missing DataForSEO credentials. Set DFS_LOGIN/DFS_PASSWORD '
            f'or create secrets file: {SECRETS_PATH}'
        )
    vals = {}
    for line in Path(SECRETS_PATH).read_text().splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        k, v = line.split('=', 1)
        vals[k.strip()] = v.strip().strip('"').strip("'")
    login = vals.get('DFS_LOGIN') or vals.get('DATAFORSEO_LOGIN')
    password = vals.get('DFS_PASSWORD') or vals.get('DATAFORSEO_PASSWORD')
    if not login or not password:
        raise SystemExit('DFS_LOGIN / DFS_PASSWORD missing in secrets file')
    return login, password


def build_payload(args):
    if args.endpoint == 'ranked_keywords':
        payload = {
            'target': args.target,
            'location_code': args.location_code,
            'language_code': args.language_code,
            'limit': args.limit,
            'historical_serp_mode': args.historical_serp_mode,
            'order_by': [args.order_by or 'ranked_serp_element.serp_item.etv,desc'],
        }
        if args.filter_page_two:
            payload['filters'] = [["ranked_serp_element.serp_item.rank_group", ">=", 11], "and", ["ranked_serp_element.serp_item.rank_group", "<=", 20]]
        if args.include_clickstream:
            payload['include_clickstream_data'] = True
        return [payload]

    if args.endpoint == 'competitors_domain':
        payload = {
            'target': args.target,
            'location_code': args.location_code,
            'language_code': args.language_code,
            'limit': args.limit,
            'exclude_top_domains': args.exclude_top_domains,
            'max_rank_group': args.max_rank_group,
            'order_by': [args.order_by or 'metrics.organic.etv,desc'],
        }
        return [payload]

    if args.endpoint == 'relevant_pages':
        payload = {
            'target': args.target,
            'location_code': args.location_code,
            'language_code': args.language_code,
            'limit': args.limit,
            'historical_serp_mode': args.historical_serp_mode,
            'order_by': [args.order_by or 'metrics.organic.etv,desc'],
        }
        return [payload]

    if args.endpoint == 'domain_rank_overview':
        return [{
            'target': args.target,
            'location_code': args.location_code,
            'language_code': args.language_code,
        }]

    if args.endpoint == 'domain_intersection':
        if not args.target2:
            raise SystemExit('--target2 is required for domain_intersection')
        return [{
            'target1': args.target,
            'target2': args.target2,
            'location_code': args.location_code,
            'language_code': args.language_code,
            'limit': args.limit,
            'intersections': args.intersections,
            'order_by': [args.order_by or 'keyword_data.keyword_info.search_volume,desc'],
        }]

    if args.endpoint in {'referring_domains', 'anchors', 'domain_pages_summary'}:
        return [{
            'target': args.target,
            'limit': args.limit,
            'order_by': [args.order_by or ('referring_pages,desc' if args.endpoint == 'referring_domains' else 'backlinks,desc')],
        }]

    if args.endpoint == 'llm_top_domains':
        target_item = {'keyword': args.keyword or args.target, 'match_type': 'exact_match', 'search_scope': ['question']}
        if args.use_domain_target:
            target_item = {'domain': args.target, 'search_filter': 'include', 'search_scope': ['sources']}
        return [{
            'target': [target_item],
            'platform': args.platform,
            'location_code': args.location_code,
            'language_code': args.language_code,
            'items_list_limit': args.limit,
            'links_scope': 'sources',
        }]

    raise SystemExit(f'Unsupported endpoint: {args.endpoint}')


def call_api(endpoint, payload, login, password):
    body = json.dumps(payload)
    cmd = [
        'curl', '-s', '-u', f'{login}:{password}',
        '-H', 'Content-Type: application/json',
        '-d', body,
        f'{API_BASE}{ENDPOINTS[endpoint]}'
    ]
    out = subprocess.check_output(cmd, text=True)
    return json.loads(out)


def summarize(resp):
    task = (resp.get('tasks') or [{}])[0]
    result = (task.get('result') or [])
    out = {
        'status_code': task.get('status_code'),
        'status_message': task.get('status_message'),
        'cost': task.get('cost'),
        'result_count': task.get('result_count'),
    }
    if result and isinstance(result[0], dict):
        first = result[0]
        if isinstance(first.get('items'), list):
            out['items_count'] = len(first['items'])
            if first['items']:
                sample = first['items'][0]
                out['sample'] = {k: sample.get(k) for k in list(sample.keys())[:12]}
        else:
            out['sample'] = {k: first.get(k) for k in list(first.keys())[:12]}
    return out


def main():
    p = argparse.ArgumentParser(description='Direct DataForSEO caller for AuditPilot / StrategyPilot')
    p.add_argument('endpoint', choices=sorted(ENDPOINTS.keys()))
    p.add_argument('--target', required=True, help='Domain or target, usually without https:// or www.')
    p.add_argument('--target2', help='Second domain for domain_intersection')
    p.add_argument('--keyword', help='Keyword seed for llm_top_domains')
    p.add_argument('--location-code', type=int, default=2840)
    p.add_argument('--language-code', default='en')
    p.add_argument('--limit', type=int, default=10)
    p.add_argument('--order-by')
    p.add_argument('--historical-serp-mode', default='live', choices=['live', 'lost', 'all'])
    p.add_argument('--max-rank-group', type=int, default=20)
    p.add_argument('--platform', default='google', choices=['google', 'chat_gpt'])
    p.add_argument('--intersections', action='store_true', default=True)
    p.add_argument('--no-intersections', dest='intersections', action='store_false')
    p.add_argument('--exclude-top-domains', action='store_true', default=True)
    p.add_argument('--include-clickstream', action='store_true')
    p.add_argument('--filter-page-two', action='store_true')
    p.add_argument('--use-domain-target', action='store_true', help='For llm_top_domains, send a domain target instead of keyword target')
    p.add_argument('--raw', action='store_true', help='Print full JSON instead of summary')
    args = p.parse_args()

    login, password = load_creds()
    payload = build_payload(args)
    resp = call_api(args.endpoint, payload, login, password)
    if args.raw:
        print(json.dumps(resp, indent=2))
    else:
        print(json.dumps({'endpoint': args.endpoint, 'payload': payload, 'summary': summarize(resp)}, indent=2))


if __name__ == '__main__':
    main()
