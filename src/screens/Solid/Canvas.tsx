import { useState, useEffect, useRef, useCallback, FC } from "react";

// 타입/인터페이스 정의
interface CompoundState {
  name: string;
  amount: number;
}
interface Ion {
  id: string;
  type: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  charge: number;
  compound: string;
}
interface Precipitate extends Ion {
  name: string;
  colorName: string;
  settled: boolean;
}

// Ion information: Defines properties for each ion type
const ions: Record<string, { charge: number; color: string }> = {
  // Cations (Positive Ions)
  "Na+": { charge: 1, color: "#FF9999" },
  "K+": { charge: 1, color: "#FF9999" },
  "Ca2+": { charge: 2, color: "#FF9999" },
  "Ba2+": { charge: 2, color: "#FF9999" },
  "Pb2+": { charge: 2, color: "#FF9999" },
  "Ag+": { charge: 1, color: "#FF9999" },
  "Cu2+": { charge: 2, color: "#FF9999" },

  // Anions (Negative Ions)
  "Cl-": { charge: -1, color: "#9999FF" },
  "S2-": { charge: -2, color: "#9999FF" },
  "NO3-": { charge: -1, color: "#9999FF" },
  "SO42-": { charge: -2, color: "#9999FF" },
  "CO32-": { charge: -2, color: "#9999FF" },
  "I-": { charge: -1, color: "#9999FF" },
  "Br-": { charge: -1, color: "#9999FF" },
};

// Soluble compound information
const compounds: Record<
  string,
  { cation: string; anion: string; precipitate: boolean }
> = {
  NaCl: { cation: "Na+", anion: "Cl-", precipitate: false },
  KCl: { cation: "K+", anion: "Cl-", precipitate: false },
  CaCl2: { cation: "Ca2+", anion: "Cl-", precipitate: false },
  BaCl2: { cation: "Ba2+", anion: "Cl-", precipitate: false },
  "Pb(NO3)2": { cation: "Pb2+", anion: "NO3-", precipitate: false },
  AgNO3: { cation: "Ag+", anion: "NO3-", precipitate: false },
  Na2S: { cation: "Na+", anion: "S2-", precipitate: false },
  K2S: { cation: "K+", anion: "S2-", precipitate: false },
  NaNO3: { cation: "Na+", anion: "NO3-", precipitate: false },
  KNO3: { cation: "K+", anion: "NO3-", precipitate: false },
  "Ca(NO3)2": { cation: "Ca2+", anion: "NO3-", precipitate: false },
  "Ba(NO3)2": { cation: "Ba2+", anion: "NO3-", precipitate: false },
  Na2SO4: { cation: "Na+", anion: "SO42-", precipitate: false },
  K2SO4: { cation: "K+", anion: "SO42-", precipitate: false },
  CuSO4: { cation: "Cu2+", anion: "SO42-", precipitate: false },
  Na2CO3: { cation: "Na+", anion: "CO32-", precipitate: false },
  K2CO3: { cation: "K+", anion: "CO32-", precipitate: false },
  NaI: { cation: "Na+", anion: "I-", precipitate: false },
  KI: { cation: "K+", anion: "I-", precipitate: false },
  NaBr: { cation: "Na+", anion: "Br-", precipitate: false },
  KBr: { cation: "K+", anion: "Br-", precipitate: false },
};

// Precipitate combination information with stoichiometry
export const precipitateInfo = {
  PbCl2: {
    cation: "Pb2+",
    anion: "Cl-",
    color: "#FFFFFF",
    colorName: "흰색",
    cationCount: 1,
    anionCount: 2,
  },
  AgCl: {
    cation: "Ag+",
    anion: "Cl-",
    color: "#FFFFFF",
    colorName: "흰색",
    cationCount: 1,
    anionCount: 1,
  },
  PbS: {
    cation: "Pb2+",
    anion: "S2-",
    color: "#000000",
    colorName: "검은색",
    cationCount: 1,
    anionCount: 1,
  },
  Ag2S: {
    cation: "Ag+",
    anion: "S2-",
    color: "#000000",
    colorName: "검은색",
    cationCount: 2,
    anionCount: 1,
  },
  CuS: {
    cation: "Cu2+",
    anion: "S2-",
    color: "#000000",
    colorName: "검은색",
    cationCount: 1,
    anionCount: 1,
  },
  CaSO4: {
    cation: "Ca2+",
    anion: "SO42-",
    color: "#FFFFFF",
    colorName: "흰색",
    cationCount: 1,
    anionCount: 1,
  },
  BaSO4: {
    cation: "Ba2+",
    anion: "SO42-",
    color: "#FFFFFF",
    colorName: "흰색",
    cationCount: 1,
    anionCount: 1,
  },
  PbSO4: {
    cation: "Pb2+",
    anion: "SO42-",
    color: "#FFFFFF",
    colorName: "흰색",
    cationCount: 1,
    anionCount: 1,
  },
  Ag2SO4: {
    cation: "Ag+",
    anion: "SO42-",
    color: "#FFFFFF",
    colorName: "흰색",
    cationCount: 2,
    anionCount: 1,
  },
  CaCO3: {
    cation: "Ca2+",
    anion: "CO32-",
    color: "#FFFFFF",
    colorName: "흰색",
    cationCount: 1,
    anionCount: 1,
  },
  BaCO3: {
    cation: "Ba2+",
    anion: "CO32-",
    color: "#FFFFFF",
    colorName: "흰색",
    cationCount: 1,
    anionCount: 1,
  },
  PbCO3: {
    cation: "Pb2+",
    anion: "CO32-",
    color: "#FFFFFF",
    colorName: "흰색",
    cationCount: 1,
    anionCount: 1,
  },
  Ag2CO3: {
    cation: "Ag+",
    anion: "CO32-",
    color: "#FFFF99",
    colorName: "연한 노란색",
    cationCount: 2,
    anionCount: 1,
  },
  PbI2: {
    cation: "Pb2+",
    anion: "I-",
    color: "#FFFF00",
    colorName: "노란색",
    cationCount: 1,
    anionCount: 2,
  },
  AgI: {
    cation: "Ag+",
    anion: "I-",
    color: "#FFFF00",
    colorName: "노란색",
    cationCount: 1,
    anionCount: 1,
  },
  PbBr2: {
    cation: "Pb2+",
    anion: "Br-",
    color: "#FFFFFF",
    colorName: "흰색",
    cationCount: 1,
    anionCount: 2,
  },
  AgBr: {
    cation: "Ag+",
    anion: "Br-",
    color: "#FFFF99",
    colorName: "연한 노란색",
    cationCount: 1,
    anionCount: 1,
  },
};

// Helper component to render chemical formulas with subscripts in React elements
const ChemFormula: FC<{ formula: string }> = ({ formula }) => {
  const parts = formula.split(/(\d+|[+\-]\d*|\d*[+\-])/); // Split by numbers or charge signs
  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null; // Skip empty strings
        if (/^\d+$/.test(part)) {
          // Number is likely subscript
          // Check previous part to avoid making charge numbers subscript
          const prevPart = parts[index - 1];
          if (prevPart && /[a-zA-Z)]$/.test(prevPart)) {
            // If previous part ends with letter or parenthesis
            return <sub key={index}>{part}</sub>;
          } else {
            return part; // Part of charge or coefficient
          }
        } else if (/[+\-](\d*)$/.test(part) || /^\d*[+\-]$/.test(part)) {
          // Charge is superscript
          // Extract text and charge parts if combined (e.g., "SO42-")
          const match = part.match(/([a-zA-Z]+)(\d*[+\-]?)$/);
          if (match && match[1] && match[2]) {
            return (
              <>
                <ChemFormula formula={match[1]} />
                <sup key={index}>{match[2]}</sup>
              </>
            );
          }
          return <sup key={index}>{part}</sup>;
        }
        return part; // Regular text
      })}
    </>
  );
};

// Function to get a contrasting text color (black or white) based on background hex color
function getContrastYIQ(hexcolor: string): string {
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
}

// Function to draw formatted text (sub/superscripts) on Canvas
function drawFormattedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  baseFontSize: number
): void {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const subFontSize = baseFontSize * 0.7;
  const superFontSize = baseFontSize * 0.7;
  const subOffset = baseFontSize * 0.3;
  const superOffset = -baseFontSize * 0.4;

  let currentX = x;
  const segments = [];

  // 개선된 파서: 아래첨자(숫자), 윗첨자(+, -, 2+, 3-, +, - 등)
  // 예: Ca2+, SO4^2-, Cl-, Pb2+
  // 1. 원자기호+숫자(아래첨자)
  // 2. (숫자)?+/- (윗첨자)
  // 3. 나머지 일반 텍스트
  const regex = /([A-Za-z()]+)(\d+)|((\d+)?[+-])|([A-Za-z]+)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: "normal",
        text: text.substring(lastIndex, match.index),
      });
    }
    if (match[1] && match[2]) {
      // 원자기호+숫자 (아래첨자)
      segments.push({ type: "normal", text: match[1] });
      segments.push({ type: "subscript", text: match[2] });
    } else if (match[3]) {
      // (숫자)?+/- (윗첨자)
      segments.push({ type: "superscript", text: match[3] });
    } else if (match[5]) {
      // 일반 텍스트
      segments.push({ type: "normal", text: match[5] });
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ type: "normal", text: text.substring(lastIndex) });
  }

  // 전체 길이 계산
  let totalWidth = 0;
  segments.forEach((segment) => {
    if (segment.type === "subscript") {
      ctx.font = `${subFontSize}px Arial`;
    } else if (segment.type === "superscript") {
      ctx.font = `${superFontSize}px Arial`;
    } else {
      ctx.font = `bold ${baseFontSize}px Arial`;
    }
    totalWidth += ctx.measureText(segment.text).width;
  });
  currentX = x - totalWidth / 2;

  // 그리기
  segments.forEach((segment) => {
    let segmentY = y;
    if (segment.type === "subscript") {
      ctx.font = `${subFontSize}px Arial`;
      segmentY += subOffset;
    } else if (segment.type === "superscript") {
      ctx.font = `${superFontSize}px Arial`;
      segmentY += superOffset;
    } else {
      ctx.font = `bold ${baseFontSize}px Arial`;
    }
    ctx.fillText(
      segment.text,
      currentX + ctx.measureText(segment.text).width / 2,
      segmentY
    );
    currentX += ctx.measureText(segment.text).width;
  });
  ctx.restore();
}

// Function to calculate distance
function calculateDistance(
  obj1: { x: number; y: number },
  obj2: { x: number; y: number }
): number {
  return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));
}

// Constants for simulation parameters
const BASE_IONS_PER_UNIT = 1;
const GRAVITY = 0.1;
const FRICTION = 0.98;
const PRECIPITATE_LABEL_FONT_SIZE = 10;
const FIXED_PRECIPITATE_RADIUS = 25;
const FIXED_ION_RADIUS = 15;
const FIXED_ION_FONT_SIZE = 11;

const DEFAULT_ACTIVE_COMPOUNDS: CompoundState[] = [
  { name: "NaCl", amount: 0 },
  { name: "KCl", amount: 0 },
  { name: "CaCl2", amount: 0 },
  { name: "BaCl2", amount: 0 },
  { name: "Pb(NO3)2", amount: 10 },
  { name: "AgNO3", amount: 0 },
  { name: "Na2S", amount: 0 },
  { name: "K2S", amount: 0 },
  { name: "NaNO3", amount: 0 },
  { name: "KNO3", amount: 0 },
  { name: "Ca(NO3)2", amount: 0 },
  { name: "Ba(NO3)2", amount: 0 },
  { name: "Na2SO4", amount: 0 },
  { name: "K2SO4", amount: 0 },
  { name: "CuSO4", amount: 0 },
  { name: "Na2CO3", amount: 0 },
  { name: "K2CO3", amount: 0 },
  { name: "NaI", amount: 0 },
  { name: "KI", amount: 10 },
  { name: "NaBr", amount: 0 },
  { name: "KBr", amount: 0 },
];

export function Canvas({ temperature = 25 }: { temperature?: number }) {
  if (temperature <= 0) {
    temperature = 0;
  }

  const speed = temperature / 10;

  console.log(speed);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [activeCompounds, setActiveCompounds] = useState<CompoundState[]>(
    DEFAULT_ACTIVE_COMPOUNDS
  );
  const [simulationIons, setSimulationIons] = useState<Ion[]>([]);
  const [precipitates, setPrecipitates] = useState<Precipitate[]>([]);
  const [isRunning] = useState(true);
  const [containerSize, setContainerSize] = useState({
    width: 690,
    height: 263,
  });

  // Effect to update container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: Math.min(800, containerRef.current.clientWidth),
          height: 263,
        });
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 캔버스 해상도 선명하게: devicePixelRatio 적용
  useEffect(() => {
    const dpr = window.devicePixelRatio || 1;
    const canvas = canvasRef.current;
    if (canvas) {
      // 실제 픽셀 해상도 조정
      canvas.width = containerSize.width * dpr;
      canvas.height = containerSize.height * dpr;
      // CSS 크기는 논리적 크기로 유지
      canvas.style.width = `${containerSize.width}px`;
      canvas.style.height = `${containerSize.height}px`;
      // 컨텍스트 스케일 적용
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
        ctx.scale(dpr, dpr);
      }
    }
  }, [containerSize]);

  // Reset simulation
  const resetSimulation = useCallback(() => {
    setActiveCompounds(DEFAULT_ACTIVE_COMPOUNDS);
    setSimulationIons([]);
    setPrecipitates([]);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#E6F7FF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // 컴포넌트 마운트 시 초기 캔버스 배경 그리기
  useEffect(() => {
    resetSimulation();
  }, [resetSimulation]);

  // Effect to generate ions
  useEffect(() => {
    if (activeCompounds.length === 0) {
      setSimulationIons([]);
      setPrecipitates([]);
      return;
    }

    let newIons: Ion[] = [];
    activeCompounds.forEach(({ name: compoundName, amount }) => {
      const compound = compounds[compoundName];
      if (!compound) return;

      const cationType = compound.cation;
      const anionType = compound.anion;
      const cationInfo = ions[cationType];
      const anionInfo = ions[anionType];

      if (!cationInfo || !anionInfo) return; // Skip if ion info is missing

      const cationCountMultiplier = Math.abs(anionInfo.charge);
      const anionCountMultiplier = Math.abs(cationInfo.charge);
      const totalIonPairs = amount * BASE_IONS_PER_UNIT;

      for (let i = 0; i < totalIonPairs; i++) {
        for (let j = 0; j < cationCountMultiplier; j++) {
          newIons.push({
            id: `${compoundName}-${cationType}-${i}-${j}-${Math.random()}`,
            type: cationType,
            x:
              Math.random() * (containerSize.width - FIXED_ION_RADIUS * 2) +
              FIXED_ION_RADIUS,
            y:
              Math.random() * (containerSize.height - FIXED_ION_RADIUS * 2) +
              FIXED_ION_RADIUS,
            vx: (Math.random() - 0.5) * 1 * speed,
            vy: (Math.random() - 0.5) * 1 * speed,
            radius: FIXED_ION_RADIUS,
            color: cationInfo.color,
            charge: cationInfo.charge,
            compound: compoundName,
          });
        }

        for (let j = 0; j < anionCountMultiplier; j++) {
          newIons.push({
            id: `${compoundName}-${anionType}-${i}-${j}-${Math.random()}`,
            type: anionType,
            x:
              Math.random() * (containerSize.width - FIXED_ION_RADIUS * 2) +
              FIXED_ION_RADIUS,
            y:
              Math.random() * (containerSize.height - FIXED_ION_RADIUS * 2) +
              FIXED_ION_RADIUS,
            vx: (Math.random() - 0.5) * 1 * speed,
            vy: (Math.random() - 0.5) * 1 * speed,
            radius: FIXED_ION_RADIUS,
            color: anionInfo.color,
            charge: anionInfo.charge,
            compound: compoundName,
          });
        }
      }
    });

    setSimulationIons(newIons);
    setPrecipitates([]);
  }, [activeCompounds, containerSize, isRunning]);

  // Animation loop effect
  useEffect(() => {
    if (!isRunning || !canvasRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    // 논리 좌표계 기준으로 경계 체크
    const canvasHeight = containerSize.height;
    const canvasWidth = containerSize.width;

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "#E6F7FF";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      let currentIons = [...simulationIons];
      let currentPrecipitates = [...precipitates];
      let ionsToRemove = new Set();

      // --- Precipitate Movement & Drawing ---
      currentPrecipitates.forEach((p) => {
        // Movement logic
        if (!p.settled) {
          p.vy += GRAVITY;
          p.y += p.vy;
          p.x += p.vx;

          if (p.y + FIXED_PRECIPITATE_RADIUS >= canvasHeight) {
            p.y = canvasHeight - FIXED_PRECIPITATE_RADIUS;
            p.vy = 0;
            p.vx *= FRICTION;
            p.settled = true;
          }

          if (
            p.x + FIXED_PRECIPITATE_RADIUS > canvasWidth ||
            p.x - FIXED_PRECIPITATE_RADIUS < 0
          ) {
            p.vx *= -0.5;
            p.x = Math.max(
              FIXED_PRECIPITATE_RADIUS,
              Math.min(canvasWidth - FIXED_PRECIPITATE_RADIUS, p.x)
            );
          }
        } else {
          p.vx *= FRICTION;
          if (Math.abs(p.vx) < 0.1) p.vx = 0;
          p.x += p.vx;
          p.x = Math.max(
            FIXED_PRECIPITATE_RADIUS,
            Math.min(canvasWidth - FIXED_PRECIPITATE_RADIUS, p.x)
          );

          currentPrecipitates.forEach((otherP) => {
            if (p !== otherP && otherP.settled) {
              const dist = calculateDistance(p, otherP);
              const overlap = FIXED_PRECIPITATE_RADIUS * 2 - dist;

              if (overlap > 0) {
                const angle = Math.atan2(p.y - otherP.y, p.x - otherP.x);
                const moveX =
                  (overlap / 2) * Math.cos(angle) ||
                  (Math.random() - 0.5) * 0.5;
                p.x += moveX;
                otherP.x -= moveX;
                p.x = Math.max(
                  FIXED_PRECIPITATE_RADIUS,
                  Math.min(canvasWidth - FIXED_PRECIPITATE_RADIUS, p.x)
                );
                otherP.x = Math.max(
                  FIXED_PRECIPITATE_RADIUS,
                  Math.min(canvasWidth - FIXED_PRECIPITATE_RADIUS, otherP.x)
                );
              }
            }
          });
        }

        // Draw precipitate circle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, FIXED_PRECIPITATE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#444444";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Labels on Precipitate
        const textColor = getContrastYIQ(p.color);
        ctx.fillStyle = textColor;
        const fontSize = Math.min(
          PRECIPITATE_LABEL_FONT_SIZE,
          FIXED_PRECIPITATE_RADIUS * 0.6
        );

        // Use drawFormattedText for precipitate name
        drawFormattedText(ctx, p.name, p.x, p.y - fontSize * 0.6, fontSize);

        // Draw Color Name (simple text)
        ctx.font = `${fontSize * 0.9}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`(${p.colorName})`, p.x, p.y + fontSize * 0.7);
      });

      // --- Ion Movement and Collision Handling ---
      for (let i = 0; i < currentIons.length; i++) {
        const ion = currentIons[i];
        if (ionsToRemove.has(ion.id)) continue;

        // 이동
        ion.x += ion.vx;
        ion.y += ion.vy;

        // 경계 충돌 처리
        if (ion.x + FIXED_ION_RADIUS > canvasWidth) {
          ion.x = canvasWidth - FIXED_ION_RADIUS;
          ion.vx *= -1;
        } else if (ion.x - FIXED_ION_RADIUS < 0) {
          ion.x = FIXED_ION_RADIUS;
          ion.vx *= -1;
        }
        if (ion.y + FIXED_ION_RADIUS > canvasHeight) {
          ion.y = canvasHeight - FIXED_ION_RADIUS;
          ion.vy *= -1;
        } else if (ion.y - FIXED_ION_RADIUS < 0) {
          ion.y = FIXED_ION_RADIUS;
          ion.vy *= -1;
        }

        // 다른 이온과의 충돌 확인
        for (let j = i + 1; j < currentIons.length; j++) {
          const ion2 = currentIons[j];
          if (ionsToRemove.has(ion2.id)) continue;

          // 서로 다른 전하를 가진 이온 간의 충돌만 처리
          if (ion.charge * ion2.charge < 0) {
            const distance = calculateDistance(ion, ion2);
            if (distance < FIXED_ION_RADIUS * 2) {
              // 양이온과 음이온 구분
              const cation = ion.charge > 0 ? ion : ion2;
              const anion = ion.charge < 0 ? ion : ion2;

              // 앙금 조합 정보 확인
              let foundPrecipitate = null;
              for (const [name, info] of Object.entries(precipitateInfo)) {
                if (info.cation === cation.type && info.anion === anion.type) {
                  // 필요한 이온 개수만큼 주변에서 모으기
                  const neededCations = info.cationCount;
                  const neededAnions = info.anionCount;
                  // 현재 충돌한 이온 포함
                  const cations = [cation];
                  const anions = [anion];
                  // 주변에서 추가 이온 찾기 (반응에 이미 사용된 이온은 제외)
                  for (let k = 0; k < currentIons.length; k++) {
                    const other = currentIons[k];
                    if (ionsToRemove.has(other.id)) continue;
                    if (other.id === cation.id || other.id === anion.id)
                      continue;
                    if (
                      cations.length < neededCations &&
                      other.type === cation.type &&
                      calculateDistance(cation, other) < FIXED_ION_RADIUS * 5
                    ) {
                      cations.push(other);
                    }
                    if (
                      anions.length < neededAnions &&
                      other.type === anion.type &&
                      calculateDistance(anion, other) < FIXED_ION_RADIUS * 5
                    ) {
                      anions.push(other);
                    }
                  }
                  if (
                    cations.length === neededCations &&
                    anions.length === neededAnions
                  ) {
                    foundPrecipitate = { name, info, cations, anions };
                    break;
                  }
                }
              }

              if (foundPrecipitate) {
                // 이온 위치/속도 평균
                const allIons = [
                  ...foundPrecipitate.cations,
                  ...foundPrecipitate.anions,
                ];
                let sumX = 0,
                  sumY = 0,
                  sumVx = 0,
                  sumVy = 0;
                allIons.forEach((ion) => {
                  sumX += ion.x;
                  sumY += ion.y;
                  sumVx += ion.vx;
                  sumVy += ion.vy;
                  ionsToRemove.add(ion.id);
                });
                currentPrecipitates.push({
                  id: `${foundPrecipitate.name}-${Date.now()}`,
                  type: foundPrecipitate.name,
                  charge: 0,
                  compound: foundPrecipitate.name,
                  x: sumX / allIons.length,
                  y: sumY / allIons.length,
                  vx: sumVx / allIons.length / 2,
                  vy: sumVy / allIons.length / 2,
                  radius: FIXED_PRECIPITATE_RADIUS,
                  color: foundPrecipitate.info.color,
                  name: foundPrecipitate.name,
                  colorName: foundPrecipitate.info.colorName,
                  settled: false,
                });
              } else {
                // 일반 충돌
                const angle = Math.atan2(ion2.y - ion.y, ion2.x - ion.x);
                const overlap = FIXED_ION_RADIUS * 2 - distance;
                const moveX = (overlap / 2) * Math.cos(angle);
                const moveY = (overlap / 2) * Math.sin(angle);
                ion.x -= moveX;
                ion.y -= moveY;
                ion2.x += moveX;
                ion2.y += moveY;
                const tempVx = ion.vx;
                const tempVy = ion.vy;
                ion.vx = ion2.vx;
                ion.vy = ion2.vy;
                ion2.vx = tempVx;
                ion2.vy = tempVy;
              }
            }
          }
        }
      }

      // Filter out reacted ions and draw remaining
      let nextIons = currentIons.filter((ion) => !ionsToRemove.has(ion.id));
      nextIons.forEach((ion) => {
        // Draw Ion Circle
        ctx.fillStyle = ion.color;
        ctx.beginPath();
        ctx.arc(ion.x, ion.y, FIXED_ION_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // Draw Ion Label
        const textColor = getContrastYIQ(ion.color);
        ctx.fillStyle = textColor;

        // Use drawFormattedText for ion type
        drawFormattedText(ctx, ion.type, ion.x, ion.y, FIXED_ION_FONT_SIZE);
      });

      // Update state
      setSimulationIons(nextIons);
      setPrecipitates(currentPrecipitates);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isRunning, simulationIons, precipitates]);

  // JSX Rendering
  return (
    <div ref={containerRef} className="w-full h-full bg-blue-50">
      <canvas
        ref={canvasRef}
        width={containerSize.width}
        height={containerSize.height}
        className="block bg-blue-50"
      />
    </div>
  );
}

// Main React component
const PrecipitationSimulation: FC = () => {
  return <Canvas />;
};

export { getContrastYIQ, calculateDistance };
export default PrecipitationSimulation;
