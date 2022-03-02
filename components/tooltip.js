export default function Tooltip({children}) {
  return (
    <>
      <span className="tooltip">?</span>

      <style jsx>{`
        .tooltip {
          display: none;
        }

        @media screen and (min-width: 60em) {
          .tooltip {
            position: absolute;
            right: 0;
            top: 50%;
            height: 2.125rem;
            width: 2.215rem;
            right: 0.425rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateY(-50%);
            background: var(--color-dark);
          }
        }

        .tooltip:hover,
        .tooltip:focus-visible {
          cursor: pointer;
        }

        .tooltip:hover::after {
          content: '${children}';
          position: absolute;
          background: var(--color-black);
          width: 12rem;
          font-size: 1rem;
          line-height: 1.4;
          border-radius: 0.5rem;
          z-index: 100;
          padding: 1rem;
          left: 3.5rem;
          color: var(--color-gray-100);
          cursor: default;
        }
      `}</style>
    </>
  )
}