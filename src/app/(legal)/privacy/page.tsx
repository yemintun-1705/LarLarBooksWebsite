import type { Metadata } from "next";
import { My, MyBlock, Section } from "../_components";

export const metadata: Metadata = {
  title: "Privacy Policy — LarLar Books",
  description:
    "LarLar Books privacy policy / ကိုယ်ရေးကိုယ်တာမူဝါဒ. What we collect, why, who we share it with, and your rights.",
};

/**
 * Burmese text is copied VERBATIM from the mobile app
 * (app/(auth)/privacy.tsx). It is not machine-translated.
 * English bodies are owner-reviewed translations.
 */
const sections = [
  {
    myTitle: "၁။ ကျွန်ုပ်တို့ စုဆောင်းသော အချက်အလက်များ",
    myBody:
      "သင်အကောင့်စာရင်းသွင်းသည့်အခါ သင်တိုက်ရိုက်ပေးအပ်သည့် အမည်၊ အီးမေးလ်လိပ်စာ၊ ဖုန်းနံပါတ်၊ မွေးသက္ကရာဇ်နှင့် စကားဝှက်ကဲ့သို့သော အချက်အလက်များကို ကျွန်ုပ်တို့ စုဆောင်းပါသည်။ သင့်အတွေ့အကြုံကို တိုးတက်စေရန် အသုံးပြုမှုဒေတာ၊ စက်ပစ္စည်းအချက်အလက်နှင့် စာဖတ်မှုလုပ်ဆောင်ချက်များကိုလည်း စုဆောင်းပါသည်။",
    enTitle: "Information We Collect",
    enBody:
      "When you register for an account, we collect information you provide directly, such as your name, email address, phone number (optional), date of birth, and password. To improve your experience, we also collect usage data, device identifiers, and reading activity.",
  },
  {
    myTitle: "၂။ သင့်အချက်အလက်များကို အသုံးပြုပုံ",
    myBody:
      "ကျွန်ုပ်တို့သည် သင့်အချက်အလက်များကို အောက်ပါအတွက် အသုံးပြုပါသည်- (က) သင့်အကောင့်ကို ဖန်တီးပြီး စီမံခန့်ခွဲရန်၊ (ခ) ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုများကို ပေးအပ်ပြီး တိုးတက်စေရန်၊ (ဂ) အရေးကြီးသော အပ်ဒိတ်များနှင့် အကြောင်းကြားချက်များ ပေးပို့ရန်၊ (ဃ) သင့်စာဖတ်မှု အကြံပြုချက်များကို စိတ်ကြိုက်ပြုလုပ်ရန်၊ (င) ငွေပေးငွေယူများကို ဆောင်ရွက်ပြီး လိမ်လည်မှုများကို ကာကွယ်ရန်။",
    enTitle: "How We Use Your Information",
    enBody:
      "We use your information to: (a) create and manage your account; (b) provide and improve our services; (c) send important updates and notifications; (d) personalize your reading recommendations; and (e) process transactions and prevent fraud.",
  },
  {
    myTitle: "၃။ အချက်အလက် မျှဝေခြင်း",
    myBody:
      "ကျွန်ုပ်တို့သည် သင့်ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို တတိယပါတီများထံ ရောင်း၊ ဖလှယ် သို့မဟုတ် ငှားရမ်းခြင်း မပြုလုပ်ပါ။ ကျွန်ုပ်တို့၏ အက်ပ်ကို လုပ်ဆောင်ရာတွင် ကူညီပေးသည့် ယုံကြည်စိတ်ချရသော ဝန်ဆောင်မှုပေးသူများနှင့် လျှို့ဝှက်ထားသိရှိမှု သဘောတူညီချက်များအောက်တွင် ဒေတာကို မျှဝေနိုင်ပါသည်။ ဥပဒေအရ လိုအပ်ပါက အချက်အလက်ကို ထုတ်ဖော်ပြောနိုင်ပါသည်။",
    enTitle: "Data Sharing",
    enBody:
      "We do not sell, trade, or rent your personal information to third parties. We may share data, under confidentiality agreements, with the trusted service providers who help us operate the app (see “Service Providers” below). We may disclose information where required by law.",
  },
  {
    myTitle: "၄။ ဒေတာလုံခြုံမှု",
    myBody:
      "သင့်ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို ကာကွယ်ရန် လွှဲပြောင်းနေစဉ်နှင့် သိမ်းဆည်းနေစဉ် ကုဒ်ဝှက်ခြင်းအပါအဝင် စက်မှုလုပ်ငန်းစံနှုန်းနှင့်ညီသော လုံခြုံမှုနည်းလမ်းများကို ကျွန်ုပ်တို့ အသုံးပြုပါသည်။ သို့သော် အင်တာနက်ပေါ်တွင် ပေးပို့မှုနည်းလမ်းမည်သည်မဆို ၁၀၀% လုံခြုံသည်ဟု မဆိုနိုင်ပါ။",
    enTitle: "Data Security",
    enBody:
      "We use industry-standard security measures, including encryption in transit and at rest, to protect your personal information. However, no method of transmission over the internet is 100% secure.",
  },
  {
    myTitle: "၅။ ဒေတာထိန်းသိမ်းမှု",
    myBody:
      "သင့်အကောင့် အသက်ဝင်နေသမျှ သို့မဟုတ် ဝန်ဆောင်မှုများပေးအပ်ရန် လိုအပ်သမျှ ကျွန်ုပ်တို့သည် သင့်ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို ထိန်းသိမ်းထားပါသည်။ သင်သည် ကျွန်ုပ်တို့ထံ ဆက်သွယ်ပြီး သင့်အကောင့်နှင့် ဆက်စပ်ဒေတာများကို မည်သည့်အချိန်တွင်မဆို ဖျက်ပစ်ရန် တောင်းဆိုနိုင်ပါသည်။ ဥပဒေအရ လိုအပ်ပါက အချို့ ငွေကြေးဆိုင်ရာ မှတ်တမ်းများကို ဖျက်သိမ်းပြီးနောက် ဆက်လက် သိမ်းဆည်းထားနိုင်ပါသည် (အသေးစိတ်ကို ဖျက်သိမ်းခြင်းစာမျက်နှာတွင် ကြည့်ပါ)။",
    enTitle: "Data Retention",
    enBody:
      "We retain your personal information for as long as your account is active or as needed to provide our services. You may contact us to request deletion of your account and associated data at any time. Certain financial records may be retained after deletion where required by law (see the deletion page for details).",
  },
  {
    myTitle: "၆။ သင့်အခွင့်အရေးများ",
    myBody:
      "သင့်တွင် အောက်ပါအခွင့်အရေးများ ရှိပါသည်- (က) ကျွန်ုပ်တို့ထားရှိသည့် သင့်ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို ဝင်ရောက်ကြည့်ရှုခွင့်၊ (ခ) မှားယွင်းသော ဒေတာများကို ပြင်ဆင်ရန် တောင်းဆိုခွင့်၊ (ဂ) သင့်ဒေတာများကို ဖျက်ပစ်ရန် တောင်းဆိုခွင့်၊ (ဃ) စျေးကွက်ရှာဖွေမှု ဆက်သွယ်ရေးများမှ ရွေးချယ်ပယ်ဖျက်ခွင့်။ ဤအခွင့်အရေးများကို အသုံးပြုရန် support@larlarbooks.com သို့ ဆက်သွယ်ပါ။",
    enTitle: "Your Rights",
    enBody:
      "You have the following rights: (a) to access the personal information we hold about you; (b) to request correction of inaccurate data; (c) to request deletion of your data; and (d) to opt out of marketing communications. To exercise these rights, contact support@larlarbooks.com.",
  },
  {
    myTitle: "၇။ ကွတ်ကီးနှင့် ခြေရာခံခြင်း",
    myBody:
      "ကျွန်ုပ်တို့၏ အက်ပ်ကို မည်သို့အသုံးပြုကြောင်း နားလည်ရန် ခွဲခြမ်းစိတ်ဖြာသည့် ကိရိယာများကို အသုံးပြုပါသည်။ ဤဒေတာကို စုစုပေါင်းအနေဖြင့် စုဆောင်းထားပြီး သင့်ကို ကိုယ်ရေးကိုယ်တာအရ မခွဲခြားနိုင်ပါ။ သင့်အကောင့်ဆက်တင်များတွင် analytics မှ ရွေးချယ်ပယ်ဖျက်နိုင်ပါသည်။",
    enTitle: "Cookies and Tracking",
    enBody:
      "We use analytics tools to understand how our app is used. This data is collected in aggregate and does not personally identify you. You can opt out of analytics in your account settings.",
  },
  {
    myTitle: "၈။ ကလေးများ၏ ကိုယ်ရေးကိုယ်တာ",
    myBody:
      "ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုသည် အသက် ၁၃ နှစ်အောက် ကလေးများအတွက် ရည်ရွယ်ထားခြင်း မဟုတ်ပါ။ အသက် ၁၃ နှစ်အောက် ကလေးများထံမှ ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို ရည်ရွယ်ချက်ရှိရှိ စုဆောင်းခြင်း မပြုပါ။ ထိုသို့သော ဒေတာများကို စုဆောင်းမိကြောင်း သိရှိပါက ၎င်းတို့ကို ဖျက်ပစ်ရန် အဆင့်ဆင့် ဆောင်ရွက်ပါမည်။",
    enTitle: "Children's Privacy",
    enBody:
      "Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such data, we will take steps to delete it.",
  },
  {
    myTitle: "၉။ ဤမူဝါဒ ပြောင်းလဲခြင်းများ",
    myBody:
      "ကျွန်ုပ်တို့သည် ဤကိုယ်ရေးကိုယ်တာမူဝါဒကို ရံဖန်ရံခါ အပ်ဒိတ်လုပ်နိုင်ပါသည်။ သိသာထင်ရှားသော ပြောင်းလဲမှုများကို အက်ပ် သို့မဟုတ် အီးမေးလ်ဖြင့် အသိပေးပါမည်။ ပြောင်းလဲမှုများပြုလုပ်ပြီးနောက် ဝန်ဆောင်မှုကို ဆက်လက်အသုံးပြုခြင်းသည် ပြင်ဆင်ထားသော မူဝါဒကို လက်ခံကြောင်း ဆိုလိုပါသည်။",
    enTitle: "Changes to This Policy",
    enBody:
      "We may update this privacy policy from time to time. We will notify you of significant changes through the app or by email. Continued use of the service after changes are made constitutes acceptance of the revised policy.",
  },
  {
    myTitle: "၁၀။ ဆက်သွယ်ရန်",
    myBody:
      "ဤကိုယ်ရေးကိုယ်တာမူဝါဒနှင့်ပတ်သက်၍ မေးခွန်းများရှိပါက support@larlarbooks.com သို့ ဆက်သွယ်ပေးပါ။",
    enTitle: "Contact Us",
    enBody:
      "If you have any questions about this privacy policy, please contact us at support@larlarbooks.com.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-[#eeeeee]">
      <p className="mb-2 text-center text-xs text-[#777]">
        <My>နောက်ဆုံးပြင်ဆင်သည့်ရက်: ဇန်နဝါရီ ၁၆၊ ၂၀၂၆</My>
        <span className="mx-2">·</span>
        Last updated: January 16, 2026
      </p>

      <h1 className="mb-2 text-center text-2xl font-bold">
        <My>ကိုယ်ရေးကိုယ်တာမူဝါဒ</My>
      </h1>
      <p className="mb-8 text-center text-lg text-[#aaa]">Privacy Policy</p>

      {/* Intro — Burmese verbatim; English pending */}
      <div className="border-t border-[#333] py-6">
        <MyBlock className="mb-4 text-[15px] text-[#bbb]">
          LarLar Books မှ သင့်ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို ကာကွယ်ရန်
          အပ်နှံထားပါသည်။ ဤမူဝါဒသည် ကျွန်ုပ်တို့၏ အပလီကေးရှင်းကို အသုံးပြုစဉ်
          သင့်ဒေတာများကို မည်သို့စုဆောင်း၊ အသုံးပြုနှင့် ကာကွယ်ထားသည်ကို
          ရှင်းပြထားပါသည်။
        </MyBlock>
        <p className="text-[15px] leading-relaxed text-[#bbb]">
          LarLar Books is committed to protecting your personal information.
          This policy explains how we collect, use, and protect your data when
          you use our application.
        </p>
      </div>

      {sections.map((s, i) => (
        <Section
          key={i}
          index={String(i + 1)}
          myTitle={s.myTitle}
          myBody={s.myBody}
          enTitle={s.enTitle}
          enBody={s.enBody}
        />
      ))}

      {/* Processors — required by Google Play Data Safety; must match the
          Play Console declaration. Vendor names stay in Latin script. */}
      <section className="border-t border-[#333] py-6">
        {/* Burmese */}
        <h2 lang="my" className="mb-2 text-base font-semibold text-white">
          <My>ဝန်ဆောင်မှု ပံ့ပိုးသူများ</My>
        </h2>
        <MyBlock className="mb-3 text-[15px] text-[#bbb]">
          ဝန်ဆောင်မှုကို လည်ပတ်ရန်အတွက် အောက်ပါ ပြင်ပဝန်ဆောင်မှုများကို
          အသုံးပြုပါသည်။ ၎င်းတို့နှင့် မျှဝေသည့် အချက်အလက်များမှာ တစ်ခုချင်းစီ၏
          လုပ်ဆောင်ချက်အတွက် လိုအပ်သည့် အတိုင်းအတာအထိသာ ဖြစ်ပါသည်။
        </MyBlock>
        <ul className="mb-4 list-disc space-y-1 pl-6 text-[15px] text-[#bbb]">
          <li>
            <strong className="text-[#ddd]">Supabase</strong>{" "}
            <My>— အထောက်အထားစိစစ်ခြင်းနှင့် ဒေတာဘေ့စ် (အကောင့်၊ ကိုယ်ရေးအချက်အလက်၊ စာဖတ်ခြင်းမှတ်တမ်း)။</My>
          </li>
          <li>
            <strong className="text-[#ddd]">Cloudflare R2</strong>{" "}
            <My>— ဖိုင်နှင့် မီဒီယာ သိမ်းဆည်းမှု။</My>
          </li>
          <li>
            <strong className="text-[#ddd]">Google Cloud Run</strong>{" "}
            <My>— နောက်ကွယ်စနစ် လည်ပတ်မှု။</My>
          </li>
          <li>
            <strong className="text-[#ddd]">Resend</strong>{" "}
            <My>— အီးမေးလ် ပေးပို့မှု။</My>
          </li>
        </ul>

        {/* English */}
        <h3 className="mb-2 border-t border-[#2a2a2a] pt-3 text-base font-semibold text-white">
          Service Providers (Data Processors)
        </h3>
        <p className="mb-3 text-[15px] leading-relaxed text-[#bbb]">
          We use the following third-party processors to operate the service.
          Data shared with them is limited to what each needs to perform its
          function:
        </p>
        <ul className="list-disc space-y-1 pl-6 text-[15px] text-[#bbb]">
          <li>
            <strong className="text-[#ddd]">Supabase</strong> — authentication
            and database (account, profile, reading activity).
          </li>
          <li>
            <strong className="text-[#ddd]">Cloudflare R2</strong> — file and
            media storage.
          </li>
          <li>
            <strong className="text-[#ddd]">Google Cloud Run</strong> — backend
            application hosting.
          </li>
          <li>
            <strong className="text-[#ddd]">Resend</strong> — transactional
            email delivery.
          </li>
        </ul>
      </section>

      {/* Deletion cross-link */}
      <section className="border-t border-[#333] py-6">
        <h3 className="mb-2 text-base font-semibold text-white">
          Account &amp; Data Deletion
        </h3>
        <p className="text-[15px] leading-relaxed text-[#bbb]">
          You can request deletion of your account and associated data at any
          time — no login or app install required — at{" "}
          <a
            href="/delete-account"
            className="text-[#c9a3e6] underline underline-offset-2"
          >
            /delete-account
          </a>
          . Questions:{" "}
          <a
            href="mailto:support@larlarbooks.com"
            className="text-[#c9a3e6] underline underline-offset-2"
          >
            support@larlarbooks.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
