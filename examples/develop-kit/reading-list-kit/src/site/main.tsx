import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  completeKitAuthentication,
  createKitClient,
  readLaunchDescriptor,
} from '@sine-kits/kit-sdk/browser';
import type { KitClient, KitRecord, KitRun } from '@sine-kits/kit-sdk/browser';
import en from '../../locales/en.json';
import zh from '../../locales/zh-CN.json';
import './style.css';

/** Share persisted installation records and authoritative run state without storing browser credentials. */
function App() {
  const [locale, setLocale] = useState<'en' | 'zh-CN'>(
    navigator.language.startsWith('zh') ? 'zh-CN' : 'en',
  );
  const t = locale === 'en' ? en : zh;
  const [launch] = useState(() => readLaunchDescriptor());
  const [client, setClient] = useState<KitClient>();
  const [error, setError] = useState('');
  const [records, setRecords] = useState<KitRecord[]>([]);
  const [runs, setRuns] = useState<KitRun[]>([]);
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  useEffect(() => {
    let active = true;
    async function restore() {
      try {
        if (launch) {
          const c = createKitClient({
            platform: new URL(launch.tokenEndpoint).origin,
            installationId: launch.installationId,
          });
          if ((await c.restoreAuthorization(launch)) && active) setClient(c);
        } else {
          const r = await fetch('/__sine/context');
          if (!r.ok) return;
          const v = await r.json();
          if (v.installationId && active)
            setClient(createKitClient({ platform: v.platform, installationId: v.installationId }));
        }
      } catch {
        if (active) setError('authorization');
      }
    }
    void restore();
    return () => {
      active = false;
    };
  }, [launch]);
  useEffect(() => {
    if (!client) return;
    let active = true;
    let inFlight = false;
    async function refresh() {
      if (inFlight) return;
      inFlight = true;
      try {
        const [entries, history] = await Promise.all([
          client!.records.list({ type: 'reading-entry' }),
          client!.runs.list(),
        ]);
        if (active) {
          setRecords(entries);
          setRuns(history);
        }
      } catch {
        if (active) setError('request');
      } finally {
        inFlight = false;
      }
    }
    void refresh();
    const timer = setInterval(() => void refresh(), 2000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [client]);
  async function authorize() {
    if (!launch) return;
    setBusy(true);
    try {
      const c = createKitClient({
        platform: new URL(launch.tokenEndpoint).origin,
        installationId: launch.installationId,
      });
      await c.authenticate(launch);
      setClient(c);
      setError('');
    } catch {
      setError('authorization');
    } finally {
      setBusy(false);
    }
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!client) return;
    setBusy(true);
    setError('');
    try {
      const run = await client.runs.create({
        operationId: 'entries.save',
        input: { title, url, note },
        idempotencyKey: crypto.randomUUID(),
      });
      setRuns((previous) => [run, ...previous.filter((r) => r.id !== run.id)]);
      setTitle('');
      setUrl('');
      setNote('');
    } catch {
      setError('request');
    } finally {
      setBusy(false);
    }
  }
  return (
    <main>
      <header>
        <span>{t.brand}</span>
        <select
          aria-label={t.language}
          value={locale}
          onChange={(e) => setLocale(e.target.value as 'en' | 'zh-CN')}
        >
          <option value="en">English</option>
          <option value="zh-CN">中文</option>
        </select>
      </header>
      <h1>{t.title}</h1>
      <p className="intro">{t.description}</p>
      {error && <p role="alert">{t.failure}</p>}
      {!client ? (
        <section className="gate">
          <p>{t.launch}</p>
          {launch && (
            <button disabled={busy} onClick={() => void authorize()}>
              {t.authorize}
            </button>
          )}
        </section>
      ) : (
        <>
          <section className="workspace">
            <form onSubmit={(e) => void save(e)}>
              <label>
                {t.entryTitle}
                <input
                  required
                  maxLength={160}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                {t.url}
                <input
                  required
                  type="url"
                  pattern="https?://.*"
                  maxLength={2048}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </label>
              <label>
                {t.note}
                <textarea maxLength={1000} value={note} onChange={(e) => setNote(e.target.value)} />
              </label>
              <button disabled={busy || !title.trim()}>{busy ? t.saving : t.save}</button>
            </form>
            <div>
              <h2>
                {t.entries} <small>{records.length.toString().padStart(2, '0')}</small>
              </h2>
              {!records.length && <p>{t.empty}</p>}
              {records.map((record, i) => {
                const data = record.data as { title: string; url: string; note: string };
                return (
                  <article key={record.id}>
                    <span className="number">{(i + 1).toString().padStart(2, '0')}</span>
                    <div>
                      <h3>
                        <a href={data.url} target="_blank" rel="noopener noreferrer">
                          {data.title} ↗
                        </a>
                      </h3>
                      <p>{data.note}</p>
                      <time>{new Date(record.createdAt).toLocaleString(locale)}</time>
                      <details>
                        <summary>{record.id}</summary>
                        <code>{record.installationId}</code>
                      </details>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
          <section className="history">
            <h2>{t.runs}</h2>
            {runs.map((run) => (
              <div className="run" key={run.id}>
                <code>{run.id}</code>
                <strong>{t.state[run.status as keyof typeof t.state] ?? run.status}</strong>
                {run.error && <span role="alert">{t.failure}</span>}
              </div>
            ))}
          </section>
        </>
      )}
      <footer>{t.footer}</footer>
    </main>
  );
}
if (!completeKitAuthentication()) createRoot(document.getElementById('root')!).render(<App />);
