import '../styles/globals.css'
import { Provider, chain, createClient, defaultChains } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const infuraId = process.env.INFURA_ID

const chains = defaultChains
const defaultChain = chain.mainnet

// Set up connectors
const client = createClient({
	autoConnect: true,
	connectors({ chainId }) {
		const chain = chains.find((x) => x.id === chainId) ?? defaultChain
		const rpcUrl = chain.rpcUrls.infura
			? `${chain.rpcUrls.infura}/${infuraId}`
			: chain.rpcUrls.default
		return [
			new InjectedConnector(),
			new CoinbaseWalletConnector({
				options: {
					appName: 'wagmi',
					chainId: chain.id,
					jsonRpcUrl: rpcUrl,
				},
			}),
			new WalletConnectConnector({
				options: {
					qrcode: true,
					rpc: {
						[chain.id]: rpcUrl,
					},
				},
			}),
		]
	},
})

export default function App({ Component, pageProps }) {
	return (
		<Provider client={client}>
			<Component {...pageProps} />
		</Provider>
	)
}
