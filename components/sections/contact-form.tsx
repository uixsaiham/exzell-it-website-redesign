"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputField, SelectField, TextareaField } from "@/components/ui/fields";
import { bookingUrl, contactServices, privacyUrl, turnstileSiteKey } from "@/lib/site-data";

type Turnstile = { render: (el: HTMLElement, options: { sitekey: string; theme?: string }) => string; getResponse: (id?: string) => string | undefined; reset: (id?: string) => void; remove: (id: string) => void };
declare global { interface Window { turnstile?: Turnstile } }

type Fields = { name: string; email: string; company: string; service: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
const empty: Fields = { name: "", email: "", company: "", service: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!values.email.trim()) errors.email = "Enter your work email.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Enter a complete email address, like jonas@company.com.";
  if (!values.service) errors.service = "Choose the service you’re interested in.";
  if (!values.message.trim()) errors.message = "Tell us a little about your challenge.";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const renderedAt = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
    return () => { if (widgetId.current) window.turnstile?.remove(widgetId.current); };
  }, []);
  useEffect(() => { if (status === "success") successRef.current?.focus(); }, [status]);

  function mountTurnstile() {
    if (!window.turnstile || !turnstileRef.current || widgetId.current) return;
    widgetId.current = window.turnstile.render(turnstileRef.current, { sitekey: turnstileSiteKey, theme: "light" });
  }

  function update(field: keyof Fields, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    if (errors[field]) setErrors(current => ({ ...current, [field]: undefined }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, hp_field: honeypotRef.current?.value ?? "", form_rendered_at: renderedAt.current, turnstile_token: widgetId.current ? window.turnstile?.getResponse(widgetId.current) ?? "" : "" }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="contact-form-card contact-success">
        <CircleCheck size={40} strokeWidth={1.4} className="text-brand-strong" aria-hidden="true" />
        <h3>Message received!</h3>
        <p>We’ll be in touch within 24 hours. In the meantime, feel free to <a href={bookingUrl}>book a call directly</a>.</p>
      </div>
    );
  }

  const submitting = status === "submitting";
  return (
    <form ref={formRef} onSubmit={submit} noValidate className="contact-form-card" aria-labelledby="contact-form-title">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={mountTurnstile} />
      <h3 id="contact-form-title">Send us a message</h3>
      <p className="contact-form-intro">Fields marked * are required.</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField id="contact-name" name="name" label="Full name" autoComplete="name" placeholder="Jonas Müller" required value={values.name} error={errors.name} onChange={e => update("name", e.target.value)} />
        <InputField id="contact-email" name="email" type="email" label="Work email" autoComplete="email" placeholder="jonas@company.com" required value={values.email} error={errors.email} onChange={e => update("email", e.target.value)} />
        <InputField id="contact-company" name="company" label="Company" autoComplete="organization" placeholder="Your company name" value={values.company} onChange={e => update("company", e.target.value)} />
        <SelectField id="contact-service" name="service" label="I’m interested in" required value={values.service} error={errors.service} onChange={e => update("service", e.target.value)}>
          <option value="" disabled>Select a service…</option>
          {contactServices.map(service => <option key={service.value} value={service.value}>{service.label}</option>)}
        </SelectField>
      </div>
      <div className="mt-5"><TextareaField id="contact-message" name="message" label="Tell us about your challenge" placeholder="What’s the biggest operational problem you’d like to solve?" required value={values.message} error={errors.message} onChange={e => update("message", e.target.value)} /></div>
      <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input ref={honeypotRef} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      <div ref={turnstileRef} className="mt-5 min-h-[65px]" />
      {status === "error" && <p role="alert" className="contact-form-error">Your message couldn’t be sent. Please try again in a moment, or email us at <a href="mailto:info@exzell-it.de">info@exzell-it.de</a>.</p>}
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="dark" size="lg" disabled={submitting} className="shrink-0 whitespace-nowrap rounded-[10px]">{submitting ? <><LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />Sending…</> : <>Send message <ArrowRight size={18} aria-hidden="true" /></>}</Button>
        <p className="text-xs leading-relaxed text-muted">By submitting you agree to our <a href={privacyUrl} className="font-semibold text-ink underline underline-offset-2">Privacy Policy</a>. We never share your data.</p>
      </div>
    </form>
  );
}
