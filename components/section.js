export default function Section({
  textAlignment = 'left',
  title,
  description,
  media
}) {
  return (
    <div className="section">
      <div className="container">
        <div className="section__content">
          <div className="section__text">
            <h2 className="section-title">{title}</h2>
            <p className="section-description">{description}</p>
          </div>
          <div className="section__media">
            {media}
          </div>
        </div>
      </div>

      <style jsx>{`
        .section__content {
          display: flex;
          padding-top: 6.25rem;
          padding-bottom: 6.25rem;
          flex-direction: ${textAlignment === 'left' ? 'row' : 'row-reverse' };
          gap: 5rem;
        }

        .section__text {
          width: 40%;
        }

        .section__media {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: .875rem;
          margin-top: 4rem;
        }
      `}</style>
    </div>
  )
}