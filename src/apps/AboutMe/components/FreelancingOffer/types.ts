export type FreelanceService = {
  title: string
  description: string
}

export type FreelancingOffer = {
  email: string
  dailyRate: string
  remoteOnly: boolean
  services: FreelanceService[]
}

export type FreelancingOfferProps = {
  offer: FreelancingOffer
}
