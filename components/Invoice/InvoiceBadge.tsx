import React, { FC } from "react";
import { invoiceBadges } from "./invoiceBadges";

export const enum BadgeStatus {
  PAID = 0,
  DRAFT = 1,
  PENDING = 2,
}

export type InvoiceBadgeProps = {
  status: BadgeStatus;
};

export const InvoiceBadge: FC<InvoiceBadgeProps> = (props) => {
  const badge = invoiceBadges[props.status];
  return (
    <div
      className={`flex p-2 items-center justify-center rounded-lg w-24 h-10 
      ${badge.class} theme-transition`}
    >
      <div className={`w-2 h-2 rounded-full ${badge.dotColor}`}></div>
      <span className="-mb-1 ml-2 text-xs font-bold">{badge.text}</span>
    </div>
  );
};
