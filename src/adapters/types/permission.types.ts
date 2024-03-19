import { IRole } from "../../core/types";

export type IPermission = {
  [role in IRole]: {
    [resource: string]: string[];
  };
};

export interface IAuthorizationParameters {
  roles: IRole[];
  resource: string;
  action: string;
}
