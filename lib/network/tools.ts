// ==========================================================
// NETWORK TOOLS 001 — TOOL LIBRARY
// ==========================================================

export type NetworkTool = {
  slug: string;
  name: string;
  category: string;
  description: string;
  accent: "cyan" | "amber" | "green" | "violet" | "red";
};

export const networkTools: NetworkTool[] = [
  {
    slug: "subnet-calculator",
    name: "SUBNET CALCULATOR",
    category: "IP ADDRESSING",
    description: "Calculate network, broadcast, usable range, mask, and host capacity from IPv4 CIDR.",
    accent: "cyan",
  },
  {
    slug: "cidr-calculator",
    name: "CIDR / MASK CALCULATOR",
    category: "IP ADDRESSING",
    description: "Convert IPv4 CIDR prefixes to subnet masks, wildcard masks, and address counts.",
    accent: "cyan",
  },
  {
    slug: "ip-converter",
    name: "IP CONVERTER",
    category: "IP ADDRESSING",
    description: "Convert IPv4 addresses between dotted decimal, binary, hexadecimal, and integer forms.",
    accent: "green",
  },
  {
    slug: "subnet-membership",
    name: "SUBNET MEMBERSHIP",
    category: "IP ADDRESSING",
    description: "Determine whether two IPv4 addresses belong to the same subnet.",
    accent: "violet",
  },
  {
    slug: "ip-classifier",
    name: "IP CLASSIFIER",
    category: "IP ADDRESSING",
    description: "Identify private, loopback, link-local, multicast, documentation, and public IPv4 ranges.",
    accent: "green",
  },
  {
    slug: "wildcard-mask",
    name: "WILDCARD MASK",
    category: "IP ADDRESSING",
    description: "Convert between subnet masks, CIDR prefixes, and inverse wildcard masks.",
    accent: "amber",
  },
  {
    slug: "port-reference",
    name: "PORT REFERENCE",
    category: "SERVICES",
    description: "Look up common TCP and UDP ports and their typical services.",
    accent: "amber",
  },
  {
    slug: "mac-formatter",
    name: "MAC FORMATTER",
    category: "LAYER 2",
    description: "Normalize a MAC address into colon, hyphen, Cisco, and plain formats.",
    accent: "violet",
  },
  {
    slug: "bandwidth-calculator",
    name: "TRANSFER TIME",
    category: "PERFORMANCE",
    description: "Estimate transfer duration from payload size and available network throughput.",
    accent: "green",
  },
  {
    slug: "bandwidth-delay-product",
    name: "BANDWIDTH DELAY PRODUCT",
    category: "PERFORMANCE",
    description: "Calculate the amount of data required in flight to fully utilize a network path.",
    accent: "cyan",
  },
  {
    slug: "mtu-calculator",
    name: "MTU PAYLOAD CALCULATOR",
    category: "PACKETS",
    description: "Estimate IPv4/IPv6 TCP or UDP payload capacity from an interface MTU.",
    accent: "red",
  },
  {
    slug: "host-capacity",
    name: "HOST CAPACITY",
    category: "PLANNING",
    description: "Find the smallest IPv4 subnet prefix capable of supporting a required host count.",
    accent: "green",
  },
];

export function getNetworkTool(slug: string) {
  return networkTools.find((tool) => tool.slug === slug);
}
