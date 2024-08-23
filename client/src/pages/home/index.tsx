import { Button } from "@/components/ui/button";
import HeroImage from "/images/illustration-working.svg";
import Shortener from "@/components/home/shortener";
import Features from "@/components/home/features";
import Boost from "@/components/home/boost";
import Footer from "@/components/home/footer";

const Home = () => {
  return (
    <>
      <div className="text-center poppins-medium lg:flex lg:items-center overflow-hidden max-w-[1366px] mx-auto">
        <div className="lg:flex lg:items-end lg:justify-end lg:order-2 lg:w-full ">
          <img
            className="order-2 w-[500px] lg:w-full xl:w-[650px] max-w-[1200px] ml-10 md:mx-auto md:my-0"
            src={HeroImage}
            alt="hero image"
          />
        </div>
        <div className="order-1 lg:flex lg:flex-col lg:items-start lg:max-w-[700px]">
          <h1 className="text-[var(--very-dark-blue)] py-6 px-10 text-4xl text-center poppins-bold leading-normal lg:text-start lg:text-[4.3rem]">
            More than just shorter links
          </h1>
          <p className="text-[var(--grayish-violet)] text-lg px-10 mb-7 lg:text-start lg:text-xl">
            Build your brand’s recognition and get detailed insights on how your
            links are performing.
          </p>
          <Button className="text-lg tracking-wider rounded-full py-7 px-10 bg-[var(--cyan)] poppins-bold lg:ms-10">
            Get Started
          </Button>
        </div>
      </div>
      <Shortener />
      <Features />
      <Boost />
      <Footer />
    </>
  );
};

export default Home;
