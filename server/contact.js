// Contact form endpoint: POST /api/contact (JSON) -> emails hello@buildnexa.io over SMTP.
// Run with: yarn server   (reads SMTP_* from .env)

import http from "node:http";
import { pathToFileURL } from "node:url";
import nodemailer from "nodemailer";

const SERVICES = [
  "Projects & DPR", "Procurement", "Inventory & Stores", "Finance & Accounting",
  "Clients & Billing", "Assets, Plant & Production", "Full platform", "Not sure yet",
];
const CONTACT_PREFS = ["Email", "Phone", "WhatsApp"];
const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strip line breaks so user input can't inject mail headers.
const oneLine = (v) => String(v ?? "").replace(/[\r\n]+/g, " ").trim();

function validate(d) {
  const errors = [];
  const name = oneLine(d.name);
  const email = oneLine(d.email);
  const service = oneLine(d.service);
  const message = String(d.message ?? "").trim();
  if (!name || name.length > 100) errors.push("name");
  if (!EMAIL_RE.test(email) || email.length > 254) errors.push("email");
  if (!SERVICES.includes(service)) errors.push("service");
  if (message.length < 10 || message.length > 5000) errors.push("message");
  if (!d.consent) errors.push("consent");
  if (d.contact_pref && !CONTACT_PREFS.includes(d.contact_pref)) errors.push("contact_pref");
  if (oneLine(d.phone).length > 30) errors.push("phone");
  if (oneLine(d.company).length > 120) errors.push("company");
  return errors;
}

function buildMail(d, to, from) {
  const name = oneLine(d.name);
  const lines = [
    `Name: ${name}`,
    `Email: ${oneLine(d.email)}`,
    `Phone: ${oneLine(d.phone) || "-"}`,
    `Company: ${oneLine(d.company) || "-"}`,
    `Interested in: ${oneLine(d.service)}`,
    `Preferred contact: ${d.contact_pref || "-"}`,
    "",
    String(d.message).trim(),
  ];
  return {
    from,
    to,
    replyTo: oneLine(d.email),
    subject: `New enquiry: ${oneLine(d.service)} from ${name}`,
    text: lines.join("\n"),
  };
}

export function createHandler({ transport, to, from, rateLimit = RATE_LIMIT }) {
  const hits = new Map(); // ip -> timestamps of recent submissions (in memory, resets on restart)

  const rateLimited = (ip) => {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < rateLimit.windowMs);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > rateLimit.max;
  };

  const send = (res, status, body) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
  };

  return async (req, res) => {
    if (req.url !== "/api/contact") return send(res, 404, { error: "Not found" });
    if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });

    const ip = req.socket.remoteAddress || "unknown";
    if (rateLimited(ip)) return send(res, 429, { error: "Too many messages. Please try again later." });

    let raw = "";
    try {
      for await (const chunk of req) {
        raw += chunk;
        if (raw.length > MAX_BODY_BYTES) return send(res, 413, { error: "Request too large" });
      }
    } catch {
      return send(res, 400, { error: "Could not read request" });
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return send(res, 400, { error: "Invalid JSON" });
    }
    if (!data || typeof data !== "object") return send(res, 400, { error: "Invalid body" });

    // Honeypot: pretend success so bots learn nothing.
    if (data.website) return send(res, 200, { ok: true });

    const errors = validate(data);
    if (errors.length) return send(res, 400, { error: "Invalid fields", fields: errors });

    try {
      await transport.sendMail(buildMail(data, to, from));
      return send(res, 200, { ok: true });
    } catch (err) {
      console.error("Contact mail failed:", err.message);
      return send(res, 502, { error: "Could not send message" });
    }
  };
}

// Only start the server when run directly (not when imported by tests).
if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const env = process.env;
  if (!env.SMTP_HOST) {
    console.warn("SMTP_HOST is not set: contact form requests will fail until it is configured.");
  }
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT || 587),
    secure: Number(env.SMTP_PORT || 587) === 465,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD } : undefined,
  });
  const to = env.CONTACT_TO || "hello@buildnexa.io";
  const from = env.SMTP_FROM || env.SMTP_USER;
  const port = Number(env.PORT || 8787);

  http.createServer(createHandler({ transport, to, from })).listen(port, () => {
    console.log(`Contact API listening on http://localhost:${port}/api/contact`);
  });
}
