import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit2, RefreshCw, Server, CheckCircle, Database } from 'lucide-react';

export default function ParticleManagerModal({ isOpen, onClose, onRefreshData }) {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('unknown'); // 'online' | 'offline'
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    label: '',
    pdgCode: '',
    domainId: 'domain-ew',
    coordsX: '',
    coordsY: '',
    symbol: '',
    type: 'fundamental',
    annotation: ''
  });

  const API_BASE = 'http://localhost:3001/api';

  const fetchObjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/objects`);
      if (res.ok) {
        const json = await res.json();
        setObjects(json.data || []);
        setServerStatus('online');
      } else {
        setServerStatus('offline');
      }
    } catch (err) {
      console.warn('Backend server offline:', err);
      setServerStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchObjects();
    }
  }, [isOpen]);

  const handleResetPDG = async () => {
    if (!window.confirm('确认恢复为 PDG 官方物理标度对象数据集？')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/reset`, { method: 'POST' });
      if (res.ok) {
        await fetchObjects();
        if (onRefreshData) onRefreshData();
      }
    } catch (err) {
      alert('后端服务未启动。请先运行 npm run server');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`确认删除 ID 为 ${id} 的物理标度对象？`)) return;
    try {
      const res = await fetch(`${API_BASE}/objects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchObjects();
        if (onRefreshData) onRefreshData();
      }
    } catch (err) {
      alert('删除失败，请检查后端服务');
    }
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    const payload = {
      id: formData.id,
      label: formData.label,
      pdgCode: formData.pdgCode || `PDG-USER-${Date.now().toString().slice(-4)}`,
      domainId: formData.domainId,
      coords: { x: parseFloat(formData.coordsX), y: parseFloat(formData.coordsY) },
      errorBar: null,
      symbol: formData.symbol,
      type: formData.type,
      annotation: formData.annotation
    };

    try {
      let res;
      if (editingItem) {
        res = await fetch(`${API_BASE}/objects/${formData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_BASE}/objects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        setEditingItem(null);
        setIsAdding(false);
        fetchObjects();
        if (onRefreshData) onRefreshData();
      } else {
        const errJson = await res.json();
        alert(`保存失败: ${errJson.message}`);
      }
    } catch (err) {
      alert('无法连接后端服务 (http://localhost:3001)');
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setIsAdding(false);
    setFormData({
      id: item.id,
      label: item.label,
      pdgCode: item.pdgCode || '',
      domainId: item.domainId,
      coordsX: item.coords.x,
      coordsY: item.coords.y,
      symbol: item.symbol,
      type: item.type,
      annotation: item.annotation || ''
    });
  };

  const startAdd = () => {
    setEditingItem(null);
    setIsAdding(true);
    setFormData({
      id: `obj-particle-${Date.now().toString().slice(-4)}`,
      label: 'New Physics Object',
      pdgCode: 'PDG-SM-CUSTOM',
      domainId: 'domain-ew',
      coordsX: '-15.0',
      coordsY: '8.0',
      symbol: 'q',
      type: 'fundamental',
      annotation: '自定义物理标度对象描述'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden font-sans">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-base font-bold font-serif tracking-tight">
                PDG 物理标度对象后端管理中心 (Physics Objects Data Center)
              </h2>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span>API Endpoint: http://localhost:3001/api/objects</span>
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${
                  serverStatus === 'online' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  <Server className="w-3 h-3" />
                  {serverStatus === 'online' ? '后端实时在线 (Server Online)' : '离线/未启动 (Run npm run server)'}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={startAdd}
              className="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>添加物理对象</span>
            </button>

            <button
              onClick={handleResetPDG}
              className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>恢复 PDG 核心数据集</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            全量物理标度对象总数: <strong className="text-slate-900 font-bold">{objects.length}</strong>
          </span>
        </div>

        {/* Modal Body: Split view (Table + Form) */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
          {/* Particles List Table */}
          <div className="flex-1 overflow-x-auto border border-slate-200 rounded-lg max-h-[50vh]">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100 text-slate-700 font-serif border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="p-2.5">符号</th>
                  <th className="p-2.5">名称 (Label)</th>
                  <th className="p-2.5">PDG 编号</th>
                  <th className="p-2.5">坐标 (logL, logE)</th>
                  <th className="p-2.5">类型</th>
                  <th className="p-2.5 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {objects.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-2.5 font-bold font-serif text-slate-900">{item.symbol}</td>
                    <td className="p-2.5 text-slate-800">{item.label}</td>
                    <td className="p-2.5 text-slate-500 text-[11px]">{item.pdgCode}</td>
                    <td className="p-2.5 text-slate-600">
                      ({item.coords?.x?.toFixed(2)}, {item.coords?.y?.toFixed(2)})
                    </td>
                    <td className="p-2.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        item.type === 'fundamental' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(item)}
                          className="p-1 text-slate-500 hover:text-sky-600 rounded transition-colors"
                          title="编辑对象参数"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-slate-500 hover:text-rose-600 rounded transition-colors"
                          title="删除对象"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form Side Panel (Add/Edit) */}
          {(isAdding || editingItem) && (
            <div className="w-full md:w-80 bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col gap-3 text-xs">
              <h3 className="font-bold font-serif text-slate-900 border-b border-slate-200 pb-2">
                {editingItem ? `编辑对象: ${editingItem.label}` : '新增物理对象'}
              </h3>

              <form onSubmit={handleSaveForm} className="flex flex-col gap-2.5">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">ID (唯一标识符)</label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={e => setFormData({ ...formData, id: e.target.value })}
                    disabled={!!editingItem}
                    required
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-sky-500 outline-none disabled:bg-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">对象名称 (Label)</label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                    required
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">KaTeX 符号</label>
                    <input
                      type="text"
                      value={formData.symbol}
                      onChange={e => setFormData({ ...formData, symbol: e.target.value })}
                      required
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-sky-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">PDG 编码</label>
                    <input
                      type="text"
                      value={formData.pdgCode}
                      onChange={e => setFormData({ ...formData, pdgCode: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-sky-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">X: log₁₀(L/m)</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.coordsX}
                      onChange={e => setFormData({ ...formData, coordsX: e.target.value })}
                      required
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-sky-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Y: log₁₀(E/eV)</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.coordsY}
                      onChange={e => setFormData({ ...formData, coordsY: e.target.value })}
                      required
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-sky-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">注解 / 物理说明</label>
                  <textarea
                    rows={2}
                    value={formData.annotation}
                    onChange={e => setFormData({ ...formData, annotation: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-1.5 rounded bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    保存提交 (Save)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditingItem(null); setIsAdding(false); }}
                    className="px-3 py-1.5 rounded border border-slate-300 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
