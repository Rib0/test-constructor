import { createContext, useContext } from 'react';

import { DEFAULT_CLIENT_SETTINGS } from '@/components/test-constructor/utils';
import { TestSettingsClient } from '@/types/client';

const SettingsContext = createContext<TestSettingsClient>(DEFAULT_CLIENT_SETTINGS);
const useSettingsContext = () => useContext(SettingsContext);

export { SettingsContext, useSettingsContext };
