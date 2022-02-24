import Container from './container'

export default function Section({
  id,
  children,
  alternateBg = false,
  paddingBottom = true,
}) {
  return (
    <div className={alternateBg ? 'alternate-bg' : ''} id={id} >
      <Container>
        <div className="section__content">
          {children}
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
          padding-top: 4.25rem;
          padding-bottom: ${paddingBottom ? '4.25rem' : '0'};
          flex-direction: row;
          gap: 5rem;
        }

        @media screen and (min-width: 60em) {
          .section__content {
            padding-top: 6.25rem;
            padding-bottom: ${paddingBottom ? '6.25rem' : '0'};
          }
        }
      `}
      </style>
    </div>
  )
}