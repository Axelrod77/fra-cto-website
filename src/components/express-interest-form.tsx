"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export function ExpressInterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "New FraCTO Express Interest");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[var(--color-periwinkle-lighter)] flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[var(--color-plum)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[var(--color-plum)] mb-2">Thank you!</h3>
        <p className="text-[var(--color-muted-foreground)]">
          We&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[var(--color-plum)]">Name *</Label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[var(--color-plum)]">Email *</Label>
          <Input id="email" name="email" type="email" required placeholder="you@company.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-[var(--color-plum)]">Company *</Label>
          <Input id="company" name="company" required placeholder="Company name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role" className="text-[var(--color-plum)]">Role / Title</Label>
          <Input id="role" name="role" placeholder="e.g. CTO, VP Engineering" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-[var(--color-plum)]">Message</Label>
        <Textarea id="message" name="message" placeholder="Tell us about your AI transformation goals..." rows={4} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        disabled={submitting || !WEB3FORMS_KEY}
        className="w-full bg-[var(--color-plum)] hover:bg-[var(--color-plum-light)] text-white h-12 text-base"
      >
        {submitting ? "Sending..." : "Express Interest"}
      </Button>
      {!WEB3FORMS_KEY && (
        <p className="text-xs text-[var(--color-muted-foreground)] text-center">
          Form key not configured. Set NEXT_PUBLIC_WEB3FORMS_KEY to enable.
        </p>
      )}
    </form>
  );
}
