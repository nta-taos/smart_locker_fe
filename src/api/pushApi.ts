// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function subscribeSubscriptionOnServer(subscription: any) {
  const apiBase = (import.meta.env.VITE_API_BASE as string) || '';
  const url = apiBase ? `${apiBase.replace(/\/$/, '')}/api/push/subscribe` : '/api/push/subscribe';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription }),
  });
  if (!res.ok) throw new Error('Failed to save subscription');
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendTestPush(payload: any) {
  const apiBase = (import.meta.env.VITE_API_BASE as string) || '';
  const url = apiBase ? `${apiBase.replace(/\/$/, '')}/api/push/send-test` : '/api/push/send-test';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to send test push');
  return res.json();
}
