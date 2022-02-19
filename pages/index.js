import Image from 'next/image'

import Plan from '../components/plan'
import Layout from '../components/layout'
import Credit from '../components/credit'
import Gas from '../components/gas'
import Section from '../components/section'

export default function Home() {
  return (
		<Layout>
			<Credit />
			<div className="hero">
				<div className="hero__gradient"></div>
				<div className="container">
					<h1 className="hero__title">Welcome to Web3</h1>
					<span className="hero__subtitle">
						Learn how to buy an NFT by doing it step-by-step.
					</span>
				</div>
			</div>

			<div className="container plan">
				<div className="plan__text">
					<h2>Here&apos;s the plan</h2>
					<span className="section-subtitle">
						I understand this can all feel overwhelming, so we&apos;re
						going to take it step by step.
					</span>
				</div>
				<div className="steps">
					<Plan />
				</div>
			</div>

			<Section
				title="What is an NFT?"
				description={
					<>
						<p>
							Non-fungible token&apos;s are digital assets that are
							proven to be unique. The source of this truth is a
							network of computers around the world that approve
							each other&apos;s actions called the blockchain.
						</p>
						<p>
							NFTs can have different usecases, many of which are
							in the early phases of development and adoption.
							Today, the most common use case of NFTs is in
							digital art.
						</p>
					</>
				}
				media={
					<>
						<Image
							src="/verified.png"
              width={531}
              height={192}
							alt="Verified JPEG by Jack Butcher"
						/>
						<span>
							Credit:{' '}
							<a href="https://www.figma.com/exit?url=https%3A%2F%2Ftwitter.com%2Fvisualizevalue%2Fstatus%2F1476175140174057472">
								Jack Butcher
							</a>
						</span>
					</>
				}
			/>

			<style jsx>{`
				.hero {
					padding-top: 7.5rem;
					padding-bottom: 7.5rem;
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

				.plan__text {
					margin: 0 auto 3rem;
					text-align: center;
					max-width: 26rem;
				}
			`}</style>
		</Layout>
  )
}
