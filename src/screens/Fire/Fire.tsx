import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MetalFlameVisualizer } from "./metal-flame-visualizer";

// Define data for student questions
const studentQuestions = [
  {
    name: "은솔친구",
    question: '"분홍색이 나오는 물질은 없나요?"',
  },
  {
    name: "하람친구",
    question: '"금의 불꽃반응 색이 어떤지 궁금해요!!!!"',
  },
];

export const Fire = () => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[820px] h-[1180px]">
        <div className="relative h-[1180px]">
          {/* Background */}
          <div className="absolute w-[820px] h-[1180px] top-0 left-0 bg-[#c4e2ff]">
            <img
              className="absolute w-[820px] h-[658px] top-0 left-0"
              alt="Subtract"
              src="/img/subtract.svg"
            />
          </div>

          {/* Header section */}
          <div className="w-[756px] h-[65px] top-0 bg-[#eaf5ca] rounded-[0px_0px_30px_0px] absolute left-0" />

          <div className="inline-flex h-[72px] top-3 left-[55px] items-center absolute">
            <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
              <img
                className="relative w-[62.53px] h-[71.9px]"
                alt="Image"
                src="/img/image-5.svg"
              />

              <div className="flex w-[170px] h-[46px] items-center justify-center gap-2.5 px-[15px] py-[5px] relative bg-white rounded-[10px]">
                <div className="relative w-fit mt-[-2.00px] ml-[-1.50px] mr-[-1.50px] [font-family:'Pretendard-Bold',Helvetica] font-bold text-transparent text-2xl tracking-[0] leading-[38.4px] whitespace-nowrap">
                  <span className="text-[#ff6e39]">불꽃 반응</span>
                  <span className="text-[#030303]">이란?</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-[30px] left-[630px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#030303] text-sm tracking-[0] leading-[22.4px] whitespace-nowrap">
            2학년 1학기 1단원
          </div>

          {/* Main content */}
          <div className="inline-flex items-center justify-center absolute top-[84px] left-[95px]">
            <div className="relative w-fit mt-[-1.00px] text-[#030303] text-lg leading-[27px] [font-family:'Pretendard-Medium',Helvetica] font-medium tracking-[0]">
              불꽃 반응은 금속이 들어 있는 물질을 불에 태울 때 특별한 색깔의
              불꽃이 나오는 현상이예요.
              <br />
              금속 이온이 열을 받으면 에너지를 얻고 다시 원래 상태로 돌아오면서
              빛을 내게 되는데,
              <br />
              이때 나오는 불꽃의 색깔은 금속의 종류마다 다르게 나타나요.
            </div>
          </div>

          <Separator className="absolute w-[636px] h-0.5 top-[175px] left-[94px]" />

          <img
            className="absolute w-[172px] h-36 top-[184px] left-[93px]"
            alt="Img"
            src="/img/image-2.svg"
          />

          <img
            className="absolute w-10 h-7 top-[197px] left-[68px]"
            alt="Image"
            src="/img/image-3.svg"
          />

          <img
            className="absolute w-[54px] h-[30px] top-[260px] left-[107px]"
            alt="Vector"
            src="/img/vector-13.svg"
          />

          {/* Experiment start prompt */}
          <Card className="flex bg-transparent flex-col w-[471px] h-[75px] items-center justify-center absolute top-[190px] left-[273px] border-none shadow-none">
            <img
              className="absolute w-[473px] h-[77px] -top-px -left-px"
              alt="Union"
              src="/img/union.svg"
            />
            <CardContent className="flex flex-col w-[340px] items-center p-0">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Pretendard-Bold',Helvetica] font-bold text-[#030303] text-xl text-center tracking-[0] leading-[32.0px]">
                지금부터 실험을 시작해볼까요?
              </div>
              <div className="relative self-stretch [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#6a6a6a] text-sm tracking-[0] leading-[22.4px]">
                앞에서 배운 내용을 떠올리며, 아래 버튼을 눌러 실험해보세요!
              </div>
            </CardContent>
          </Card>

          {/* Simulation section */}
          <Card className="flex w-[692px] h-[265px] absolute top-[279px] left-16 bg-white rounded-2xl shadow-none border-none">
            <CardContent className="flex items-center justify-center w-full h-full p-0">
              <MetalFlameVisualizer />
            </CardContent>
          </Card>

          {/* Application section */}
          <Card className="absolute w-[692px] h-[357px] top-[749px] left-16 bg-white rounded-2xl">
            <CardContent className="p-0 h-full">
              <div className="flex flex-col w-[73px] h-[82px] items-start gap-2.5 px-1.5 py-[26px] absolute top-px left-[13px]">
                <img
                  className="absolute w-[78px] h-[87px] -top-0.5 -left-0.5"
                  alt="Subtract"
                  src="/img/subtract-1.svg"
                />
                <div className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-sm tracking-[0] leading-[22.4px] whitespace-nowrap">
                  응용해보기
                </div>
              </div>

              <div className="flex flex-col w-[531px] items-center gap-4 absolute top-[27px] left-[114px]">
                <div className="relative self-stretch mt-[-1.00px] [font-family:'Pretendard-Bold',Helvetica] font-bold text-[#030303] text-xl text-center tracking-[0] leading-[32.0px]">
                  이번엔 직접 입력해볼까요? 아래를 클릭해주세요.
                </div>
                <Input
                  className="h-[52px] px-2.5 py-[15px] bg-white rounded-[10px] border-[2.5px] border-solid border-[#c7c7c7]"
                  defaultValue="예시: 은이온을 불꽃반응시키면 무슨 색이 나오나요?"
                />
              </div>

              <div className="absolute w-[598px] h-14 top-[148px] left-[47px]">
                <Card className="flex w-[554px] h-[38px] items-center gap-[8.17px] pl-[25px] pr-[16.35px] py-[5px] absolute top-[9px] left-11 bg-white rounded-[8.17px] shadow-[var(--)]">
                  <CardContent className="p-0">
                    <div className="relative w-fit mt-[-1.32px] [font-family:'Pretendard-Bold',Helvetica] font-bold text-[#030303] text-lg tracking-[0] leading-[28.8px] whitespace-nowrap">
                      친구들이 궁금해 한 실험도 같이 해봐요!
                    </div>
                  </CardContent>
                </Card>
                <div className="inline-flex items-center gap-[9px] absolute top-1.5 left-[415px]">
                  <img
                    className="relative w-[63.5px] h-[45.25px] mt-[-0.81px]"
                    alt="Element"
                    src="/img/1.svg"
                  />
                  <img
                    className="relative w-[47.18px] h-[46.14px] mt-[-1.25px]"
                    alt="Image"
                    src="/img/image-4.svg"
                  />
                  <img
                    className="relative w-[59.5px] h-[45.63px] mt-[-1.00px] mr-[-1.25px]"
                    alt="Element"
                    src="/img/2.svg"
                  />
                </div>
                <div className="flex w-14 h-14 items-center gap-2.5 px-1.5 py-[5px] absolute top-0 left-0 bg-white rounded-[28px] shadow-[var(--)]">
                  <img
                    className="relative bg-transparent w-[44.58px] h-[44.58px] mr-[-0.58px]"
                    alt="Wb incandescent"
                    src="/img/wb-incandescent.png"
                  />
                </div>
              </div>

              <img
                className="absolute w-10 h-10 top-[249px] left-0"
                alt="Expand circle left"
                src="/img/expand-circle-left.png"
              />
              <img
                className="absolute w-10 h-10 top-[249px] left-[652px]"
                alt="Expand circle right"
                src="/img/expand-circle-right.png"
              />

              <div className="flex flex-col w-[588px] items-start gap-1.5 absolute top-[220px] left-[52px]">
                {studentQuestions.map((question, index) => (
                  <Card
                    key={index}
                    className="relative self-stretch w-full h-11 bg-white rounded-[7.92px] rotate-[0.11deg] shadow-[var(--)]"
                  >
                    <CardContent className="p-0">
                      <div className="absolute top-2.5 left-6 [font-family:'Pretendard-Medium',Helvetica] font-normal text-[#030303] text-sm tracking-[0] leading-[22.4px] whitespace-nowrap">
                        <span className="font-medium">{question.name} : </span>
                        <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold">
                          {question.question}
                        </span>
                      </div>
                      <div className="absolute top-2.5 left-[438px] rotate-[-0.11deg] text-[#888888] text-sm leading-[22.4px] whitespace-nowrap [font-family:'Pretendard-Medium',Helvetica] font-medium tracking-[0]">
                        눌러서 함께 실험해보기
                      </div>
                      <img
                        className="absolute w-6 h-6 top-[9px] left-[411px] rotate-[-0.11deg]"
                        alt="Touch app"
                        src={`/img/touch-app${
                          index > 0 ? `-${index}` : ""
                        }.png`}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="inline-flex items-center gap-[9px] absolute top-[334px] left-[318px]">
                <div className="bg-[#c7c7c7] relative w-2.5 h-2.5 rounded-[5px]" />
                <div className="bg-[#e4e4e4] relative w-2.5 h-2.5 rounded-[5px]" />
                <div className="bg-[#e4e4e4] relative w-2.5 h-2.5 rounded-[5px]" />
                <div className="bg-[#e4e4e4] relative w-2.5 h-2.5 rounded-[5px]" />
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <img
            className="absolute w-[65px] h-[29px] top-[1127px] left-[383px]"
            alt="Image"
            src="/img/image.svg"
          />
        </div>
      </div>
    </div>
  );
};
