export type ActionState =
  | {
      code: 'SUCCESS';
      message: string;
    }
  | {
      code: 'EXISTS_ERROR';
      key: string;
      message: string;
    }
  | {
      code: 'INTERNAL_ERROR';
    }
  | {
      code: 'VALIDATION_ERROR';
      fieldErrors: {
        [field: string]: string[];
      };
    };

export type FormActionStateCode = 'SUCCESS' | 'EXISTS_ERROR' | 'INTERNAL_ERROR' | 'VALIDATION_ERROR';
export type FormActionState = {
  code: FormActionStateCode;
  message?: string;
  key?: string;
  fieldErrors?: {
    [field: string]: string[];
  };
};
