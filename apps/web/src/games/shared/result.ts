/** Games calculate their own rewards and report only the final result to the shell. */
export interface GameResult {
  stars: 0 | 1 | 2 | 3;
  metrics: { label: string; value: string }[];
}

export interface GameControls {
  restart: () => void;
}
