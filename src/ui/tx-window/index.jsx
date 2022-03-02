import { useState, useEffect } from "react";
import useStateRef from "@/hooks/use-state-ref";
import Approval from "./needs-approval";
import PrimaryButton from "@/ui/buttons/primary";

const DELAY = 3500;

export default function TxWindow({
  eventName,
  action,
  handleApproveTx,
  handleConfirmTx,
  onApproved,
  onConfirmed,
  approvalContract,
  actionContract,
}) {
  const needsApproval = Boolean(handleApproveTx);
  const [approved, setApproved] = useState(false);

  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(undefined);
  const [lastHash, setLastHash, ref] = useStateRef(undefined);

  function nextStep() {
    setStep((prev) => (prev === 0 ? prev + 1 : 0));
  }

  const confirmSteps = ["Opening wallet", "Confirming"];

  useEffect(() => {
    console.dir({ actionContract });
    if (!actionContract) return;
    console.dir({ eventName });
    actionContract.on(eventName, handleConfirmationEvent);

    return () => {
      actionContract.removeAllListeners();
      clearTimeout(timer);
    };
  }, [actionContract]);

  async function handleConfirmationEvent(...rest) {
    const event = rest[rest.length - 1];
    console.dir({ event });
    if (event.transactionHash !== ref.current) return;
    onConfirmed(...rest);
  }

  async function doTxConfirm() {
    setBusy(true);
    const tx = await handleConfirmTx();
    console.dir({ tx });
    setLastHash(tx.hash);
    nextStep();
  }

  return needsApproval && !approved ? (
    <Approval
      {...{
        handleApproveTx,
        onApproved: () => {
          onApproved();
          setStep(0);
          setApproved(true);
        },
        approvalContract,
        busy,
        setBusy,
        step,
        nextStep,
        timer,
      }}
    />
  ) : (
    <PrimaryButton block disabled={busy} busy={busy} onClick={doTxConfirm}>
      {!busy ? <span>{action}</span> : confirmSteps[step]}
    </PrimaryButton>
  );
}
