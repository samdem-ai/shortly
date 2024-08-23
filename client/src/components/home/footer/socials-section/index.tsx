import { socialType } from "@/lib/types";

const SocialsSection = ({ social }: { social: socialType }) => {
  const { icon, link } = social;
  return (
    <>
      <a href={link}>
        <img src={icon} alt="social icon" />
      </a>
    </>
  );
};

export default SocialsSection;
