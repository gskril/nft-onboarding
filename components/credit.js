export default function Credit() {
  return (
    <>
      <a className="credit" href="https://twitter.com/gregskril" target="_blank" rel="noreferrer">
          @gregskril
      </a>

      <style jsx>{`
        .credit {
          display: block;
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: var(--color-light);
          background: var(--color-dark);
          padding: 0.325rem 2rem;
          border-radius: 2rem;
          z-index: 2;
          box-shadow: 0px 0px 26px -5px rgba(75, 78, 86, 0.25);
          transition: box-shadow 0.15s ease-in-out;
          text-decoration: none;
        }

        .credit:hover,
        .credit:focus-visible {
          box-shadow: 1px 1px 26px -5px rgba(97, 99, 107, 0.55);
          outline: none;
        }

        @media screen and (min-width: 60em) {
          .credit {
            top: 2rem;
            right: 3rem;
          }
        }
      `}</style>
    </>
  )
}