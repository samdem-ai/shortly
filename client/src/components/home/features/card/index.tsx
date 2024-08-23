import { cardType } from "@/lib/types";

const Card = ({ cardInfo }: { cardInfo: cardType }) => {
  const { icon, title, text, tail, customStyle } = cardInfo;
  return (
    <div
      className={`flex flex-col items-center justify-center bg-white mt-24 rounded-lg max-w-[80%] lg:w-[329px] lg:gap-2 ${customStyle} lg:relative`}
    >
      <div className="w-24 h-24 flex justify-center items-center rounded-full bg-[var(--dark-violet)] -mt-10 mb-10 lg:w-18 lg:h-18 lg:-ms-44 lg:mb-0">
        <img className="w-12" src={icon} />
      </div>
      <h3 className="text-[var(--very-dark-blue)] text-[1.4rem] text-center poppins-bold lg:text-start lg:w-full lg:px-6">
        {title}
      </h3>
      <p className="text-[var(--grayish-violet)] text-[1.2rem] leading-[1.6rem] text-center poppins-medium px-12 mt-3 mb-7 lg:text-start lg:text-[.9rem] lg:mt-0 lg:px-6">
        {text}
      </p>
      {tail && (
        <span className="w-2 h-24 bg-[var(--cyan)] -mb-24 lg:bg-transparent" />
      )}
      {tail && (
        <span className="hidden lg:block lg:absolute w-[3.5rem] h-2 top-[50%] left-[100%] bg-[var(--cyan)] -mb-24 " />
      )}
    </div>
  );
};

export default Card;
