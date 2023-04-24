type Splits = {
	[key: string]: {
		total: number;
		tax: number;
		tip: number;
		ledger: Ledger[];
	};
};

type Ledger = {
	name: string;
	plateCost: number;
	plateTotal: number;
	tipCost: number;
	taxCost: number;
};

type Total = {
	subtotal: number;
	taxRate: number;
	tipRate: number;
	taxTotal: number;
	preTipTotal: number;
	tip: number;
	total: number;
	splits: Splits;
};
