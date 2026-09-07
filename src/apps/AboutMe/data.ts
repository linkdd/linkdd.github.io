import { parse } from 'yaml'

import profileSource from '/data/profile.yaml?raw'
import freelancingSource from '/data/freelancing.yaml?raw'

import type { FreelancingOffer } from '@/apps/AboutMe/components/FreelancingOffer/types'

import type { Profile } from './types'


export const profile: Profile = parse(profileSource)

export const freelancing: FreelancingOffer = parse(freelancingSource)
