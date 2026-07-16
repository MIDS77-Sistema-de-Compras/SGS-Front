import { createFullServiceRequest } from "@/service/createServiceRequest";
import { csvConvertForProducts, csvConvertForProvisions } from "./csvToJson";
import { createFullRequest } from "@/service/createProductRequest";

/**
 * Lida com a requisição de um produto.
 * @param {*} validProductRequests Array de requisições válidas.
 * @param {*} dataLines Dados do arquivo csv já parsed.
 * @param {*} validationErrors Array para onde os errors vão.
 */
export function handleProductRequest(validProductRequests, dataLines, validationErrors){
    const productRequests = csvConvertForProducts(dataLines);

    console.log("[DEBUG] ", productRequests);

    productRequests.forEach((product, index) => {
        const rowErrors = [];

        if (!product.productName || product.productName.trim() === '') {
            rowErrors.push(`Produto na linha ${index + 2} é obrigatório.`);
        }

        if (!product.measurementUnit || product.measurementUnit.trim() === '') {
            rowErrors.push(`Unidade de medida na linha ${index + 2} é obrigatória.`);
        }

        const quantity = parseFloat(product.quantity);
        if (isNaN(quantity) || quantity <= 0) {
            rowErrors.push(`Quantidade na linha ${index + 2} deve ser maior que zero.`);
        }

        if (product.additionalInformations && product.additionalInformations.length > 255) {
            rowErrors.push(`Informações adicionais na linha ${index + 2} excedem o limite de 255 caracteres.`);
        }

        if (rowErrors.length > 0) {
            validationErrors.push(...rowErrors);
        } else {
            validProductRequests.push({
                productName: product.productName.trim(),
                measurementUnit: product.measurementUnit.trim(),
                quantity: quantity,
                additionalInformations: product.additionalInformations.trim(),
                crBranchId: product.crBranchId,
                branchId: product.branchId
            });
        }
    });
}

/**
 * Lida com a requisição de um serviço.
 * 
 * Nota que quase todos os campos vão nulos. Isso acontece pois a própria API lida com os valores,
 * portanto, eles são opcionais e não necessariamente necessários.
 * 
 * Foi levado em consideração que a grande maioria dos serviços já estarão cadastrados, 
 * no qual já estão: @see https://gereo-fiesc.github.io/catalogo/
 * @param {*} validProvisionRequests Array de requisições válidas.
 * @param {*} dataLines Dados do arquivo csv já parsed.
 * @param {*} validationErrors Array para onde os errors vão.
 */
export function handleProvisionRequest(validProvisionRequests, dataLines, validationErrors){
    const provisionRequests = csvConvertForProvisions(dataLines);

    console.log("[DEBUG] ", provisionRequests);

    provisionRequests.forEach((provision, index) => {
        const rowErrors = [];

        if(!provision.name || provision.name.trim() === ''){
            rowErrors.push(`Serviço na linha ${index + 2} é obrigatório.`);
        }

        if(rowErrors.length > 0){
            validationErrors.push(...rowErrors);
        }else{
            validProvisionRequests.push({
                name: provision.name.trim(),
                totalValue: null,
                description: provision.name.trim(),
                additionalInformations: null,
                attachments: provision.attachments,
                crBranchId: provision.crBranchId
            });
        }
    });
}

/**
 * Verifica e insere elementos dentro de um array.
 * 
 * Os elementos se baseiam no tipo dos elementos dentro do csv, que podem ser:
 * - product
 * - provision
 * @param {*} csvData Dados do csv já formatados.
 * @param {*} type Tipo dos elementos do csv.
 * @returns Array com os objetos dentro.
 */
export function checkAndPushElements(csvData, type){
    const elementsByCrProject = [];
    csvData.forEach(element => {
        const crProjectId = element.crBranchId;
        if (!crProjectId) {
            return;
        }

        if (!elementsByCrProject[crProjectId]) {
            elementsByCrProject[crProjectId] = [];
        }

        if(type === "product"){
            elementsByCrProject[crProjectId].push({
                name: element.productName,
                measurementUnit: element.measurementUnit,
                quantity: element.quantity,
                additionalInformations: element.additionalInformations
            });
        }
        
        if(type === "provision"){
            elementsByCrProject[crProjectId].push({
                name: element.name,
                totalValue: element.totalValue,
                description: element.description,
                additionalInformations: element.additionalInformations,
                attachments: element.attachments
            })
        }
    });

    return elementsByCrProject;
}

/**
 * Verifica e faz a submissão dos elementos dentro de um array de elementos
 * 
 * Os elementos se baseiam no tipo dos elementos dentro do csv, que podem ser:
 * - product
 * - provision
 * @param {*} results Array de objetos. 
 * @example {crBranchId, success: boolean}
 * 
 * @param {*} elements Array de elementos do csv.
 * @example 
 *  {crBranchId: Number(crBranchId), products: element, attachments: attachments} // se product
 *  {crBranchId: Number(crBranchId), services: element, attachments: attachments} // se provision
 * 
 * @param {*} type Tipo dos elementos do csv.
 * @param {*} attachments Anexos. Se aplica apenas ao tipo provision, já que o csv contém links de anexos.
 */
export async function checkAndSubmitElements(results, elements, type, attachments){
    console.log("checkAndSubmitElements.js -> ", Object.entries(elements), "\n\n\n");
    for (const [crBranchId, element] of Object.entries(elements)) {
        try {
            if(type === "product"){
                await createFullRequest({
                    crBranchId: Number(crBranchId),
                    products: element.flat(),
                    attachments: [] // no attachments for product on the csv
                });
                results.push({ crBranchId, success: true });
            }

            if(type === "provision"){
                await createFullServiceRequest({
                    crBranchId: Number(crBranchId),
                    services: element.flat(),
                    attachments: attachments
                });
                results.push({ crBranchId, success: true });
            }
        } catch (error) {
            results.push({
                crBranchId,
                success: false,
                error: error.message
            });
            console.error(`Failed to submit request for CR/Project ID: ${crBranchId}`, error);
        }
    }
}