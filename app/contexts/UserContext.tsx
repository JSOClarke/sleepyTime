// contexts/UserContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Types
interface Topic {
  id: number;
  title: string;
}

interface UserPreferences {
  notifications: boolean;
  theme: "light" | "dark";
}

interface UserSettings {
  name: string;
  topics: Topic[];
  isSetupComplete: boolean;
  preferences: UserPreferences;
}

interface UserContextType {
  userSettings: UserSettings;
  isLoading: boolean;
  updateUserProfile: (name: string, topics: Topic[]) => Promise<void>;
  updateUserPreferences: (
    preferences: Partial<UserPreferences>
  ) => Promise<void>;
  saveUserSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
  clearUserSettings: () => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = "@user_settings";

const defaultUserSettings: UserSettings = {
  name: "",
  topics: [],
  isSetupComplete: false,
  preferences: {
    notifications: true,
    theme: "light",
  },
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userSettings, setUserSettings] =
    useState<UserSettings>(defaultUserSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load user settings on app start
  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async (): Promise<void> => {
    try {
      const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        const parsedSettings: UserSettings = JSON.parse(stored);
        setUserSettings(parsedSettings);
      }
    } catch (error) {
      console.error("Error loading user settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserSettings = async (
    newSettings: Partial<UserSettings>
  ): Promise<void> => {
    try {
      const updatedSettings = { ...userSettings, ...newSettings };
      await AsyncStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(updatedSettings)
      );
      setUserSettings(updatedSettings);
    } catch (error) {
      console.error("Error saving user settings:", error);
      throw error; // Re-throw so components can handle errors
    }
  };

  const updateUserProfile = async (
    name: string,
    topics: Topic[]
  ): Promise<void> => {
    await saveUserSettings({
      name,
      topics,
      isSetupComplete: true,
    });
  };

  const updateUserPreferences = async (
    preferences: Partial<UserPreferences>
  ): Promise<void> => {
    await saveUserSettings({
      preferences: { ...userSettings.preferences, ...preferences },
    });
  };

  const clearUserSettings = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUserSettings(defaultUserSettings);
    } catch (error) {
      console.error("Error clearing user settings:", error);
    }
  };

  const value: UserContextType = {
    userSettings,
    isLoading,
    updateUserProfile,
    updateUserPreferences,
    saveUserSettings,
    clearUserSettings,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Export types for use in other components
export type { Topic, UserPreferences, UserSettings };
