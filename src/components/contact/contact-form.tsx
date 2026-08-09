"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { services } from "@/lib/content/services";
import { siteSettings } from "@/lib/content/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "mt-1.5 w-full rounded-lg border border-white/15 bg-brand-900 px-4 py-2.5 text-sm text-white outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.sent) {
        setStatus("success");
        form.reset();
        return;
      }

      if (result.fallback === "mailto") {
        const subject = encodeURIComponent(
          `Website inquiry from ${data.name}${data.service ? ` — ${data.service}` : ""}`
        );
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "-"}\nService: ${data.service || "-"}\n\n${data.message}`
        );
        window.location.href = `mailto:${siteSettings.email}?subject=${subject}&body=${body}`;
        setStatus("success");
        form.reset();
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/10 bg-brand-900 p-8 text-center">
        <h3 className="text-lg font-bold text-white">Thanks &mdash; we&apos;ll be in touch.</h3>
        <p className="mt-2 text-sm text-brand-300">
          We&apos;ve received your message and will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-brand-300">
            Name
          </label>
          <input id="name" name="name" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-brand-300">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-brand-300">
            Phone (optional)
          </label>
          <input id="phone" name="phone" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="service" className="text-sm font-medium text-brand-300">
            Service of interest
          </label>
          <select id="service" name="service" className={inputClasses} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-brand-300">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClasses} />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-red-400">
          Something went wrong. Please email us directly at {siteSettings.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-accent-400 disabled:opacity-60"
      >
        {status === "submitting" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Send Message
      </button>
    </form>
  );
}
