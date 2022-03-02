import { useEffect } from "react";
import useStateRef from "@/hooks/use-state-ref";

import PrimaryButton from "@/ui/buttons/primary";

export default function NeedsApproval({
  approvalContract,
  handleApproveTx,
  onApproved,
  busy,
  setBusy,
  step,
  nextStep,
  timer,
}) {
  const [lastHash, setLastHash, ref] = useStateRef(undefined);
  const approvalSteps = ["Opening wallet", "Approving transfer"];

  useEffect(() => {
    if (!approvalContract || !handleApproveTx) return;
    approvalContract.on("Approval", handleApprovalEvent);

    return () => {
      approvalContract.removeAllListeners();
      clearTimeout(timer);
    };
  }, [approvalContract, handleApproveTx]);

  async function handleApprovalEvent(...rest) {
    const event = rest[rest.length - 1];

    if (event.transactionHash !== ref.current) return;

    setBusy(false);
    onApproved(...rest);
  }

  async function doTxApprove() {
    setBusy(true);

    const tx = await handleApproveTx();
    setLastHash(tx.hash);
    nextStep();
  }

  return (
    <PrimaryButton block disabled={busy} busy={busy} onClick={doTxApprove}>
      {!busy ? <span>Approve Transfer</span> : approvalSteps[step]}
    </PrimaryButton>
  );
}
