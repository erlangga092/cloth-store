import { AuthProps } from "@/types/auth";
import { usePage } from "@inertiajs/react";

export const hasAnyPermission = (permissions: Array<string>) => {
  const { auth } = usePage<{ auth: AuthProps }>().props;

  let allPermissions = auth.permissions;
  let hasPermission = false;

  permissions.forEach((permission: string) => {
    if (allPermissions[permission]) {
      hasPermission = true;
    }
  });

  return hasPermission;
};
