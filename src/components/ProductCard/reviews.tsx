import { Review } from '@/payload-types'

export const ProductCardReviews = ({ reviews }: { reviews: [Review] }) => {
  return (
    <div>
      {(reviews || [])
        .sort((a, b) => {
          if (a.sourceAbbr < b.sourceAbbr) {
            return -1
          }
          if (a.sourceAbbr > b.sourceAbbr) {
            return 1
          }
          return 0
        })
        .map((review, index) => {
          return (
            <span key={index}>
              {index > 0 && ' '}[{review.sourceAbbr}|{review.score}]
            </span>
          )
        })}
    </div>
  )
}
