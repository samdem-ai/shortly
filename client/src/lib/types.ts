export type cardType = {
  icon: string;
  title: string;
  text: string;
  tail: boolean;
  customStyle?: string;
};
export type linksType = {
  name: string;
  link: string;
};

export type linksInfoType = {
  title: string;
  links: linksType[];
};

export type socialType = { link: string; icon: string };

export type loginInfoType = { email: string; password: string };

export type userInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type store = {
  userInfo: userInfo;
  setUserInfo: (userInfo: userInfo) => void;
};

export type urlType = {
  originalUrl: string;
  shortenedUrl: string;
  userId: string;
  __v: number;
  _id: string;
};
