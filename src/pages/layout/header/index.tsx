import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeaderContainer,
  Navbar,
  ConnectMenu,
  Button,
  WalletButton,
  HeaderContent,
  MobileHeaderContent,
  ModalContainer,
} from "./index.styled";
import { slide as Menu } from "react-burger-menu";
import Modal from "react-modal";
import MetamaskIcon from "../../../assets/wallet_icon/metamask-fox.svg";
import WalletIcon from "../../../assets/wallet_icon/wallet-connect.svg";
import CoinbaseIcon from "../../../assets/wallet_icon/coinbase_logo.jpeg";
import { useDispatch } from "react-redux";
import { setAddress } from "../../../redux/actionCreators/setAddress";
import { useTypedSelector } from "../../../hooks/useTypeSelector";

import CryptoTombImg from "../../../assets/crypto_tomb_cash.svg";
import CryptoTombShareImg from "../../../assets/crypto_tomb_share.svg";
import CryptoTombBondImg from "../../../assets/crypto_tomb_bond.svg";

declare global {
  interface Window {
    ethereum: any;
  }
}

const Header = () => {
  const [addr, setAddr] = useState("");
  const [y, setY] = useState(window.scrollY);
  const menuStyles = {
    bmBurgerButton: {
      position: "fixed",
      width: "25px",
      height: "25px",
      left: "36px",
      top: "36px",
    },
    bmBurgerBars: {
      background: "#e0e3bd",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
      left: "0",
      top: "0",
    },
    bmMenu: {
      background: "rgba(255,255,255,0.9)",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
      overflowY: "hidden",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      display: "block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };
  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [walletModalIsOpen, setWalletModalOpen] = React.useState(false);
  
  const [menuIsOpen, setMenuOpen] = React.useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const closeWalletModal = () => {
    setWalletModalOpen(false);
  };
  const { address } = useTypedSelector((state) => state.address);
  useEffect(() => {
    const handleNavigation = (e: any) => {
      const window = e.currentTarget;
      if (y > 10) {
        document.getElementById("header")?.classList.add("scrollContainer");
      } else if (y <= 10) {
        document.getElementById("header")?.classList.remove("scrollContainer");
      }
      setY(window.scrollY);
    };
    window.addEventListener("scroll", (e) => handleNavigation(e));

    return () => {
      // return a cleanup function to unregister our function since its gonna run multiple times
      window.removeEventListener("scroll", (e) => handleNavigation(e));
    };
  }, [y]);
  useEffect(() => {
    document
      .getElementById("navbarItem" + 1)
      ?.classList.add("activeNavbarItem");

    // metamaskConnect();
  }, []);

  const metamaskConnect = () => {
    const { ethereum } = window;
    // console.log("store address", address);
    ethereum
      .enable()
      .then((s: any) => {
        setAddr(ethereum.selectedAddress);
        let temp =
          ethereum.selectedAddress.slice(0, 5) +
          "..." +
          ethereum.selectedAddress.slice(-4);

        setAddr(temp);
        dispatch(setAddress(temp));
      })
      .catch((err: any) => console.log(err));
  };

  const Connect = () => {
    setMenuOpen(false);
    setIsOpen(!modalIsOpen);
  };
  const ShowWallet = () => {
    setMenuOpen(false);
    setWalletModalOpen(!walletModalIsOpen);
  }
  const ItemClick = (e: number) => {
    for (let i = 1; i <= 8; i++) {
      document
        .getElementById("navbarItem" + i)
        ?.classList.remove("activeNavbarItem");
    }
    document
      .getElementById("navbarItem" + e)
      ?.classList.add("activeNavbarItem");

    let element: HTMLElement = document.getElementsByClassName(
      "bm-overlay"
    )[0] as HTMLElement;
    element.click();
  };
  return (
    <HeaderContainer id="header">
      <h2>
        <a href="/">Bomb Finance Summary</a>
      </h2>
      <HeaderContent>
        <Navbar>
          <Link to="/">
            <div id="navbarItem1" onClick={() => ItemClick(1)}>
              HOME
            </div>
          </Link>

          <Link to="/cemetery">
            <div id="navbarItem2" onClick={() => ItemClick(2)}>
              Cemetery
            </div>
          </Link>
          <Link to="/masonry">
            <div id="navbarItem3" onClick={() => ItemClick(3)}>
              Masonry
            </div>
          </Link>
          <Link to="/pit">
            <div id="navbarItem4" onClick={() => ItemClick(4)}>
              Pit
            </div>
          </Link>
          <Link to="/sbs">
            <div id="navbarItem5" onClick={() => ItemClick(5)}>
              SBS
            </div>
          </Link>
          <Link to="/liquidity">
            <div id="navbarItem6" onClick={() => ItemClick(6)}>
              Liquidity
            </div>
          </Link>
          <Link to="/regulations">
            <div id="navbarItem7" onClick={() => ItemClick(7)}>
              Regulations
            </div>
          </Link>
          <a href="https://docs.tomb.finance/">
            <div id="navbarItem8" onClick={() => ItemClick(8)}>
              Docs
            </div>
          </a>
        </Navbar>
        <ConnectMenu>
          {addr !== "" ? (
            <WalletButton onClick={() => ShowWallet()}>
              MY WALLET
            </WalletButton>
          ) : (
            <Button onClick={() => Connect()}>
              Connect
            </Button>
          )}
        </ConnectMenu>
      </HeaderContent>

      <Menu
        styles={menuStyles}
        isOpen={menuIsOpen}
        onOpen={() => {
          setMenuOpen(true);
          setIsOpen(false);
        }}
        onClose={() => {
          setMenuOpen(false);
        }}
      >
        <MobileHeaderContent>
          <Link to="/">
            <div id="navbarItem1" onClick={() => ItemClick(1)}>
              Home
            </div>
          </Link>
          <Link to="/cemetery">
            <div id="navbarItem2" onClick={() => ItemClick(2)}>
              Cemetery
            </div>
          </Link>
          <Link to="/masonry">
            <div id="navbarItem3" onClick={() => ItemClick(3)}>
              Masonry
            </div>
          </Link>
          <Link to="/pit">
            <div id="navbarItem4" onClick={() => ItemClick(4)}>
              Pit
            </div>
          </Link>
          <Link to="/sbs">
            <div id="navbarItem5" onClick={() => ItemClick(5)}>
              SBS
            </div>
          </Link>
          <Link to="/liquidity">
            <div id="navbarItem6" onClick={() => ItemClick(6)}>
              Liquidity
            </div>
          </Link>
          <Link to="/regulations">
            <div id="navbarItem7" onClick={() => ItemClick(7)}>
              Regulations
            </div>
          </Link>
          <a href="https://docs.tomb.finance/">
            <div id="navbarItem8" onClick={() => ItemClick(8)}>
              Docs
            </div>
          </a>
          <div className="connect__btn">
            {addr !== "" ? (
              <WalletButton onClick={() => ShowWallet()} id="walletModal">
                MY WELLET
              </WalletButton>
            ) : (
              <Button onClick={() => Connect()} id="walletModal">
                CONNECT
              </Button>
            )}
          </div>
        </MobileHeaderContent>
      </Menu>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Wallet Modal"
      >
        <ModalContainer>
          <h2>Connect Wallet</h2>
          <span className="wallet-content" onClick={metamaskConnect}>
            <img src={MetamaskIcon} alt="metamask" />
            <span className="description">Metamask</span>
          </span>
          <div className="wallet-content">
            <img src={WalletIcon} alt="wallet" />
            <span className="description">WalletConnect</span>
          </div>
          <div className="wallet-content">
            <img src={CoinbaseIcon} alt="coinbase" />
            <span className="description">Coinbase Wallet</span>
          </div>
        </ModalContainer>
      </Modal>

      <Modal
        isOpen={walletModalIsOpen}
        onRequestClose={closeWalletModal}
        style={modalStyles}
        contentLabel="My wallet"
      >
        <ModalContainer>
          <h3>My Wallet</h3>
          <div className="my__wallet">
            <div className="my__wallet__item">
              <img src={CryptoTombImg} alt="my_walet_item"/>
              <div className="description">
                <h2>
                  {`0.0000`}
                </h2>
                {`TOMB Available`}
              </div>
            </div>
            <div className="my__wallet__item">
              <img src={CryptoTombShareImg} alt="my_walet_item"/>
              <div className="description">
                <h2>
                  {`0.0000`}
                </h2>
                {`TSHARE Available`}
              </div>
            </div>
            <div className="my__wallet__item">
              <img src={CryptoTombBondImg} alt="my_walet_item"/>
              <div className="description">
                <h2>
                  {`0.0000`}
                </h2>
                {`TBOND Available`}
              </div>
            </div>
          </div>
        </ModalContainer>
      </Modal>
    </HeaderContainer>
  );
};

export default Header;
