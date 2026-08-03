"use client";

import { useState } from "react";
import { My } from "../_components";

type Status = "idle" | "submitting" | "done" | "error";

export default function DeleteAccountForm() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reason: reason || undefined }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("done");
        setMessage(data.message ?? "Your deletion request has been received.");
      } else {
        setStatus("error");
        setMessage(
          data.error ?? "Something went wrong. Please try again or email support."
        );
      }
    } catch {
      setStatus("error");
      setMessage(
        "Could not reach the server. Please try again, or email support@larlarbooks.com."
      );
    }
  };

  if (status === "done") {
    return (
      <div
        role="status"
        className="rounded-lg border border-green-600/40 bg-green-600/10 p-6 text-green-200"
      >
        <h3 className="mb-2 text-lg font-semibold">
          <My>တောင်းဆိုချက် လက်ခံရရှိပါပြီ</My>
          <span className="ml-2 text-sm font-normal text-green-300/70">
            Request received
          </span>
        </h3>
        <p className="mb-3 text-sm leading-relaxed">
          <My>
            သင့်ဖျက်သိမ်းရန် တောင်းဆိုချက်ကို လက်ခံရရှိပါပြီ။ ကျွန်ုပ်တို့အဖွဲ့မှ
            ဆောင်ရွက်ပြီး အီးမေးလ်ဖြင့် ပြန်လည် အကြောင်းကြားပါမည်။
          </My>
        </p>
        <p className="text-sm leading-relaxed text-green-300/80">{message}</p>
        <p className="mt-3 text-sm leading-relaxed text-green-300/80">
          <My>ပြန်ကြားချက် မရရှိပါက</My>{" "}
          <a
            href="mailto:support@larlarbooks.com"
            className="underline underline-offset-2"
          >
            support@larlarbooks.com
          </a>{" "}
          <My>သို့ ဆက်သွယ်ပါ။</My>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-[#ddd]"
        >
          <My>အကောင့် အီးမေးလ်</My>{" "}
          <span className="text-[#888]">(Account email)</span>{" "}
          <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-md border border-[#444] bg-[#111] px-3 py-2 text-[#eee] outline-none focus:border-[#9d6db8]"
        />
        <p className="mt-1 text-xs text-[#888]">
          <My>မှတ်ပုံတင်ရာတွင် အသုံးပြုခဲ့သော အီးမေးလ်လိပ်စာကို ဖြည့်ပါ။</My>{" "}
          Enter the email address you used to register.
        </p>
      </div>

      <div>
        <label
          htmlFor="reason"
          className="mb-1 block text-sm font-medium text-[#ddd]"
        >
          <My>အကြောင်းရင်း</My> <span className="text-[#888]">(Reason — optional)</span>
        </label>
        <textarea
          id="reason"
          rows={3}
          value={reason}
          maxLength={2000}
          onChange={(e) => setReason(e.target.value)}
          placeholder="ကျွန်ုပ်တို့ သိစေလိုသည်များ ရှိပါက ရေးသားပါ။"
          className="w-full resize-y rounded-md border border-[#444] bg-[#111] px-3 py-2 text-[#eee] outline-none focus:border-[#9d6db8]"
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-[#ccc]">
        <input
          type="checkbox"
          required
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-1"
        />
        <span>
          <My>
            ရက် ၃၀ စောင့်ဆိုင်းကာလ ပြီးဆုံးပြီးနောက် ကျွန်ုပ်၏ LarLar Books
            အကောင့်နှင့် ဆက်စပ်အချက်အလက်များကို အပြီးတိုင် ဖျက်သိမ်းရန်
            တောင်းဆိုခြင်း ဖြစ်ကြောင်းနှင့်၊ အထက်ဖော်ပြပါအတိုင်း အချို့မှတ်တမ်းများကို
            ဆက်လက် သိမ်းဆည်းထားနိုင်ကြောင်း နားလည်သဘောပေါက်ပါသည်။
          </My>
          <span className="mt-1 block text-xs text-[#888]">
            I understand that this submits a request to permanently delete my
            LarLar Books account and associated data after a 30-day grace period,
            and that some records may be retained as described above.
          </span>
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || !confirmed}
        className="w-full rounded-md bg-[#67377e] px-4 py-2.5 font-medium text-white transition-colors hover:bg-[#7a4494] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? (
          <My>ပေးပို့နေသည်…</My>
        ) : (
          <>
            <My>ဖျက်သိမ်းရန် တောင်းဆိုမည်</My>
            <span className="ml-2 text-sm opacity-80">
              (Submit deletion request)
            </span>
          </>
        )}
      </button>
    </form>
  );
}
