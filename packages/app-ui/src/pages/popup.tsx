import Image from 'next/image';
import { useRouter } from 'next/router';
// Controllers
import { respondQuestion } from '@/lib/controllers/send-message';
import type { AppRequest } from 'shared-lib';

export default function Popup() {
  const router = useRouter();
  const { hostTabId, question } = router.query as AppRequest & {
    hostTabId: string;
  };

  const confirmationHandler = async (isAccepted: boolean) => {
    respondQuestion(window, hostTabId, isAccepted);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />

      <div>
        <p className="my-2 text-center">{question}</p>

        <div>
          <button
            onClick={() => confirmationHandler(true)}
            className="mx-2 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Accept
          </button>
          <button
            onClick={() => confirmationHandler(false)}
            className="mx-2 rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </div>

      <div></div>
    </main>
  );
}
