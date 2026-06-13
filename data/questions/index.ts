import type { Question } from "@/lib/types";
import { questions1201 } from "./1201";
import { questions1202 } from "./1202";
import { azureQuestions } from "@/data/azure/questions";

export const allQuestions: Question[] = [
  ...questions1201,
  ...questions1202,
  ...azureQuestions,
];
