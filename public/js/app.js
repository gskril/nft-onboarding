const connectBtn = document.querySelector('.connect__media button')
const mintForm = document.querySelector('#mintForm')
const walletConnection = document.querySelector('.connection')
const connectMedia = document.querySelector('.connect__media')

connectBtn.addEventListener('click', connectWallet)
mintForm.addEventListener('submit', (e) => mintNft(e))

async function connectWallet() {
  try {
    // Connect to Metamask
    await ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
  
    // Get wallet address, balance, and chain.
    const myAddress = await signer.getAddress()
    
    if (!connectMedia.classList.contains('connected')) {
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
  
      // Add connected message below button if not already there
      const connectedNote = document.createElement('p')
      connectedNote.innerHTML = `You are connected.`
      connectMedia.appendChild(connectedNote)
      connectMedia.classList.add('connected')
    }
  } catch(err) {
    alert('You\'ll need MetaMask to use this app.')
  }
}

async function mintNft(e) {
  e.preventDefault()

  // Get form values
  const minterName = e.target.name.value
  const mintColor = e.target.color.value

  if (!connectMedia.classList.contains('connected')) {
    await connectWallet()
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  
  // Get wallet address, balance, and chain.
  const myBalance = await signer.getBalance()
  const chainId = await provider.getNetwork().then((network) => network.chainId)

  // Ethereum is chain id 1, Rinkeby is 4
  if (chainId !== 4) return alert('You\'re connected to the wrong network. In Metamask, switch to the Rinkeby network and try again.')

  const abi = [
      {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"buildImage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_minterName","type":"string"},{"internalType":"string","name":"_color","type":"string"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newCost","type":"uint256"}],"name":"setCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}
  ]

  // Mint NFT
  const contract = new ethers.Contract('0x8d465263764e9386F026d1C363e16E9848a55a77', abi, signer)
  const contractWithSigner = contract.connect(signer)

  // Read price of NFT from contract
  let pricePerNft
  try {
    pricePerNft = await contractWithSigner.cost()
    ethers.utils.formatEther(pricePerNft)
  } catch (error) {
    console.error(error)
    return alert('Error reading price from contract')
  }

  function changeMintBtnState() {
    const mintBtn = document.querySelector('.mint__form button')

    if (mintBtn.disabled) {
      mintBtn.innerHTML = "Mint for 0.002 ETH"
      mintBtn.disabled = false
    } else {
      mintBtn.innerHTML = "Minting..."
      mintBtn.disabled = true
    }
  }

  // Call mint function from contract
  await contractWithSigner.mint(minterName, mintColor, {
    value: pricePerNft
  })
    .then(changeMintBtnState())
    .then(() => {
      document.querySelector('.mint__success').classList.remove('d-none')
    })
    .catch(err => {
      if (err.message.includes('Each address may only mint one')) {
        alert('Each address may only mint one NFT.')
      } else if (err.message.includes('Not enough ether') || err.message.includes('-32000')) {
        alert('Your connect wallet does not have enough ether to mint the NFT.')
      } else {
        alert(err.message)
      }
      changeMintBtnState()
      console.error(err.message)
    })
}
