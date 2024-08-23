import { Button } from "../../ui/button";

const Boost = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24 bg-[var(--dark-violet)] bg-[url('/images/bg-boost-mobile.svg')] bg-no-repeat bg-contain bg-right lg:bg-[url('/images/bg-boost-desktop.svg')] lg:bg-cover ">
      <h3 className="text-3xl poppins-bold text-white lg:text-4xl">
        Boost your links today
      </h3>
      <Button className="text-lg tracking-wider rounded-full py-7 px-10 bg-[var(--cyan)] poppins-bold">
        Get Started
      </Button>
    </div>
  );
};

export default Boost;
