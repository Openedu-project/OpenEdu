export function walletStatusColor(status: string) {
  const upperStatus = status.toUpperCase();

  switch (upperStatus) {
    case 'SUCCESS': {
      return 'bg-[#E1F7E2] text-[#1C6D1F]';
    }
    case 'APPROVED': {
      return 'bg-[#E1F7E2] text-[#1C6D1F]';
    }
    case 'FAILED': {
      return 'bg-red-400 text-white';
    }
    case 'NEW': {
      return 'bg-yellow-100 text-yellow-700';
    }
    case 'CANCELLED': {
      return 'bg-red-100 text-red-800';
    }
    case 'REJECTED': {
      return 'bg-red-100 text-red-800';
    }
    case 'PENDING': {
      return 'bg-black text-white';
    }
    default: {
      return 'bg-black text-white';
    }
  }
}
