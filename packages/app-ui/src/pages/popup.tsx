import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Controllers
import { sendMessage } from '@/lib/controllers/send-message';

export default function Popup() {
  const [messageResponse, setMessageResponse] = useState('');

  const sendMessageHandler = async () => {
    const response = await sendMessage('Hello from App UI');
    setMessageResponse(response.data);
  };

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />

      <button
        onClick={sendMessageHandler}
        className="my-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Send Message
      </button>
      <p className="my-2">Send Message Response: {messageResponse}</p>

      <div className="my-8 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <Link
          href="/tmp/redux"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Tmp{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Redux example page
          </p>
        </Link>
      </div>
    </main>
  );
}
