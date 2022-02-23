export default function Button({eth, children}) {
  return (
    <>
      <button>
        {eth ? (
          <svg width="16" height="25" viewBox="0 0 16 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.04346 0V9.1743L15.7222 12.6392L8.04346 0Z" fill="white" fillOpacity="0.602"/>
            <path d="M8.04339 0L0.363647 12.6392L8.04339 9.1743V0Z" fill="white"/>
            <path d="M8.04346 18.5844V24.8182L15.7273 14.0831L8.04346 18.5844Z" fill="white" fillOpacity="0.602"/>
            <path d="M8.04339 24.8182V18.5834L0.363647 14.0831L8.04339 24.8182Z" fill="white"/>
            <path d="M8.04346 17.1416L15.7222 12.6392L8.04346 9.17639V17.1416Z" fill="white" fillOpacity="0.2"/>
            <path d="M0.363647 12.6392L8.04339 17.1416V9.17639L0.363647 12.6392Z" fill="white" fillOpacity="0.602"/>
          </svg>
        ) : ''}
        {children}
      </button>

      <style jsx>{`
        button {
          background: linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%);
          box-shadow: 0px 2px 12px 0px #0000000A;
          padding: 1rem 3rem;
          display: flex;
          gap: 0.5rem;
          font-size: 1.315rem;
          font-weight: 600;
          color: #fff;
          width: max-content;
          border: none;
          border-radius: .75rem;
          transition: transform .15s ease-in-out;
        }

        button:hover,
        button:focus-visible {
          outline: none;
          cursor: pointer;
          transform: scale(1.05);
        }
      `}</style>
    </>
  )
}