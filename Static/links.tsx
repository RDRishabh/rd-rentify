import React from "react";

interface LinkType {
  title: string;
  path: string;
}

export interface ParentLinkType extends LinkType {
  icon: JSX.Element;
}

class BaseUserPaths {
  path: ParentLinkType[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <i className="fi fi-rr-chart-pie-alt"></i>,
    },
  ];

  get getPaths() {
    return this.path;
  }

}

class Seller extends BaseUserPaths {
  prvPath: ParentLinkType[] = [
    {
      title: "My Properties",
      path: "/seller/properties",
      icon: <i className="fi fi-rr-chart-pie-alt"></i>,
    },
  ];
  constructor() {
    super();
    this.path.push(...this.prvPath)
  }

  get getPaths() {
    return this.path;
  }

  get getPrvPath() {
    return this.prvPath;
  }
}

class Buyer extends BaseUserPaths {
  prvPath: ParentLinkType[] = [
    {
      title: "Rentals",
      path: "/properties/all",
      icon: <i className="fi fi-rr-chart-pie-alt"></i>,
    },
    {
      title: "Liked",
      path: "/properties/liked",
      icon: <i className="fi fi-rs-pen-circle"></i>,
    },
  ];
  constructor() {
    super();
    this.path.push(...this.prvPath)
  }

  get getPaths() {
    return this.path;
  }

  get getPrvPath() {
    return this.prvPath;
  }
}

export interface RolesTypes {
  roles: "Seller" | "Buyer";
}

const Roles: Record<RolesTypes["roles"], ParentLinkType[]> = {
  Buyer: new Buyer().getPaths,
  Seller: new Seller().getPaths,
};

const GetUserLinkByLevel = (role: RolesTypes["roles"]) => {
  return Roles[role];
};

export default Roles;
export { GetUserLinkByLevel };
