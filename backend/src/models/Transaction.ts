import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  category?: string;
  description?: string;
  date: Date;
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense', 'transfer']
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);