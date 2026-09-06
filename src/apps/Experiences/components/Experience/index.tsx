import { JobHeader, JobDates, JobDescription, JobMission } from './styled'
import type { ExperienceProps } from './types'


export default function Experience(props: ExperienceProps) {
  return (
    <article>
      <JobHeader>
        <JobDates>
          <div className="status-field-border">{props.startDate}</div>
          <div className="status-field-border">{props.endDate}</div>
        </JobDates>
        <JobDescription>
          <div className="status-field-border">{props.company}</div>
          <div className="status-field-border">{props.context}</div>
        </JobDescription>
      </JobHeader>

      {props.missions.map((mission, index) => (
        <JobMission key={index}>
          <p>{mission.description}</p>

          {mission.environment.length > 0 && (
            <p>
              <strong>Environment:</strong> {mission.environment.join(', ')}
            </p>
          )}
        </JobMission>
      ))}
    </article>
  )
}
