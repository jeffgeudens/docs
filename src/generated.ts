//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VendingMachine
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vendingMachineAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'userAddress', internalType: 'address', type: 'address' }],
    name: 'getCupcakeBalanceFor',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'userAddress', internalType: 'address', type: 'address' }],
    name: 'giveCupcakeTo',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const
