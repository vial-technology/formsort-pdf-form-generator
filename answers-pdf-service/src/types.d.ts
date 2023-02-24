export type GenerateHTMLOptions = {
  includeAnswerKeys?: boolean;
  includeSteps?: boolean;
  includeGroups?: boolean;
  includeSelectChoices?: boolean; // TODO: Implement me.
  includeInformationals?: boolean;
  includeUnanswered?: boolean;
};

type IndexAndLabel = {
  index: number;
  label?: string;
};

export type AnswerTableRow = {
  group?: IndexAndLabel;
  step?: IndexAndLabel;
  key?: string;
  question: IndexAndLabel;
  answer?: string;
  choices?: Array<{ value: string | number | boolean; label: string }>;
};
