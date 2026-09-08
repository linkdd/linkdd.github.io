import Markdown from 'react-markdown'

import { JobHeader, JobDates, JobDescription, JobAbstract, JobMission } from './styled'
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

      {props.abstract ? (
        <JobAbstract className="field-border">
          <Markdown>{props.abstract}</Markdown>
        </JobAbstract>
      ) : (
        <></>
      )}

      {props.missions.map((mission, index) => (
        <JobMission key={index}>
          <Markdown components={{ p: ({ children }) => <>{children}</> }}>
            {mission.description}
          </Markdown>

          {mission.environment.length > 0 && (
            <>
              <br/>
              <strong>Environment:</strong> {mission.environment.join(', ')}
            </>
          )}
        </JobMission>
      ))}
    </article>
  )
}
