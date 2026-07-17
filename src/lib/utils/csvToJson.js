/**
 * Parses the csv content into a readable object with its respective rows;
 * @param {*} csvFile Not exactly a csv file, but rather the csv's content.
 * @returns The data in rows.
 */
export function csvParse(csvFile){
    const lines = csvFile.trim().split('\n');

    const headerData = lines.findIndex(line => {
        return line.includes('FILIAL PAGADORA'); // since all of them have this header, but not always on the same line (5/4)
    });

    if(headerData === -1) throw new Error("CSV em formato inválido, siga o padrão utilizado nas planilhas antigas.");

    const headers = lines[headerData]
        .split(',')
        .map(header => header.trim())
        .map(header => header.replace(/\(.*\)/, '').trim()); // rm text in parentheses

    const dataLines = lines.slice(headerData + 1);

    const actualData = dataLines
        .filter(line => line.trim() !== '')
        .map(line => {
            const values = [];
            let current = '';
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
                const char = line[i];

                if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    values.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }
            values.push(current);

            const rowObj = {};
            headers.forEach((header, index) => {
                rowObj[header] = values[index] !== undefined ? values[index] : '';
            });

            return rowObj;
        });

    console.log("[DEGUG] csvToJson.js -> ", actualData);
    return actualData;
}

/**
 * Converts the csv (already parsed to rows) into a JSON object (or key: value, if you prefer) specifically for Products.
 * @param {*} rows The parsed rows from the csv contents.
 * @returns The JSON/key: value object, with data that might not be necessary, but here just for the sake of organization.
 */
export function csvConvertForProducts(rows){
    return rows.map(row => ({
        productName: row['PRODUTO'] || '',
        measurementUnit: row['VARIAÇÃO'] || '', // I mean, can it be anything else?
        userName: row['SOLICITANTE E/OU DESTINATÁRIO'] || '',
        requester: row['REQUISITANTE'] || '',
        status: row['STATUS'] || '',
        quantity: parseFloat(row['QUANTIDADE']) || 0,
        additionalInformations: row['INFORMAÇÕES ADICIONAIS'] || '',
        crBranchId: String(row['CR E PROJETO'] || ''),
        branchId: String(row['FILIAL PAGADORA'] || '')
    }));
}

/**
 * Converts the csv (already parsed to rows) into a JSON object (or key: value, if you prefer) specifically for Provisions (or services).
 * @param {*} rows The parsed rows from the csv contents.
 * @returns The JSON/key: value object, with data that might not be necessary, but here just for the sake of organization.
 */
export function csvConvertForProvisions(rows){
    return rows.map(row => ({
        name: row['DESCRIÇÃO DO SERVICO'] || '',
        userName: row['SOLICITANTE E/OU DESTINATÁRIO'] || '',
        requester: row['REQUISITANTE'] || '',
        status: row['STATUS'] || '',
        additionalInformations: row['DESCRIÇÃO DO SERVICO'] || '',
        attachments: row['LINKS DE ARQUIVOS'].split(";") || [],
        crBranchId: String(row['CR E PROJETO']) || '',
    }))
}