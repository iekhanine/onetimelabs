"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Network,
  RotateCcw,
} from "lucide-react";

import type {
  NetworkTool,
} from "../../../lib/network/tools";


// ==========================================================
// NETWORK INSTRUMENT 001 — TYPES + HELPERS
// ==========================================================

type Values =
  Record<string, string>;

type Field =
  [string, string, string?];

type Result =
  [string, string];

const fmt = (
  value: number,
  digits = 4,
) =>
  Number.isFinite(value)
    ? Number(value.toFixed(digits)).toString()
    : "—";


function parseIPv4(value: string):
number | null {

  const parts =
    value.trim().split(".");

  if (parts.length !== 4) {
    return null;
  }

  const nums =
    parts.map(Number);

  if (
    nums.some(
      (part) =>
        !Number.isInteger(part) ||
        part < 0 ||
        part > 255,
    )
  ) {
    return null;
  }

  return (
    (
      (nums[0] << 24) |
      (nums[1] << 16) |
      (nums[2] << 8) |
      nums[3]
    ) >>> 0
  );
}


function intToIPv4(value: number) {
  const n = value >>> 0;

  return [
    (n >>> 24) & 255,
    (n >>> 16) & 255,
    (n >>> 8) & 255,
    n & 255,
  ].join(".");
}


function prefixMask(prefix: number) {
  if (prefix <= 0) {
    return 0;
  }

  return (
    0xffffffff <<
    (32 - prefix)
  ) >>> 0;
}


function validPrefix(value: string) {
  const prefix =
    Number(value);

  return Number.isInteger(prefix) &&
    prefix >= 0 &&
    prefix <= 32
      ? prefix
      : null;
}


function prefixFromMask(mask: number) {
  const binary =
    (mask >>> 0)
      .toString(2)
      .padStart(32, "0");

  if (!/^1*0*$/.test(binary)) {
    return null;
  }

  return binary.indexOf("0") === -1
    ? 32
    : binary.indexOf("0");
}


function subnetInfo(
  ipText: string,
  prefixText: string,
): Result[] {

  const ip =
    parseIPv4(ipText);

  const prefix =
    validPrefix(prefixText);

  if (
    ip === null ||
    prefix === null
  ) {
    return [
      ["STATUS", "INVALID INPUT"],
    ];
  }

  const mask =
    prefixMask(prefix);

  const wildcard =
    (~mask) >>> 0;

  const network =
    (ip & mask) >>> 0;

  const broadcast =
    (network | wildcard) >>> 0;

  const total =
    2 ** (32 - prefix);

  const usable =
    prefix >= 31
      ? total
      : Math.max(total - 2, 0);

  const first =
    prefix >= 31
      ? network
      : network + 1;

  const last =
    prefix >= 31
      ? broadcast
      : broadcast - 1;

  return [
    ["NETWORK", `${intToIPv4(network)}/${prefix}`],
    ["SUBNET MASK", intToIPv4(mask)],
    ["WILDCARD", intToIPv4(wildcard)],
    ["BROADCAST", intToIPv4(broadcast)],
    ["FIRST USABLE", intToIPv4(first)],
    ["LAST USABLE", intToIPv4(last)],
    ["TOTAL ADDRESSES", total.toLocaleString()],
    ["USABLE HOSTS", usable.toLocaleString()],
  ];
}


// ==========================================================
// NETWORK INSTRUMENT 002 — STANDARD CALCULATORS
// ==========================================================

const configs:
Record<
  string,
  {
    fields: Field[];
    calc: (values: Values) => Result[];
  }
> = {

  "subnet-calculator": {
    fields: [
      ["ip", "IPv4 Address", "192.168.10.42"],
      ["prefix", "CIDR Prefix", "24"],
    ],
    calc: (v) =>
      subnetInfo(
        v.ip,
        v.prefix,
      ),
  },

  "cidr-calculator": {
    fields: [
      ["prefix", "CIDR Prefix", "24"],
    ],
    calc: (v) => {
      const prefix =
        validPrefix(v.prefix);

      if (prefix === null) {
        return [["STATUS", "INVALID PREFIX"]];
      }

      const mask =
        prefixMask(prefix);

      const total =
        2 ** (32 - prefix);

      return [
        ["CIDR", `/${prefix}`],
        ["SUBNET MASK", intToIPv4(mask)],
        ["WILDCARD", intToIPv4((~mask) >>> 0)],
        ["TOTAL ADDRESSES", total.toLocaleString()],
        [
          "TRADITIONAL USABLE",
          prefix >= 31
            ? total.toLocaleString()
            : Math.max(total - 2, 0).toLocaleString(),
        ],
      ];
    },
  },

  "ip-converter": {
    fields: [
      ["ip", "IPv4 Address", "192.168.1.10"],
    ],
    calc: (v) => {
      const ip =
        parseIPv4(v.ip);

      if (ip === null) {
        return [["STATUS", "INVALID IPv4"]];
      }

      const octets =
        v.ip.trim().split(".").map(Number);

      return [
        ["DOTTED DECIMAL", intToIPv4(ip)],
        [
          "BINARY",
          octets
            .map(
              (x) =>
                x.toString(2).padStart(8, "0"),
            )
            .join("."),
        ],
        [
          "HEXADECIMAL",
          "0x" +
          ip
            .toString(16)
            .toUpperCase()
            .padStart(8, "0"),
        ],
        ["UNSIGNED INTEGER", String(ip)],
      ];
    },
  },

  "subnet-membership": {
    fields: [
      ["a", "IPv4 Address A", "192.168.1.10"],
      ["b", "IPv4 Address B", "192.168.1.200"],
      ["prefix", "CIDR Prefix", "24"],
    ],
    calc: (v) => {
      const a =
        parseIPv4(v.a);

      const b =
        parseIPv4(v.b);

      const prefix =
        validPrefix(v.prefix);

      if (
        a === null ||
        b === null ||
        prefix === null
      ) {
        return [["STATUS", "INVALID INPUT"]];
      }

      const mask =
        prefixMask(prefix);

      const networkA =
        (a & mask) >>> 0;

      const networkB =
        (b & mask) >>> 0;

      return [
        [
          "SAME SUBNET",
          networkA === networkB
            ? "YES"
            : "NO",
        ],
        ["NETWORK A", `${intToIPv4(networkA)}/${prefix}`],
        ["NETWORK B", `${intToIPv4(networkB)}/${prefix}`],
      ];
    },
  },

  "ip-classifier": {
    fields: [
      ["ip", "IPv4 Address", "10.20.30.40"],
    ],
    calc: (v) => {
      const ip =
        parseIPv4(v.ip);

      if (ip === null) {
        return [["STATUS", "INVALID IPv4"]];
      }

      const inRange = (
        base: string,
        prefix: number,
      ) => {
        const b =
          parseIPv4(base)!;

        const mask =
          prefixMask(prefix);

        return (
          (ip & mask) >>> 0
        ) === (
          (b & mask) >>> 0
        );
      };

      let type = "PUBLIC / OTHER";

      if (inRange("10.0.0.0", 8)) {
        type = "PRIVATE RFC1918";
      }
      else if (inRange("172.16.0.0", 12)) {
        type = "PRIVATE RFC1918";
      }
      else if (inRange("192.168.0.0", 16)) {
        type = "PRIVATE RFC1918";
      }
      else if (inRange("127.0.0.0", 8)) {
        type = "LOOPBACK";
      }
      else if (inRange("169.254.0.0", 16)) {
        type = "LINK-LOCAL";
      }
      else if (inRange("224.0.0.0", 4)) {
        type = "MULTICAST";
      }
      else if (
        inRange("192.0.2.0", 24) ||
        inRange("198.51.100.0", 24) ||
        inRange("203.0.113.0", 24)
      ) {
        type = "DOCUMENTATION";
      }

      return [
        ["ADDRESS", intToIPv4(ip)],
        ["CLASSIFICATION", type],
        [
          "LEGACY CLASS",
          ((ip >>> 24) & 255) < 128
            ? "A"
            : ((ip >>> 24) & 255) < 192
              ? "B"
              : ((ip >>> 24) & 255) < 224
                ? "C"
                : "D/E",
        ],
      ];
    },
  },

  "wildcard-mask": {
    fields: [
      ["mask", "Subnet Mask", "255.255.255.0"],
    ],
    calc: (v) => {
      const mask =
        parseIPv4(v.mask);

      if (mask === null) {
        return [["STATUS", "INVALID MASK"]];
      }

      const prefix =
        prefixFromMask(mask);

      if (prefix === null) {
        return [["STATUS", "NON-CONTIGUOUS MASK"]];
      }

      return [
        ["CIDR", `/${prefix}`],
        ["SUBNET MASK", intToIPv4(mask)],
        ["WILDCARD MASK", intToIPv4((~mask) >>> 0)],
      ];
    },
  },

  "bandwidth-calculator": {
    fields: [
      ["size", "Payload Size", "10"],
      ["sizeUnit", "Size Unit (MB/GB/TB)", "GB"],
      ["speed", "Throughput", "100"],
      ["speedUnit", "Speed Unit (Mbps/Gbps)", "Mbps"],
    ],
    calc: (v) => {
      const size =
        Number(v.size);

      const speed =
        Number(v.speed);

      const sizeFactor:
      Record<string, number> = {
        MB: 1e6,
        GB: 1e9,
        TB: 1e12,
      };

      const speedFactor:
      Record<string, number> = {
        Mbps: 1e6,
        Gbps: 1e9,
      };

      const bytes =
        size *
        (sizeFactor[v.sizeUnit.toUpperCase()] || 1e9);

      const bitsPerSecond =
        speed *
        (
          speedFactor[
            v.speedUnit.toLowerCase() === "gbps"
              ? "Gbps"
              : "Mbps"
          ] || 1e6
        );

      const seconds =
        bytes * 8 / bitsPerSecond;

      return [
        ["SECONDS", fmt(seconds, 2)],
        ["MINUTES", fmt(seconds / 60, 2)],
        ["HOURS", fmt(seconds / 3600, 3)],
        [
          "NOTE",
          "IDEALIZED // excludes protocol overhead",
        ],
      ];
    },
  },

  "bandwidth-delay-product": {
    fields: [
      ["bandwidth", "Bandwidth (Mbps)", "1000"],
      ["rtt", "Round Trip Time (ms)", "40"],
    ],
    calc: (v) => {
      const bps =
        Number(v.bandwidth) * 1e6;

      const seconds =
        Number(v.rtt) / 1000;

      const bits =
        bps * seconds;

      const bytes =
        bits / 8;

      return [
        ["BDP BITS", Math.round(bits).toLocaleString()],
        ["BDP BYTES", Math.round(bytes).toLocaleString()],
        ["BDP KiB", fmt(bytes / 1024, 2)],
        ["BDP MiB", fmt(bytes / 1024 / 1024, 3)],
      ];
    },
  },

  "mtu-calculator": {
    fields: [
      ["mtu", "Interface MTU", "1500"],
      ["ipVersion", "IP Version (4/6)", "4"],
      ["protocol", "Transport (TCP/UDP)", "TCP"],
    ],
    calc: (v) => {
      const mtu =
        Number(v.mtu);

      const ipHeader =
        v.ipVersion.trim() === "6"
          ? 40
          : 20;

      const protocol =
        v.protocol.trim().toUpperCase();

      const transport =
        protocol === "UDP"
          ? 8
          : 20;

      const payload =
        mtu - ipHeader - transport;

      return [
        ["MTU", fmt(mtu, 0)],
        ["IP HEADER", `${ipHeader} bytes`],
        ["TRANSPORT HEADER", `${transport} bytes`],
        ["MAX PAYLOAD", `${Math.max(payload, 0)} bytes`],
      ];
    },
  },

  "host-capacity": {
    fields: [
      ["hosts", "Required Usable Hosts", "200"],
    ],
    calc: (v) => {
      const hosts =
        Math.max(
          0,
          Math.floor(Number(v.hosts)),
        );

      if (!Number.isFinite(hosts)) {
        return [["STATUS", "INVALID HOST COUNT"]];
      }

      let hostBits = 2;

      while (
        2 ** hostBits - 2 < hosts &&
        hostBits < 32
      ) {
        hostBits++;
      }

      const prefix =
        32 - hostBits;

      const total =
        2 ** hostBits;

      return [
        ["RECOMMENDED CIDR", `/${prefix}`],
        ["SUBNET MASK", intToIPv4(prefixMask(prefix))],
        ["TOTAL ADDRESSES", total.toLocaleString()],
        ["USABLE HOSTS", Math.max(total - 2, 0).toLocaleString()],
      ];
    },
  },
};


// ==========================================================
// NETWORK INSTRUMENT 003 — PORT REFERENCE
// ==========================================================

const ports = [
  [20, "TCP", "FTP Data"],
  [21, "TCP", "FTP Control"],
  [22, "TCP", "SSH / SFTP"],
  [23, "TCP", "Telnet"],
  [25, "TCP", "SMTP"],
  [53, "TCP/UDP", "DNS"],
  [67, "UDP", "DHCP Server"],
  [68, "UDP", "DHCP Client"],
  [69, "UDP", "TFTP"],
  [80, "TCP", "HTTP"],
  [110, "TCP", "POP3"],
  [123, "UDP", "NTP"],
  [135, "TCP/UDP", "Microsoft RPC"],
  [137, "UDP", "NetBIOS Name"],
  [138, "UDP", "NetBIOS Datagram"],
  [139, "TCP", "NetBIOS Session"],
  [143, "TCP", "IMAP"],
  [161, "UDP", "SNMP"],
  [162, "UDP", "SNMP Trap"],
  [389, "TCP/UDP", "LDAP"],
  [443, "TCP", "HTTPS"],
  [445, "TCP", "SMB"],
  [465, "TCP", "SMTPS"],
  [514, "UDP", "Syslog"],
  [587, "TCP", "SMTP Submission"],
  [636, "TCP", "LDAPS"],
  [993, "TCP", "IMAPS"],
  [995, "TCP", "POP3S"],
  [1433, "TCP", "Microsoft SQL Server"],
  [1521, "TCP", "Oracle Database"],
  [2049, "TCP/UDP", "NFS"],
  [3306, "TCP", "MySQL"],
  [3389, "TCP/UDP", "RDP"],
  [5432, "TCP", "PostgreSQL"],
  [5900, "TCP", "VNC"],
  [6379, "TCP", "Redis"],
  [8080, "TCP", "HTTP Alternate"],
  [8443, "TCP", "HTTPS Alternate"],
] as const;


function PortReference() {
  const [
    query,
    setQuery,
  ] = useState("");

  const matches =
    useMemo(
      () => {
        const q =
          query.trim().toLowerCase();

        if (!q) {
          return ports;
        }

        return ports.filter(
          ([port, protocol, service]) =>
            String(port).includes(q) ||
            protocol.toLowerCase().includes(q) ||
            service.toLowerCase().includes(q),
        );
      },
      [query],
    );

  return (
    <>
      <div className="input-grid">
        <label>
          <span>PORT / PROTOCOL / SERVICE</span>

          <input
            value={query}
            placeholder="443, HTTPS, SNMP..."
            onChange={
              (event) =>
                setQuery(event.target.value)
            }
          />
        </label>
      </div>

      <div className="results">
        {matches.slice(0, 18).map(
          ([port, protocol, service]) => (
            <div key={`${port}-${service}`}>
              <span>
                {protocol} // PORT {port}
              </span>

              <strong>
                {service}
              </strong>
            </div>
          ),
        )}
      </div>
    </>
  );
}


// ==========================================================
// NETWORK INSTRUMENT 004 — MAC FORMATTER
// ==========================================================

function MacFormatter() {
  const [
    value,
    setValue,
  ] = useState("00:1A:2B:3C:4D:5E");

  const clean =
    value
      .replace(/[^a-fA-F0-9]/g, "")
      .toUpperCase();

  const valid =
    clean.length === 12;

  const pairs =
    valid
      ? clean.match(/.{2}/g) || []
      : [];

  const cisco =
    valid
      ? `${clean.slice(0, 4)}.${clean.slice(4, 8)}.${clean.slice(8, 12)}`
      : "—";

  return (
    <>
      <div className="input-grid">
        <label>
          <span>MAC ADDRESS</span>

          <input
            value={value}
            onChange={
              (event) =>
                setValue(event.target.value)
            }
          />
        </label>
      </div>

      <div className="results">
        <div>
          <span>COLON</span>
          <strong>
            {valid ? pairs.join(":") : "INVALID"}
          </strong>
        </div>

        <div>
          <span>HYPHEN</span>
          <strong>
            {valid ? pairs.join("-") : "—"}
          </strong>
        </div>

        <div>
          <span>CISCO</span>
          <strong>{cisco}</strong>
        </div>

        <div>
          <span>PLAIN</span>
          <strong>
            {valid ? clean : "—"}
          </strong>
        </div>
      </div>
    </>
  );
}


// ==========================================================
// NETWORK INSTRUMENT 005 — MAIN INSTRUMENT PANEL
// ==========================================================

export default function NetworkInstrument({
  tool,
}: {
  tool: NetworkTool;
}) {

  const config =
    configs[tool.slug];

  const initial =
    Object.fromEntries(
      (config?.fields || []).map(
        (field) => [
          field[0],
          field[2] || "",
        ],
      ),
    );

  const [
    values,
    setValues,
  ] = useState<Values>(initial);

  const results =
    config
      ? config.calc(values)
      : [];

  return (
    <main className="tool-shell">
      <section className="tool-panel">

        {/* ==================================================
            HEADER 006 — INSTRUMENT ID
            ================================================== */}

        <header className="tool-header">
          <div>
            <span>
              NETWORK TOOLKIT // {tool.category}
            </span>

            <h1>
              <Network size={19} />
              {tool.name}
            </h1>

            <p>
              {tool.description}
            </p>
          </div>

          <a href="/toolkits/network">
            <ArrowLeft size={13} />
            TOOL LIBRARY
          </a>
        </header>


        {/* ==================================================
            DISPLAY 007 — INSTRUMENT STATUS
            ================================================== */}

        <div className="tool-display">
          <span>INSTRUMENT STATUS</span>
          <strong>READY // INPUT VALUES</strong>
        </div>


        {/* ==================================================
            CONTROL PANEL 008 — TOOL INPUT + OUTPUT
            ================================================== */}

        <section className="instrument">
          <div className="instrument-title">
            <span>CONTROL INPUT</span>

            <button
              type="button"
              onClick={
                () =>
                  setValues(initial)
              }
            >
              <RotateCcw size={11} />
              RESET
            </button>
          </div>

          {tool.slug === "port-reference" ? (
            <PortReference />
          ) : tool.slug === "mac-formatter" ? (
            <MacFormatter />
          ) : (
            <>
              <div className="input-grid">
                {config?.fields.map(
                  (field) => (
                    <label key={field[0]}>
                      <span>
                        {field[1]}
                      </span>

                      <input
                        value={values[field[0]]}
                        onChange={
                          (event) =>
                            setValues({
                              ...values,
                              [field[0]]:
                                event.target.value,
                            })
                        }
                      />
                    </label>
                  ),
                )}
              </div>

              <div className="results">
                {results.map(
                  (result) => (
                    <div key={result[0]}>
                      <span>
                        {result[0]}
                      </span>

                      <strong>
                        {result[1]}
                      </strong>
                    </div>
                  ),
                )}
              </div>
            </>
          )}
        </section>

        <p className="tool-note">
          NETWORK CALCULATION AID // Validate production changes
          against your network design, vendor documentation,
          security policy, and change-control requirements.
        </p>
      </section>
    </main>
  );
}
