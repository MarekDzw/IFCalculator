export interface State {
  data: {
    page: number;
    disclaimerCheck: boolean;
    date: string;
    height?: number;
    weight?: number;
    age?: number;
    activity?: null;
    gender?: null;
    bodyfat?: number;
    formula?: string;
    gendDiff?: number;
    goal?: -5;
    result?: {
      bmr?: number;
      tdee?: number;
      lbm?: number;
      lbmFat?: number;
      bmi?: number;
      perfWeight?: number;
      bmiText?: string;
    };
    macro?: {
      dpc?: number;
      wpc?: number;
      workoutKcal?: number;
      restKcal?: number;
      restPercent?: number;
      workoutPercent?: number;
    };
    summary?: {
      cycleTee?: number;
      cycleKcal?: number;
      cycleOU?: number;
      cycleChangeKG?: number;
    };
    tableItems?: [
      {
        cycle?: number;
        days?: number;
        weight?: number;
        change?: number;
        total?: number;
      }
    ];
  };
}
