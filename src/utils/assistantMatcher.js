import { AI_ASSISTANT_QA, AI_ASSISTANT_FALLBACK } from "../constants/data";

/**
 * Very small keyword-scoring matcher — no backend, no LLM call.
 * Picks the QA entry with the most keyword hits in the input.
 */
export function matchAssistantResponse(input) {
  const normalized = input.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const entry of AI_ASSISTANT_QA) {
    const score = entry.keywords.reduce(
      (acc, kw) => (normalized.includes(kw) ? acc + 1 : acc),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore > 0 ? best.a : AI_ASSISTANT_FALLBACK;
}
