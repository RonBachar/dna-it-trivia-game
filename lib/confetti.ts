type JSConfettiInstance = {
  addConfetti: (options?: {
    confettiColors?: string[];
    confettiNumber?: number;
  }) => Promise<void>;
};

let jsConfettiPromise: Promise<JSConfettiInstance> | null = null;

export function getJsConfetti() {
  jsConfettiPromise ??= import("js-confetti").then(({ default: JSConfetti }) => {
    return new JSConfetti() as JSConfettiInstance;
  });

  return jsConfettiPromise;
}

export const brandConfettiColors = ["#F4D03F", "#ffffff"];
