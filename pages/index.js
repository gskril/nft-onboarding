import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'

import Plan from '../components/plan'
import Tooltip from '../components/tooltip'
import Wallet from '../components/wallet-connection'
import Layout from '../components/layout'
import Gas from '../components/gas'
import Button from '../components/button'
import Section from '../components/section'
import Container from '../components/container'

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<div className="connection d-none">
			</div>

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

				<Section id="intro">
					<div className="intro grid">
						<div className="intro__text">
							<h2>What is an NFT?</h2>
							<p>
								Non-fungible token&apos;s are digital assets
								that are proven to be unique. The source of this
								truth is a network of computers around the world
								that approve each other&apos;s actions called
								the blockchain.
							</p>
							<p>
								NFTs can have different usecases, many of which
								are in the early phases of development and
								adoption. Today, the most common use case of
								NFTs is in digital art.
							</p>
						</div>
						<div className="intro__media">
							<Image
								src="/verified.png"
								width={531}
								height={192}
								alt="Verified JPEG by Jack Butcher"
							/>
							<p>
								Credit:{' '}
								<a
									href="https://twitter.com/visualizevalue/status/1476175140174057472"
									target="_blank"
									rel="noreferrer"
								>
									Jack Butcher
								</a>
							</p>
						</div>
					</div>
				</Section>

				<Section id={'wallet'} alternateBg={true} paddingBottom={false}>
					<div className="wallet grid">
						<div className="wallet__content">
							<h2>Create a wallet</h2>
							<p>
								An Ethereum wallet is your access point to
								everything in Web3. You will use your wallet to
								store tokens and NFTs, connect to websites,
								transfer assets and more.
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
								They are free to create and don&apos;t require
								an email, username or password.
							</p>
							<p>
								The easiest way to create an Ethereum wallet and
								add some test funds to it is with the{' '}
								<a
									href="https://rainbow.me/"
									target="_blank"
									rel="noreferrer"
								>
									Rainbow app
								</a>
								, available on iOS and Android.
							</p>
						</div>
						<div className="wallet__media">
							<Image
								src="/rainbow.png"
								width={401}
								height={492}
								alt="Verified JPEG by Jack Butcher"
							/>
						</div>
					</div>
				</Section>

				<Section id="connect">
					<div className="connect grid">
						<div className="connect__content">
							<h2>Connect your wallet</h2>
							<p>
								Click “Connect” and select “Wallet Connect” then
								scan the QR code from within Rainbow.
							</p>
							<p>
								I get it, connecting your wallet to a new
								website feels intimidating, but there&apos;s no
								need to worry. This initial connection
								won&apos;t give website&apos;s access to do
								anything malicious with your assets.
							</p>
						</div>
						<div className="connect__media">
							<Button eth={true}>Connect</Button>
						</div>
					</div>
				</Section>

				<Section id="nft" alternateBg={true}>
					<div className="gas">
						<h2>Things to know before buying your first NFT</h2>
						<div className="grid gas__description">
							<div>
								<p>
									When an NFT is created it&apos;s called
									“minting”. This is basically writing the NFT
									data to the blockchain where it will live
									forever. In the case of generative NFTs, the
									first sale is also when the art is
									created/written to the blockchain, so
									technically the original buyer is minting
									the NFT.
								</p>
								<p>
									Most NFTs have a unique ID that is publicly
									owned by a wallet. This is what makes it
									non-fungible.
								</p>
								<p>
									Minting an NFT, or really any transaction on
									the Ethereum network, comes with a
									transaction fee called a gas fee.
									Unfortunately these fees are can be quite
									high ($100+ at times), but it&apos;s
									important to understand how they work.
								</p>
							</div>
							<div>
								<p>
									The transaction fee is based on a few
									factors: type of transaction and the price
									of gas at that moment being the main ones.
								</p>
								<p>
									Different types of transactions require
									different amounts of work from the Ethereum
									network. For example, sending Ether from one
									wallet to another is not very demanding,
									while creating a new NFT collection is very
									demanding and therefore requires more gas.
								</p>
								<p>
									The price of gas at any time is based on
									network activity, and is represented in
									Gwei, a small fraction of Ether.
								</p>
							</div>
						</div>
						<div className="gas__live">
							<Gas />
						</div>
						<div className="gas__ending">
							<p>
								Since gas, which you see the real-time price of
								above, is based on network activity, you can
								save a significant amount of money by simply
								waiting for the activity to slow down.
							</p>
							<p>
								A great resource to reference is{' '}
								<a
									href="https://raribleanalytics.com/"
									target="_blank"
									rel="noreferrer"
								>
									RaribleAnalytics
								</a>
								. This will give you an easy scale of whether
								it&apos;s currently a good time to make a
								transaction, or if it&apos;s better to wait.
							</p>
						</div>
					</div>
				</Section>

				<Section>
					<div className="mint">
						<h2>Ready to mint?</h2>
						{/* TODO: show output from gas.message api */}
						<form className="mint__form" id="mintForm">
							<div className="mint__name-wrapper">
								<input type="text" placeholder="Name" name="name" id="name" required autocomplete="off"/>
								<Tooltip>This name will appear on the NFT and be visible to everyone.</Tooltip>
							</div>
							<div className="mint__color-options">
								<div className="mint__color-option">
									<input type="radio" name="color" value="blue" id="blue" required />
									<label htmlFor="blue">
										<span className="mint__color-option-color"></span>
										<span>Blue</span>
									</label>
								</div>
								<div className="mint__color-option">
									<input type="radio" name="color" value="red" id="red" required />
									<label htmlFor="red">
										<span className="mint__color-option-color"></span>
										<span>Red</span>
									</label>
								</div>
								<div className="mint__color-option">
									<input type="radio" name="color" value="light" id="light" required />
									<label htmlFor="light">
										<span className="mint__color-option-color"></span>
										<span>Light</span>
									</label>
								</div>
								<div className="mint__color-option">
									<input type="radio" name="color" value="dark" id="dark" required />
									<label htmlFor="dark">
										<span className="mint__color-option-color"></span>
										<span>Dark</span>
									</label>
								</div>
							</div>
							<Button extraClass="center" type="submit">Mint for 0.002 ETH</Button>
						</form>
					</div>
				</Section>

				<style jsx>{`
					.plan__text {
						margin: 0 auto 3rem;
						text-align: center;
						max-width: 26rem;
					}

					.grid {
						display: grid;
						gap: 2rem;
					}

					.wallet__media {
						display: flex;
						align-items: flex-end;
						justify-content: center;
					}

					.connect {
						gap: 2.5rem;
					}

					.connect__media {
						display: flex;
						flex-direction: column;
						gap: 0.5rem;
						align-items: center;
						justify-content: center;
					}

					.gas__live {
						margin: 2.5rem auto 3rem;
					}

					.mint {
						width: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						padding-bottom: 1rem;
					}

					.mint__form {
						margin-top: 1rem;
						max-width: 100%;
						width: 20rem;
					}

					.mint__name-wrapper {
						position: relative;
						margin-bottom: 1.25rem;
					}
					
					.mint__form input[type="text"] {
						border: none;
						background: var(--color-highlight);
						color: var(--color-light);
						padding: 0.75rem;
						padding-right: 2.25rem;
						width: 100%;
						border-radius: 0.5rem;
						box-shadow: .125rem .125rem 6rem #000000;
					}

					.mint__form input[type="text"]:focus {
						outline: 2px solid var(--color-gray-400);
					}

					.mint__color-options {
						display: flex;
						justify-content: space-around;
						margin-bottom: 2rem;
					}

					.mint__color-option {
						position: relative;
						display: flex;
						gap: 0.5rem;
					}

					.mint__color-option > label {
						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 0.5rem;
					}

					.mint__color-option > label > .mint__color-option-color {
						display: block;
						background: var(--color-gray-200);
						width: 2rem;
						height: 2rem;
						border-radius: 50%;
					}

					.mint__color-option > input {
						visibility: hidden;
						opacity: 0;
						position: absolute;
						top: 0;
						left: 0;
					}
					
					.mint__color-option > input:checked + label > .mint__color-option-color {
						outline: 3px solid var(--color-gray-100);
					}

					.mint__color-option > input:checked + label {
						color: var(--color-gray-100);
					}

					label[for="blue"] .mint__color-option-color {
						background: linear-gradient(135deg, #2E80DF, #7CB8FF) !important;
					}

					label[for="red"] .mint__color-option-color {
						background: linear-gradient(135deg, #E46060, #FFB1B1) !important;
					}

					label[for="light"] .mint__color-option-color {
						background: linear-gradient(135deg, #FCFCFC, #b5dcff) !important;
					}

					label[for="dark"] .mint__color-option-color {
						background: linear-gradient(135deg, #000000, #606060) !important;
					}

					@media screen and (min-width: 60em) {
						.grid {
							grid-template-columns: 1fr 1fr;
							gap: 5rem;
						}

						.grid.connect {
							grid-template-columns: 3fr 2fr;
						}

						.intro__media {
							margin-top: 4rem;
						}

						.wallet__content {
							order: 2;
						}

						.gas h2 {
							text-align: center;
							margin-left: auto;
							margin-right: auto;
						}

						.gas__description {
							gap: 4rem;
						}

						.gas__ending {
							max-width: 28rem;
							margin: 0 auto;
						}

						.gas__live {
							display: flex;
							justify-content: center;
						}
					}
				`}</style>

				<Script src="/js/ethers.js" />
				<Script src="/js/app.js" />
			</Layout>
		</>
	)
}
