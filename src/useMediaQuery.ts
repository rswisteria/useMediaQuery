import {useEffect, useState} from "react";

const useMediaQuery: (mediaQueryList: string[]) => string | null = (mediaQueryList) => {
  const [current, setCurrent] = useState();

  useEffect(() => {
    let mounted: boolean = true;
    let timeout: any = null;

    const getCurrentMedia: (mediaList: string[]) => string | null = (mediaList) => {
      let result = null;
      for (const media of mediaList) {
        if (window.matchMedia(media).matches) {
          result = media;
          break;
        }
      }
      return result;
    };

    const onResize: () => void = () => {
      // 500msに一度しかresizeイベントのcallbackを実行しないようにする
      if (timeout) {
        return;
      }

      const media = getCurrentMedia(mediaQueryList);
      if (current !== media) {
        setCurrent(media);
      }

      timeout = setTimeout(() => timeout = null, 500);
    };

    setCurrent(getCurrentMedia(mediaQueryList));
    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      window.removeEventListener("resize", onResize);
    };
  }, [mediaQueryList]);

  return current;
};
export default useMediaQuery;
