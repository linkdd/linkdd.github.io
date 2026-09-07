import { parse } from 'yaml'

import meetingSource from '/data/meeting.yaml?raw'

import type { Meeting } from '@/apps/Meeting/types'


const data: Meeting = parse(meetingSource)
export default data
