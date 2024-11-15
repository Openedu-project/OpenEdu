// import dynamic from 'next/dynamic';
// import type { AutocompleteType } from './autocomplete';
// import type { AutocompleteMultipleType } from './autocomplete-multiple';

// export type { OptionType } from './autocomplete';
// export type { OptionType as AutocompleteOptionType } from './autocomplete-multiple';

// export const Autocomplete = dynamic(() => import('./autocomplete').then(mod => mod.Autocomplete)) as AutocompleteType;
// export const AutocompeteMultiple = dynamic(() =>
//   import('./autocomplete-multiple').then(mod => mod.AutocompeteMultiple)
// ) as AutocompleteMultipleType;

import { Autocomplete, type AutocompleteProps } from './autocomplete';
import { AutocompeteMultiple, type AutocompleteMultipleProps } from './autocomplete-multiple';

export { Autocomplete, AutocompeteMultiple };
export type { AutocompleteProps, AutocompleteMultipleProps };
