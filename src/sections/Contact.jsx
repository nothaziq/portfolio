import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, ArrowUpRight, Check, AlertCircle } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import { PROFILE } from "../constants/data";

const SOCIALS = [
  { icon: GithubIcon, label: "GitHub", href: PROFILE.github },
  { icon: LinkedinIcon, label: "LinkedIn", href: PROFILE.linkedin },
  { icon: Mail, label: "Email", href: `mailto:${PROFILE.email}` },
];

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMessage("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMessage(
        "Contact form isn't configured yet — missing EmailJS environment variables."
      );
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        { publicKey }
      )
      .then(() => {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS send failed:", err);
        setStatus("error");
        setErrorMessage("Something went wrong sending your message. Please try again.");
      });
  }

  return (
    <section id="contact" className="relative px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Contact"
          title="Have something worth building? Let's talk."
          description="Open to internships, collaborations, and interesting problems — AI-flavored or otherwise."
        />

        <div className="mt-14 grid gap-10 md:grid-cols-5">
          <form onSubmit={handleSubmit} className="md:col-span-3 glass rounded-3xl p-7 sm:p-8 space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-2)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-2)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="What are you building?"
                className="w-full resize-none rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-2)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
              />
            </div>

            <MagneticButton
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-sm font-medium text-[var(--color-void)] disabled:opacity-70"
            >
              {status === "idle" && (
                <>
                  Send message
                  <ArrowUpRight size={16} />
                </>
              )}
              {status === "sending" && "Sending..."}
              {status === "sent" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2"
                >
                  <Check size={16} /> Message sent
                </motion.span>
              )}
              {status === "error" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2"
                >
                  <AlertCircle size={16} /> Try again
                </motion.span>
              )}
            </MagneticButton>

            {status === "error" && errorMessage && (
              <p className="text-sm text-red-400" role="alert">
                {errorMessage}
              </p>
            )}
          </form>

          <div className="md:col-span-2 flex flex-col justify-between gap-8">
            <div className="glass rounded-3xl p-7 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4">
                Find me elsewhere
              </p>
              <div className="space-y-3">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <MagneticButton
                    key={label}
                    as="a"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-[var(--color-line)] px-4 py-3 text-sm text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-faint)] transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={16} />
                      {label}
                    </span>
                    <ArrowUpRight size={14} />
                  </MagneticButton>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-dashed border-[var(--color-line)] p-7 sm:p-8">
              <p className="text-sm text-[var(--color-ink-faint)] leading-relaxed">
                Based in {PROFILE.location}. Usually replies within a day —
                sooner if it's an interesting problem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
