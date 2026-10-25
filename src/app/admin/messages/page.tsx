'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ContactMessage } from '@/types/database.types';
import { Mail, Trash2, CheckCircle2 } from 'lucide-react';

export default function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setMessages(data as ContactMessage[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'UNREAD' ? 'READ' : 'UNREAD';
    await supabase.from('contact_messages').update({ status: nextStatus }).eq('id', id);
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('CONFIRM DELETION: Permanently delete this transmission?')) return;
    await supabase.from('contact_messages').delete().eq('id', id);
    fetchMessages();
  };

  return (
    <div className="space-y-6 max-w-5xl font-mono text-xs">
      <div className="border-b border-border-subtle pb-4">
        <h1 className="text-xl font-bold text-text-pure flex items-center gap-2">
          <Mail className="h-5 w-5 text-telemetry-green" />
          <span>INBOUND TRANSMISSIONS TELEMETRY LOG</span>
        </h1>
        <p className="text-text-muted text-[11px]">
          Archived transmissions dispatched from public portfolio contact interface.
        </p>
      </div>

      {loading ? (
        <div className="text-text-muted">READING TELEMETRY STACK...</div>
      ) : messages.length === 0 ? (
        <div className="p-8 border border-border-subtle bg-canvas-subtle text-center text-text-muted">
          // NO TRANSMISSIONS RECORDED YET. SYSTEM WAITING ON NEW INBOUND PACKETS.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`canvas-card p-5 border transition-all ${
                msg.status === 'UNREAD'
                  ? 'border-telemetry-green/40 bg-canvas-subtle'
                  : 'border-border-subtle bg-canvas-black'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-2 mb-3 text-[11px]">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      msg.status === 'UNREAD' ? 'bg-telemetry-green animate-pulse' : 'bg-text-muted'
                    }`}
                  />
                  <span className="font-bold text-text-pure">{msg.name}</span>
                  <span className="text-text-muted">&lt;{msg.email}&gt;</span>
                </div>

                <div className="flex items-center gap-3 text-text-muted">
                  <span>{new Date(msg.created_at).toLocaleString()}</span>
                  <button
                    onClick={() => toggleStatus(msg.id, msg.status)}
                    className="hover:text-text-pure text-[10px] px-2 py-0.5 border border-border-subtle"
                  >
                    [{msg.status === 'UNREAD' ? 'MARK READ' : 'MARK UNREAD'}]
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="hover:text-telemetry-red"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-canvas-black p-3 border border-border-subtle text-text-secondary whitespace-pre-wrap leading-relaxed text-xs">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
