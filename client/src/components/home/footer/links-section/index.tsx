import { linksInfoType } from "@/lib/types";

const LinkSection = ({ linksInfo }: { linksInfo: linksInfoType }) => {
  const { title, links } = linksInfo;
  return (
    <>
      <div className="flex flex-col mt-4 mb-10 gap-2 lg:mt-0">
        <h2 className="text-white text-[1rem] poppins-semibold mb-4">
          {title}
        </h2>
        {links.map((link) => (
          <a
            key={link.name}
            className="text-[var(--grayish-violet)] poppins-medium block text-center hover:underline lg:text-start"
            href={link.link}
          >
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
};

export default LinkSection;
