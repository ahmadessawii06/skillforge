import React from "react";
import { Ai_Header } from "../components/AI/Ai_Header";
import { Ai_Question } from "../components/AI/Ai_Question";
import { Ai_Answer } from "../components/AI/Ai_Answer";
export default function Ai() {
  return (
    <>
      <Ai_Header />
      <Ai_Question />
      <Ai_Answer />
    </>
  );
}
