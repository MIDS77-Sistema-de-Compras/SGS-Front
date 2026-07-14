'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useCRSearch } from '@/hooks/useCRSearch';
import { getAllRequests } from '@/service/requests';

export function useAnalytics() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const { filteredCRs: crs } = useCRSearch();

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

  useEffect(() => {
    loadData(true);
  }, [loadData]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadData(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [loadData]);

  const handleRefresh = () => {
    loadData(false);
  };

  const supervisores = useMemo(() => {
    const nomes = crs.flatMap((crb) => crb.responsibleUsersName || []);
    return [...new Set(nomes)].sort();
  }, [crs]);

  const filiais = useMemo(() => {
    const nomes = crs.map((crb) => crb.branchName).filter(Boolean);
    return [...new Set(nomes)].sort();
  }, [crs]);

  const requesters = useMemo(() => {
    const nomes = requests.map((r) => r.requesterName).filter(Boolean);
    return [...new Set(nomes)].sort();
  }, [requests]);

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

  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      if (startDate && r.data && r.data < startDate) return false;
      if (endDate && r.data && r.data > endDate) return false;
      
      if (selectedStatus) {
        if (selectedStatus === 'PENDENTE' && r.status !== 'Aguardando aprovação') return false;
        if (selectedStatus === 'APROVADO' && r.status !== 'Aprovado') return false;
        if (selectedStatus === 'ENTREGUE' && r.status !== 'Entregue') return false;
        if (selectedStatus === 'RECUSADO' && !['Cancelado', 'Recusado', 'Pedido Cancelado'].includes(r.status)) return false;
        if (selectedStatus === 'ANDAMENTO' && ['Aguardando aprovação', 'Aprovado', 'Entregue', 'Cancelado', 'Recusado', 'Pedido Cancelado'].includes(r.status)) return false;
      }

      if (selectedFilial && r.crBranch?.branchName !== selectedFilial) return false;

      if (selectedCR && String(r.crBranchId) !== String(selectedCR)) return false;
      
      if (selectedSupervisor) {
        const nomesResponsaveis = r.crBranch?.responsibleUsersName || [];
        if (!nomesResponsaveis.includes(selectedSupervisor)) return false;
      }

      if (selectedRequester && r.requesterName !== selectedRequester) return false;

      if (searchProduct) {
        const query = searchProduct.toLowerCase();
        const hasProduct = (r.produtos || []).some(p => (p.nome || '').toLowerCase().includes(query));
        if (!hasProduct) return false;
      }

      if (onlyAttachments && (!r.attachments || r.attachments.length === 0)) return false;

      if (onlyDelayed && r.status !== 'Atrasada') return false;
      
      return true;
    });
  }, [requests, startDate, endDate, selectedStatus, selectedFilial, selectedCR, selectedSupervisor, selectedRequester, searchProduct, onlyAttachments, onlyDelayed]);

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
      const pCount = (r.produtos || []).reduce((acc, p) => acc + (Number(p.quantity) || 0), 0);
      totalItemsQuantity += pCount;

      if (r.attachments && r.attachments.length > 0) {
        requestsWithAttachments++;
        totalAttachments += r.attachments.length;
      }

      const s = r.status;
      if (s === 'Aguardando aprovação') pendentes++;
      else if (s === 'Aprovado') aprovadas++;
      else if (s === 'Entregue') entregues++;
      else if (s === 'Atrasada') {
        atrasadas++;
        andamento++;
      } else if (['Cancelado', 'Recusado', 'Pedido Cancelado'].includes(s)) recusadas++;
      else andamento++;

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

  const itemsStatusChart = useMemo(() => {
    const allProducts = filteredRequests.flatMap(r => r.produtos || []);
    const total = allProducts.length;
    if (total === 0) return [];

    const statusCounts = {};
    allProducts.forEach(p => {
      const s = p.status || 'Não Definido';
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });

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

  const clockAngles = useMemo(() => {
    if (!currentTime) return { hourAngle: 300, minuteAngle: 60 };
    const [h, m, s] = currentTime.split(':').map(Number);
    const minuteAngle = m * 6 + s * 0.1;
    const hourAngle = (h % 12) * 30 + m * 0.5;
    return { hourAngle, minuteAngle };
  }, [currentTime]);

  return {
    requests,
    loading,
    backgroundLoading,
    error,
    lastUpdated,
    currentTime,
    crs,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedStatus,
    setSelectedStatus,
    selectedFilial,
    setSelectedFilial,
    selectedCR,
    setSelectedCR,
    selectedSupervisor,
    setSelectedSupervisor,
    selectedRequester,
    setSelectedRequester,
    searchProduct,
    setSearchProduct,
    onlyAttachments,
    setOnlyAttachments,
    onlyDelayed,
    setOnlyDelayed,
    supervisores,
    filiais,
    requesters,
    filteredRequests,
    advancedMetrics,
    requestsStatusChart,
    donutCirclesRequests,
    itemsStatusChart,
    donutCirclesItems,
    historyChartData,
    branchData,
    topCRs,
    topProducts,
    measurementUnitsData,
    topRequesters,
    largestRequests,
    clockAngles,
    handleRefresh,
    handleClearFilters,
    handleExportCSV,
  };
}
