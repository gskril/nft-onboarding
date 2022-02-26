// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base64.sol";

contract OnChainNft is ERC721Enumerable, Ownable {
  using Strings for uint256;

  struct metadata {
    string name;
    string description;
    string minter;
  }

  mapping (uint256 => metadata) private meta;

  uint256 public cost = 0.05 ether;
  bool public paused = false;

  constructor() ERC721("On Chain NFT", "OCN") {}

  // public
  function mint(string memory _minter) public payable {
    uint256 supply = totalSupply();
    require(!paused);
    require(bytes(_minter).length > 2);

    metadata memory newMetadata = metadata(
      string(abi.encodePacked('OCN #', uint256(supply+1).toString())),
      "This is our cool on chain NFT",
      _minter
    );

    if (msg.sender != owner()) {
      require(msg.value >= cost);
    }

    meta[supply + 1] = newMetadata;
    _safeMint(msg.sender, supply + 1);
  }

  function buildImage(uint tokenId) private view returns(string memory) {
    metadata memory currentMetadata = meta[tokenId];

    return Base64.encode(bytes(abi.encodePacked(
        '<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">',
          '<rect width="500" height="500" fill="#FF0000"/>',
          '<text dominant-baseline="middle" text-anchor="middle" x="50%" y="50%" font-size="47px" fill="000000">',currentMetadata.minter,'</text>',
        '</svg>'
    )));
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    metadata memory currentMetadata = meta[tokenId];

    return string(abi.encodePacked(
        'data:application/json;base64,', Base64.encode(bytes(abi.encodePacked(
            '{"name":"',
            currentMetadata.name,
            '", "description":"',
            currentMetadata.description,
            '", "image": "',
            'data:image/svg+xml;base64,',
            buildImage(tokenId),
            '"}'
        )))));
  }

  //only owner
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
  function withdraw() public payable onlyOwner {
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }
}