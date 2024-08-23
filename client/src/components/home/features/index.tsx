import { cardType } from "@/lib/types";
import Card from "./card";

const Features = () => {
  const cards: cardType[] = [
    {
      icon: "/images/icon-brand-recognition.svg",
      title: "Brand Recognition",
      text: "Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.",
      tail: true,
    },
    {
      icon: "/images/icon-detailed-records.svg",
      title: "Detailed Records",
      text: "Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
      tail: true,
      customStyle: "lg:mt-[12rem]",
    },
    {
      icon: "/images/icon-fully-customizable.svg",
      title: "Fully Customizable",
      text: "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
      tail: false,
      customStyle: "lg:mt-[20rem]",
    },
  ];
  return (
    <div className="bg-[var(--grayish)]">
      <div className="flex flex-col items-center justify-center pb-20 max-w-[1366px] mx-auto">
        <h2 className="text-[var(--very-dark-blue)] mt-10  text-3xl text-center poppins-bold lg:text-start">
          Advanced Statistics
        </h2>
        <p className="text-[var(--grayish-violet)] text-lg text-center poppins-medium px-12 mt-3 mb-7 lg:-mb-20 lg:text-xl lg:max-w-[700px] lg:leading-[2rem]">
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>
        <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-14 lg:justify-center lg:max-w-[99%]">
          {cards.map((card: cardType) => (
            <Card key={card.title} cardInfo={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
