import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { apiClient } from "@/lib/utils";
import { ADD_URL_ROUTE, GET_ALL_URLS_ROUTE } from "@/lib/constants";
import { useStore } from "@/lib/store";
import { urlType } from "@/lib/types";
import LinkCard from "./link-card";

const Shortener = () => {
  const [link, setLink] = useState("");
  const { userInfo } = useStore();
  const [urls, setUrls]: [urlType[], Dispatch<SetStateAction<urlType[]>>] =
    useState([
      {
        originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        shortenedUrl: "bN4vtEXT",
        userId: "66c7fda7373a316be3c8c4d3",
        __v: 0,
        _id: "66c8ff3fde4dcd960061f188",
      },
    ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLinks = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(GET_ALL_URLS_ROUTE, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUrls(response.data.urls.reverse());
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };
    if (userInfo.id) {
      getLinks();
    }
  }, [userInfo.id]);

  const [isValid, setIsValid] = useState(true);
  const handleShortenLink = async () => {
    let id;
    if (userInfo.id) {
      const urlPattern =
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/g;
      if (!urlPattern.test(link)) {
        setIsValid(false);
        toast.error("Please provide a valid url");
        id = setTimeout(() => {
          setIsValid(true);
        }, 2000);
        return;
      }
      setIsLoading(true);
      const response = await apiClient.post(
        ADD_URL_ROUTE,
        { url: link },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setUrls([response.data, ...urls]);

        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.error("Please login first to start shortening links.");
    }
    setLink("");
    clearTimeout(id);
  };

  return (
    <>
      <div className="half-gray">
        <div className="lg:px-10  pb-5 max-w-[1366px] mx-auto my-0]">
          <div className="mt-10 flex flex-col items-center gap-6 w-[80%] mx-auto bg-[var(--dark-violet)] px-3 py-6 rounded-xl outline-none poppins-medium bg-[url('/images/bg-shorten-mobile.svg')] bg-no-repeat bg-auto bg-right-top lg:bg-[url('/images/bg-shorten-desktop.svg')] lg:bg-cover lg:flex-row lg:justify-center lg:px-10 lg:py-10 lg:gap-6 lg:rounded-lg lg:w-[95%] transition-all duration-300">
            <Input
              className={`w-[80%] py-6 lg:flex-grow lg:py-7 lg:text-[1.1rem] ${
                !isValid ? "outline outline-4 outline-[var(--red)]" : ""
              }`}
              placeholder="Shorten a link here..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button
              disabled={isLoading ? true : false}
              onClick={handleShortenLink}
              className="w-[80%] text-lg tracking-wider rounded-lg py-6 px-10 bg-[var(--cyan)] poppins-bold  hover:bg-[#f2f2f2] hover:text-[var(--gray-dark-violet)] lg:ms-0 lg:w-[20%] lg:py-7"
            >
              {!isLoading ? "Shorten It!" : <div className="dot-flashing" />}
            </Button>
          </div>
        </div>
      </div>
      <div>
        {!isLoading &&
          urls.reverse().map((url) => <LinkCard key={url._id} url={url} />)}
      </div>
    </>
  );
};

export default Shortener;
