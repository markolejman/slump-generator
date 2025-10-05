"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Home() {
  const [fromValue, setFromValue] = useState<number>(1);
  const [toValue, setToValue] = useState<number>(75);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [scope, animate] = useAnimate();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const availableNumbers = useMemo(() => {
    const min = Math.min(fromValue, toValue);
    const max = Math.max(fromValue, toValue);
    const all: number[] = [];
    for (let n = min; n <= max; n++) all.push(n);
    return all.filter((n) => !history.includes(n));
  }, [fromValue, toValue, history]);

  const reset = useCallback(() => {
    setHistory([]);
    setCurrentNumber(null);
    setIsSpinning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const generate = useCallback(() => {
    if (fromValue >= toValue) {
      toast.error('"From" must be less than "To"');
      return;
    }
    if (availableNumbers.length === 0) {
      toast.success("All numbers generated!");
      return;
    }

    setIsSpinning(true);

    // Slot-machine spin effect: rapidly cycle numbers for ~2s
    timerRef.current = setInterval(() => {
      const min = Math.min(fromValue, toValue);
      const max = Math.max(fromValue, toValue);
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      setCurrentNumber(random);
    }, 50);

    // Finalize selection after 2 seconds
    const finalize = () => {
      const pick =
        availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // commit result first so UI updates even if animation is interrupted
      setCurrentNumber(pick);
      setHistory((h) => [pick, ...h]);
      setIsSpinning(false);
      // brief easing animation punch (fire-and-forget)
      animate("#number", { scale: [1, 1.15, 1] }, { duration: 0.35 });
    };

    timeoutRef.current = setTimeout(finalize, 2000);
  }, [fromValue, toValue, availableNumbers, animate]);

  // Submit on Enter or Space
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.code === "Space" || e.key === " ") {
        e.preventDefault();
        if (!isSpinning) generate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [generate, isSpinning]);

  return (
    <div
      ref={scope}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-3xl rounded-2xl bg-white/20 dark:bg-white/10 backdrop-blur-md shadow-xl border border-white/30 p-6 sm:p-8">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Markos bingo number generator
          </h1>
          <p className="text-white/80">
            Choose range and generate non-repeating numbers.
          </p>
        </div>

        <form
          className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isSpinning) generate();
          }}
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/90">From</label>
            <Input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(Number(e.target.value))}
              min={-9999}
              className="bg-white/70 text-gray-900 placeholder:text-gray-600"
              aria-label="From"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/90">To</label>
            <Input
              type="number"
              value={toValue}
              onChange={(e) => setToValue(Number(e.target.value))}
              min={-9999}
              className="bg-white/70 text-gray-900 placeholder:text-gray-600"
              aria-label="To"
            />
          </div>
          <div className="sm:col-span-2 grid grid-cols-2 gap-2 items-end">
            <Button type="submit" className="w-full" disabled={isSpinning}>
              Generate
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={reset}
              disabled={isSpinning}
            >
              Clear
            </Button>
          </div>
        </form>

        <div className="mt-8">
          <div className="flex items-center justify-center">
            <motion.div
              id="number"
              key={currentNumber ?? "placeholder"}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="text-white font-extrabold text-7xl sm:text-8xl leading-none select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] min-h-[3rem]"
            >
              {currentNumber ?? ""}
            </motion.div>
          </div>

          <div className="mt-6">
            <h3 className="text-white/90 font-medium mb-2">History</h3>
            {history.length === 0 ? (
              <p className="text-white/70">No numbers yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {history.map((n) => (
                  <span
                    key={n}
                    className="px-3 py-1 rounded-full bg-white/70 text-gray-900 font-semibold shadow-sm"
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
