import { NextResponse } from "next/server";
import { siteSettings } from "@/lib/content/site";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

function isValidPayload(data: unknown): data is ContactPayload {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    d.name.trim().length > 0 &&
    typeof d.email === "string" &&
    /\S+@\S+\.\S+/.test(d.email) &&
    typeof d.message === "string" &&
    d.message.trim().length > 0
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    // No email provider configured — client falls back to a mailto: link.
    return NextResponse.json({ sent: false, fallback: "mailto" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "BITRMS Website <onboarding@resend.dev>",
        to: siteSettings.email,
        reply_to: body.email,
        subject: `New inquiry from ${body.name}${body.service ? ` — ${body.service}` : ""}`,
        text: `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone || "-"}\nService: ${body.service || "-"}\n\nMessage:\n${body.message}`,
      }),
    });

    if (!response.ok) throw new Error("Resend request failed");

    return NextResponse.json({ sent: true });
  } catch {
    return NextResponse.json({ sent: false, fallback: "mailto" });
  }
}
