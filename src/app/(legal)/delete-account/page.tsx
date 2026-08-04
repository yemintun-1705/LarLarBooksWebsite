import type { Metadata } from "next";
import { My, MyBlock } from "../_components";
import DeleteAccountForm from "./DeleteAccountForm";

export const metadata: Metadata = {
  title: "Delete Your Account — LarLar Books",
  description:
    "Request permanent deletion of your LarLar Books account and data. No login or app install required.",
};

const deleted = [
  {
    my: "သင့်ကိုယ်ရေးအချက်အလက် — အမည်၊ အသုံးပြုသူအမည်၊ အီးမေးလ်၊ ဖုန်းနံပါတ်၊ မွေးသက္ကရာဇ်၊ ပရိုဖိုင်ဓာတ်ပုံနှင့် ကိုယ်ရေးအကျဉ်း။",
    en: "Your profile: name, username, email, phone number, date of birth, avatar, and bio.",
  },
  {
    my: "သင့်အကောင့်ဝင်ရောက်မှု အချက်အလက်များနှင့် အထောက်အထားစိစစ်မှု မှတ်တမ်းများ။",
    en: "Your login credentials and authentication records.",
  },
  {
    my: "သင့်စာဖတ်ခြင်းဆိုင်ရာ မှတ်တမ်းများ — တိုးတက်မှု၊ ဖတ်ရှုချိန်များ၊ စာမှတ်များ၊ အရောင်ခြယ်မှတ်သားချက်များ၊ မှတ်စုများနှင့် စာရင်းအင်းများ။",
    en: "Your reading activity: progress, sessions, bookmarks, highlights, notes, and reading stats.",
  },
  {
    my: "သင့်စာကြည့်တိုက်၊ စုစည်းမှုများ၊ ဖော်လိုလုပ်ထားသူများ၊ သုံးသပ်ချက်များ၊ မှတ်ချက်များနှင့် နှစ်သက်ရာ ဆက်တင်များ။",
    en: "Your library, collections, follows, reviews, comments, and preferences.",
  },
  {
    my: "မှတ်ပုံတင်ထားသော စက်ပစ္စည်းများနှင့် အသိပေးချက် ဆက်တင်များ။",
    en: "Registered devices and notification settings.",
  },
];

const timeline = [
  {
    my: "သင့်တောင်းဆိုချက်ကို အတည်ပြုပြီးနောက် သင့်အကောင့်သည် အပြီးတိုင် မဖျက်သိမ်းမီ ရက် ၃၀ စောင့်ဆိုင်းကာလ သို့ ဝင်ရောက်ပါမည်။",
    en: (
      <>
        After your request is confirmed, your account enters a{" "}
        <strong>30-day grace period</strong> before permanent deletion.
      </>
    ),
  },
  {
    my: "စောင့်ဆိုင်းကာလအတွင်း သတိပေး အီးမေးလ် သုံးစောင်အထိ ပေးပို့ပါမည်။ စိတ်ပြောင်းလဲပါက အက်ပ်သို့ ပြန်လည်ဝင်ရောက်ခြင်းဖြင့် ဖျက်သိမ်းမှုကို ရပ်တန့်ပြီး အကောင့်ကို ပြန်လည်ရယူနိုင်ပါသည်။",
    en: (
      <>
        During the grace period we send up to three reminder emails, and you can
        cancel the deletion and recover your account by signing back in.
      </>
    ),
  },
  {
    my: "ရက် ၃၀ ပြည့်ပြီးနောက် သင့်အကောင့်နှင့် ဆက်စပ်အချက်အလက်များကို အပြီးတိုင် ဖျက်သိမ်းမည်ဖြစ်ပြီး ပြန်လည်ရယူ၍ မရတော့ပါ။ အထက်ဖော်ပြပါ ငွေကြေးဆိုင်ရာ မှတ်တမ်းများသာ ခြွင်းချက် ဖြစ်ပါသည်။",
    en: (
      <>
        After 30 days, your account and associated data are permanently removed
        and cannot be recovered. Retained financial records (above) are the only
        exception.
      </>
    ),
  },
];

export default function DeleteAccountPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12 text-[#eeeeee]">
      <h1 className="mb-1 text-2xl font-bold">
        <My>သင့်အကောင့်ကို ဖျက်သိမ်းရန်</My>
      </h1>
      <p className="mb-1 text-lg text-[#aaa]">
        <My>LarLar Books · အကောင့်နှင့် အချက်အလက် ဖျက်သိမ်းခြင်း</My>
      </p>
      <p className="mb-8 text-sm text-[#777]">
        Delete Your Account · LarLar Books
      </p>

      {/* Intro */}
      <MyBlock className="mb-3 leading-relaxed text-[#ccc]">
        သင့်၏ LarLar Books အကောင့်နှင့် ဆက်စပ်အချက်အလက်များကို ဖျက်သိမ်းရန်
        ဤနေရာတွင် တောင်းဆိုနိုင်ပါသည်။ အကောင့်ဝင်ရန် သို့မဟုတ် အက်ပ်ကို
        ထည့်သွင်းထားရန် မလိုအပ်ပါ။ အောက်ပါ ဖောင်ကို ဖြည့်သွင်းပေးပါက
        ကျွန်ုပ်တို့အဖွဲ့မှ ဆောင်ရွက်ပေးပါမည်။
      </MyBlock>
      <p className="mb-8 leading-relaxed text-[#8a8a8a]">
        You can request deletion of your LarLar Books account and associated data
        here. You do <strong>not</strong> need to be logged in or have the app
        installed. Submit the form below and our team will process your request.
      </p>

      {/* What is deleted */}
      <section className="mb-8 rounded-lg border border-[#333] bg-[#1e1e1e] p-5">
        <h2 className="mb-3 text-lg font-semibold text-white">
          <My>ဖျက်သိမ်းမည့် အချက်အလက်များ</My>
          <span className="ml-2 text-sm font-normal text-[#777]">
            What is deleted
          </span>
        </h2>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[#bbb]">
          {deleted.map((d, i) => (
            <li key={i}>
              <My>{d.my}</My>
            </li>
          ))}
        </ul>
        <ul className="list-disc space-y-1 border-t border-[#2a2a2a] pl-5 pt-3 text-[13px] leading-relaxed text-[#888]">
          {deleted.map((d, i) => (
            <li key={i}>{d.en}</li>
          ))}
        </ul>
      </section>

      {/* What is retained */}
      <section className="mb-8 rounded-lg border border-[#333] bg-[#1e1e1e] p-5">
        <h2 className="mb-3 text-lg font-semibold text-white">
          <My>သိမ်းဆည်းထားမည့် အချက်အလက်များနှင့် အကြောင်းရင်း</My>
          <span className="ml-2 text-sm font-normal text-[#777]">
            What is retained, and why
          </span>
        </h2>
        <MyBlock className="mb-3 text-[15px] text-[#bbb]">
          ငွေကြေးဆိုင်ရာ မှတ်တမ်းများ — ငွေပေးချေမှုများ၊ ငွေတောင်းခံလွှာများနှင့်
          စာရေးဆရာများ၏ ဝင်ငွေမှတ်တမ်းများ — ကို ဥပဒေအရ လိုအပ်သည့် စာရင်းကိုင်နှင့်
          အခွန်ဆိုင်ရာ တာဝန်များအတွက် ဆက်လက် သိမ်းဆည်းထားပါမည်။ ဤမှတ်တမ်းများကို
          သင့်ကိုယ်ရေးအချက်အလက်နှင့် သီးခြားစီ ထားရှိပြီး၊ ဖျက်သိမ်းပြီးနောက်
          သင့်ကို ဖော်ထုတ်ရန် အသုံးမပြုပါ။
        </MyBlock>
        <p className="border-t border-[#2a2a2a] pt-3 text-[13px] leading-relaxed text-[#888]">
          Financial records — transactions, invoices, and author earnings — are
          retained for statutory accounting and tax obligations, as required by
          law. These records are kept separately from your profile and are not
          used to identify you after deletion.
        </p>
      </section>

      {/* Timeline / grace period */}
      <section className="mb-8 rounded-lg border border-[#333] bg-[#1e1e1e] p-5">
        <h2 className="mb-3 text-lg font-semibold text-white">
          <My>အချိန်မည်မျှ ကြာမည်နည်း</My>
          <span className="ml-2 text-sm font-normal text-[#777]">
            How long it takes
          </span>
        </h2>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[#bbb]">
          {timeline.map((t, i) => (
            <li key={i}>
              <My>{t.my}</My>
            </li>
          ))}
        </ul>
        <ul className="list-disc space-y-1 border-t border-[#2a2a2a] pl-5 pt-3 text-[13px] leading-relaxed text-[#888]">
          {timeline.map((t, i) => (
            <li key={i}>{t.en}</li>
          ))}
        </ul>
      </section>

      <div className="mt-8 rounded-lg border border-[#333] bg-[#161616] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">
          <My>ဖျက်သိမ်းရန် တောင်းဆိုခြင်း</My>
          <span className="ml-2 text-sm font-normal text-[#777]">
            Request deletion
          </span>
        </h2>
        <DeleteAccountForm />
      </div>

      <p className="mt-6 text-sm text-[#888]">
        <My>
          အီးမေးလ်ဖြင့် ပိုမိုနှစ်သက်ပါက သင့်အကောင့် အီးမေးလ်လိပ်စာမှ
          support@larlarbooks.com သို့ ပေးပို့ပါ။
        </My>
        <br />
        Prefer email? Write to{" "}
        <a
          href="mailto:support@larlarbooks.com"
          className="text-[#c9a3e6] underline underline-offset-2"
        >
          support@larlarbooks.com
        </a>{" "}
        from your account email address.
      </p>
    </main>
  );
}
