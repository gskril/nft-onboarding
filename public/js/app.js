const connectBtn = document.querySelector('.connect__media button')
const mintBtn = document.querySelector('.mint button')
const walletConnection = document.querySelector('.connection')
const connectMedia = document.querySelector('.connect__media')

connectBtn.addEventListener('click', connectWallet)
mintBtn.addEventListener('click', mintNft)

async function connectWallet() {
  // Connect to Metamask
  await ethereum.request({ method: 'eth_requestAccounts' })
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  // Get wallet address, balance, and chain.
  const myAddress = await signer.getAddress()

  // Create ENS avatar element
  const walletAvatar = document.createElement('img')
  walletAvatar.classList.add('connection__avatar')
  walletAvatar.src = `https://ethleaderboard.xyz/img/av-default.png`
  walletAvatar.width = '38px'
  walletAvatar.height = '38px'
  walletConnection.appendChild(walletAvatar)

  // Create wallet address element
  const walletAddress = document.createElement('span')
  walletAddress.innerText = `${myAddress.slice(0, 5)}...${myAddress.slice(-4)}`
  walletConnection.appendChild(walletAddress)
  walletConnection.classList.remove('d-none')

  if (!connectMedia.classList.contains('connected')) {
    // Add connected message below button if not already there
    const connectedNote = document.createElement('p')
    connectedNote.innerHTML = `You are connected.`
    connectMedia.appendChild(connectedNote)
    connectMedia.classList.add('connected')
  }
}

async function mintNft() {
  if (!connectMedia.classList.contains('connected')) {
    await connectWallet()
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  
  // Get wallet address, balance, and chain.
  const myBalance = await signer.getBalance()
  const chainId = await provider.getNetwork().then((network) => network.chainId)

  // Ethereum is chain id 1
  if (chainId !== 1) return alert('This NFT is only on Ethereum Mainnet. Switch Networks and try again.')

  const abi = [
    {"inputs":[{"internalType":"string","name":"_base","type":"string"},{"internalType":"string","name":"_suffix","type":"string"},{"internalType":"string","name":"_signVersion","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_PER_TRANSACTION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PER_WALLET_FOR_PUBLIC","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_TOTAL_MINT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRICE_PER_DONUT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_to","type":"address[]"},{"internalType":"uint256[]","name":"_numberOfDonuts","type":"uint256[]"}],"name":"airdropDonuts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum TheDonutShop.ContractState","name":"_state","type":"uint8"}],"name":"changeContractState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_numberOfDonuts","type":"uint256"},{"internalType":"uint256","name":"_maxMintAmount","type":"uint256"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"claimDonuts","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"currentState","outputs":[{"internalType":"enum TheDonutShop.ContractState","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getNFTPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_numberOfDonuts","type":"uint256"}],"name":"mintDonuts","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_base","type":"string"},{"internalType":"string","name":"_suffix","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxTotalMint","type":"uint256"},{"internalType":"uint256","name":"_maxPerTransaction","type":"uint256"},{"internalType":"uint256","name":"_pricePerDonut","type":"uint256"}],"name":"setMaxes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_signVersion","type":"string"}],"name":"updateSignVersion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_signer","type":"address"}],"name":"updateSigner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}
  ]

  // Mint NFT
  const contract = new ethers.Contract('0x0000000000000000000000000000000000000000', abi, signer)
  const contractWithSigner = contract.connect(signer)

  // Read price of NFT from contract
  let pricePerNft
  try {
    pricePerNft = await contractWithSigner.PRICE()
  } catch (error) {
    console.error(error)
    return alert('Error reading price from contract')
  }

  // Enter desired amount of NFTs to mint - this can be set from an input field for example
  const nftsToMint = 1
  const totalPrice = pricePerNft * nftsToMint

  // Call mint function (mintDonuts in this case) from contract
  await contractWithSigner.mintDonuts(nftsToMint, { value: totalPrice.toString() })
    .catch(err => {
      console.error(err.message)
      alert('Error minting NFT')
    })
}
