import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import TextField from "@/ui/forms/text-field";
import PrimaryButton from "@/ui/buttons/primary";

export default function Homepage() {
  const [locked, setLocked] = useState(false);
  const [pair, setPair] = useState(["AVAX", "Lemonade"]);
  const [balances, setBalances] = useState([50000, 50000]);

  const [swaps, setSwaps] = useState([]);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [labels, setLabels] = useState(["", ""]);

  function getAmount(balance1, balance2, amount) {
    const trade = Math.floor(k() / (parseFloat(balance1) + parseFloat(amount)));
    const diff = parseFloat(balance2) - trade;

    return diff;
  }

  function doSwap() {
    setBalances((prev) => [
      parseFloat(prev[0]) + parseFloat(amount1),
      parseFloat(prev[1]) - parseFloat(amount2),
    ]);
    setSwaps((prev) => [[amount1, amount2], ...prev]);
    setAmount1(0);
    setAmount2(0);
  }

  function k() {
    return balances[0] * balances[1];
  }

  return (
    <div className="w-1/2 mx-auto mt-16 ">
      <div className="p-8 bg-blue-800 border border-blue-800 shadow rounded-2xl">
        <div className="flex space-x-4 text-white">
          {locked ? (
            <>
              <div className="w-1/2 text-center">
                {balances[0]} {pair[0]}
              </div>
              <div className="w-1/2 text-center">
                {balances[1]} {pair[1]}
              </div>
            </>
          ) : (
            <>
              <TextField
                value={pair[0]}
                onChange={(label) => setPair((prev) => [label, prev[1]])}
              />

              <TextField
                value={pair[1]}
                onChange={(label) => setPair((prev) => [prev[0], label])}
              />
            </>
          )}
        </div>

        <div className="flex space-x-4">
          {locked ? (
            <div className="flex justify-center w-full mt-4 font-bold text-white">
              <div>K {k()}</div>
            </div>
          ) : (
            <>
              <TextField
                value={balances[0]}
                onChange={(amount) => setBalances((prev) => [amount, prev[1]])}
              />
              <TextField
                value={balances[1]}
                onChange={(amount) => setBalances((prev) => [prev[0], amount])}
              />
            </>
          )}
        </div>
      </div>

      <div className="my-4">
        {locked ? (
          <div className="w-full text-center">
            <a
              className="text-white cursor-pointer"
              onClick={() => setLocked(false)}>
              Reset
            </a>
          </div>
        ) : (
          <PrimaryButton
            onClick={() => {
              setLocked(true);
              setSwaps([]);
              setAmount1(0);
              setAmount2(0);
            }}>
            Lock
          </PrimaryButton>
        )}
      </div>

      {locked ? (
        <>
          <div className="p-8 mx-auto my-8 bg-blue-800 border border-blue-800 shadow rounded-2xl">
            <div className="flex justify-center text-white">
              <div className="w-1/2">
                <TextField
                  decorateAfter={() => <span>{pair[0]}</span>}
                  value={amount1}
                  onChange={(amount) => {
                    setAmount1(amount);
                    setLabels([`Trade your ${pair[0]} for our ${pair[1]}`, ""]);
                    setAmount2(getAmount(...balances, amount));
                  }}
                />
                {labels[0]}
              </div>

              <div className="flex items-center inline-block h-16 px-2 py-2 m-2 bg-blue-800 rounded-full">
                <ChevronLeftIcon className="w-5 h-5 text-white" />
                <ChevronRightIcon className="w-5 h-5 text-white" />
              </div>

              <div className="w-1/2">
                <TextField
                  value={amount2}
                  decorateAfter={() => <span>{pair[1]}</span>}
                  onChange={(amount) => {
                    setAmount2(amount);
                    setLabels(["", `Trade your ${pair[1]} for our ${pair[0]}`]);
                    setAmount1(getAmount(...balances, amount));
                  }}
                />
                {labels[1]}
              </div>
            </div>
          </div>

          <PrimaryButton onClick={doSwap}>Swap</PrimaryButton>

          <h3>Swaps</h3>
          {swaps.map((swap, i) => (
            <div
              key={i}
              className="flex items-center p-2 my-1 text-white bg-blue-800 border border-blue-800 rounded">
              <div className="flex-grow">{swap[0]}</div>
              <div>{swap[1]}</div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
