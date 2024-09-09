import { ImportHistoryModel } from "../entities/importHistory";

export class ImportHistoryService {
    async createImportHistory(importedAt: Date, fileName: string, productsTotal: number, errorMessages: string) {
        const importHistory = new ImportHistoryModel({
        importedAt,
        fileName,
        productsTotal,
        errorMessages,
        });
    
        await importHistory.save();
    }
}
