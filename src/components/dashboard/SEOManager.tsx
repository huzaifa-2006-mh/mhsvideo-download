"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { SEOSettings } from "@/types";

interface SEOManagerProps {
  fields: {
    key: keyof SEOSettings;
    label: string;
    type?: "text" | "textarea" | "toggle" | "tags";
    placeholder?: string;
    help?: string;
  }[];
  title: string;
  description: string;
}

export default function SEOManager({ fields, title, description }: SEOManagerProps) {
  const [settings, setSettings] = useState<Partial<SEOSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (data.success) {
        setSettings(data.settings);
        setMessage({ type: "success", text: "Settings saved successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to save settings" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: keyof SEOSettings, value: string | boolean | string[]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin-slow text-brand-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin-slow" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 flex items-center gap-2 rounded-xl p-4 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.key} className="dashboard-card">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              {field.label}
            </label>
            {field.help && (
              <p className="mb-3 text-xs text-gray-400">{field.help}</p>
            )}

            {field.type === "textarea" ? (
              <textarea
                value={(settings[field.key] as string) || ""}
                onChange={(e) => updateField(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="input-field resize-none"
              />
            ) : field.type === "toggle" ? (
              <label className="flex cursor-pointer items-center gap-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={(settings[field.key] as boolean) ?? false}
                    onChange={(e) => updateField(field.key, e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-brand-600" />
                  <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                </div>
                <span className="text-sm text-gray-600">
                  {(settings[field.key] as boolean) ? "Enabled" : "Disabled"}
                </span>
              </label>
            ) : field.type === "tags" ? (
              <div>
                <input
                  type="text"
                  value={((settings[field.key] as string[]) || []).join(", ")}
                  onChange={(e) =>
                    updateField(
                      field.key,
                      e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                    )
                  }
                  placeholder={field.placeholder || "keyword1, keyword2, keyword3"}
                  className="input-field"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {((settings[field.key] as string[]) || []).map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <input
                type="text"
                value={(settings[field.key] as string) || ""}
                onChange={(e) => updateField(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="input-field"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
