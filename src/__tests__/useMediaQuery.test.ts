import { act, renderHook } from "@testing-library/react-hooks";
import useMediaQuery from "../useMediaQuery";

const fireResize = (width: number) => {
  (window.innerWidth as number) = width;
  window.dispatchEvent(new Event("resize"));
};

const sp = "(max-width: 767px)";
const pc = "(min-width: 768px)";

jest.useFakeTimers();

describe("useMatchMedia", () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      let matches: boolean = false;
      if (window.innerWidth <= 767) {
        matches = query === sp;
      } else {
        matches = query === pc;
      }
      return { matches };
    });
  });

  afterEach(() => {
    // @ts-ignore
    window.matchMedia.mockReset();
  });

  it("is expected to be defined", () => {
    expect(useMediaQuery).toBeDefined();
  });

  it("is expected to sp media query string when innerWidth is 767px", () => {
    const { result } = renderHook(() => useMediaQuery([sp, pc]));
    act(() => {
      fireResize(767);
    });
    expect(result.current).toBe(sp);
  });

  it("is expected to pc meida query string when innerWidth is 768px", () => {
    const { result } = renderHook(() => useMediaQuery([sp, pc]));
    act(() => {
      fireResize(768);
    });
    expect(result.current).toBe(pc);
  });

  it("is expected to change result by firing each resize events", () => {
    const { result } = renderHook(() => useMediaQuery([sp, pc]));
    act(() => {
      fireResize(768);
    });
    expect(result.current).toBe(pc);
    jest.advanceTimersByTime(1000);
    act(() => {
      fireResize(767);
    });
    expect(result.current).toBe(sp);
  });
});
