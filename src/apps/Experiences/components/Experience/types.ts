type Mission = {
  description: string
  environment: string[]
}

export type ExperienceProps = {
  startDate: string
  endDate: string
  company: string
  title: string
  context: string
  missions: Mission[]
}
