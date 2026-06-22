import { NativeModules } from 'react-native';

export var ExecutionEnvironment;
(function (ExecutionEnvironment) {
  ExecutionEnvironment["Bare"] = "bare";
  ExecutionEnvironment["Standalone"] = "standalone";
  ExecutionEnvironment["StoreClient"] = "storeClient";
})(ExecutionEnvironment || (ExecutionEnvironment = {}));

export var AppOwnership;
(function (AppOwnership) {
  AppOwnership["Expo"] = "expo";
  AppOwnership["Guest"] = "guest";
  AppOwnership["Standalone"] = "standalone";
})(AppOwnership || (AppOwnership = {}));

export var UserInterfaceIdiom;
(function (UserInterfaceIdiom) {
  UserInterfaceIdiom["Handset"] = "handset";
  UserInterfaceIdiom["Tablet"] = "tablet";
  UserInterfaceIdiom["Desktop"] = "desktop";
  UserInterfaceIdiom["TV"] = "tv";
  UserInterfaceIdiom["Unsupported"] = "unsupported";
})(UserInterfaceIdiom || (UserInterfaceIdiom = {}));

const NativeExponentConstants = NativeModules?.ExponentConstants ?? {};

const expoConfig = {
  name: "TodoApp",
  slug: "TodoApp",
  scheme: "todoapp",
  ios: { bundleIdentifier: "com.anonymous.TodoApp" },
  android: { package: "com.anonymous.TodoApp" },
};

const Constants = {
  ...NativeExponentConstants,
  executionEnvironment: NativeExponentConstants.executionEnvironment ?? ExecutionEnvironment.Bare,
  expoConfig: expoConfig,
  manifest: expoConfig,
  manifest2: null,
  expoGoConfig: null,
  easConfig: null,
  appOwnership: NativeExponentConstants.appOwnership ?? null,
  linkingUri: NativeExponentConstants.linkingUri ?? null,
};

export default Constants;
