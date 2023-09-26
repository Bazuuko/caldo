import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import background from "./styles/bg.png";
import video from "./img/video.mp4";
import styled from "styled-components";
import Accordion from './Accordion';
import styles from "./App.css"

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  letter-spacing: 3px;
  font-family: 'Press Start 2P', cursive;
  border-radius: 20px;
  border: none;
  background-color: #c8bfbf;
  font-weight: bold;
  font-size: 30px;
  color: var(--accent);
  width: 350px;
  cursor: pointer;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledButton2 = styled.button`
  letter-spacing: 2px;
  font-family: 'Press Start 2P', cursive;
  border-radius: 15px;
  border: none;
  background-color: #c8bfbf;
  font-weight: bold;
  font-size: 30px;
  color: var(--accent);
  padding: 20px;
  width: 300px;
  cursor: pointer;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;


export const StyledRoundButton = styled.button`
  padding: 10px;
  background: transparent;
  border-radius: 100%;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton2 = styled.button`
  background: transparent;
  border-radius: 100%;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const ImageWrapper = styled.div`
  @media (min-width: 1990px) {
   margin-left: 310px;
  }
`;

export const StyledLogo = styled.img`
  width: 100px;
  transition: width 0.5s;
  transition: height 0.5s;
`;


export const StyledImg = styled.img`
width: 1500px;
  transition: width 0.5s;
`;

export const StyledGrid = styled.img`
width: 600px;
  transition: width 0.5s;
`;

export const StyledImg2 = styled.img`
  border-radius: 20px;
  @media (min-width: 1000px) {
    width: 400px;
  }
  transition: width 0.5s;
`;

export const StyledImg3 = styled.img`
  width: 100%;
  transition: transform 1s;
  :hover {
    transform: translateZ(10px);
  }
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;




function App() {
  const accordionData = [
    {
      title: 'How can I mint?',
      content: `Because transactions on the Ethereum network are expensive, the mint is live on the Base Mainnet. \n Once you have your desired ETH on your Metamask, you have to add the Base Network to Metamask. You can go to chainlist.org and search "Base" to add it. Next, head over to the Base Bridge website https://bridge.base.org/deposit and ensure you've selected the 'Deposit' option. From here, click the 'Connect wallet' button and select your wallet from the list of available options. Follow the prompts in your wallet to connect it to the bridge. Once connected, you're ready to deposit your desired funds.
      \n
      Send the ETH funds to mint to the Metamask address and go to the mint section. Select how many NFTs you want to mint (you can save a lot of gas doing multiple in 1 transaction!) and mint them!`
    },
    {
      title: 'How much is the supply of the Calcium Dogs?',
      content: `The collection will consist of 999 unique NFTs on the Base Network.
      `
    },
    {
      title: 'How do I see them or trade?',
      content: `You can trade them right now and see your minted Calcium Dogs on Opensea!
      `},
      {
        title: 'How do I stake them?',
        content: `Staking system and details will be available very soon! Stay tuned for our announcements on Twitter (X) and Telegram
        `
      },
  ];
  const dispatch = useDispatch();
  const aboutRef = useRef(null);
  const faqRef = useRef(null);
  const mintRef = useRef(null);
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [isActive, setIsActive] = useState(false);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Select how many Calcium Dogs you want to mint`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = 9900000000000000;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    let totalCostWeiNum = cost * mintAmount
    let trueCost = BigInt(totalCostWeiNum).toString();
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: trueCost,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Error. Try again.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `Congratulations! You minted ${mintAmount} ${CONFIG.NFT_NAME}!`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 20) {
      newMintAmount = 20;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  const handleAbout = () => {
    aboutRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleFaq = () => {
    faqRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleMint = () => {
    mintRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleTwitter = () => {
    window.open(
      'https://twitter.com/CALciumDogs',
      '_blank'
    );
  };

  const handleTg = () => {
    window.open(
      'https://t.me/CalciumDogs',
      '_blank'
    );
  };

const handleOpensea = () => {
    window.open(
      'https://opensea.io/collection/calcium-dogs',
      '_blank'
    );
  };



  return (
    <s.Screen>

      <div className="main" style={{display:"flex", 
      backgroundImage: `url(${background})`,
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      flex: "1",
      ai: "1"
       }}>

<s.Container
        ai={"center"}>

        <div className="nav" style={{display:"flex"}}>
          <div className="logo">
       <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: 50,
                letterSpacing: 2,
                color: "var(--accent-text)",
                marginTop: "-10px",
              }}
            >
              Calcium Dogs
       </s.TextNav>
          </div>
          
          <div className="bar" style={{display:"flex", marginLeft: "800px"}}>
          <div className="option1" onClick={handleAbout}>
          <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: 50,
                letterSpacing: 2,
                color: "var(--accent-text)",
                marginTop: "-10px",
                cursor: "pointer"
              }}
            >
              About
       </s.TextNav>
          </div>

          <div className="option2" style={{marginLeft:"0px"}}>
          <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: 50,
                letterSpacing: 2,
                color: "var(--accent-text)",
                marginTop: "-10px",
                cursor: "pointer"
              }}
            >
              Staking
       </s.TextNav>
          </div>

          <div className="option3" style={{marginLeft:"0px"}} onClick={handleFaq}>
          <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: 50,
                letterSpacing: 2,
                color: "var(--accent-text)",
                marginTop: "-10px",
                cursor: "pointer"
              }}
            >
              FAQ
       </s.TextNav>
          </div>
          </div>  
       </div>
   

       <s.SpacerLarge />

       <s.TextTitle 
       style={{
          fontSize: 40,
          fontStyle: "italic",
       }}>
          Join the $CAL revolution
        </s.TextTitle>
        <s.SpacerLargeX/>
        <s.TextTitle
        style={{
          fontSize: 40,
          letterSpacing: 35,
       }}>
          <b>CALCIUM</b> DOGS
        </s.TextTitle>
        <s.SpacerLargeX />
        <StyledImg
        src={"/config/images/banner.png"}
        >
        </StyledImg>


        <s.SpacerLargeX />
        <s.SpacerMedium />

        <StyledButton onClick={handleMint}
        style={{
              boxShadow: "2px 5px 5px 4px rgba(0,0,0,0.5)",
              width: "320px",
              padding: 20,

            }}
            >
            MINT NOW
        </StyledButton>
      
        <s.SpacerLargeXX />
        <s.SpacerLargeX />

        <div class="mint">
      <div class="slider">
        <div class="slide-track">
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/21.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/22.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/23.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/24.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/25.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/26.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/27.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/28.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/29.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/57.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/58.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/59.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/60.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/61.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/62.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/63.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/64.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/65.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/66.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/67.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/68.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/69.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/30.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/31.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/32.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/33.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/34.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/36.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/37.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/38.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/39.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/40.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/41.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/42.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/43.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/44.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/45.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/46.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/47.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/48.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/49.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/50.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/51.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/52.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/53.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/54.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/55.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/56.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/57.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/58.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/59.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/60.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/61.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/62.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/63.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/64.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/65.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/66.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/67.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/68.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/69.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/70.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/71.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/72.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/73.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/74.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/75.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/76.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/77.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/78.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/79.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/80.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/81.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/82.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/83.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/84.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/85.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/86.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/87.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/88.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/89.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/90.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/91.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/92.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/93.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/94.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/95.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/96.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/97.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/98.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/99.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/100.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/101.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/102.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/103.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/104.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/105.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/1.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/3.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/5.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/7.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/9.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/12.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/13.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/15.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/16.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/17.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/18.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/19.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/20.png"}
          />
          </div>
        

      </div>
      </div>
      </div>
      
      <s.SpacerLargeXX />

      <div className="about" ref={aboutRef}> 
      <s.SpacerLargeX />
      
      <s.TextTitle 
      style={{
        fontSize: 50,
        letterSpacing: 4,
        textAlign: "center"
      }}
      >
        What is Calcium Dogs?
      </s.TextTitle>
      <s.SpacerLargeX />
      <s.TextSubTitle
      style={{
        textAlign: "center",
        fontSize: 19,
        fontWeight: "bold",
        letterSpacing: 2,
        color: "var(--accent-text)",
        marginTop: 20,
        marginLeft: 100,
        marginRight: 100
      }}
    >
      
      Calcium Dogs presents a series of 999 pixel art NFTs, each a visual virtual piece, create to forge an NFT community in the $CAL Calcium revolution.  <br></br>
      For the first time a token has fame associated with its creator to become known worldwide and due to a clumsy mistake, the community saw the opportunity and took over the token liquidity making it for the people.  <br></br>
      We will stand up against the devs with bad intentions, the VCs who get rich with pre-sales and the bots that lurk in every launch. <br></br>

</s.TextSubTitle>
<s.SpacerLargeX />
<s.TextSubTitle
      style={{
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        letterSpacing: 5,
        color: "var(--accent-text)",
        marginTop: 20,
        marginLeft: 100,
        marginRight: 100
      }}
    >
We are the community


    </s.TextSubTitle>
    <s.TextSubTitle
      style={{
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        letterSpacing: 15,
        color: "var(--accent-text)",
        marginTop: 20,
        marginLeft: 100,
        marginRight: 100
      }}
    >
We are <b>$Calcium</b>

    </s.TextSubTitle>
    <s.TextSubTitle
      style={{
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        letterSpacing: 2,
        color: "var(--accent-text)",
        marginTop: 20,
        marginLeft: 100,
        marginRight: 100
      }}
    >
We are the <b>Calcium Dogs</b>


    </s.TextSubTitle>
      <s.SpacerLargeXX />

      <s.TextTitle 
      style={{
        fontSize: 50,
        letterSpacing: 10,
        textAlign: "center"
      }}
      >
        Stake & Earn <b>$CAL</b>
      </s.TextTitle>
      <s.SpacerLargeX />
      <s.TextSubTitle
      style={{
        textAlign: "center",
        fontSize: 19,
        fontWeight: "bold",
        letterSpacing: 2,
        color: "var(--accent-text)",
        marginTop: 20,
        marginLeft: 100,
        marginRight: 100
      }}
    >

      Each Calcium Dog NFT will be able to be staked (a small amount of $CAL will be needed for it) and will generate $CAL depending on the rarity of the NFT. <br></br>
      90% of the mint funds will be used to buy $CAL and send them to our <b>MilkVault</b> to be distributed in the staking reward.
      </s.TextSubTitle>
      
    
      <s.SpacerLargeX />
      <s.SpacerLarge />
<ImageWrapper>
      <div class="grid" style={{display:"flex", marginLeft: "60px"}}>
  <StyledGrid
        src={"/config/images/cover2.png"}
        style={{
        }}
        
        />
        <StyledGrid
        src={"/config/images/cover1.png"}
        style={{
        }}
        
        />
        <StyledGrid
        src={"/config/images/cover3.png"}
        style={{
        }}
        
        />
    </div>
    </ImageWrapper>
</div>

      
<s.SpacerLargeXX />
<div ref={mintRef}>
<s.SpacerLargeX />
<s.SpacerLarge />


<ResponsiveWrapper flex={1} style={{ }} mint>
        
        <s.Container
          flex={1}
          jc={"center"}
          ai={"center"}
          style={{
            borderRadius: 24,
          }}
        >
           
          <s.Container flex={1} jc={"center"} ai={"center"} style={{ marginTop: "-50px" }}>
          <s.TextSubTitle2
            style={{
              textAlign: "center",
              fontSize: 40,
              fontWeight: 1000,
              letterSpacing: 12,
              color: "var(--secondary-text)",
            }}
          >
           Mint Live
          </s.TextSubTitle2>
          <s.SpacerLargeX />

          <StyledImg2 
            src={"/config/images/gif.gif"}
          />

          </s.Container>
          <s.TextTitle
            style={{
              textAlign: "center",
              fontSize: 50,
              fontWeight: "bold",
              color: "var(--accent-text)",
            }}
          >
       
          </s.TextTitle>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
         <s.SpacerLargeX />
         
          </s.TextDescription>
          {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
            <>
             <s.SpacerXSmall />
              <s.TextTitle
                style={{ textAlign: "center", color: "var(--accent-text)" }}
              >
                The sale has ended.
              </s.TextTitle>
              
            </>
          ) : (
            <>
              <s.TextTitle2
                style={{ textAlign: "center", color: "var(--accent-text)", fontSize: 25 }}
              >
                
                {data.totalSupply} / {CONFIG.MAX_SUPPLY}
              </s.TextTitle2>
              <s.SpacerLargeX />
              <s.TextTitle2
                style={{ textAlign: "center", color: "var(--accent-text)", fontSize: 28 }}
              >
                Mint price is 0.0099 <b>$ETH</b>
              </s.TextTitle2>
              <s.SpacerLargeX />
              {blockchain.account === "" ||
              blockchain.smartContract === null ? (
                <s.Container ai={"center"} jc={"center"}>
                   <s.SpacerLarge />
                  <StyledButton2
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}
                    style={{ marginLeft: "-8px" }}
                  >
                    CONNECT
                  </StyledButton2>
                  

                  {blockchain.errorMsg !== "" ? (
                    <>
                  <s.SpacerLargeX />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                          letterSpacing: 2
                        }}
                      >
                        
                      Connect to the Base Network
                      </s.TextDescription>
                      
                    </>
                  ) : null}
                </s.Container>
              ) : (
                <>
                  <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)",
                    }}
                  >
                    
                    {feedback}
                  </s.TextDescription>
                  <s.SpacerMedium />
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledRoundButton2
                      style={{ lineHeight: 0.4, color: "var(--primary)"}}
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        decrementMintAmount();
                      }}
                    >
                      -
                    </StyledRoundButton2>
                    <s.SpacerMedium />
                    
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)"
                      }}
                    >
                      {mintAmount}
                    </s.TextDescription>
                    
                    <s.SpacerMedium />
                    <StyledRoundButton2
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        incrementMintAmount();
                      }}
                      style={{
                        color: "var(--primary)"
                      }}
                    >
                      +
                    </StyledRoundButton2>
                  </s.Container>
                  
                  <s.SpacerSmall />
                  <s.SpacerLarge />
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    
                    <StyledButton2
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs();
                        getData();
                      }}
                    >
                      {claimingNft ? "WAIT" : "MINT"}
                    </StyledButton2>
                    
                  </s.Container>
                </>
              )}
            </>
          )}
        </s.Container>
      </ResponsiveWrapper>

      </div>

      <s.SpacerLargeXX />
      <s.SpacerLargeX />



      <div className="mint">
      <div class="mint">
      <div class="slider">
        <div class="slide-track">
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/21.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/22.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/23.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/24.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/25.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/26.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/27.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/28.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/29.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/57.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/58.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/59.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/60.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/61.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/62.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/63.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/64.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/65.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/66.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/67.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/68.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/69.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/30.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/31.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/32.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/33.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/34.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/36.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/37.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/38.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/39.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/40.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/41.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/42.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/43.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/44.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/45.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/46.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/47.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/48.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/49.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/50.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/51.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/52.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/53.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/54.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/55.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/56.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/57.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/58.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/59.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/60.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/61.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/62.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/63.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/64.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/65.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/66.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/67.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/68.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/69.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/70.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/71.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/72.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/73.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/74.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/75.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/76.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/77.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/78.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/79.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/80.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/81.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/82.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/83.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/84.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/85.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/86.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/87.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/88.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/89.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/90.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/91.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/92.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/93.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/94.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/95.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/96.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/97.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/98.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/99.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/100.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/101.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/102.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/103.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/104.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/105.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/1.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/3.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/5.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/7.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/9.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/12.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/13.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/15.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/16.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/17.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/18.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/19.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/bmb/20.png"}
          />
          </div>
        

      </div>
      </div>
      </div>

      <s.SpacerLargeXX />
      <s.SpacerLargeX />
      
      <div className="faq" style={{marginLeft: "25px"}}>
      <s.TextTitle
      style={{
        textAlign: "center",
        fontSize: 40,
        fontWeight: 1000,
        letterSpacing: 25,
      }}
    >
        FAQ
      </s.TextTitle>

      <s.SpacerLargeX />
      <s.SpacerSmall />

      <s.Container
          flex={1}
          jc={"center"}
          ai={"center"}
          style={{
            borderRadius: 30,

          }}
          
        >
          

      <div class="accordion" ref={faqRef}>

        {accordionData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
        ))}

    </div>

    <s.SpacerLargeXX />

    <div className="networks" style={{display:"flex", cursor: "pointer"}} >
    <div className="network1" style={{marginLeft:"-50px"}} onClick={handleTwitter}>
    <StyledLogo
    src={"/config/images/tw.png"}
    style={{
      width: "100px"
    }}
    />
    </div>
    <div className="network2" style={{marginLeft:"20px"}} onClick={handleTg}>
    <StyledLogo
    src={"/config/images/tg.png"}
    style={{
      width: "100px"
    }}
    />
    </div>
    <div className="network3" style={{marginLeft:"20px"}} onClick={handleOpensea}>
    <StyledLogo
    src={"/config/images/opensea.png"}
    style={{
      width: "100px"
    }}
    />
    </div>
    </div>

    <s.SpacerLargeXX />
    </s.Container>
    </div>

</div>

<s.SpacerLarge />

</s.Container>
      </div>
    </s.Screen>
  );
}

export default App;
