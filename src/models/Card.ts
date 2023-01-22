export interface Card {
  id: string;
  productType?: string;
  productTypeSelectedHover?: string;
  productTitle: string;
  productSubtitle?: string;
  productSpecs?: string[];
  productWeight?: string;
  productWeightUnit?: string;
  cardCtaText?: string;
  cardCtaTextSelected?: string;
  cardCtaTextDisabled?: string;
  disabled?: boolean;
}
