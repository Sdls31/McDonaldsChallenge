import { createContext, useContext, useState } from "react";

type UsedImages = Record<string, string | null>;

interface AvatarContextType {
  usedImages: UsedImages;
  setUsedImages: React.Dispatch<React.SetStateAction<UsedImages>>;
  isAvatar: boolean;
  setIsAvatar: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usedImages, setUsedImages] = useState<UsedImages>({});
  const [isAvatar, setIsAvatar] = useState<boolean>(true);

  return (
    <AvatarContext.Provider
      value={{ usedImages, setUsedImages, isAvatar, setIsAvatar }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = (): AvatarContextType => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
};
