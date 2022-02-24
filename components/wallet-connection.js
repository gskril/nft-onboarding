// Later use https://github.com/tmm/wagmi
import Image from 'next/image'

const avatarWidth = 38

export default function Wallet() {
  return (
    <div className="wallet">
      <div className="wallet__avatar">
        <Image 
          src="https://metadata.ens.domains/mainnet/avatar/nick.eth"
          alt="ENS Avatar"
          width={avatarWidth}
          height={avatarWidth}
        />
      </div>
      <span>0x000...0000</span>

      <style jsx>{`
        .wallet {
          position: absolute;
          color: var(--color-light);
          background: var(--color-dark);
          z-index: 1;
          padding: 0.325rem 1rem;
          border-radius: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          top: 2rem;
          left: 3rem;
          box-shadow: 0px 0px 26px -5px rgba(75, 78, 86, 0.25);
          transition: box-shadow 0.15s ease-in-out;
        }

        .wallet:hover,
        .wallet:focus-visible {
          box-shadow: 1px 1px 26px -5px rgba(97, 99, 107, 0.55);
        }

        .wallet__avatar {
          border-radius: 2rem;
          overflow: hidden;
          width: ${avatarWidth}px;
          height: ${avatarWidth}px;
        }
      `}</style>
    </div>
  )
}