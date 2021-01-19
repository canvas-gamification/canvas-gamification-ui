export interface UserStats {
  pk: number;
  successRateByCategory: [
    {
      category: number;
      avgSuccess: number;
    }
  ];
}
