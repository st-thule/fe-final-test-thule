import { LabelGender, StatusPost } from '@shared/types/enum';

export interface IOption {
  id: number;
  label: string;
  value: string;
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

export interface IOptionTagProps extends IOption {
  description?: string;
}
export interface IOptionTagProps extends IOption {
  description?: string;
}

export const optionTags: IOptionTagProps[] = [
  {
    id: 1,
    label: 'React',
    value: 'React',
    description:
      'A popular JavaScript library for building user interfaces using a component-based architecture.',
  },
  {
    id: 2,
    label: 'Typescript',
    value: 'Typescript',
    description:
      'A strongly typed superset of JavaScript that helps catch errors early and improve code maintainability.',
  },
  {
    id: 3,
    label: 'JavaScript',
    value: 'JavaScript',
    description:
      'The core scripting language of the web, used to create dynamic and interactive user experiences.',
  },
  {
    id: 4,
    label: 'PHP',
    value: 'PHP',
    description:
      'A server-side scripting language often used for web development and building dynamic websites.',
  },
  {
    id: 5,
    label: 'Java',
    value: 'Java',
    description:
      'A versatile, object-oriented programming language commonly used in enterprise and Android development.',
  },
  {
    id: 6,
    label: 'HTML',
    value: 'HTML',
    description:
      'The standard markup language used to structure content on the web.',
  },
  {
    id: 7,
    label: 'CSS',
    value: 'CSS',
    description:
      'A style sheet language used to describe the appearance and layout of HTML elements.',
  },
  {
    id: 8,
    label: 'Self Improvement',
    value: 'Self Improvement',
    description:
      'Topics related to personal growth, productivity, and building better habits.',
  },
  {
    id: 9,
    label: 'Writing',
    value: 'Writing',
    description:
      'The art and practice of expressing ideas clearly and effectively through written language.',
  },
  {
    id: 10,
    label: 'ReactJS',
    value: 'ReactJS',
    description:
      'Another reference to React; used interchangeably to refer to the same front-end library.',
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
