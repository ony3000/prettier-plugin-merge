export const counterComponentCodeResult = `import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { useState } from "react";

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({
  label = "Counter",
  onChange = undefined,
}: CounterProps) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((prevCount) => prevCount + 1);
    onChange?.(count + 1);
  };

  return (
    <CounterContainer>
      <span className="px-1">{label}</span>
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`;

export const nextEnvDTSCodeResult = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;

export const nextAPIRouteCodeResult = `// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
`;
