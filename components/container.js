export default function Container({children, className}) {
  return (
    <div className="container">
      {children}

      <style jsx>{`
        .container {
          margin: 0 auto;
          max-width: 70rem;
          padding-left: 2rem;
          padding-right: 2rem;
        }
      `}</style>
    </div>
  )
}