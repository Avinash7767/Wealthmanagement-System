import mongoose, { Document, Schema } from 'mongoose';

export interface IAsset {
  symbol: string;
  quantity: number;
  currentPrice: number;
}

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  totalValue: number;
  assets: IAsset[];
  createdAt: Date;
}

const AssetSchema: Schema = new Schema({
  symbol: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  }
});

const PortfolioSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  totalValue: {
    type: Number,
    default: 0
  },
  assets: [AssetSchema]
}, {
  timestamps: true
});

export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);