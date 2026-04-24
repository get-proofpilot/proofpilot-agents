#!/usr/bin/env python3
import argparse
import json
import os
import subprocess
import sys
import time
from pathlib import Path

DIRECT_SECRETS_PATH = os.path.expanduser(
    os.environ.get('DATAFORSEO_SECRETS_PATH', '~/.proofpilot/secrets/dataforseo_direct.env')
)
API_BASE = 'https://api.dataforseo.com'
COMPOSIO_API = 'https://backend.composio.dev/api/v3/tools/execute'
COMPOSIO_KEY = os.environ.get('COMPOSIO_API_KEY') or os.environ.get('COMPOSIO_KEY', '')
COMPOSIO_ENTITY = os.environ.get('COMPOSIO_ENTITY_ID', '')

DIRECT_ONLY = {
    'ranked_keywords': '/v3/dataforseo_labs/google/ranked_keywords/live',
    'competitors_domain': '/v3/dataforseo_labs/google/competitors_domain/live',
    'relevant_pages': '/v3/dataforseo_labs/google/relevant_pages/live',
    'domain_rank_overview': '/v3/dataforseo_labs/google/domain_rank_overview/live',
    'domain_intersection': '/v3/dataforseo_labs/google/domain_intersection/live',
    'keywords_for_site': '/v3/dataforseo_labs/google/keywords_for_site/live',
}

DIRECT_AND_COMPOSIO = {
    'historical_traffic': '/v3/dataforseo_labs/google/historical_bulk_traffic_estimation/live',
    'keywords_for_keywords': '/v3/keywords_data/google_ads/keywords_for_keywords/live',
    'bulk_keyword_difficulty': '/v3/dataforseo_labs/google/bulk_keyword_difficulty/live',
    'top_searches': '/v3/dataforseo_labs/google/top_searches/live',
    'serp_live': '/v3/serp/google/organic/live/advanced',
    'onpage_summary_create': '/v3/on_page/task_post',
}

COMPOSIO_MAP = {
    'historical_traffic': {'slug': 'DATAFORSEO_GET_GOOGLE_HIST_BULK_TRAFFIC_EST_LIVE', 'mode': 'sync'},
    'keywords_for_keywords': {'slug': 'DATAFORSEO_GET_KW_GOOGLE_ADS_KW_FOR_KW_LIVE', 'mode': 'sync'},
    'bulk_keyword_difficulty': {'slug': 'DATAFORSEO_POST_DATAFORSEO_LABS_BULK_KEYWORD_DIFFICULTY_LIVE', 'mode': 'sync'},
    'top_searches': {'slug': 'DATAFORSEO_GET_DATAFORSEO_LABS_GOOGLE_TOP_SEARCHES_LIVE', 'mode': 'sync'},
    'serp_live': {
        'slug': 'DATAFORSEO_CREATE_SERP_GOOGLE_ORGANIC_TASK_POST',
        'mode': 'async',
        'get_slug': 'DATAFORSEO_GET_SERP_GOOGLE_ORGANIC_TASK_ADVANCED_BY_ID',
        'sleep': 8,
        'max_polls': 5,
        'poll_sleep': 8,
    },
    'onpage_summary': {
        'slug': 'DATAFORSEO_CREATE_ON_PAGE_TASK_POST',
        'mode': 'async',
        'get_slug': 'DATAFORSEO_GET_ON_PAGE_SUMMARY_BY_ID',
        'sleep': 15,
        'max_polls': 6,
        'poll_sleep': 15,
    },
}

ALL_ENDPOINTS = sorted(set(DIRECT_ONLY) | {k for k in DIRECT_AND_COMPOSIO if k != 'onpage_summary_create'} | {'onpage_summary'})


def maybe_retry_with_country_location(endpoint, args, task):
    if endpoint not in {'bulk_keyword_difficulty', 'top_searches'}:
        return False
    if args.location_code == 2840:
        return False
    status_message = task.get('status_message') or ''
    return task.get('status_code') == 40501 and "location_code" in status_message


def load_direct_creds():
    env_login = os.environ.get('DFS_LOGIN') or os.environ.get('DATAFORSEO_LOGIN')
    env_password = os.environ.get('DFS_PASSWORD') or os.environ.get('DATAFORSEO_PASSWORD')
    if env_login and env_password:
        return env_login, env_password
    if not os.path.exists(DIRECT_SECRETS_PATH):
        raise SystemExit(
            'Missing direct DataForSEO credentials. Set DFS_LOGIN/DFS_PASSWORD '
            f'or create secrets file: {DIRECT_SECRETS_PATH}'
        )
    vals = {}
    for line in Path(DIRECT_SECRETS_PATH).read_text().splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        k, v = line.split('=', 1)
        vals[k.strip()] = v.strip().strip('"').strip("'")
    login = vals.get('DFS_LOGIN') or vals.get('DATAFORSEO_LOGIN')
    password = vals.get('DFS_PASSWORD') or vals.get('DATAFORSEO_PASSWORD')
    if not login or not password:
        raise SystemExit('DFS_LOGIN / DFS_PASSWORD missing in direct secrets file')
    return login, password


def shell_json(cmd):
    out = subprocess.check_output(cmd, text=True)
    return json.loads(out)


def direct_call(path, payload, auth):
    data = shell_json([
        'curl', '-s', '-u', auth,
        '-H', 'Content-Type: application/json',
        '-d', json.dumps(payload),
        f'{API_BASE}{path}'
    ])
    return data


def direct_get(path, auth):
    data = shell_json(['curl', '-s', '-u', auth, f'{API_BASE}{path}'])
    return data


def composio_exec(slug, arguments):
    if not COMPOSIO_KEY or not COMPOSIO_ENTITY:
        raise SystemExit('COMPOSIO_API_KEY and COMPOSIO_ENTITY_ID are required for composio mode')
    payload = {'arguments': arguments, 'entity_id': COMPOSIO_ENTITY}
    data = shell_json([
        'curl', '-s', '-X', 'POST', f'{COMPOSIO_API}/{slug}',
        '-H', f'x-api-key: {COMPOSIO_KEY}',
        '-H', 'Content-Type: application/json',
        '-d', json.dumps(payload)
    ])
    return data


def task_ok(task_status):
    return task_status in {20000, 20100}


def build_direct_payload(endpoint, args):
    if endpoint == 'ranked_keywords':
        task = {
            'target': args.target,
            'location_code': args.location_code,
            'language_code': args.language_code,
            'limit': args.limit,
            'historical_serp_mode': args.historical_serp_mode,
            'order_by': [args.order_by or 'ranked_serp_element.serp_item.etv,desc'],
        }
        if args.filter_page_two:
            task['filters'] = [
                ['ranked_serp_element.serp_item.rank_group', '>=', 11],
                'and',
                ['ranked_serp_element.serp_item.rank_group', '<=', 20],
            ]
        if args.include_clickstream:
            task['include_clickstream_data'] = True
        return [task]

    if endpoint == 'competitors_domain':
        return [{
            'target': args.target,
            'location_code': args.location_code,
            'language_code': args.language_code,
            'limit': args.limit,
            'exclude_top_domains': args.exclude_top_domains,
            'max_rank_group': args.max_rank_group,
            'order_by': [args.order_by or 'metrics.organic.etv,desc'],
        }]

    if endpoint == 'relevant_pages':
        return [{
            'target': args.target,
            'location_code': args.location_code,
            'language_code': args.language_code,
            'limit': args.limit,
            'historical_serp_mode': args.historical_serp_mode,
            'order_by': [args.order_by or 'metrics.organic.etv,desc'],
        }]

    if endpoint == 'domain_rank_overview':
        return [{
            'target': args.target,
            'location_code': args.location_code,
            'language_code': args.language_code,
        }]

    if endpoint == 'domain_intersection':
        if not args.target2:
            raise SystemExit('--target2 is required for domain_intersection')
        return [{
            'target1': args.target,
            'target2': args.target2,
            'location_code': args.location_code,
            'language_code': args.language_code,
            'limit': args.limit,
            'intersections': not args.non_intersections,
            'order_by': [args.order_by or 'keyword_data.keyword_info.search_volume,desc'],
        }]

    if endpoint == 'keywords_for_site':
        return [{
            'target': args.target,
            'location_code': args.location_code,
            'language_code': args.language_code,
            'limit': args.limit,
            'order_by': [args.order_by or 'keyword_info.search_volume,desc'],
        }]

    if endpoint == 'historical_traffic':
        return [{
            'targets': [args.target],
            'location_code': args.location_code,
            'language_code': args.language_code,
        }]

    if endpoint == 'keywords_for_keywords':
        return [{
            'keywords': [args.keyword or args.target],
            'location_code': args.location_code,
            'language_code': args.language_code,
            'sort_by': args.sort_by or 'search_volume',
        }]

    if endpoint == 'top_searches':
        return [{
            'location_code': args.location_code,
            'language_code': args.language_code,
            'limit': args.limit,
            'order_by': [args.order_by or 'keyword_info.search_volume,desc'],
        }]

    if endpoint == 'bulk_keyword_difficulty':
        keywords = args.keywords.split(',') if args.keywords else [args.keyword or args.target]
        keywords = [k.strip() for k in keywords if k.strip()]
        return [{
            'keywords': keywords,
            'location_code': args.location_code,
            'language_code': args.language_code,
        }]

    if endpoint == 'serp_live':
        return [{
            'keyword': args.keyword or args.target,
            'location_code': args.location_code,
            'language_code': args.language_code,
            'depth': args.depth,
            'device': args.device,
        }]

    if endpoint == 'onpage_summary':
        return [{
            'target': args.target,
            'max_crawl_pages': args.max_crawl_pages,
        }]

    raise SystemExit(f'Unsupported direct endpoint: {endpoint}')


def build_composio_args(endpoint, args):
    if endpoint == 'historical_traffic':
        return {'targets': [args.target], 'location_code': args.location_code, 'language_code': args.language_code}
    if endpoint == 'keywords_for_keywords':
        return {'keywords': [args.keyword or args.target], 'location_code': args.location_code, 'language_code': args.language_code, 'sort_by': args.sort_by or 'search_volume'}
    if endpoint == 'top_searches':
        return {'location_code': args.location_code, 'language_code': args.language_code, 'limit': args.limit, 'order_by': [args.order_by or 'keyword_info.search_volume,desc']}
    if endpoint == 'bulk_keyword_difficulty':
        keywords = args.keywords.split(',') if args.keywords else [args.keyword or args.target]
        keywords = [k.strip() for k in keywords if k.strip()]
        return {'keywords': keywords, 'location_code': args.location_code, 'language_code': args.language_code}
    if endpoint == 'serp_live':
        return {'tasks': [{'keyword': args.keyword or args.target, 'location_code': args.location_code, 'language_code': args.language_code, 'depth': args.depth}]}
    if endpoint == 'onpage_summary':
        return {'target': args.target, 'max_crawl_pages': args.max_crawl_pages}
    raise SystemExit(f'Unsupported composio endpoint: {endpoint}')


def direct_execute(endpoint, args, auth):
    attempts = []
    if endpoint == 'onpage_summary':
        create_payload = build_direct_payload(endpoint, args)
        create = direct_call(DIRECT_AND_COMPOSIO['onpage_summary_create'], create_payload, auth)
        create_task = (create.get('tasks') or [{}])[0]
        attempts.append({'step': 'create', 'provider': 'direct', 'status_code': create_task.get('status_code'), 'status_message': create_task.get('status_message')})
        task_id = create_task.get('id')
        if not task_ok(create_task.get('status_code')) or not task_id:
            return {'ok': False, 'attempts': attempts, 'response': create}
        last = None
        for _ in range(args.max_polls):
            time.sleep(args.poll_sleep)
            last = direct_get(f'/v3/on_page/summary/{task_id}', auth)
            task = (last.get('tasks') or [{}])[0]
            result = (task.get('result') or [{}])
            first = result[0] if isinstance(result, list) and result else {}
            crawl_progress = first.get('crawl_progress') if isinstance(first, dict) else None
            attempts.append({'step': 'summary', 'provider': 'direct', 'status_code': task.get('status_code'), 'status_message': task.get('status_message'), 'crawl_progress': crawl_progress})
            if task.get('status_code') == 20000 and crawl_progress == 'finished':
                return {'ok': True, 'attempts': attempts, 'response': last}
        return {'ok': True, 'attempts': attempts, 'response': last or create, 'partial': True}

    payload = build_direct_payload(endpoint, args)
    path = DIRECT_ONLY.get(endpoint) or DIRECT_AND_COMPOSIO.get(endpoint)
    resp = direct_call(path, payload, auth)
    task = (resp.get('tasks') or [{}])[0]
    attempts.append({'provider': 'direct', 'status_code': task.get('status_code'), 'status_message': task.get('status_message')})
    if maybe_retry_with_country_location(endpoint, args, task):
        original_location = args.location_code
        args.location_code = 2840
        retry_payload = build_direct_payload(endpoint, args)
        retry_resp = direct_call(path, retry_payload, auth)
        retry_task = (retry_resp.get('tasks') or [{}])[0]
        attempts.append({'provider': 'direct', 'status_code': retry_task.get('status_code'), 'status_message': retry_task.get('status_message'), 'note': f'auto-fallback from unsupported location_code {original_location} to 2840'})
        args.location_code = original_location
        return {'ok': task_ok(retry_task.get('status_code')), 'attempts': attempts, 'response': retry_resp}
    return {'ok': task_ok(task.get('status_code')), 'attempts': attempts, 'response': resp}


def composio_execute(endpoint, args):
    meta = COMPOSIO_MAP[endpoint]
    attempts = []
    create = composio_exec(meta['slug'], build_composio_args(endpoint, args))
    create_task = ((create.get('data') or {}).get('tasks') or [{}])[0]
    attempts.append({'step': 'create', 'provider': 'composio', 'status_code': create_task.get('status_code'), 'status_message': create_task.get('status_message')})
    if meta['mode'] == 'sync':
        if maybe_retry_with_country_location(endpoint, args, create_task):
            original_location = args.location_code
            args.location_code = 2840
            retry = composio_exec(meta['slug'], build_composio_args(endpoint, args))
            retry_task = ((retry.get('data') or {}).get('tasks') or [{}])[0]
            attempts.append({'step': 'create', 'provider': 'composio', 'status_code': retry_task.get('status_code'), 'status_message': retry_task.get('status_message'), 'note': f'auto-fallback from unsupported location_code {original_location} to 2840'})
            args.location_code = original_location
            return {'ok': task_ok(retry_task.get('status_code')), 'attempts': attempts, 'response': retry}
        return {'ok': task_ok(create_task.get('status_code')), 'attempts': attempts, 'response': create}

    task_id = create_task.get('id')
    if not task_ok(create_task.get('status_code')) or not task_id:
        return {'ok': False, 'attempts': attempts, 'response': create}

    last = None
    for _ in range(meta.get('max_polls', 5)):
        time.sleep(meta.get('poll_sleep', meta.get('sleep', 8)))
        get = composio_exec(meta['get_slug'], {'id': task_id})
        last = get
        task = ((get.get('data') or {}).get('tasks') or [{}])[0]
        result = task.get('result') or []
        crawl_progress = None
        if endpoint == 'onpage_summary' and isinstance(result, list) and result:
            crawl_progress = (result[0] or {}).get('crawl_progress')
        attempts.append({'step': 'get', 'provider': 'composio', 'status_code': task.get('status_code'), 'status_message': task.get('status_message'), 'crawl_progress': crawl_progress})
        if endpoint == 'serp_live' and task.get('status_code') == 20000:
            return {'ok': True, 'attempts': attempts, 'response': get}
        if endpoint == 'onpage_summary' and task.get('status_code') == 20000 and crawl_progress == 'finished':
            return {'ok': True, 'attempts': attempts, 'response': get}
    if endpoint == 'onpage_summary' and last is not None:
        return {'ok': True, 'attempts': attempts, 'response': last, 'partial': True}
    return {'ok': False, 'attempts': attempts, 'response': last or create}


def extract_response_data(endpoint, provider, resp):
    if provider == 'composio':
        root = resp.get('data') or {}
        task = (root.get('tasks') or [{}])[0]
    else:
        root = resp
        task = (root.get('tasks') or [{}])[0]
    result = task.get('result') or []
    first_result = result[0] if isinstance(result, list) and result else {}
    items = first_result.get('items') if isinstance(first_result, dict) else None

    out = {
        'provider_used': provider,
        'task_status_code': task.get('status_code'),
        'task_status_message': task.get('status_message'),
        'cost': task.get('cost'),
        'result_count': task.get('result_count'),
    }
    if isinstance(first_result, dict):
        out['result_keys'] = list(first_result.keys())[:12]
    if isinstance(items, list):
        out['items_count'] = len(items)
    if endpoint == 'ranked_keywords' and isinstance(items, list) and items:
        sample = items[0]
        out['sample'] = {
            'keyword': sample['keyword_data']['keyword'],
            'search_volume': sample['keyword_data']['keyword_info']['search_volume'],
            'cpc': sample['keyword_data']['keyword_info']['cpc'],
            'rank_group': sample['ranked_serp_element']['serp_item']['rank_group'],
            'url': sample['ranked_serp_element']['serp_item']['url'],
            'etv': sample['ranked_serp_element']['serp_item']['etv'],
        }
    elif endpoint == 'competitors_domain' and isinstance(items, list) and items:
        target_domain = None
        if isinstance(first_result, dict):
            target_domain = first_result.get('target')
        sample = next((it for it in items if it.get('domain') != target_domain), items[0])
        out['sample'] = {
            'domain': sample.get('domain'),
            'intersections': sample.get('intersections'),
            'avg_position': sample.get('avg_position'),
            'organic_count': (((sample.get('full_domain_metrics') or {}).get('organic') or {}).get('count')),
            'organic_etv': (((sample.get('full_domain_metrics') or {}).get('organic') or {}).get('etv')),
        }
    elif endpoint == 'relevant_pages' and isinstance(items, list) and items:
        sample = items[0]
        out['sample'] = {
            'page_address': sample.get('page_address'),
            'organic_count': (((sample.get('metrics') or {}).get('organic') or {}).get('count')),
            'organic_etv': (((sample.get('metrics') or {}).get('organic') or {}).get('etv')),
            'pos_11_20': (((sample.get('metrics') or {}).get('organic') or {}).get('pos_11_20')),
        }
    elif endpoint == 'domain_rank_overview' and isinstance(items, list) and items:
        sample = items[0]
        out['sample'] = {
            'organic_count': (((sample.get('metrics') or {}).get('organic') or {}).get('count')),
            'organic_etv': (((sample.get('metrics') or {}).get('organic') or {}).get('etv')),
            'estimated_paid_traffic_cost': (((sample.get('metrics') or {}).get('organic') or {}).get('estimated_paid_traffic_cost')),
            'pos_1': (((sample.get('metrics') or {}).get('organic') or {}).get('pos_1')),
            'pos_11_20': (((sample.get('metrics') or {}).get('organic') or {}).get('pos_11_20')),
        }
    elif endpoint == 'domain_intersection' and isinstance(items, list) and items:
        sample = items[0]
        out['sample'] = {
            'keyword': sample['keyword_data']['keyword'],
            'search_volume': sample['keyword_data']['keyword_info']['search_volume'],
            'first_domain_rank': (((sample.get('first_domain_serp_element') or {}).get('serp_item') or {}).get('rank_group')),
            'second_domain_rank': (((sample.get('second_domain_serp_element') or {}).get('serp_item') or {}).get('rank_group')),
        }
    elif endpoint == 'keywords_for_site' and isinstance(items, list) and items:
        sample = items[0]
        out['sample'] = {
            'keyword': sample.get('keyword'),
            'search_volume': ((sample.get('keyword_info') or {}).get('search_volume')),
            'cpc': ((sample.get('keyword_info') or {}).get('cpc')),
            'relevance': sample.get('relevance'),
        }
    elif endpoint == 'historical_traffic' and isinstance(items, list) and items:
        sample = items[0]
        organic = ((sample.get('metrics') or {}).get('organic') or [])
        out['sample'] = {
            'target': sample.get('target'),
            'months_returned': len(organic),
            'latest_month': organic[0] if organic else None,
        }
    elif endpoint == 'keywords_for_keywords':
        if provider == 'composio':
            # composio returns results directly in result[]
            sample_source = result[0] if isinstance(result, list) and result else {}
        else:
            sample_source = first_result if isinstance(first_result, dict) else {}
        if sample_source:
            out['sample'] = {k: sample_source.get(k) for k in ['keyword', 'search_volume', 'cpc', 'competition', 'competition_index']}
            out['items_count'] = len(result) if provider == 'composio' else len(result)
    elif endpoint == 'top_searches':
        if provider == 'composio':
            items2 = first_result.get('items') if isinstance(first_result, dict) else None
        else:
            items2 = first_result.get('items') if isinstance(first_result, dict) else None
        if isinstance(items2, list):
            out['items_count'] = len(items2)
            if items2:
                sample = items2[0]
                out['sample'] = {
                    'keyword': sample.get('keyword'),
                    'search_volume': ((sample.get('keyword_info') or {}).get('search_volume')),
                    'cpc': ((sample.get('keyword_info') or {}).get('cpc')),
                    'competition': ((sample.get('keyword_info') or {}).get('competition')),
                }
    elif endpoint == 'bulk_keyword_difficulty':
        if provider == 'composio':
            sample_result = result[0] if isinstance(result, list) and result else {}
            items2 = sample_result.get('items') if isinstance(sample_result, dict) else None
        else:
            items2 = first_result.get('items') if isinstance(first_result, dict) else None
        if isinstance(items2, list):
            out['items_count'] = len(items2)
            if items2:
                out['sample'] = items2[0]
    elif endpoint == 'serp_live':
        items2 = None
        if provider == 'direct' and isinstance(first_result, dict):
            items2 = first_result.get('items')
        elif provider == 'composio' and isinstance(first_result, dict):
            items2 = first_result.get('items')
        if isinstance(items2, list):
            out['items_count'] = len(items2)
            if items2:
                out['sample'] = {k: items2[0].get(k) for k in ['type', 'rank_group', 'rank_absolute', 'domain', 'title', 'url']}
    elif endpoint == 'onpage_summary' and isinstance(first_result, dict):
        pm = first_result.get('page_metrics') or {}
        out['sample'] = {
            'crawl_progress': first_result.get('crawl_progress'),
            'pages_crawled': (first_result.get('crawl_status') or {}).get('pages_crawled'),
            'onpage_score': pm.get('onpage_score'),
            'broken_links': pm.get('broken_links'),
            'duplicate_title': pm.get('duplicate_title'),
        }
    return out


def route_endpoint(endpoint, args):
    auth = None
    if args.provider in {'auto', 'direct'}:
        login, password = load_direct_creds()
        auth = f'{login}:{password}'

    attempts = []

    direct_supported = endpoint in DIRECT_ONLY or endpoint in DIRECT_AND_COMPOSIO or endpoint == 'onpage_summary'
    composio_supported = endpoint in COMPOSIO_MAP

    if args.provider in {'auto', 'direct'} and direct_supported:
        direct_result = direct_execute(endpoint, args, auth)
        attempts.extend(direct_result['attempts'])
        if direct_result['ok'] or args.provider == 'direct' or not composio_supported:
            return {
                'route': 'direct',
                'attempts': attempts,
                'response': direct_result['response'],
                'summary': extract_response_data(endpoint, 'direct', direct_result['response']),
                'partial': direct_result.get('partial', False),
            }

    if args.provider in {'auto', 'composio'} and composio_supported:
        composio_result = composio_execute(endpoint, args)
        attempts.extend(composio_result['attempts'])
        if composio_result['ok'] or args.provider == 'composio':
            return {
                'route': 'composio',
                'attempts': attempts,
                'response': composio_result['response'],
                'summary': extract_response_data(endpoint, 'composio', composio_result['response']),
                'partial': composio_result.get('partial', False),
            }

    return {'route': None, 'attempts': attempts, 'response': None, 'summary': None, 'error': 'No successful route'}


def main():
    p = argparse.ArgumentParser(description='Route DataForSEO calls with direct-primary, Composio-backup behavior')
    p.add_argument('endpoint', choices=ALL_ENDPOINTS)
    p.add_argument('--provider', choices=['auto', 'direct', 'composio'], default='auto')
    p.add_argument('--target', required=True, help='Domain, URL, or fallback keyword depending on endpoint')
    p.add_argument('--target2', help='Second domain for domain_intersection')
    p.add_argument('--keyword', help='Keyword for keyword- or SERP-based endpoints')
    p.add_argument('--keywords', help='Comma-separated keywords for bulk difficulty')
    p.add_argument('--location-code', type=int, default=2840)
    p.add_argument('--language-code', default='en')
    p.add_argument('--limit', type=int, default=10)
    p.add_argument('--order-by')
    p.add_argument('--sort-by')
    p.add_argument('--historical-serp-mode', choices=['live', 'lost', 'all'], default='live')
    p.add_argument('--max-rank-group', type=int, default=20)
    p.add_argument('--depth', type=int, default=10)
    p.add_argument('--device', choices=['desktop', 'mobile'], default='desktop')
    p.add_argument('--max-crawl-pages', type=int, default=10)
    p.add_argument('--poll-sleep', type=int, default=10)
    p.add_argument('--max-polls', type=int, default=6)
    p.add_argument('--include-clickstream', action='store_true')
    p.add_argument('--filter-page-two', action='store_true')
    p.add_argument('--exclude-top-domains', action='store_true', default=True)
    p.add_argument('--non-intersections', action='store_true', help='For domain_intersection, return keywords target1 ranks for and target2 does not')
    p.add_argument('--raw', action='store_true')
    args = p.parse_args()

    result = route_endpoint(args.endpoint, args)
    if args.raw:
        print(json.dumps(result, indent=2))
    else:
        print(json.dumps({
            'endpoint': args.endpoint,
            'provider_requested': args.provider,
            'provider_used': result.get('route'),
            'attempts': result.get('attempts'),
            'partial': result.get('partial', False),
            'summary': result.get('summary'),
            'error': result.get('error'),
        }, indent=2))


if __name__ == '__main__':
    main()
