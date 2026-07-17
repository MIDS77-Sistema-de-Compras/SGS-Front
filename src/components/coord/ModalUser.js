import { useState, useEffect } from 'react';
import Modal from "../ui/overlay/Modal";
import { Trash2, UserCheck, UserMinus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export function ModalUser({ isOpen, onClose, userName = "Carregando...", action = "desativar", onConfirm }) {
    const [step, setStep] = useState("confirm"); // "confirm" or "calendar"
    
    // Calendar state
    const [viewDate, setViewDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [hoverDate, setHoverDate] = useState(null);

    // Reset step and selected dates when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setStep("confirm");
            setStartDate(null);
            setEndDate(null);
            setHoverDate(null);
            setViewDate(new Date());
        }
    }, [isOpen]);

    const isAtivar = action === "ativar";
    const isExcluir = action === "excluir";
    
    const acaoTexto = action;
    const tituloModal = isAtivar 
        ? "Ativar usuário" 
        : isExcluir 
            ? "Excluir usuário" 
            : step === "calendar" 
                ? "Período de Desativação" 
                : "Desativar usuário";

    const textoBotao = isAtivar 
        ? "Ativar" 
        : isExcluir 
            ? "Excluir" 
            : step === "calendar" 
                ? "Confirmar" 
                : "Avançar";

    let botaoClasse = "";
    if (isAtivar) {
        botaoClasse = "py-2 border border-[#10B981] bg-[#4CAF50] hover:bg-[#37823A] hover:border-[#047857] dark:bg-[#37823A] dark:hover:bg-[#2b652e] text-white font-medium rounded-xl transition-colors";
    } else if (isExcluir) {
        botaoClasse = "py-2 border border-[#E30613] bg-[#E30613] hover:bg-[#9F0009] hover:border-[#9F0009] dark:bg-[#C62834] dark:hover:bg-[#A01F29] dark:border-[#C62834] text-white font-medium rounded-xl transition-colors";
    } else {
        botaoClasse = "py-2 border border-[#7D7D7D] bg-[#7D7D7D] hover:bg-[#555555] hover:border-[#555555] dark:bg-[#3d4456] dark:hover:bg-[#4a5266] dark:border-white/15 text-white font-medium rounded-xl transition-colors";
    }

    let fundoBolinhaClasse = "";
    if (isAtivar) {
        fundoBolinhaClasse = "bg-[#C9FFCB] border-[#A3FFA6] dark:bg-[#16A34A]/20 dark:border-[#16A34A]/40"; 
    } else if (isExcluir) {
        fundoBolinhaClasse = "bg-[#FFCBCB] border-[#FFA3A3] dark:bg-[#C62834]/20 dark:border-[#C62834]/40"; 
    } else {
        fundoBolinhaClasse = "bg-gray-100 border-gray-300 dark:bg-white/10 dark:border-white/20"; 
    }

    const renderizarIcone = () => {
        if (isAtivar) return <UserCheck size={40} className="text-[#10B981] dark:text-[#5FD68A]" />; 
        if (isExcluir) return <Trash2 size={40} className="text-[#E30613] dark:text-[#F08B92]" />; 
        return <UserMinus size={40} className="text-[#7D7D7D] dark:text-[#C3C6D3]" />; 
    };

    // Calendar logic helpers
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const handlePrevMonth = () => {
        setViewDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(year, month + 1, 1));
    };

    const getDaysInMonth = () => {
        const firstDayIndex = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const prevMonthTotalDays = new Date(year, month, 0).getDate();

        const days = [];

        // Previous month days to fill start of grid
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            const d = new Date(year, month - 1, prevMonthTotalDays - i);
            days.push({ date: d, isCurrentMonth: false });
        }

        // Current month days
        for (let i = 1; i <= totalDays; i++) {
            const d = new Date(year, month, i);
            days.push({ date: d, isCurrentMonth: true });
        }

        // Next month days to fill end of grid (up to 42 items for 6 weeks grid)
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            const d = new Date(year, month + 1, i);
            days.push({ date: d, isCurrentMonth: false });
        }

        return days;
    };

    const handleDayClick = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) return; // Disable past dates

        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else if (date < startDate) {
            setStartDate(date);
        } else {
            setEndDate(date);
        }
    };

    const isSelected = (date) => {
        if (!date) return false;
        return (startDate && date.toDateString() === startDate.toDateString()) || 
               (endDate && date.toDateString() === endDate.toDateString());
    };

    const isInRange = (date) => {
        if (!date) return false;
        if (startDate && endDate) {
            return date > startDate && date < endDate;
        }
        if (startDate && hoverDate && !endDate) {
            return date > startDate && date <= hoverDate;
        }
        return false;
    };

    const isPast = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const formatDateString = (date) => {
        if (!date) return "";
        return date.toLocaleDateString("pt-BR");
    };

    const handleButtonClick = () => {
        if (action === "desativar" && step === "confirm") {
            setStep("calendar");
        } else {
            onConfirm(startDate, endDate);
        }
    };

    const handleBackClick = () => {
        if (step === "calendar") {
            setStep("confirm");
        } else {
            onClose();
        }
    };

    const days = getDaysInMonth();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={tituloModal}
            height="h-auto" 
            maxWidth={step === "calendar" ? "max-w-[480px]" : "max-w-[420px]"}
        >
            <div className="flex flex-col justify-center items-center gap-6 w-full">
                {step === "confirm" ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className={`p-4 rounded-full ${fundoBolinhaClasse} border flex items-center justify-center shadow-sm`}>
                            {renderizarIcone()}
                        </div>

                        <h1 className="text-[18px] text-center text-gray-900 dark:text-[#E2E2EA] font-normal">
                            Tem certeza que deseja {acaoTexto} o usuário{" "}
                            <br/>
                            <span className="break-words font-bold">{userName}?</span>
                        </h1>
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-4">
                        <div className="text-center text-gray-600 dark:text-[#C3C6D3] text-sm flex items-center justify-center gap-2">
                            <CalendarIcon size={18} className="text-[#103D85] dark:text-[#5D8EF7]" />
                            <span>Selecione o período de inatividade para <strong>{userName}</strong>:</span>
                        </div>

                        {/* Custom Calendar UI */}
                        <div className="border border-gray-100 dark:border-white/10 rounded-2xl p-4 bg-gray-50/50 dark:bg-white/5">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    type="button"
                                    onClick={handlePrevMonth}
                                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-gray-600 dark:text-[#E2E2EA] transition-colors"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="font-semibold text-gray-800 dark:text-[#E2E2EA] text-sm">
                                    {monthNames[month]} de {year}
                                </span>
                                <button
                                    type="button"
                                    onClick={handleNextMonth}
                                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-gray-600 dark:text-[#E2E2EA] transition-colors"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            {/* Calendar Weekdays */}
                            <div className="grid grid-cols-7 gap-1 text-center mb-1">
                                {["D", "S", "T", "Q", "Q", "S", "S"].map((d, index) => (
                                    <span key={index} className="text-[11px] font-bold text-gray-400 dark:text-[#8A8FA3] py-1">
                                        {d}
                                    </span>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1">
                                {days.map((dayObj, index) => {
                                    const dateString = dayObj.date.toDateString();
                                    const isDaySelected = isSelected(dayObj.date);
                                    const isDayInRange = isInRange(dayObj.date);
                                    const isDayPast = isPast(dayObj.date);
                                    const isStart = startDate && dateString === startDate.toDateString();
                                    const isEnd = endDate && dateString === endDate.toDateString();

                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleDayClick(dayObj.date)}
                                            onMouseEnter={() => !endDate && setHoverDate(dayObj.date)}
                                            disabled={isDayPast}
                                            className={`
                                                aspect-square text-xs font-medium rounded-lg flex items-center justify-center transition-all relative
                                                ${!dayObj.isCurrentMonth ? "opacity-30" : ""}
                                                ${isDayPast ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" : "cursor-pointer"}
                                                ${isDaySelected 
                                                    ? "bg-[#103D85] text-white dark:bg-[#5D8EF7] font-semibold scale-105 shadow-sm z-10" 
                                                    : isDayInRange 
                                                        ? "bg-[#103D85]/10 text-[#103D85] dark:bg-[#5D8EF7]/15 dark:text-[#7BA5F9]" 
                                                        : !isDayPast && dayObj.isCurrentMonth
                                                            ? "text-gray-700 dark:text-[#E2E2EA] hover:bg-gray-200/60 dark:hover:bg-white/10" 
                                                            : ""
                                                }
                                            `}
                                        >
                                            {dayObj.date.getDate()}
                                            {/* Connection line indicator for ranges */}
                                            {isStart && endDate && (
                                                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#103D85]/10 dark:bg-[#5D8EF7]/15 -z-10 rounded-r-none" />
                                            )}
                                            {isEnd && (
                                                <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#103D85]/10 dark:bg-[#5D8EF7]/15 -z-10 rounded-l-none" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Selected Range Display */}
                        <div className="text-center py-2 px-3 bg-[#E6F0FF] dark:bg-[#1e293b] rounded-xl border border-[#103D85]/10 dark:border-[#5D8EF7]/10 text-xs text-gray-700 dark:text-[#E2E2EA]">
                            {startDate ? (
                                <span>
                                    Inatividade: <strong className="text-[#103D85] dark:text-[#5D8EF7]">{formatDateString(startDate)}</strong>
                                    {endDate ? (
                                        <> até <strong className="text-[#103D85] dark:text-[#5D8EF7]">{formatDateString(endDate)}</strong></>
                                    ) : (
                                        <span className="italic text-gray-400 dark:text-[#8A8FA3]"> (Selecione a data final)</span>
                                    )}
                                </span>
                            ) : (
                                <span className="text-gray-500 dark:text-[#C3C6D3] italic">Nenhuma data selecionada</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer Buttons */}
                <div className="flex w-full gap-4">
                    <button
                        type="button"
                        onClick={handleBackClick}
                        className="flex-1 py-2 border border-gray-100 hover:border-gray-400 dark:border-white/20 dark:hover:border-white/40 text-gray-700 dark:text-[#E2E2EA] dark:hover:bg-white/5 font-medium rounded-xl transition-colors"
                    >
                        {step === "calendar" ? "Voltar" : "Cancelar"}
                    </button>

                    <button
                        type="button"
                        onClick={handleButtonClick}
                        disabled={step === "calendar" && !startDate}
                        className={`flex-1 ${botaoClasse} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {textoBotao}
                    </button>
                </div>
            </div>
        </Modal>
    );
}