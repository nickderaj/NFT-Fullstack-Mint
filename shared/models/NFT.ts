// Based on the Ghost Cat NFT Metadata
export type NFT = {
  name: string;
  image: string;
  attributes: { value: string; trait_type: string }[];
  edition: number;
  compiler: string;
  date: number;
  description: string;
  dna: string;
};
