'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRequestsList } from '@/hooks/useRequestsList';
import { useCRSearch } from '@/hooks/useCRSearch';
import { getAllRequests } from '@/service/requests';
import { 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  RefreshCw, 
  Calendar, 
  FileText, 
  Layers, 
  Percent,
  ShoppingCart,
  Paperclip,
  Hourglass,
  Tag,
  MapPin,
  ListCollapse,
  Download
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [currentTime, setCurrentTime] = useState('');

  // Relógio digital em tempo real (ticking)
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const { filteredCRs: crs } = useCRSearch();

  // Estados dos Filtros
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedFilial, setSelectedFilial] = useState('');
  const [selectedCR, setSelectedCR] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedRequester, setSelectedRequester] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [onlyAttachments, setOnlyAttachments] = useState(false);
  const [onlyDelayed, setOnlyDelayed] = useState(false);

  // Função para buscar dados (silencioso em background após o primeiro load)
  const loadData = useCallback(async (isInitial = false) => {
    if (isInitial) {
      setLoading(true);
    } else {
      setBackgroundLoading(true);
    }
    setError('');
    try {
      const data = await getAllRequests();
      setRequests(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message || 'Erro ao carregar dados.');
    } finally {
      setLoading(false);
      setBackgroundLoading(false);
    }
  }, []);

  // Carga inicial
  useEffect(() => {
    loadData(true);
  }, [loadData]);

  // Polling automático (silencioso em background) a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      loadData(false);
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [loadData]);

  // Atualizar dados manualmente (silencioso em background)
  const handleRefresh = () => {
    loadData(false);
  };

  // Extrair supervisores únicos
  const supervisores = useMemo(() => {
    const nomes = crs.flatMap((crb) => crb.responsibleUsersName || []);
    return [...new Set(nomes)].sort();
  }, [crs]);

  // Extrair filiais (branches) únicas
  const filiais = useMemo(() => {
    const nomes = crs.map((crb) => crb.branchName).filter(Boolean);
    return [...new Set(nomes)].sort();
  }, [crs]);

  // Extrair solicitantes únicos
  const requesters = useMemo(() => {
    const nomes = requests.map((r) => r.requesterName).filter(Boolean);
    return [...new Set(nomes)].sort();
  }, [requests]);

  // Limpar Filtros
  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedStatus('');
    setSelectedFilial('');
    setSelectedCR('');
    setSelectedSupervisor('');
    setSelectedRequester('');
    setSearchProduct('');
    setOnlyAttachments(false);
    setOnlyDelayed(false);
  };

  // Exportar todas as solicitações filtradas para formato CSV (compatível com Excel)
  const handleExportCSV = () => {
    if (filteredRequests.length === 0) return;

    const headers = [
      'Codigo',
      'Data da Solicitacao',
      'Solicitante',
      'Filial',
      'Centro de Custo (CR)',
      'Status',
      'Qtd Itens',
      'Valor Total (R$)',
      'Possui Anexo'
    ];

    const rows = filteredRequests.map(r => {
      const itemQty = (r.produtos || []).reduce((acc, p) => acc + (p.quantity || 0), 0);
      const totalValue = (r.produtos || []).reduce((acc, p) => acc + ((p.quantity || 0) * (p.value || 0)), 0);
      const hasAttachment = r.attachments && r.attachments.length > 0 ? 'Sim' : 'Nao';
      const branchName = r.crBranch?.branchName || 'N/A';
      const crName = r.crBranch?.crName ? `${r.crBranch.crCode} - ${r.crBranch.crName}` : 'N/A';

      return [
        r.codigo || 'N/A',
        r.data ? new Date(r.data).toLocaleDateString('pt-BR') : 'N/A',
        r.requesterName || 'N/A',
        branchName,
        crName,
        r.status || 'N/A',
        itemQty,
        totalValue.toFixed(2),
        hasAttachment
      ];
    });

    const csvContent = [
      headers.join(';'),
      ...rows.map(e => e.map(val => {
        const cleanVal = String(val).replace(/"/g, '""');
        return `"${cleanVal}"`;
      }).join(';'))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio_solicitacoes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrar requisições com todas as regras de BI
  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      // Filtro por Data
      if (startDate && r.data && r.data < startDate) return false;
      if (endDate && r.data && r.data > endDate) return false;
      
      // Filtro por Status
      if (selectedStatus) {
        if (selectedStatus === 'PENDENTE' && r.status !== 'Aguardando aprovação') return false;
        if (selectedStatus === 'APROVADO' && r.status !== 'Aprovado') return false;
        if (selectedStatus === 'ENTREGUE' && r.status !== 'Entregue') return false;
        if (selectedStatus === 'RECUSADO' && !['Cancelado', 'Recusado', 'Pedido Cancelado'].includes(r.status)) return false;
        if (selectedStatus === 'ANDAMENTO' && ['Aguardando aprovação', 'Aprovado', 'Entregue', 'Cancelado', 'Recusado', 'Pedido Cancelado'].includes(r.status)) return false;
      }

      // Filtro por Filial
      if (selectedFilial && r.crBranch?.branchName !== selectedFilial) return false;

      // Filtro por CR
      if (selectedCR && String(r.crBranchId) !== String(selectedCR)) return false;
      
      // Filtro por Supervisor
      if (selectedSupervisor) {
        const nomesResponsaveis = r.crBranch?.responsibleUsersName || [];
        if (!nomesResponsaveis.includes(selectedSupervisor)) return false;
      }

      // Filtro por Solicitante
      if (selectedRequester && r.requesterName !== selectedRequester) return false;

      // Filtro por Busca de Produto
      if (searchProduct) {
        const query = searchProduct.toLowerCase();
        const hasProduct = (r.produtos || []).some(p => (p.nome || '').toLowerCase().includes(query));
        if (!hasProduct) return false;
      }

      // Filtro apenas com Anexos
      if (onlyAttachments && (!r.attachments || r.attachments.length === 0)) return false;

      // Filtro apenas Atrasadas
      if (onlyDelayed && r.status !== 'Atrasada') return false;
      
      return true;
    });
  }, [requests, startDate, endDate, selectedStatus, selectedFilial, selectedCR, selectedSupervisor, selectedRequester, searchProduct, onlyAttachments, onlyDelayed]);

  // Métricas Avançadas
  const advancedMetrics = useMemo(() => {
    const totalRequests = filteredRequests.length;
    let totalItemsQuantity = 0;
    let requestsWithAttachments = 0;
    let totalAttachments = 0;
    
    let pendentes = 0;
    let andamento = 0;
    let entregues = 0;
    let aprovadas = 0;
    let recusadas = 0;
    let atrasadas = 0;

    const leadTimes = [];

    filteredRequests.forEach(r => {
      // Quantidade de itens
      const pCount = (r.produtos || []).reduce((acc, p) => acc + (Number(p.quantity) || 0), 0);
      totalItemsQuantity += pCount;

      // Anexos
      if (r.attachments && r.attachments.length > 0) {
        requestsWithAttachments++;
        totalAttachments += r.attachments.length;
      }

      // Status
      const s = r.status;
      if (s === 'Aguardando aprovação') pendentes++;
      else if (s === 'Aprovado') aprovadas++;
      else if (s === 'Entregue') entregues++;
      else if (s === 'Atrasada') {
        atrasadas++;
        andamento++;
      } else if (['Cancelado', 'Recusado', 'Pedido Cancelado'].includes(s)) recusadas++;
      else andamento++;

      // Tempo de processamento/atendimento (Lead Time em dias)
      if (s === 'Entregue' && r.requestDate && r.updatedAt) {
        const start = new Date(r.requestDate);
        const end = new Date(r.updatedAt);
        const diffMs = end - start;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        if (!isNaN(diffDays) && diffDays >= 0) {
          leadTimes.push(diffDays);
        }
      }
    });

    const itemsPerRequest = totalRequests > 0 ? (totalItemsQuantity / totalRequests).toFixed(1) : 0;
    const averageLeadTime = leadTimes.length > 0 
      ? (leadTimes.reduce((a, b) => a + b, 0) / leadTimes.length).toFixed(1) 
      : 'N/A';

    const decididas = aprovadas + entregues + recusadas;
    const taxaAprovacao = decididas > 0 ? Math.round(((aprovadas + entregues) / decididas) * 100) : 100;
    const taxaRejeicao = decididas > 0 ? Math.round((recusadas / decididas) * 100) : 0;

    return {
      totalRequests,
      totalItemsQuantity,
      itemsPerRequest,
      averageLeadTime,
      requestsWithAttachments,
      totalAttachments,
      pendentes,
      andamento,
      entregues,
      aprovadas,
      recusadas,
      atrasadas,
      taxaAprovacao,
      taxaRejeicao
    };
  }, [filteredRequests]);

  // Status das Solicitações (Donut Chart 1)
  const requestsStatusChart = useMemo(() => {
    const total = filteredRequests.length;
    if (total === 0) return [];
    
    return [
      { name: 'Pendente', count: advancedMetrics.pendentes, color: '#F59E0B', percentage: Math.round((advancedMetrics.pendentes / total) * 100) },
      { name: 'Em Andamento', count: advancedMetrics.andamento, color: '#3B82F6', percentage: Math.round((advancedMetrics.andamento / total) * 100) },
      { name: 'Aprovada', count: advancedMetrics.aprovadas, color: '#8B5CF6', percentage: Math.round((advancedMetrics.aprovadas / total) * 100) },
      { name: 'Entregue', count: advancedMetrics.entregues, color: '#10B981', percentage: Math.round((advancedMetrics.entregues / total) * 100) },
      { name: 'Recusada/Cancelada', count: advancedMetrics.recusadas, color: '#EF4444', percentage: Math.round((advancedMetrics.recusadas / total) * 100) },
    ].filter(item => item.count > 0);
  }, [filteredRequests, advancedMetrics]);

  // Donut 1 Circles
  const donutCirclesRequests = useMemo(() => {
    let accumulatedPercentage = 0;
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    
    return requestsStatusChart.map((item) => {
      const strokeLength = (item.percentage / 100) * circumference;
      const strokeOffset = circumference - strokeLength + (accumulatedPercentage / 100) * circumference;
      accumulatedPercentage += item.percentage;
      
      return {
        ...item,
        strokeDasharray: `${strokeLength} ${circumference}`,
        strokeDashoffset: -((accumulatedPercentage - item.percentage) / 100) * circumference,
        radius,
        cx: 50,
        cy: 50
      };
    });
  }, [requestsStatusChart]);

  // Status dos Itens Individuais (Donut Chart 2)
  const itemsStatusChart = useMemo(() => {
    const allProducts = filteredRequests.flatMap(r => r.produtos || []);
    const total = allProducts.length;
    if (total === 0) return [];

    const statusCounts = {};
    allProducts.forEach(p => {
      const s = p.status || 'Não Definido';
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });

    // Mapear para cores conhecidas
    const colorMap = {
      'EM_ANDAMENTO': '#3B82F6',
      'Aguardando aprovação': '#F59E0B',
      'Aprovado': '#8B5CF6',
      'Entregue': '#10B981',
      'Recusado': '#EF4444',
      'Cancelado': '#EF4444',
    };

    return Object.entries(statusCounts).map(([name, count]) => ({
      name,
      count,
      color: colorMap[name] || '#64748B',
      percentage: Math.round((count / total) * 100)
    })).sort((a, b) => b.count - a.count);
  }, [filteredRequests]);

  // Donut 2 Circles
  const donutCirclesItems = useMemo(() => {
    let accumulatedPercentage = 0;
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    
    return itemsStatusChart.map((item) => {
      const strokeLength = (item.percentage / 100) * circumference;
      accumulatedPercentage += item.percentage;
      
      return {
        ...item,
        strokeDasharray: `${strokeLength} ${circumference}`,
        strokeDashoffset: -((accumulatedPercentage - item.percentage) / 100) * circumference,
        radius,
        cx: 50,
        cy: 50
      };
    });
  }, [itemsStatusChart]);

  // Histórico de Linha
  const historyChartData = useMemo(() => {
    const groups = {};
    filteredRequests.forEach(r => {
      const dateStr = r.data || 'Sem data';
      groups[dateStr] = (groups[dateStr] || 0) + 1;
    });

    const sortedData = Object.entries(groups)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-12);

    if (sortedData.length === 0) return [];
    
    const maxCount = Math.max(...sortedData.map(d => d.count), 1);
    
    const width = 500;
    const height = 150;
    const paddingLeft = 30;
    const paddingRight = 15;
    const paddingTop = 15;
    const paddingBottom = 20;

    const graphWidth = width - paddingLeft - paddingRight;
    const graphHeight = height - paddingTop - paddingBottom;

    const points = sortedData.map((item, index) => {
      const x = paddingLeft + (index / Math.max(sortedData.length - 1, 1)) * graphWidth;
      const y = height - paddingBottom - (item.count / maxCount) * graphHeight;
      return { ...item, x, y };
    });

    let linePath = '';
    if (points.length > 0) {
      linePath = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
    }

    let areaPath = '';
    if (points.length > 0) {
      areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;
    }

    return { points, linePath, areaPath, height, width, paddingLeft, paddingBottom, maxCount, sortedData };
  }, [filteredRequests]);

  // Ranking de Filiais (Top Branches)
  const branchData = useMemo(() => {
    const groups = {};
    filteredRequests.forEach(r => {
      const name = r.crBranch?.branchName || 'Não Informada';
      groups[name] = (groups[name] || 0) + 1;
    });

    const sorted = Object.entries(groups)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const maxVal = sorted.length > 0 ? Math.max(...sorted.map(c => c.count)) : 1;
    return sorted.map(item => ({
      ...item,
      percentage: Math.round((item.count / maxVal) * 100)
    }));
  }, [filteredRequests]);

  // Ranking de CRs (Top 5)
  const topCRs = useMemo(() => {
    const groups = {};
    filteredRequests.forEach(r => {
      const crName = r.crBranch ? `${r.crBranch.crCode} - ${r.crBranch.crName}` : 'Sem Centro de Custo';
      groups[crName] = (groups[crName] || 0) + 1;
    });

    const sorted = Object.entries(groups)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const maxVal = sorted.length > 0 ? Math.max(...sorted.map(c => c.count)) : 1;
    return sorted.map(item => ({
      ...item,
      percentage: Math.round((item.count / maxVal) * 100)
    }));
  }, [filteredRequests]);

  // Top Produtos (Top 5)
  const topProducts = useMemo(() => {
    const groups = {};
    filteredRequests.forEach(r => {
      (r.produtos || []).forEach(p => {
        const name = p.nome || 'Produto Indefinido';
        groups[name] = (groups[name] || 0) + (p.quantity || 1);
      });
    });

    const sorted = Object.entries(groups)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    const maxVal = sorted.length > 0 ? Math.max(...sorted.map(p => p.qty)) : 1;
    return sorted.map(item => ({
      ...item,
      percentage: Math.round((item.qty / maxVal) * 100)
    }));
  }, [filteredRequests]);

  // Unidades de Medida mais Utilizadas (Top 5)
  const measurementUnitsData = useMemo(() => {
    const groups = {};
    filteredRequests.forEach(r => {
      (r.produtos || []).forEach(p => {
        const unit = p.unit || 'UN';
        groups[unit] = (groups[unit] || 0) + 1;
      });
    });

    const sorted = Object.entries(groups)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const maxVal = sorted.length > 0 ? Math.max(...sorted.map(u => u.count)) : 1;
    return sorted.map(item => ({
      ...item,
      percentage: Math.round((item.count / maxVal) * 100)
    }));
  }, [filteredRequests]);

  // Top Solicitantes (Top 5)
  const topRequesters = useMemo(() => {
    const groups = {};
    filteredRequests.forEach(r => {
      const name = r.requesterName || 'Desconhecido';
      groups[name] = (groups[name] || 0) + 1;
    });

    return Object.entries(groups)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredRequests]);

  // Solicitações com Maior Volume de Itens
  const largestRequests = useMemo(() => {
    return filteredRequests.map(r => {
      const itemQty = (r.produtos || []).reduce((acc, p) => acc + (p.quantity || 0), 0);
      return {
        codigo: r.codigo,
        requester: r.requesterName || 'N/A',
        qty: itemQty,
        id: r.id
      };
    })
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);
  }, [filteredRequests]);

  // Cálculo dos ângulos dos ponteiros do relógio analógico SVG
  const clockAngles = useMemo(() => {
    if (!currentTime) return { hourAngle: 300, minuteAngle: 60 }; // Padrão ~10:10
    const [h, m, s] = currentTime.split(':').map(Number);
    const minuteAngle = m * 6 + s * 0.1;
    const hourAngle = (h % 12) * 30 + m * 0.5;
    return { hourAngle, minuteAngle };
  }, [currentTime]);

  return (
    <div className="flex flex-col gap-6 w-full max-h-[85vh] overflow-y-auto pr-2 pb-6">
      {/* Header com indicador em tempo real e atualização */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 border border-[#E2E8F0] rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#103D85] flex items-center gap-2">
            <Layers className="w-7 h-7 text-[#103D85]" />
            Visão Geral de Solicitações
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Análise consolidada detalhada de solicitações, filiais, centros de custo, volumes, anexos e performance operacional.
          </p>
        </div>
        
        <div className="flex items-center gap-4 self-stretch md:self-auto justify-end">
          <button
            onClick={handleExportCSV}
            disabled={filteredRequests.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#103D85] hover:bg-[#0E3572] disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-sm transition duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Relatório</span>
          </button>

          {currentTime && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 text-gray-700 text-sm font-semibold rounded-xl shadow-sm">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#103D85" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="12" x2="12" y2="7" transform={`rotate(${clockAngles.hourAngle} 12 12)`} />
                <line x1="12" y1="12" x2="12" y2="5" transform={`rotate(${clockAngles.minuteAngle} 12 12)`} />
              </svg>
              <span className="font-mono text-[#103D85]">{currentTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* Erros */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-[#BA1A1A] p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            Filtros de Business Intelligence
          </h2>
          {(startDate || endDate || selectedStatus || selectedFilial || selectedCR || selectedSupervisor || selectedRequester || searchProduct || onlyAttachments || onlyDelayed) && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline transition duration-200"
            >
              Limpar Todos os Filtros
            </button>
          )}
        </div>
        
        {/* Grid de Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Row 1 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">Data Inicial</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-3 pr-2 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">Data Final</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-3 pr-2 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">Status da Solicitação</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 cursor-pointer text-gray-700"
            >
              <option value="">Todos os Status</option>
              <option value="PENDENTE">Aguardando aprovação (Pendente)</option>
              <option value="ANDAMENTO">Em Andamento</option>
              <option value="APROVADO">Aprovada (Fila)</option>
              <option value="ENTREGUE">Entregue (Concluída)</option>
              <option value="RECUSADO">Recusada/Cancelada</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">Filial (Branch)</label>
            <select
              value={selectedFilial}
              onChange={(e) => setSelectedFilial(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 cursor-pointer text-gray-700"
            >
              <option value="">Todas as Filiais</option>
              {filiais.map((fil, index) => (
                <option key={index} value={fil}>
                  {fil}
                </option>
              ))}
            </select>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">Centro de Resultado (CR)</label>
            <select
              value={selectedCR}
              onChange={(e) => setSelectedCR(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 cursor-pointer text-gray-700"
            >
              <option value="">Todos os CRs</option>
              {crs.map((crb) => (
                <option key={crb.id} value={crb.id}>
                  {crb.crCode} - {crb.crName} {crb.branchName ? `(${crb.branchName})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">Supervisor Responsável</label>
            <select
              value={selectedSupervisor}
              onChange={(e) => setSelectedSupervisor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 cursor-pointer text-gray-700"
            >
              <option value="">Todos os Supervisores</option>
              {supervisores.map((sup, index) => (
                <option key={index} value={sup}>
                  {sup}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">Nome do Solicitante</label>
            <select
              value={selectedRequester}
              onChange={(e) => setSelectedRequester(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 cursor-pointer text-gray-700"
            >
              <option value="">Todos os Solicitantes</option>
              {requesters.map((reqName, index) => (
                <option key={index} value={reqName}>
                  {reqName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">Buscar por Produto</label>
            <input
              type="text"
              placeholder="Digite o nome do produto..."
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              className="w-full pl-3 pr-2 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Checkbox Toggles */}
        <div className="flex flex-wrap items-center gap-6 mt-1 border-t border-gray-50 pt-3">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-gray-600 hover:text-gray-800 transition">
            <input
              type="checkbox"
              checked={onlyAttachments}
              onChange={(e) => setOnlyAttachments(e.target.checked)}
              className="w-4 h-4 rounded text-[#103D85] focus:ring-[#103D85] border-gray-300 accent-[#103D85]"
            />
            <span>Apenas solicitações com anexos</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-gray-600 hover:text-gray-800 transition">
            <input
              type="checkbox"
              checked={onlyDelayed}
              onChange={(e) => setOnlyDelayed(e.target.checked)}
              className="w-4 h-4 rounded text-[#103D85] focus:ring-[#103D85] border-gray-300 accent-[#103D85]"
            />
            <span>Apenas solicitações atrasadas (SLA quebrado)</span>
          </label>
        </div>
      </div>

      {/* KPI Cards Grid - Alta Densidade (Total de 10 métricas chave) */}
      <div className="flex flex-col gap-4">
        {/* Bloco 1: Métricas Operacionais */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow transition relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50/50 rounded-full translate-x-4 -translate-y-4"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <FileText className="w-4 h-4 text-[#103D85]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Solicitações</span>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-2">{loading ? '...' : advancedMetrics.totalRequests}</p>
            <p className="text-[10px] text-gray-400 mt-1">Registradas no total</p>
          </div>

          <div className="bg-white p-4 border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow transition relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50/50 rounded-full translate-x-4 -translate-y-4"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <ShoppingCart className="w-4 h-4 text-indigo-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Itens Solicitados</span>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-2">{loading ? '...' : advancedMetrics.totalItemsQuantity}</p>
            <p className="text-[10px] text-indigo-500 mt-1 font-semibold">{advancedMetrics.itemsPerRequest} itens/solicitação</p>
          </div>

          <div className="bg-white p-4 border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow transition relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50/50 rounded-full translate-x-4 -translate-y-4"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <Hourglass className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Lead Time Médio</span>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-2">{loading ? '...' : `${advancedMetrics.averageLeadTime} dias`}</p>
            <p className="text-[10px] text-gray-400 mt-1">Tempo médio de entrega</p>
          </div>

          <div className="bg-white p-4 border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow transition relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50/50 rounded-full translate-x-4 -translate-y-4"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <Percent className="w-4 h-4 text-purple-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Taxa Aprovação</span>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-2">{loading ? '...' : `${advancedMetrics.taxaAprovacao}%`}</p>
            <p className="text-[10px] text-red-500 mt-1 font-semibold">{advancedMetrics.taxaRejeicao}% taxa de recusa</p>
          </div>

          <div className="bg-white p-4 border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow transition relative overflow-hidden group col-span-2 md:col-span-1">
            <div className="absolute top-0 right-0 w-16 h-16 bg-pink-50/50 rounded-full translate-x-4 -translate-y-4"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <Paperclip className="w-4 h-4 text-pink-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Com Anexos</span>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-2">{loading ? '...' : advancedMetrics.requestsWithAttachments}</p>
            <p className="text-[10px] text-gray-400 mt-1">{advancedMetrics.totalAttachments} arquivos anexados</p>
          </div>
        </div>

        {/* Bloco 2: Métricas por Status */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 border-l-4 border-l-amber-500 border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow transition">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Aguard. Aprovação</span>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-1">{loading ? '...' : advancedMetrics.pendentes}</p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${advancedMetrics.totalRequests ? (advancedMetrics.pendentes / advancedMetrics.totalRequests) * 100 : 0}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-4 border-l-4 border-l-blue-500 border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow transition">
            <div className="flex items-center gap-1.5 text-gray-400">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Em Andamento</span>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-1">{loading ? '...' : advancedMetrics.andamento}</p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${advancedMetrics.totalRequests ? (advancedMetrics.andamento / advancedMetrics.totalRequests) * 100 : 0}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-4 border-l-4 border-l-violet-500 border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow transition">
            <div className="flex items-center gap-1.5 text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-violet-500" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Aprovadas (Fila)</span>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-1">{loading ? '...' : advancedMetrics.aprovadas}</p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5">
              <div className="bg-violet-500 h-full rounded-full" style={{ width: `${advancedMetrics.totalRequests ? (advancedMetrics.aprovadas / advancedMetrics.totalRequests) * 100 : 0}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-4 border-l-4 border-l-emerald-500 border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow transition">
            <div className="flex items-center gap-1.5 text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Entregues</span>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-1">{loading ? '...' : advancedMetrics.entregues}</p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${advancedMetrics.totalRequests ? (advancedMetrics.entregues / advancedMetrics.totalRequests) * 100 : 0}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-4 border-l-4 border-l-red-500 border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow transition col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 text-gray-400">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Recusadas/Cancel.</span>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-1">{loading ? '...' : advancedMetrics.recusadas}</p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5">
              <div className="bg-red-500 h-full rounded-full" style={{ width: `${advancedMetrics.totalRequests ? (advancedMetrics.recusadas / advancedMetrics.totalRequests) * 100 : 0}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos Principais (Donuts e Linhas) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rosca 1: Status das Solicitações */}
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Status de Solicitações</h3>
            <p className="text-[11px] text-gray-400">Distribuição com base nas requisições gerais.</p>
          </div>

          {loading ? (
            <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
          ) : requestsStatusChart.length === 0 ? (
            <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 mt-2">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F1F5F9" strokeWidth="10" />
                  {donutCirclesRequests.map((circle, i) => (
                    <circle
                      key={i}
                      cx={circle.cx}
                      cy={circle.cy}
                      r={circle.radius}
                      fill="transparent"
                      stroke={circle.color}
                      strokeWidth="10"
                      strokeDasharray={circle.strokeDasharray}
                      strokeDashoffset={circle.strokeDashoffset}
                      className="transition-all duration-300"
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-gray-800">{filteredRequests.length}</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase">Solicit.</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full text-xs mt-2 border-t border-gray-50 pt-3">
                {requestsStatusChart.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-500 font-medium truncate">{item.name}</span>
                    <span className="font-bold text-gray-700 ml-auto">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rosca 2: Status dos Itens Individuais (Produtos) */}
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Status de Itens Pedidos</h3>
            <p className="text-[11px] text-gray-400">Mapeamento granular dos produtos dentro de cada pedido.</p>
          </div>

          {loading ? (
            <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
          ) : itemsStatusChart.length === 0 ? (
            <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 mt-2">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F1F5F9" strokeWidth="10" />
                  {donutCirclesItems.map((circle, i) => (
                    <circle
                      key={i}
                      cx={circle.cx}
                      cy={circle.cy}
                      r={circle.radius}
                      fill="transparent"
                      stroke={circle.color}
                      strokeWidth="10"
                      strokeDasharray={circle.strokeDasharray}
                      strokeDashoffset={circle.strokeDashoffset}
                      className="transition-all duration-300"
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-gray-800">
                    {filteredRequests.flatMap(r => r.produtos || []).length}
                  </span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase">Itens</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full text-xs mt-2 border-t border-gray-50 pt-3">
                {itemsStatusChart.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-500 font-medium truncate">{item.name}</span>
                    <span className="font-bold text-gray-700 ml-auto">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Linha/Área: Histórico de Solicitações */}
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Tendência Histórica</h3>
            <p className="text-[11px] text-gray-400">Evolução do volume de solicitações abertas por período.</p>
          </div>

          {loading ? (
            <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
          ) : !historyChartData || !historyChartData.points || historyChartData.points.length === 0 ? (
            <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
          ) : (
            <div className="w-full flex-grow flex flex-col justify-end mt-4">
              <svg viewBox={`0 0 ${historyChartData.width} ${historyChartData.height}`} className="w-full h-36 overflow-visible">
                <defs>
                  <linearGradient id="biChartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#103D85" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#103D85" stopOpacity="0.00" />
                  </linearGradient>
                </defs>
                {[0, 0.5, 1].map((ratio, index) => {
                  const y = historyChartData.height - historyChartData.paddingBottom - ratio * (historyChartData.height - historyChartData.paddingBottom - 15);
                  return (
                    <g key={index}>
                      <line x1={historyChartData.paddingLeft} y1={y} x2={historyChartData.width - 10} y2={y} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                      <text x={historyChartData.paddingLeft - 6} y={y + 3} textAnchor="end" className="text-[8px] fill-gray-400 font-bold">{Math.round(ratio * historyChartData.maxCount)}</text>
                    </g>
                  );
                })}
                <path d={historyChartData.areaPath} fill="url(#biChartGradient)" />
                <path d={historyChartData.linePath} fill="none" stroke="#103D85" strokeWidth="2" strokeLinecap="round" />
                {historyChartData.points.map((p, i) => (
                  <g key={i} className="group/dot cursor-pointer">
                    <circle cx={p.x} cy={p.y} r="3.5" fill="#103D85" stroke="#FFFFFF" strokeWidth="1" />
                    <g className="opacity-0 pointer-events-none group-hover/dot:opacity-100 transition-opacity duration-150">
                      <rect x={p.x - 20} y={p.y - 25} width="40" height="16" rx="3" fill="#1E293B" />
                      <text x={p.x} y={p.y - 14} textAnchor="middle" fill="#FFFFFF" className="text-[8px] font-bold">{p.count} req.</text>
                    </g>
                  </g>
                ))}
                {historyChartData.points.map((p, i) => {
                  if (historyChartData.points.length > 5 && i % 2 !== 0) return null;
                  const rawDate = p.date;
                  const displayDate = rawDate.includes('-') 
                    ? rawDate.split('-').slice(2).join('/') + '/' + rawDate.split('-')[1]
                    : rawDate;
                  return (
                    <text key={i} x={p.x} y={historyChartData.height - 4} textAnchor="middle" className="text-[8px] fill-gray-400 font-semibold">{displayDate}</text>
                  );
                })}
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Rankings de Filiais e Centros de Custo (Duas Colunas) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Filiais com maior volume de solicitações */}
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#103D85]" />
              Solicitações por Filial (Branch)
            </h3>
            <p className="text-[11px] text-gray-400">Distribuição geográfica dos pedidos emitidos.</p>
          </div>

          {loading ? (
            <div className="h-44 flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
          ) : branchData.length === 0 ? (
            <div className="h-44 flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col gap-3.5 mt-4">
              {branchData.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700 truncate max-w-[80%]">{item.name}</span>
                    <span className="font-bold text-[#103D85]">{item.count} <span className="text-[9px] text-gray-400 font-normal">req.</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top 5 Centros de Custos (CR) */}
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-600" />
              Volume por Centro de Resultado (CR)
            </h3>
            <p className="text-[11px] text-gray-400">Centros com maior emissão e requisições acumuladas.</p>
          </div>

          {loading ? (
            <div className="h-44 flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
          ) : topCRs.length === 0 ? (
            <div className="h-44 flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col gap-3.5 mt-4">
              {topCRs.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700 truncate max-w-[80%]">{item.name}</span>
                    <span className="font-bold text-[#103D85]">{item.count} <span className="text-[9px] text-gray-400 font-normal">req.</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Terceira Linha: Rankings Granulares (Três Colunas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Coluna 1: Produtos e Quantidades */}
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingCart className="w-4 h-4 text-blue-500" />
              Top Produtos Solicitados
            </h3>
            <p className="text-[10px] text-gray-400">Quantidade física total solicitada por produto.</p>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Carregando...</div>
          ) : topProducts.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              {topProducts.map((p, i) => (
                <div key={i} className="flex flex-col gap-1 text-xs pb-1.5 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-700 truncate max-w-[75%]">{p.name}</span>
                    <span className="font-bold text-gray-800">{p.qty} un.</span>
                  </div>
                  <div className="w-full bg-gray-50 h-1 rounded-full">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${p.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coluna 2: Unidades de Medida */}
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-pink-500" />
              Unidades de Medida
            </h3>
            <p className="text-[10px] text-gray-400">Mapeamento de embalagem/embalagens mais requisitadas.</p>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Carregando...</div>
          ) : measurementUnitsData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              {measurementUnitsData.map((u, i) => (
                <div key={i} className="flex flex-col gap-1 text-xs pb-1.5 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-700 uppercase">{u.name}</span>
                    <span className="font-bold text-gray-800">{u.count} itens</span>
                  </div>
                  <div className="w-full bg-gray-50 h-1 rounded-full">
                    <div className="bg-pink-500 h-full rounded-full" style={{ width: `${u.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coluna 3: Maiores Pedidos em Volume */}
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <ListCollapse className="w-4 h-4 text-emerald-500" />
              Pedidos em Maior Escala
            </h3>
            <p className="text-[10px] text-gray-400">Solicitações com maior quantidade de volumes pedidas.</p>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Carregando...</div>
          ) : largestRequests.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              {largestRequests.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-xs pb-2 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-gray-800">{r.codigo}</span>
                    <span className="text-[10px] text-gray-400 truncate max-w-[120px]">Por: {r.requester}</span>
                  </div>
                  <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                    {r.qty} unidades
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quarta Linha: Equipes e Solicitantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Principais Solicitantes */}
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#103D85]" />
              Ranking de Usuários Solicitantes
            </h3>
            <p className="text-[11px] text-gray-400">Colaboradores com maior número de requisições enviadas ao fluxo.</p>
          </div>

          {loading ? (
            <div className="h-32 flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
          ) : topRequesters.length === 0 ? (
            <div className="h-32 flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {topRequesters.map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-xl transition">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#103D85] font-black flex items-center justify-center text-xs">
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-semibold text-gray-800 text-xs truncate">{r.name}</span>
                    <span className="text-[10px] text-gray-400 font-bold">{r.count} Solicitações</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informações de Conectividade e SLA */}
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-indigo-500" />
              Saúde da Operação e SLA de Compras
            </h3>
            <p className="text-[11px] text-gray-400">Informações de auditoria e tempos operacionais agregados.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-blue-50/30 border border-blue-50/60 rounded-xl">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Taxa de SLA Cumprido</span>
              <span className="text-lg font-black text-blue-800 mt-1 block">
                {loading ? '...' : `${100 - (advancedMetrics.totalRequests > 0 ? Math.round((advancedMetrics.atrasadas / advancedMetrics.totalRequests) * 100) : 0)}%`}
              </span>
              <span className="text-[9px] text-gray-400 mt-0.5 block">{advancedMetrics.atrasadas} solicitações atrasadas atualmente</span>
            </div>

            <div className="p-3 bg-emerald-50/30 border border-emerald-50/60 rounded-xl">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Sincronismo de Arquivos</span>
              <span className="text-lg font-black text-emerald-800 mt-1 block">
                {loading ? '...' : `${advancedMetrics.totalRequests > 0 ? Math.round((advancedMetrics.requestsWithAttachments / advancedMetrics.totalRequests) * 100) : 0}%`}
              </span>
              <span className="text-[9px] text-gray-400 mt-0.5 block">Pedidos que contêm anexos de mídia</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
