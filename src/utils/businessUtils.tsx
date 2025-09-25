import React from "react";
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "inactive":
      return "bg-red-100 text-red-800 border-red-200";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getStatusIcon = (status: string): React.ReactElement => {
  switch (status) {
    case "active":
      return <CheckCircle className="w-3 h-3" />;
    case "inactive":
      return <XCircle className="w-3 h-3" />;
    case "maintenance":
      return <AlertCircle className="w-3 h-3" />;
    default:
      return <Clock className="w-3 h-3" />;
  }
};

export const getTypeColor = (type: string): string => {
  switch (type) {
    case "restaurant":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "bar":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "cafe":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
