import Step from '../components/plan-step'
import Layout from '../components/layout'
import Gas from '../components/gas'

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Welcome to Web3</h1>
        <span>
          Learn how to buy an NFT by doing it step-by-step.
          <Gas />
        </span>
      </div>

      <div className="plan">
        <h2>Here's the plan</h2>
        <span className="section-subtitle">
          I understand this can all feel overwhelming, so we’re going to take it step by step.
        </span>
        <div className="steps">
          <Step 
            num="1"
            title="Learn about NFTs"
            href="#intro"
          />
          <Step 
            num="2"
            title="Create a wallet"
            href="#wallet"
          />
          <Step 
            num="3"
            title="Connect your wallet"
            href="#connect"
          />
          <Step 
            num="4"
            title="Buy your first NFT"
            href="#nft"
          />
        </div>
      </div>
    </Layout>
  )
}
