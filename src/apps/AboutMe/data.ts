import { parse } from 'yaml'

import profileSource from '/data/profile.yaml?raw'
import freelancingSource from '/data/freelancing.yaml?raw'

import type { FreelancingOffer } from '@/apps/AboutMe/components/FreelancingOffer/types'


export type Profile = {
  name: string
  website: string
  github: string
  linkedin: string
  medium: string
  devto: string
  linuxfr: string
  bio: string
}

export const profile: Profile = parse(profileSource)

export const freelancing: FreelancingOffer = parse(freelancingSource)
