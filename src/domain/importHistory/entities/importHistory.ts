import mongoose, { Schema, Document } from "mongoose";

interface ImportHistory extends Document {
    importedAt: Date;
    fileName: string;
    productsTotal: number;
    errorMessages: string;
}

const importHistorySchema = new Schema<ImportHistory>({
    importedAt: { type: Date },
    fileName: { type: String },
    productsTotal: { type: Number },
    errorMessages: { type: String },
});

export const ImportHistoryModel = mongoose.model<ImportHistory>("ImportHistory", importHistorySchema);
