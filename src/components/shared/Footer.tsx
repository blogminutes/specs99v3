import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaYoutube } from "react-icons/fa";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";

const Footer = () => {
  const { status } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="z-50 flex w-full items-center justify-center rounded-t-xl border-t  bg-bg-primary px-[min(8vh,8vw)] py-[min(8vh,8vw)] shadow-primary-sm max-[600px]:px-[min(3vh,3vw)]">
      <div className="flex flex-col justify-center gap-[min(4vh,4vh)]">
        <div className="flex w-fit  flex-col gap-[min(2vh,2vh)]">
          <Link href={"/"}>
            <Image
              src={"/specs99-logo.png"}
              alt="specs99 brand logo"
              width={288}
              height={64}
              className="h-auto w-[min(20vh,20vw)] max-[600px]:h-[min(8vh,8vw)] max-[600px]:w-[min(28vh,28vw)]"
            />
          </Link>{" "}
          <div className="flex justify-between gap-[min(2vh,2vw)]">
            <AiFillTwitterCircle className=" h-6 w-6" />
            <AiFillFacebook className=" h-6 w-6" />
            <AiFillInstagram className=" h-6 w-6" />
            <FaYoutube className=" h-6 w-6" />
          </div>
        </div>

        <div className="grid w-full border-collapse grid-cols-4 items-start gap-[min(6vh,6vw)] max-[900px]:grid-cols-2 max-[600px]:grid-cols-2">
          <div className="">
            <h2 className="text-lg font-medium"> Customer Care</h2>
            <ul className="text-sm">
              <li>
                <Link href="#">help@specs99.com</Link>
              </li>
              <li>
                <span>Contact No: 9889665599</span>
              </li>
              <li>
                <Link href="#">help@specs99.com</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="text-lg font-medium"> About Us</h2>
            <ul className="text-sm">
              <li>
                <Link href="#">Company</Link>
              </li>
              <li>
                <Link href="#">Terms & Condition</Link>
              </li>
              <li>
                <Link href="#">Delivery And Return Policy</Link>
              </li>
              <li>
                <Link href="#">Tardemark</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="text-lg font-medium"> Follow Us </h2>
            <ul className="text-sm">
              <li>
                <Link href="#">Twiter</Link>
              </li>
              <li>
                <Link href="#">Facebook</Link>
              </li>
              <li>
                <Link href="#">Instagram</Link>
              </li>
              <li>
                <Link href="#">Youtube</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="text-lg font-medium"> Address</h2>
            <ul className="text-sm">
              <li>
                <span>35, Defence Colony, Block A, Defence Colony</span>
              </li>
              <li>
                <span>Ghazipur, Uttar Pradesh</span>
              </li>
              <li>
                <span> 110024 - India</span>
              </li>
            </ul>
          </div>{" "}
        </div>
      </div>
    </nav>
  );
};

export default Footer;
