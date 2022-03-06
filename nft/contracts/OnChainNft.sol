// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AddressToString.sol";
import "./Base64.sol";

contract OnChainNft is ERC721Enumerable, Ownable {
  using Strings for uint256;

  uint256 public cost = 0.05 ether;
  bool public paused = false;

  constructor() ERC721("On Chain NFT", "OCN") {}

  struct metadata {
    string name;
    string description;
    string minterName;
    string minterAddress;
    string blockTime;
    string color;
  }

  mapping (uint256 => metadata) private meta;

  string[] private colorOptions = ["blue", "dark", "light", "red"];

  function mint(string memory _minterName, string memory _color) public payable {
    uint256 supply = totalSupply();
    require(!paused, "Minting is currently paused");
    require(bytes(_minterName).length > 2, "Minter name must be at least 3 characters");
    require(balanceOf(msg.sender) == 0, "Each address may only mint one");
    require(msg.value >= cost, "Not enough ether to mint token");

    // TODO: if _color is not in colorOptions, set it to "light"
    if (bytes(_color).length == 0) {
      _color = "blue";
    }

    metadata memory newMetadata = metadata(
      string(abi.encodePacked('#', uint256(supply+1).toString())),
      string(abi.encodePacked("On-chain NFT test by ", _minterName)),
      _minterName,
      // TODO: slice string to 0x000...0000
      string(abi.encodePacked("0x", AddressToString.decode(msg.sender))),
      block.timestamp.toString(),
      _color
    );

    if (msg.sender != owner()) {
      require(msg.value >= cost);
    }

    meta[supply + 1] = newMetadata;
    _safeMint(msg.sender, supply + 1);
  }

  function buildImage(uint tokenId) public view returns(string memory) {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    metadata memory currentMetadata = meta[tokenId];

    return string(abi.encodePacked(
      'data:image/svg+xml;base64,',Base64.encode(bytes(abi.encodePacked(
      '<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="1200" fill="url(#background_gradient_',currentMetadata.color,')"/><g filter="url(#tweet_shadow)"><rect x="120" y="393" width="960" height="415" rx="24" fill="#ffffff"/></g><circle cx="221" cy="497" r="46" fill="url(#pfp_gradient_',currentMetadata.color,')"/><text x="287" y="486" font-size="47px" fill="black">',currentMetadata.minterName,'</text><text x="287" y="531" font-size="25.5px" fill="#989898">',currentMetadata.minterAddress,'</text><text x="175" y="649" font-size="49px" fill="#000000">just setting up my wallet</text><text x="175" y="764" font-size="26px" fill="#989898"><tspan xml:space="preserve">Minted at ',currentMetadata.blockTime,' unix time</tspan></text><defs><linearGradient id="background_gradient_blue" x1="0" y1="0" x2="1200" y2="1200" gradientUnits="userSpaceOnUse"><stop stop-color="#2E80DF"/><stop offset="1" stop-color="#7CB8FF"/></linearGradient><linearGradient id="pfp_gradient_blue" x1="175" y1="451" x2="267" y2="543" gradientUnits="userSpaceOnUse"><stop stop-color="#2E80DF"/><stop offset="1" stop-color="#7CB8FF"/></linearGradient><linearGradient id="background_gradient_red" x1="0" y1="0" x2="1200" y2="1200" gradientUnits="userSpaceOnUse"><stop stop-color="#E46060"/><stop offset="1" stop-color="#FFB1B1"/></linearGradient><linearGradient id="pfp_gradient_red" x1="175" y1="451" x2="267" y2="543" gradientUnits="userSpaceOnUse"><stop stop-color="#E46060"/><stop offset="1" stop-color="#FFB1B1"/></linearGradient><linearGradient id="background_gradient_light" x1="0" y1="0" x2="1200" y2="1200" gradientUnits="userSpaceOnUse"><stop stop-color="#FCFCFC"/><stop offset="1" stop-color="#C8E5FF"/></linearGradient><linearGradient id="pfp_gradient_light" x1="175" y1="451" x2="267" y2="543" gradientUnits="userSpaceOnUse"><stop stop-color="#FCFCFC"/><stop offset="1" stop-color="#C8E5FF"/></linearGradient><linearGradient id="background_gradient_dark" x1="0" y1="0" x2="1200" y2="1200" gradientUnits="userSpaceOnUse"><stop stop-color="#000000"/><stop offset="1" stop-color="#333333"/></linearGradient><linearGradient id="pfp_gradient_dark" x1="175" y1="451" x2="267" y2="543" gradientUnits="userSpaceOnUse"><stop stop-color="#000000"/><stop offset="1" stop-color="#606060"/></linearGradient><filter id="tweet_shadow" x="116" y="393" width="968" height="423" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_53_11"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_53_11" result="shape"/></filter><style>text {font-family: Arial, sans-serif;font-weight: bold;font-style: normal;line-height: 34px;}</style></defs></svg>'
    )))));
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    metadata memory currentMetadata = meta[tokenId];

    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    return string(abi.encodePacked(
      'data:application/json;base64,', Base64.encode(bytes(abi.encodePacked(
        '{"name":"',
          currentMetadata.name,
        '", "description":"',
          currentMetadata.description,
        '", "attributes": [',
          '{"trait_type": "Color", "value": "',currentMetadata.color,'"},',
          '{"trait_type": "Minted", "value": "',currentMetadata.blockTime,'", "display_type": "date"}',
        '], "image": "',
          buildImage(tokenId),
        '"}'
      )))
    ));
  }

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