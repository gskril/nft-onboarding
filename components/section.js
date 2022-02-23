import Container from './container'

export default function Section({
  textAlignment = 'left',
  textWidth = '40%',
  alternateBg = false,
  title,
  id,
  children,
  media,
  mediaPosition
}) {
  return (
    <div className="section" id={id} className={alternateBg ? 'alternate-bg' : ''}>
      <Container>
        <div className="section__content">
          <div className="section__text">
            <h2 className="section-title">{title}</h2>
            <p className="section-description">{children}</p>
          </div>
          <div className={mediaPosition === 'wallet' ? 'section__media section__media--absolute' : 'section__media'}>
            {media}
          </div>
        </div>
      </Container>

      <style jsx>{`
        .alternate-bg {
          background-color: black;
        }

        .section__content {
          display: flex;
          position: relative;
          overflow: hidden;
          padding-top: 6.25rem;
          padding-bottom: 6.25rem;
          flex-direction: ${textAlignment === 'left' ? 'row' : 'row-reverse' };
          gap: 5rem;
        }

        .section__text {
          width: ${textWidth};
        }

        .section__media {
          display: flex;
          flex-direction: column;
          ${mediaPosition === 'center' ? `
            align-items: center;
            justify-content: center;
            transform: translateY(-1rem);
          ` : ''}
          gap: 0.5rem;
          font-size: .875rem;
          margin-top: 4rem;
        }

        .section__media:not(.section__media--absolute) {
          width: calc(100% - ${textWidth});
        }

        .section__media--absolute {
          position: absolute;
          left: 0;
          bottom: 0;
        }
      `}
      </style>
    </div>
  )
}