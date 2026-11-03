"use client";

import { FormEvent, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setStatus("");
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue.");
      }

      setSuccess(true);
      setStatus("Votre message a été envoyé avec succès !");
      form.reset();
    } catch (error) {
      setSuccess(false);
      setStatus(
        error instanceof Error
          ? error.message
          : "Impossible de contacter le serveur."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section contact" id="contact">
      <p className="eyebrow">GET IN TOUCH</p>
      <h2>Contact Me</h2>
      <p>
        Vous avez un projet DevOps, Cloud ou DevSecOps ?
        N'hésitez pas à me contacter.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Votre nom"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Votre message..."
          rows={5}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer"}
        </button>

        {status && (
          <p
            className={success ? "contact-success" : "contact-error"}
            role="status"
          >
            {status}
          </p>
        )}
      </form>
    </section>
  );
}
