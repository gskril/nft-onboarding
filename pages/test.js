import { useEffect, useState } from 'react'
import {
	useAccount,
	useBalance,
	useConnect,
	useContractRead,
	useDisconnect,
	useEnsAvatar,
	useEnsName,
} from 'wagmi'
import { BigNumber } from 'ethers'
import abi from './abi.json'

export const useIsMounted = () => {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])
	return mounted
}

export default function Profile() {
	const isMounted = useIsMounted()

	const { data: account } = useAccount()
	const balance = useBalance({
		addressOrName: account?.address,
	})
	const { data: ensAvatar } = useEnsAvatar({
		addressOrName: account?.address,
	})
	const { data: ensName } = useEnsName({ address: account?.address })
	const { connect, connectors, error, isConnecting, pendingConnector } =
		useConnect()
	const { disconnect } = useDisconnect()

	const ethBalance = balance.isLoading
		? '...'
		: balance.isError
		? 'Error'
		: balance.data?.formatted

	const priceOfNft =
		parseInt(
			useContractRead(
				{
					addressOrName: '0xca20f7279f7defd14e7524e609704ea2f436a539',
					contractInterface: abi,
				},
				'PRICE_PER_DONUT',
				{
					chaindId: 1,
				}
			).data?.toString()
		) / 1000000000000000000

	const abbreviatedAddress =
		account?.address?.slice(0, 5) + '...' + account?.address?.slice(-4)

	return (
		<div>
			{account ? (
				<>
					<p>
						Connected to {ensName ?? abbreviatedAddress} which has a
						balance of {ethBalance} ETH
					</p>
					<p>
						Price of NFT: {priceOfNft} ETH{' '}
						{ethBalance < priceOfNft
							? "(You don't have enough to mint)"
							: ''}
					</p>
					<button onClick={disconnect}>Disconnect</button>
				</>
			) : (
				connectors.map((connector) => (
					<button
						disabled={isMounted ? !connector.ready : false}
						key={connector.id}
						onClick={() => connect(connector)}
					>
						{connector.name}
						{isMounted
							? !connector.ready && ' (unsupported)'
							: false}
						{isConnecting &&
							connector.id === pendingConnector?.id &&
							' (connecting)'}
					</button>
				))
			)}

			{error && <div>{error.message}</div>}
		</div>
	)
}
