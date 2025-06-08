import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();
  const goFire = () => {
    navigate("/fire");
  };
  const goSolid = () => {
    navigate("/solid");
  };
  return (
    <div className="bg-white flex justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[820px] py-12 flex flex-col items-center">
        <div className="flex flex-col w-full max-w-[516px] items-center justify-center gap-16 mt-20">
          <div className="flex flex-col gap-[60px] w-full items-center">
            <div className="flex flex-col w-full max-w-[364px] gap-[34px] items-center">
              <div className="flex flex-col w-full items-center text-center">
                <h1 className="font-bold text-2xl leading-[38.4px] tracking-normal">
                  <span className="text-[#030303]">오늘은 </span>
                  <span className="text-[#4a35ff]">어떤 실험</span>
                  <span className="text-[#030303]">이 펼쳐질까요?</span>
                </h1>
                <p className="font-semibold text-xl text-[#888888] leading-[32px] tracking-normal">
                  아래 버튼을 눌러, 원하는 실험을 진행해보세요!
                </p>
              </div>

              <img
                className="w-[320.34px] h-[244.92px]"
                alt="Cartoon scientist with test tube"
                src="/img/s.svg"
              />
            </div>

            <div className="flex gap-5 w-full items-center justify-center">
              <Button
                onClick={goSolid}
                className="px-[47px] py-[15px] bg-[#ffc300] hover:bg-[#ffc300]/90 rounded-[30px] h-auto"
              >
                <span className="font-bold text-white text-2xl leading-[38.4px] tracking-normal whitespace-nowrap">
                  앙금 생성 실험실
                </span>
              </Button>
              <Button
                onClick={goFire}
                className="px-[47px] py-[15px] bg-[#ff6e39] hover:bg-[#ff6e39]/90 rounded-[30px] h-auto"
              >
                <span className="font-bold text-white text-2xl leading-[38.4px] tracking-normal whitespace-nowrap">
                  불꽃 반응 실험실
                </span>
              </Button>
            </div>
          </div>

          <footer className="flex flex-col w-[250px] gap-[8.33px] items-center mt-20">
            <div className="relative w-[96.16px] h-[43.16px]">
              <div className="relative w-24 h-[43px]">
                {/* Logo circles */}
                <img className="h-[43px]" alt="Logo" src="/img/logo.svg" />
              </div>
            </div>

            <p className="text-center font-medium text-[#888888] text-[10.6px] leading-[17px] tracking-normal">
              내맘대로 설계하는 나만의 온라인 실험실, UB Lab!
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
