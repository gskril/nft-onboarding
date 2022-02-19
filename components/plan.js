import Step from './plan-step'

export default function Plan() {
  return (
    <div className="plan">
      <Step 
        num="1"
        title="Learn about NFTs"
        section="#intro"
      />
      <Step 
        num="2"
        title="Create a wallet"
        section="#wallet"
      />
      <Step 
        num="3"
        title="Connect your wallet"
        section="#connect"
      />
      <Step 
        num="4"
        title="Buy your first NFT"
        section="#nft"
      />

      <style jsx>{`
        .plan {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
      `}
      </style>
    </div>
  )
}