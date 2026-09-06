import { parse } from 'yaml'

import source from '/data/blog.yaml?raw'

import type { BlogFeed } from '@/apps/Blog/components/BlogReader/types'


export const blogFeeds: BlogFeed[] = parse(source)
