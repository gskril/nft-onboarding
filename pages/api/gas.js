// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  return fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json({
        low: data.result.SafeGasPrice,
        average: data.result.ProposeGasPrice,
        high: data.result.FastGasPrice,
      })
    })
    .catch((err) => {
      res.status(400).json({ err })
    })
}
