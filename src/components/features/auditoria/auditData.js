export const auditActionOptions = [
    { value: "login", label: "Login" },
    { value: "create-user", label: "Criou Usuário" },
    { value: "edit-profile", label: "Editou perfil" },
    { value: "delete-request", label: "Deletou solicitação" },
];

export const auditLogs = [
    { id: 1234, user: "andrey.lombardo\n@edu.sc.senai.br", level: "Docente", action: "Login", actionId: "login", affectedUser: "—", request: "—", timestamp: "04/05/2026\n16:55", date: "04/05/2026" },
    { id: 1235, user: "andrey.lombardo\n@edu.sc.senai.br", level: "Coordenador", action: "Criou\nUsuário", actionId: "create-user", affectedUser: "andrey.lombardo\n@edu.sc.senai.br", request: "—", timestamp: "04/05/2026\n16:55", date: "04/05/2026" },
    { id: 1236, user: "andrey.lombardo\n@edu.sc.senai.br", level: "Docente", action: "Editou perfil", actionId: "edit-profile", affectedUser: "andrey.lombardo\n@edu.sc.senai.br", request: "—", timestamp: "04/05/2026\n16:55", date: "04/05/2026" },
    { id: 1237, user: "andrey.lombardo\n@edu.sc.senai.br", level: "Supervisor", action: "Login", actionId: "login", affectedUser: "—", request: "—", timestamp: "04/05/2026\n16:55", date: "04/05/2026" },
    { id: 1238, user: "andrey.lombardo\n@edu.sc.senai.br", level: "Supervisor", action: "Login", actionId: "login", affectedUser: "—", request: "—", timestamp: "04/05/2026\n16:55", date: "04/05/2026" },
    { id: 1239, user: "andrey.lombardo\n@edu.sc.senai.br", level: "ADM", action: "Deletou\nsolicitação", actionId: "delete-request", affectedUser: "—", request: "ABC-123", timestamp: "04/05/2026\n16:55", date: "04/05/2026" },
    { id: 1240, user: "andrey.lombardo\n@edu.sc.senai.br", level: "ADM", action: "Deletou\nsolicitação", actionId: "delete-request", affectedUser: "—", request: "ABC-123", timestamp: "04/05/2026\n16:55", date: "04/05/2026" },
    { id: 1241, user: "andrey.lombardo\n@edu.sc.senai.br", level: "ADM", action: "Deletou\nsolicitação", actionId: "delete-request", affectedUser: "—", request: "ABC-123", timestamp: "04/05/2026\n16:55", date: "04/05/2026" },
    { id: 1242, user: "andrey.lombardo\n@edu.sc.senai.br", level: "ADM", action: "Deletou\nsolicitação", actionId: "delete-request", affectedUser: "—", request: "ABC-123", timestamp: "04/05/2026\n16:55", date: "04/05/2026" },
    { id: 1243, user: "andrey.lombardo\n@edu.sc.senai.br", level: "ADM", action: "Deletou\nsolicitação", actionId: "delete-request", affectedUser: "—", request: "ABC-123", timestamp: "04/05/2026\n16:55", date: "04/05/2026" },
    { id: 1244, user: "andrey.lombardo\n@edu.sc.senai.br", level: "ADM", action: "Deletou\nsolicitação", actionId: "delete-request", affectedUser: "—", request: "ABC-123", timestamp: "04/05/2026\n16:55", date: "04/05/2026" },
];

export const levelStyles = {
    Docente: { color: "#3B6FCC", background: "#EBF0F9" },
    Coordenador: { color: "#D97706", background: "#FEF3C7" },
    Supervisor: { color: "#16A34A", background: "#DCFCE7" },
    ADM: { color: "#DC2626", background: "#FEE2E2" },
};
