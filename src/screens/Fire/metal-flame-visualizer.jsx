import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const metalColors = {
  리튬: "#ff4d4d",
  나트륨: "#ffff66",
  칼륨: "#ff99ff",
  칼슘: "#ffcc99",
  구리: "#00ccff",
  스트론튬: "#ff3333",
  바륨: "#99ff66",
};

// Define data for experiment materials
const experimentMaterials = [
  {
    id: "a",
    element: "Li",
    color: "#ffc300",
    fullName: "리튬",
    flameColor: "빨간색",
  },
  {
    id: "b",
    element: "K",
    color: "#a900ff",
    fullName: "칼륨",
    flameColor: "보라색",
  },
  {
    id: "c",
    element: "Cu",
    color: "#49ff29",
    fullName: "구리",
    flameColor: "청록색",
  },
  {
    id: "d",
    element: "Na",
    color: "#ff0000",
    fullName: "나트륨",
    flameColor: "노란색",
  },
];

export function MetalFlameVisualizer() {
  const [selectedMetal, setSelectedMetal] = useState("리튬");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [stage, setStage] = useState(0);
  const [showSprayer, setShowSprayer] = useState(true);
  const [sprayerExit, setSprayerExit] = useState(false);
  const [sprayBursts, setSprayBursts] = useState([]);
  const [isSpraying, setIsSpraying] = useState(false);
  const [flameColor, setFlameColor] = useState("orange");
  const [flameReacting, setFlameReacting] = useState(false);
  const [reactiveFlames, setReactiveFlames] = useState([]);
  const [sparks, setSparks] = useState([]);
  const revertTimerRef = useRef(null);

  const triggerFlameColor = () => {
    return;
  };

  const startSpraying = () => {
    const burstCount = Math.floor(Math.random() * 3) + 3;
    const sprayDuration = 1500 + burstCount * 300;

    setIsSpraying(true);
    const bursts = Array.from({ length: burstCount }, (_, i) => i);
    bursts.forEach((b, i) => {
      const delay = 500 + i * 300;
      setTimeout(() => {
        setSprayBursts((prev) => [...prev, Date.now() + i]);
        setTimeout(() => {
          triggerFlameColor();
          setReactiveFlames((prev) => [
            ...prev,
            ...Array.from({ length: 10 }, () =>
              generateFlame(metalColors[selectedMetal])
            ),
          ]);
          generateSparks();
          setFlameReacting(true);
          clearTimeout(revertTimerRef.current);
          revertTimerRef.current = setTimeout(
            () => setFlameReacting(false),
            700
          );
        }, 300);
      }, delay);
    });

    setTimeout(() => {
      setIsSpraying(false);
      setTimeout(() => setSprayerExit(true), 200);
      setTimeout(() => {
        setStage(3);
        setShowSprayer(false);
        setIsVisualizing(false);
      }, 1700);
    }, sprayDuration);
  };

  const handleVisualize = (metal) => {
    if (isVisualizing) return; // 시각화 중이라면 클릭 무시

    setIsVisualizing(true); // 시각화 시작
    setSelectedMetal(metal);
    setStage(0);
    setShowSprayer(false);
    setSprayerExit(false);
    setSprayBursts([]);
    setIsSpraying(false);
    setFlameColor("orange");
    setSparks([]);

    setTimeout(() => setStage(1), 500);
    setTimeout(() => {
      setShowSprayer(true);
      setStage(2);
    }, 1000);
  };

  const generateFlame = (color) => {
    const angle = (Math.random() * Math.PI) / 4 - Math.PI / 8;
    const distance = (20 + Math.random() * 20) * 2.5;

    const startX = Math.cos(Math.random() * 2 * Math.PI) * (Math.random() * 20);
    const startY = Math.sin(Math.random() * 2 * Math.PI) * (Math.random() * 20);

    const flameAngle = angle * (180 / Math.PI) + (Math.random() - 0.5) * 10;

    return {
      id: Math.random(),
      x: startX,
      y: startY,
      offsetX: Math.cos(angle) * distance,
      offsetY: Math.sin(angle) * distance,
      angle: flameAngle,
      color,
    };
  };

  const generateSparks = () => {
    const newSparks = Array.from({ length: 10 }).map(() => ({
      id: Math.random(),
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 1) * 24,
    }));
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 800);
  };

  return (
    <>
      <Card className="flex w-[692px] h-[265px] absolute bg-white rounded-2xl shadow-none border-none">
        <CardContent className="flex items-center justify-center w-full h-full p-0">
          <div className="w-full h-[263px] flex items-center justify-center rounded-xl bg-black relative overflow-hidden border-none">
            {/* 불꽃 영역 */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-24 h-20 rounded-xl shadow-inner border border-white/20 bg-gradient-to-t from-gray-200/20 via-white/10 to-transparent backdrop-blur-sm">
              <div className="absolute inset-0 rounded-xl border-4 border-white/10" />
              <div className="absolute bottom-0 w-full h-1/3 bg-blue-200/30 rounded-b-xl backdrop-blur-sm z-10" />
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-full z-0 rounded-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #654321, #654321 2px, #3d2b1f 2px, #3d2b1f 4px)",
                  zIndex: 0,
                }}
              />
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-white/40 rounded-sm z-10" />

              <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 w-12 h-24 z-20">
                <motion.div
                  className="w-full h-full relative"
                  style={{
                    background: `radial-gradient(ellipse at bottom, ${
                      flameColor === "orange" ? "#3399ff" : flameColor
                    } 30%, transparent 90%)`,
                    borderRadius: "42% 58% 50% 50% / 65% 65% 35% 35%",
                    filter: "blur(2px)",
                    zIndex: 10,
                  }}
                  animate={{
                    scale: [1, 1.1, 0.95, 1],
                    opacity: [0.8, 1, 0.8],
                    y: [0, -2, 0, -1, 0],
                    rotate: [0, 1, -1, 0],
                    borderRadius: [
                      "42% 58% 50% 50% / 65% 65% 35% 35%",
                      "48% 52% 47% 53% / 60% 60% 40% 40%",
                      "50% 50% 48% 52% / 68% 68% 32% 32%",
                      "42% 58% 50% 50% / 65% 65% 35% 35%",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {sparks.map((spark) => (
                    <motion.div
                      key={spark.id}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `calc(50% + ${spark.x}px)`,
                        top: `calc(50% + ${spark.y}px)`,
                      }}
                      animate={{
                        opacity: [1, 0.6, 0],
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  ))}
                  {sparks.map((spark) => (
                    <motion.div
                      key={spark.id}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `calc(50% + ${spark.x}px)`,
                        top: `calc(50% + ${spark.y}px)`,
                      }}
                      animate={{
                        opacity: [1, 0.6, 0],
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  ))}

                  {reactiveFlames.map((flame) => (
                    <motion.div
                      key={flame.id}
                      className="absolute w-1 h-12"
                      style={{
                        left: `calc(50% + ${flame.x}px)`,
                        top: `calc(50% + ${flame.y}px)`,
                        borderRadius: "40% 60% 20% 80% / 50% 70% 30% 50%",
                        transform: `rotate(${flame.angle}deg)`,
                        background: `linear-gradient(to top, ${flame.color}, transparent)`,
                        filter: "blur(8px)",
                        boxShadow: `0 0 ${4 + Math.random() * 12}px ${
                          2 + Math.random() * 8
                        }px ${flame.color}40`,
                      }}
                      initial={{
                        opacity: 0.9,
                        scale: 0.7,
                        rotate: 0,
                        filter: "blur(4px)",
                      }}
                      animate={{
                        opacity: 0,
                        scale: [1, 1.1, 0.9, 1],
                        x: flame.offsetX,
                        y: flame.offsetY,
                        rotate: [0, 5, -6, 3, 20],
                        backgroundColor: [
                          flame.color,
                          flame.color,
                          "#00000000",
                        ],
                        filter: ["blur(2px)", "blur(6px)"],
                      }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                        times: [0, 0.15, 0.4, 0.7, 1],
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* 분무기 애니메이션 */}
            <AnimatePresence>
              {stage === 2 && showSprayer && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={
                    sprayerExit ? { x: -400, opacity: 0 } : { x: 0, opacity: 1 }
                  }
                  exit={{ x: -400, opacity: 0 }}
                  onAnimationComplete={() => {
                    if (!sprayerExit) startSpraying();
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute left-32 bottom-40 flex items-center justify-center scale-100"
                >
                  <div className="relative w-16 h-28 rotate-[23deg] origin-bottom-left">
                    <div className="absolute top-[-0.25rem] left-1/2 transform -translate-x-1/2 w-10 h-4 bg-gray-500 rounded-t-lg z-10" />
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gray-400 rounded-full z-10" />
                    <div
                      className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-20 bg-gray-300 rounded-b-full border-t-2 border-gray-400 z-0"
                      style={{
                        borderRadius: "60% 60% 40% 40% / 70% 70% 30% 30%",
                      }}
                    />
                    <div className="absolute top-1 left-[calc(50%+0.4rem)] w-2 h-8 bg-gray-600 rounded-full -rotate-45 z-0" />

                    {sprayBursts.map((burstKey) => (
                      <React.Fragment key={burstKey}>
                        {[...Array(80)].map((_, i) => {
                          const angle =
                            (i / 80) * (Math.PI / 10) - Math.PI / 20;
                          const distance = 280 + Math.random() * 40;
                          const x = Math.cos(angle) * distance;
                          const y = Math.sin(angle) * distance + 40;

                          return (
                            <motion.div
                              key={`${burstKey}-${i}`}
                              className="absolute w-2 h-2 rounded-full shadow-md"
                              style={{
                                backgroundColor: "#66ccff",
                                top: "6px",
                                left: "calc(100% + 2px)",
                                transform: "rotate(23deg)",
                              }}
                              initial={{ x: 0, y: 0, opacity: 1 }}
                              animate={{ x: x, y: y, opacity: 0 }}
                              transition={{
                                duration: 0.9 + Math.random() * 0.3,
                                ease: "easeOut",
                              }}
                            />
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Experiment materials section */}
      <Card className="absolute w-[692px] h-[186px] top-[275px] bg-white rounded-2xl">
        <CardContent className="p-0 h-full">
          <div className="flex flex-col w-[280px] h-[47px] items-center absolute top-2.5 left-[132px]">
            <div className="relative self-stretch mt-[-1.00px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#030303] text-xl text-center tracking-[0] leading-[32.0px]">
              실험 재료를 선택해보세요!
            </div>
            <div className="relative w-fit mb-[-5.62px] ml-[-7.60px] mr-[-7.60px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#6a6a6a] text-sm tracking-[0] leading-[22.4px] whitespace-nowrap">
              아래 버튼을 클릭하면,결과가 화면 위에 바로 나타나요.
            </div>
          </div>

          <div className="flex w-[478px] h-[94px] items-center gap-[15px] absolute top-[74px] left-[22px]">
            {experimentMaterials.map((material) => (
              <div
                key={material.id}
                className="relative w-[108px] h-[107px] mt-[-6.56px] mb-[-6.56px] cursor-pointer"
                onClick={() => handleVisualize(material.fullName)}
              >
                <div className="relative h-[107px]">
                  <div className="absolute w-[108px] h-[95px] top-3 left-0 bg-white rounded-[9.8px] border-[1.23px] border-solid border-[#c7c7c7]" />
                  <Badge className="flex flex-col w-[25px] h-[25px] items-center justify-center gap-[8.17px] px-[8.17px] py-0 absolute top-0 left-[42px] bg-[#1a48ff] rounded-[12.25px]">
                    <div className="relative w-fit mt-[-0.56px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[14.7px] text-center tracking-[0] leading-[23.5px] whitespace-nowrap">
                      {material.id}
                    </div>
                  </Badge>
                  <div
                    className={`flex flex-col w-11 h-11 justify-center gap-[12.11px] px-[13.32px] py-[2.42px] top-[38px] left-8 bg-[${material.color}] rounded-[21.79px] items-center absolute`}
                    style={{ backgroundColor: material.color }}
                  >
                    <div className="relative w-fit mt-[-1.34px] ml-[-1.03px] mr-[-1.03px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[24.2px] text-center tracking-[0] leading-[38.7px] whitespace-nowrap">
                      {material.element}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hint box */}
          <div className="absolute w-[164px] h-36 top-[30px] left-[513px]">
            <div className="relative h-36">
              <div className="w-[164px] h-[138px] top-1.5 rounded-[18px] border border-dashed border-[#ff0000] absolute left-0" />
              <Badge className="inline-flex items-center justify-center gap-[5.57px] px-[5.57px] py-0 absolute top-0 left-[9px] bg-[#ff0000] rounded-[2.78px]">
                <div className="relative w-fit mt-[-0.56px] [font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-[10.5px] text-center tracking-[0] leading-[16.8px] whitespace-nowrap">
                  실험 전 주목!
                </div>
              </Badge>
              <div className="absolute w-[145px] h-[98px] top-[27px] left-2.5">
                <div className="relative w-[147px] h-[106px] -top-px -left-0.5">
                  <div className="absolute w-[145px] top-0 left-0.5 [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#030303] text-[10px] tracking-[0] leading-[16.0px]">
                    금속을 태우면 어떤 색 불꽃이 나올까요? 지금부터 색깔을 잘
                    살펴보고 기억해주세요!
                  </div>
                  <div className="absolute w-[147px] h-[59px] top-[47px] left-0">
                    <Card className="absolute w-[145px] h-[50px] top-[9px] left-0.5 bg-white rounded-xl shadow-[var(--)]">
                      <CardContent className="p-0">
                        <div className="relative w-[134px] h-[35px] top-[7px] left-[11px]">
                          <div className="absolute top-0 left-0 [font-family:'Pretendard-Medium',Helvetica] font-medium text-transparent text-[8px] tracking-[0] leading-[12.8px] whitespace-nowrap">
                            <span className="text-[#030303]">리튬(Li) : </span>
                            <span className="text-[#ff0000]">빨간색</span>
                          </div>
                          <div className="absolute top-[22px] left-0 [font-family:'Pretendard-Medium',Helvetica] font-medium text-transparent text-[8px] tracking-[0] leading-[12.8px] whitespace-nowrap">
                            <span className="text-[#030303]">구리(Cu) : </span>
                            <span className="text-[#64cb52]">청록색</span>
                          </div>
                          <div className="absolute top-0 left-[62px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-transparent text-[8px] tracking-[0] leading-[12.8px] whitespace-nowrap">
                            <span className="text-[#030303]">
                              나트륨(Na) :{" "}
                            </span>
                            <span className="text-[#ffd447]">노란색</span>
                          </div>
                          <div className="absolute top-[22px] left-[62px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-transparent text-[8px] tracking-[0] leading-[12.8px] whitespace-nowrap">
                            <span className="text-[#030303]">칼륨(K) : </span>
                            <span className="text-[#b849f0]">보라색</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="absolute w-[25px] h-[15px] top-0.5 left-px rotate-[-11.14deg]">
                      <div className="relative w-[23px] h-[15px] bg-white rounded-[11.5px/7.5px] border border-solid border-[#c7c7c7]">
                        <div className="absolute -top-px left-[3px] [font-family:'Agbalumo',Helvetica] font-normal text-[#1a48ff] text-[8px] tracking-[0] leading-[12.8px] whitespace-nowrap">
                          Hint
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
