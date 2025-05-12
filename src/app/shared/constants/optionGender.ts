export interface IOption {
  id: number;
  label: string;
  value: string;
}

export enum LabelGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum StatusPost {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export const optionGender: IOption[] = [
  {
    id: 1,
    label: 'Male',
    value: LabelGender.MALE,
  },
  {
    id: 2,
    label: 'Female',
    value: LabelGender.FEMALE,
  },
  {
    id: 3,
    label: 'Other',
    value: LabelGender.OTHER,
  },
];

export const OptionTag: IOption[] = [
  {
    id: 1,
    label: 'React',
    value: 'React',
  },

  {
    id: 2,
    label: 'Typescript',
    value: 'Typescript',
  },
];

export const optionStatusPost: IOption[] = [
  {
    id: 1,
    label: 'Public',
    value: StatusPost.PUBLIC,
  },
  {
    id: 2,
    label: 'Private',
    value: StatusPost.PRIVATE,
  },
];
