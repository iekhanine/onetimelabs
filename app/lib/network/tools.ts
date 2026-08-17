export type NetworkTool = {
  slug: string;
  name: string;
  category: string;
  description: string;
};

export const networkTools: NetworkTool[] = [
  { slug: "subnet-calculator", name: "Subnet Calculator", category: "IP ADDRESSING", description: "Calculate network, mask, broadcast, usable range, and host capacity." },
  { slug: "cidr-calculator", name: "CIDR Calculator", category: "IP ADDRESSING", description: "Convert CIDR prefixes into masks, wildcards, and address counts." },
  { slug: "ip-converter", name: "IP Converter", category: "IP ADDRESSING", description: "Convert IPv4 addresses between common representations." },
  { slug: "subnet-membership", name: "Subnet Membership", category: "IP ADDRESSING", description: "Check whether an IPv4 address belongs to a subnet." },
  { slug: "ip-classifier", name: "IP Classifier", category: "IP ADDRESSING", description: "Classify IPv4 addresses and identify common address ranges." },
  { slug: "wildcard-mask", name: "Wildcard Mask", category: "IP ADDRESSING", description: "Convert between subnet masks and wildcard masks." },
  { slug: "bandwidth-calculator", name: "Bandwidth Calculator", category: "PERFORMANCE", description: "Estimate transfer time from payload size and link speed." },
  { slug: "bandwidth-delay-product", name: "Bandwidth Delay Product", category: "PERFORMANCE", description: "Calculate the amount of data in flight across a link." },
  { slug: "mtu-calculator", name: "MTU Calculator", category: "PERFORMANCE", description: "Estimate payload sizes and protocol overhead for common MTUs." },
  { slug: "host-capacity", name: "Host Capacity", category: "IP ADDRESSING", description: "Determine address and usable-host capacity from a CIDR prefix." },
  { slug: "port-reference", name: "Port Reference", category: "REFERENCE", description: "Quick reference for commonly used TCP and UDP ports." },
  { slug: "mac-formatter", name: "MAC Formatter", category: "UTILITY", description: "Normalize and reformat MAC addresses into common display formats." },
];

export function getNetworkTool(slug: string) {
  return networkTools.find((tool) => tool.slug === slug);
}
