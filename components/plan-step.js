import Link from 'next/link'

export default function Step({ num, title, section }) {
	return (
    <>
      <Link href={section}>
        <a className="step">
          <h3 className="step__name">{title}</h3>
        </a>
      </Link>

      <style jsx>{`
        .step {
          display: flex;
          align-items: center;
          background: var(--color-highlight);
          padding: 1.5rem 1rem;
          border-radius: 0.5rem;
          box-shadow: 1px 4px 16px -9px rgba(0, 0, 0, 0.25);
          position: relative;
          overflow: hidden;
          transition: transform 0.15s ease-in-out;
          text-decoration: none;
        }

        .step::after {
          content: '${num}';
          color: var(--color-dark);
          opacity: 0.3;
          font-weight: 600;
          position: absolute;
          font-size: 11rem;
          top: 52%;
          right: 0.5rem;
          transform: translateY(-52%);
        }

        .step:hover,
        .step:focus-visible {
          transform: scale(1.05);
          outline: none;
        }

        .step__name {
          width: 8rem;
        }

        @media screen and (min-width: 60em) {
          .step::after {
            opacity: 0.6;
          }
        }
      `}</style>
    </>
	)
}
