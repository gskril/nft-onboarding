import useSWR from 'swr'

function getGasPrice() {
	const fetcher = (...args) => fetch(...args).then((res) => res.json())

	const { data, error } = useSWR('/api/gas', fetcher, { refreshInterval: 30 * 1000 })

	if (error) return 'Error'
	if (!data) return 'Loading...'

	return data.low
}

export default function Gas() {
	return (
		<div>
			<h1>Gas: {getGasPrice()}</h1>
		</div>
	)
}
