import { linksInfoType, socialType } from "@/lib/types";
import Logo from "/images/logo-white.svg";
import LinkSection from "./links-section";
import SocialsSection from "./socials-section";

const Footer = () => {
  const links: linksInfoType[] = [
    {
      title: "Features",
      links: [
        {
          name: "Link Shortening",
          link: "#",
        },
        {
          name: "Branded Links",
          link: "#",
        },
        {
          name: "Analytics",
          link: "#",
        },
      ],
    },
    {
      title: "Resources",
      links: [
        {
          name: "Blog",
          link: "#",
        },
        {
          name: "Developers",
          link: "#",
        },
        {
          name: "Support",
          link: "#",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          name: "About",
          link: "#",
        },
        {
          name: "Our Team",
          link: "#",
        },
        {
          name: "Careers",
          link: "#",
        },
        {
          name: "Contact",
          link: "#",
        },
      ],
    },
  ];
  const socials: socialType[] = [
    {
      link: "#",
      icon: "/images/icon-facebook.svg",
    },
    {
      link: "#",
      icon: "/images/icon-twitter.svg",
    },
    {
      link: "#",
      icon: "/images/icon-pinterest.svg",
    },
    {
      link: "#",
      icon: "/images/icon-instagram.svg",
    },
  ];
  return (
    <footer className="bg-[var(--gray-dark-violet)] flex flex-col justify-center items-center pt-24 pb-20 lg:flex-row lg:justify-around lg:items-start">
      <img src={Logo} alt="logo" className="w-36 mb-12" />
      <div className="lg:flex lg:items-start lg:gap-32">
        <div className="text-center lg:flex lg:text-start lg:gap-20">
          {links.map((linkPart) => (
            <LinkSection key={linkPart.title} linksInfo={linkPart} />
          ))}
        </div>
        <div className="flex gap-5">
          {socials.map((social: socialType) => (
            <SocialsSection key={social.icon} social={social} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
