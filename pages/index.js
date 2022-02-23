import Image from 'next/image'
import Head from 'next/head'

import Plan from '../components/plan'
import Layout from '../components/layout'
import Gas from '../components/gas'
import Section from '../components/section'
import Container from '../components/container'

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<Layout>
				<div className="plan">
					<Container>
						<div className="plan__text">
							<h2>Here&apos;s the plan</h2>
							<span className="section-subtitle">
								I understand this can all feel overwhelming, so
								we&apos;re going to take it step by step.
							</span>
						</div>
						<div className="steps">
							<Plan />
						</div>
					</Container>
				</div>

				<Section 
					id="intro"
					title="What is an NFT?"
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
								<a href="https://twitter.com/visualizevalue/status/1476175140174057472">
									Jack Butcher
								</a>
							</span>
						</>
					}
				>
					<p>
						Non-fungible token&apos;s are digital assets that are
						proven to be unique. The source of this truth is a
						network of computers around the world that approve each
						other&apos;s actions called the blockchain.
					</p>
					<p>
						NFTs can have different usecases, many of which are in
						the early phases of development and adoption. Today, the
						most common use case of NFTs is in digital art.
					</p>
				</Section>

				<Section
					id={'wallet'}
					title="Create a wallet"
					textAlignment="right"
					textWidth="53%"
					alternateBg={true}
					mediaPosition="wallet"
					media={
						<Image
							src="/rainbow.png"
							width={401}
							height={492}
							alt="Verified JPEG by Jack Butcher"
						/>
					}
				>
					<p>
						An Ethereum wallet is your access point to everything in
						Web3. You will use your wallet to store tokens and NFTs,
						connect to websites, transfer assets and more.
					</p>
					<p>
						Ethereum wallets are{' '}
						<a
							href="https://gregskril.com/blog/"
							target="_blank"
							rel="noreferrer"
						>
							decentralized and portable.
						</a>
						They are free to create and don&apos;t require an email,
						username or password.
					</p>
					<p>
						The easiest way to create an Ethereum wallet and add
						some test funds to it is with the{' '}
						<a href="https://rainbow.me/" target="_blank">
							Rainbow app
						</a>
						, available on iOS and Android.
					</p>
				</Section>

				<style jsx>{`
					.plan__text {
						margin: 0 auto 3rem;
						text-align: center;
						max-width: 26rem;
					}
				`}</style>
			</Layout>
		</>
	)
}
