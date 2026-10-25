'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Skill, SkillCategory } from '@/types/database.types';
import { Plus, Trash2, Cpu, Check } from 'lucide-react';

const CATEGORIES: SkillCategory[] = [
  'ML_FOUNDATIONS',
  'DEEP_LEARNING_LLM',
  'SYS_ENGINEERING',
  'FULL_STACK_APIS',
  'HARDWARE_TOOLING',
];

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<{
    name: string;
    category: SkillCategory;
    proficiency_level: number;
    highlighted: boolean;
  }>({
    name: '',
    category: 'ML_FOUNDATIONS',
    proficiency_level: 85,
    highlighted: false,
  });
  const [statusMsg, setStatusMsg] = useState('');

  const supabase = createClient();

  const fetchSkills = async () => {
    const { data } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });
    if (data) setSkills(data as Skill[]);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) return;

    setStatusMsg('ADDING SKILL ENTRY...');
    const { error } = await supabase.from('skills').insert([
      {
        ...newSkill,
        display_order: skills.length + 1,
      },
    ]);

    if (!error) {
      setStatusMsg('SKILL ADDED.');
      setNewSkill({
        name: '',
        category: 'ML_FOUNDATIONS',
        proficiency_level: 85,
        highlighted: false,
      });
      fetchSkills();
    } else {
      setStatusMsg(`ERROR: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('skills').delete().eq('id', id);
    fetchSkills();
  };

  return (
    <div className="space-y-6 max-w-5xl font-mono text-xs">
      <div className="border-b border-border-subtle pb-4">
        <h1 className="text-xl font-bold text-text-pure flex items-center gap-2">
          <Cpu className="h-5 w-5 text-telemetry-green" />
          <span>TECH MATRIX CONFIGURATOR</span>
        </h1>
        <p className="text-text-muted text-[11px]">
          Dynamically register, calibrate proficiency percentages, and categorize capabilities.
        </p>
      </div>

      {statusMsg && (
        <div className="p-2.5 border border-border-active bg-canvas-subtle text-telemetry-green text-xs">
          {statusMsg}
        </div>
      )}

      {/* Add New Skill Form */}
      <form
        onSubmit={handleAdd}
        className="canvas-card p-5 border border-border-subtle bg-canvas-subtle grid grid-cols-1 sm:grid-cols-12 gap-4 items-end"
      >
        <div className="sm:col-span-4">
          <label className="text-text-muted text-[11px] block mb-1">SKILL / FRAMEWORK NAME *</label>
          <input
            type="text"
            required
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            placeholder="e.g. CUDA / Triton"
            className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <label className="text-text-muted text-[11px] block mb-1">DISCIPLINE CATEGORY</label>
          <select
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as SkillCategory })}
            className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-text-muted text-[11px] block mb-1">PROFICIENCY ({newSkill.proficiency_level}%)</label>
          <input
            type="range"
            min="10"
            max="100"
            value={newSkill.proficiency_level}
            onChange={(e) => setNewSkill({ ...newSkill, proficiency_level: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full py-2 px-3 border border-border-active bg-canvas-surface hover:bg-canvas-card text-text-pure font-bold transition-all"
          >
            [ ADD SKILL ]
          </button>
        </div>
      </form>

      {/* Skills Table */}
      <div className="border border-border-subtle bg-canvas-subtle overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-subtle bg-canvas-surface text-text-muted text-[11px]">
              <th className="p-3">NAME</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3">PROFICIENCY</th>
              <th className="p-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-text-secondary">
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-canvas-surface/40">
                <td className="p-3 text-text-pure font-medium">{skill.name}</td>
                <td className="p-3 text-text-muted text-[11px]">{skill.category}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-20 bg-canvas-surface overflow-hidden">
                      <div className="h-full bg-border-active" style={{ width: `${skill.proficiency_level}%` }} />
                    </div>
                    <span className="text-[11px] text-text-muted">{skill.proficiency_level}%</span>
                  </div>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-text-muted hover:text-telemetry-red p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
