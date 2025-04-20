import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon, ChevronRightIcon, LightbulbIcon } from "lucide-react";
import { Canvas } from "./Canvas";
import { LivePreview, LiveProvider } from "react-live";
import { main } from "./prompt";
import { useState } from "react";

export function Solid() {
  // Chemical compounds data
  const chemicals = [
    { id: 1, name: "염화칼슘", letter: "a" },
    { id: 2, name: "탄산나트륨", letter: "a" },
    { id: 3, name: "질산바륨", letter: "a" },
    { id: 4, name: "황산칼륨", letter: "a" },
  ];

  // Friend questions data
  const friendQuestions = [
    {
      name: "시은친구",
      question: '"A랑 B를 동시에 넣고 C를 조금 넣어줘!"',
      action: "눌러서 함께 실험해보기",
    },
    {
      name: "준서친구",
      question: '"B는 아주아주아주조금, A는 엄청엄청 많이!"',
      action: "눌러서 함께 실험해보기",
    },
  ];

  // Pagination dots
  const dots = [1, 2, 3, 4];

  const [settings, setSettings] = useState({
    temperature: 25,
  });

  const scope = {
    Canvas,
    ...settings,
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[820px] h-[1180px]">
        <div className="relative h-[1180px]">
          {/* Background */}
          <div className="absolute w-[820px] h-[1180px] top-0 left-0 bg-[#c4e2ff] rotate-180">
            <img
              className="absolute w-[820px] h-[658px] top-[522px] left-0 -rotate-180"
              alt="Subtract"
              src="/img/subtract.svg"
            />
          </div>

          {/* Character image */}
          <img
            className="absolute w-[172px] h-36 top-[184px] left-[93px]"
            alt="Character"
            src="/img/character.svg"
          />

          {/* Main explanation text */}
          <div className="inline-flex items-center justify-center absolute top-[84px] left-[95px]">
            <p className="relative w-fit mt-[-1.00px] font-medium text-lg leading-[27px] text-[#030303] tracking-[0]">
              앙금은 물에 녹지 않고 생기는 고체로, 액체끼리 섞었을 때 갑자기
              뿌연 덩어리처럼 보여요.
              <br />두 액체 안의 이온이 만나서 물에 안 녹는 물질이 생기면 그게
              앙금이에요.
              <br />
              색이 다른 앙금이 생겨서 실험하면 눈으로 바로 변화를 볼 수 있어
              재미있어요!
            </p>
          </div>

          {/* Separator line */}
          <Separator className="absolute w-[636px] h-0.5 top-[175px] left-[94px]" />

          {/* Header green background */}
          <div className="w-[756px] h-[66px] top-0 bg-[#eaf5ca] rounded-[0px_0px_30px_0px] absolute left-0" />

          {/* Title section with icon */}
          <div className="inline-flex items-center gap-[5px] absolute top-5 left-16">
            <div className="relative w-[53.34px] h-[54.27px]">
              <div className="relative w-[47px] h-12 top-[3px] left-[3px]">
                <div className="relative h-12">
                  <div className="absolute w-9 h-9 top-[11px] left-[11px] bg-[#ffc300] rounded-[18.05px]" />
                  <div className="absolute w-9 h-9 top-[9px] left-0 bg-[#fff200] rounded-[18.05px]" />
                  <div className="absolute w-9 h-9 top-0 left-[11px] bg-[#ffd800] rounded-[18.05px]" />
                </div>
              </div>
            </div>

            <div className="flex w-[170px] h-[46px] items-center justify-center gap-2.5 px-[15px] py-[5px] relative bg-white rounded-[10px]">
              <div className="relative w-fit mt-[-2.00px] ml-[-1.50px] mr-[-1.50px] font-bold text-transparent text-2xl tracking-[0] leading-[38.4px] whitespace-nowrap">
                <span className="text-[#ffc300]">앙금 생성</span>
                <span className="text-[#030303]">이란?</span>
              </div>
            </div>
          </div>

          {/* Small image */}
          <img
            className="absolute w-10 h-7 top-[197px] left-[68px]"
            alt="Image"
            src="/img/image-3.svg"
          />

          {/* Simulation section */}
          <Card className="flex w-[692px] h-[265px] items-center justify-center absolute top-[279px] left-16 rounded-2xl">
            <CardContent className="flex items-center justify-center w-full h-full p-0">
              <LiveProvider
                code={"render(<Canvas temperature={temperature} />)"}
                scope={scope}
                noInline={true}
              >
                <LivePreview />
              </LiveProvider>
            </CardContent>
          </Card>

          {/* Start experiment message */}
          <div className="flex flex-col w-[471px] h-[75px] items-center justify-center gap-2.5 px-[60px] py-[9px] absolute top-[190px] left-[273px]">
            <img
              className="absolute w-[473px] h-[77px] -top-px -left-px"
              alt="Speech bubble"
              src="/img/union.svg"
            />

            <div className="flex flex-col w-[340px] items-center relative flex-[0_0_auto]">
              <h3 className="relative self-stretch mt-[-1.00px] font-bold text-[#030303] text-xl text-center tracking-[0] leading-[32.0px]">
                지금부터 실험을 시작해볼까요?
              </h3>

              <p className="relative self-stretch font-medium text-[#6a6a6a] text-sm tracking-[0] leading-[22.4px]">
                앞에서 배운 내용을 떠올리며, 아래 버튼을 눌러 실험해보세요!
              </p>
            </div>
          </div>

          {/* Vector image */}
          <img
            className="absolute w-[54px] h-[30px] top-[260px] left-[107px]"
            alt="Vector"
            src="/img/vector-13.svg"
          />

          {/* Color precipitation section */}
          <Card className="absolute w-[692px] h-[240px] top-[554px] left-16 rounded-2xl">
            <CardContent className="p-3">
              <div className="flex flex-col w-[362px] items-center mx-auto">
                <div className="flex flex-col items-start relative self-stretch w-full">
                  <h3 className="relative self-stretch mt-[-1.00px] font-bold text-[#030303] text-xl text-center tracking-[0] leading-[32.0px]">
                    아래는 어떤 색깔 앙금이 나올까요?
                  </h3>
                  <p className="relative self-stretch font-medium text-[#6a6a6a] text-sm tracking-[0] leading-[22.4px]">
                    궁금한 재료를 골라 실험해보세요! 결과가 화면 위에 바로
                    나타나요.
                  </p>
                </div>
              </div>

              {/* Chemical compounds */}
              <div className="flex justify-between mt-4">
                {chemicals.map((chemical) => (
                  <div
                    key={chemical.id}
                    className="relative w-[139px] h-[92px]"
                  >
                    <div className="w-[139px] h-[82px] top-2.5 bg-white rounded-[9.8px] border-[1.23px] border-solid border-[#c7c7c7] absolute left-0" />
                    <Badge className="flex flex-col w-6 h-6 items-center justify-center absolute top-0 left-[54px] bg-[#1a48ff] rounded-[12.25px]">
                      <span className="font-medium text-white text-[14.7px] text-center tracking-[0] leading-[23.5px] whitespace-nowrap">
                        {chemical.letter}
                      </span>
                    </Badge>
                    <p className="absolute w-[90px] top-[38px] left-6 font-bold text-xl text-center leading-[32.0px] whitespace-nowrap text-[#030303] tracking-[0]">
                      {chemical.name}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application section */}
          <Card className="absolute w-[692px] h-[357px] top-[805px] left-16 rounded-2xl">
            <CardContent className="p-6 relative">
              {/* Application badge */}
              <div className="flex flex-col w-[73px] h-[82px] items-start gap-2.5 px-1.5 py-[26px] absolute top-px left-[13px]">
                <img
                  className="absolute w-[78px] h-[87px] -top-0.5 -left-0.5"
                  alt="Subtract"
                  src="/img/subtract-1.svg"
                />
                <span className="relative w-fit mt-[-1.00px] font-bold text-white text-sm tracking-[0] leading-[22.4px] whitespace-nowrap">
                  응용해보기
                </span>
              </div>

              <div className="flex flex-col w-[531px] items-center gap-4 mx-auto mt-5">
                <h3 className="relative self-stretch mt-[-1.00px] font-bold text-[#030303] text-xl text-center tracking-[0] leading-[32.0px]">
                  이번엔 직접 입력해볼까요? 아래를 클릭해주세요.
                </h3>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const query = e.currentTarget.query.value;
                    e.currentTarget.query.value = "";

                    const result = await main(query, JSON.stringify(settings));
                    const correctedResult = result
                      ?.replace("```json", "")
                      .replace("```", "");

                    console.log(query, correctedResult);
                    if (correctedResult) {
                      setSettings(JSON.parse(correctedResult));
                    }

                    return false;
                  }}
                  className="block w-full"
                >
                  <Input
                    name="query"
                    className="h-[52px] px-2.5 py-[15px] bg-white rounded-[10px] border-[2.5px] border-solid border-[#c7c7c7]"
                    placeholder="예시: A는 아주 조금만 섞고 C를 아주 많이 섞어줘."
                  />
                </form>
              </div>

              {/* Lightbulb tip */}
              <div className="absolute w-[598px] h-14 top-[148px] left-[47px]">
                <div className="flex w-[554px] h-[38px] items-center gap-[8.17px] pl-[25px] pr-[16.35px] py-[5px] absolute top-[9px] left-11 bg-white rounded-[8.17px] shadow-[var(--)]">
                  <p className="relative w-fit mt-[-1.32px] font-bold text-[#030303] text-lg tracking-[0] leading-[28.8px] whitespace-nowrap">
                    친구들이 궁금해 한 실험도 같이 해봐요!
                  </p>
                </div>

                <div className="flex w-14 h-14 items-center justify-center gap-2.5 px-1.5 py-[5px] absolute top-0 left-0 bg-white rounded-[28px] shadow-[var(--)]">
                  <LightbulbIcon className="w-[44.58px] h-[44.58px]" />
                </div>
              </div>

              {/* Friend questions */}
              <div className="flex flex-col w-[588px] items-start gap-1.5 absolute top-[220px] left-[52px]">
                {friendQuestions.map((friend, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="relative self-stretch w-full h-11 bg-white rounded-[7.92px] rotate-[0.11deg] shadow-[var(--)] justify-start px-6 hover:bg-gray-50"
                  >
                    <span className="font-medium text-[#030303] text-sm tracking-[0] leading-[22.4px] whitespace-nowrap">
                      <span>{friend.name} : </span>
                      <span className="font-semibold">{friend.question}</span>
                    </span>
                    <span className="absolute top-2.5 left-[438px] rotate-[-0.11deg] font-medium text-[#888888] text-sm tracking-[0] leading-[22.4px] whitespace-nowrap">
                      {friend.action}
                    </span>
                    <img
                      className="absolute w-6 h-6 top-[9px] left-[411px] rotate-[-0.11deg]"
                      alt="Touch app"
                      src={`/img/touch-app${index > 0 ? `-${index}` : ""}.png`}
                    />
                  </Button>
                ))}
              </div>

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute w-10 h-10 top-[249px] left-0 p-0"
              >
                <ChevronLeftIcon className="w-10 h-10" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute w-10 h-10 top-[249px] left-[652px] p-0"
              >
                <ChevronRightIcon className="w-10 h-10" />
              </Button>

              {/* Pagination dots */}
              <div className="inline-flex items-center gap-[9px] absolute top-[334px] left-[318px]">
                {dots.map((dot, index) => (
                  <div
                    key={index}
                    className={`relative w-2.5 h-2.5 rounded-[5px] ${
                      index === 0 ? "bg-[#c7c7c7]" : "bg-[#e4e4e4]"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Grade information */}
          <div className="absolute top-[33px] left-[630px] font-medium text-[#030303] text-sm tracking-[0] leading-[22.4px] whitespace-nowrap">
            2학년 1학기 1단원
          </div>

          {/* Character reactions */}
          <div className="inline-flex items-center gap-[9px] absolute top-[903px] left-[526px]">
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

          {/* UB Lab logo */}
          <img
            className="absolute w-[65px] h-[29px] top-[1127px] left-[383px]"
            alt="Image"
            src="/img/image.svg"
          />
        </div>
      </div>
    </div>
  );
}
