export class AuthConstants {
  static readonly Users = class {
    static readonly GET = "getUsers";
    static readonly CREATE = "createUsers";
  };

  static readonly Permissions = class {
    static readonly READ = "read";
    static readonly WRITE = "write";
    static readonly DELETE = "delete";
  };

  static readonly Tokens = class {
    static readonly ACCESS_TOKEN = "access_token";
    static readonly REFRESH_TOKEN = "refresh_token";
  };
}
