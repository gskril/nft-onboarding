// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base64.sol";

contract OnChainNft is ERC721Enumerable, Ownable {
  using Strings for uint256;

  uint256 public cost = 0.05 ether;
  bool public paused = false;

  constructor() ERC721("On Chain NFT", "OCN") {}

  // public
  function mint() public payable {
    uint256 supply = totalSupply();
    require(!paused);
    require(supply + 1 <= 10000);

    if (msg.sender != owner()) {
      require(msg.value >= cost);
    }

    _safeMint(msg.sender, supply + 1);
  }

  function buildImage() private pure returns(string memory) {
      return Base64.encode(bytes(abi.encodePacked(
          '<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">',
            '<rect width="500" height="500" fill="#FF0000"/>',
            '<text dominant-baseline="middle" text-anchor="middle" x="50%" y="50%" font-size="47px" fill="000000">greg</text>',
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

    return string(abi.encodePacked(
        'data:application/json;base64,', Base64.encode(bytes(abi.encodePacked(
            '{"name":"',
            "REPLACE",
            '", "description":"',
            "REPLACE",
            '", "image": "',
            'data:image/svg+xml;base64,',
            buildImage(),
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