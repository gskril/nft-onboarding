import Credit from './credit'
import Container from './container'

export default function Hero() {
  return (
    <>
      <Credit />
      <div className="hero">
        <div className="hero__gradient"></div>
        <Container>
          <h1 className="hero__title">Welcome to Web3</h1>
          <span className="hero__subtitle">
            Learn how to buy an NFT by doing it step-by-step.
          </span>
        </Container>
      </div>

      <style jsx>{`
        .hero {
          padding-top: 6rem;
          padding-bottom: 5rem;
          text-align: center;
        }
        .hero__gradient {
          width: 100%;
          min-height: 37.5rem;
          background-image: url('./background-gradient.png');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: top center;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
        .hero__title {
          margin-bottom: 2rem;
        }
        .hero__subtitle {
          font-size: 1.25rem;
          color: var(--color-gray-100);
        }

        @media screen and (min-width: 60em) {
          .hero {
            padding-top: 7.5rem;
            padding-bottom: 7.5rem;
          }
        }
      `}</style>
    </>
  )
}