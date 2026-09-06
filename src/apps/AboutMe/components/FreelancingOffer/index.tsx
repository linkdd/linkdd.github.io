import GroupBox from '@/components/base/GroupBox'

import { Offer, OfferHeader, ConditionLabels, ConditionValues } from './styled'
import type { FreelancingOfferProps } from './types'


export default function FreelancingOffer({ offer }: FreelancingOfferProps) {
  return (
    <Offer>
      <GroupBox legend="Conditions">
        <OfferHeader>
          <ConditionLabels>
            <div className="status-field-border">Location</div>
            <div className="status-field-border">Daily Rate</div>
          </ConditionLabels>

          <ConditionValues>
            <div className="field-border">
              {offer.remoteOnly ? 'Full Remote' : 'Flexible'}
            </div>
            <div className="field-border">{offer.dailyRate}</div>
          </ConditionValues>
        </OfferHeader>
      </GroupBox>

      <GroupBox legend="Services">
        <ul>
          {offer.services.map(service => (
            <li key={service.title}>
              <strong>{service.title}</strong>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      </GroupBox>

      <GroupBox legend="Contact">
        <p>
          Interested? Send me an email at{' '}
          <a href={`mailto:${offer.email}`}>{offer.email}</a>
        </p>
      </GroupBox>
    </Offer>
  )
}
