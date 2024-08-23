import { Button } from "@/components/ui/button";
import { urlType } from "@/lib/types";
import { useState } from "react";
import copy from "copy-to-clipboard";

const LinkCard = ({ url }: { url: urlType }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    copy(import.meta.env.VITE_SERVER_BASE_URL + "/" + url.shortenedUrl);
    setIsCopied(true);
    const id = await setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    clearTimeout(id);
  };
  return (
    <div className="bg-[var(--grayish)]">
      <div className="lg:px-10  pb-5 max-w-[1366px] mx-auto my-0] flex flex-col justify-center items-center">
        <div className="flex flex-col bg-white rounded-lg p-3 w-full max-w-[80%] poppins-medium text-sm text-start lg:flex-row lg:items-center lg:justify-between lg:max-w-[95%]">
          <a
            target="_blank"
            className="whitespace-nowrap text-ellipsis overflow-hidden mb-4 lg:mb-0 hover:underline"
            href={url.originalUrl}
          >
            {url.originalUrl}
          </a>
          <span className="w-full h-[.8px] bg-[var(--gray)] lg:hidden" />
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center">
            <a
              target="_blank"
              className="whitespace-nowrap text-ellipsis overflow-hidden my-4 text-[var(--cyan)] hover:underline"
              href={
                import.meta.env.VITE_SERVER_BASE_URL + "/" + url.shortenedUrl
              }
            >
              {import.meta.env.VITE_SERVER_BASE_URL}/{url.shortenedUrl}
            </a>
            <Button
              className={`w-full text-[1rem] tracking-wider rounded-lg py-4 px-10 bg-[var(--cyan)] poppins-semibold hover:bg-[var(--dark-violet)] hover:text-[var(--grayish-violet)] lg:ms-0 lg:w-[20%] lg:py-4 mx-auto lg:text-[.9rem] lg:max-w-[100px] lg:rounded-md ${
                isCopied
                  ? "bg-[var(--dark-violet)] text-[var(--grayish-violet)]"
                  : ""
              }`}
              onClick={handleCopy}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
