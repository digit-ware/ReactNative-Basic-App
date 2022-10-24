import {NavigationContainerRef} from '@react-navigation/native';

interface Config {
  navigation: NavigationContainerRef<any> | null;
}

const config: Config = {
  navigation: null,
};

export const init = (nav: NavigationContainerRef<any> | null): void => {
  if (nav) {
    config.navigation = nav;
  }
};

export const useNavigation = (): NavigationContainerRef<any> | null => {
  return config.navigation;
};

//open route, clearing the routes cache
export const goTo = (name: string): void => {
  config.navigation?.reset({
    index: 0,
    routes: [{name}],
  });
};

// go back
export const goBack = (): void => {
  config.navigation?.goBack();
};

/**
 * Navigate to a route within the current navigator three
 * @param name the route name
 * @param params the params to be passed to the route
 */
export const navigate = (name: string, params = {}): void => {
  config.navigation?.navigate(name, params);
};
