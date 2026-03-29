export const newsItems = [
  {
    id: 1,
    category: "Protocol",
    tag: "DeFi",
    title: "Uniswap v4 Hooks Enable Custom AMM Logic Without Forking",
    summary: "Uniswap's latest version introduces a hooks system that lets developers inject custom logic at key points in the swap lifecycle — opening the door to on-chain limit orders, dynamic fees, and MEV redistribution.",
    date: "2026-03-27",
    readTime: "4 min read",
    content: `Uniswap v4 marks a fundamental shift in how decentralized exchanges can be built and extended. The core innovation is the **hooks system** — a plugin architecture that allows developers to attach custom smart contracts that execute at specific points during a pool's lifecycle: before and after swaps, before and after liquidity changes, and during pool initialization.

## What Are Hooks?

A hook is a contract deployed alongside a Uniswap v4 pool that implements callback functions. When a user interacts with the pool, the pool manager calls these callbacks at defined checkpoints. Developers can use this to:

- **On-chain limit orders**: Hold a user's order until the price crosses a threshold, then auto-execute.
- **Dynamic fees**: Adjust swap fees based on volatility, time of day, or oracle data.
- **MEV redistribution**: Capture value from arbitrage and return it to liquidity providers.
- **TWAMM (Time-Weighted Average Market Maker)**: Break large orders into tiny pieces executed over time.

## Singleton Architecture

Unlike v3 where each pool is a separate contract, v4 uses a **singleton** — one contract manages all pools. This slashes gas costs by ~99% for multi-hop swaps since there's no need to transfer tokens between contracts; balances are tracked internally via a "flash accounting" system.

## Security Implications

The open nature of hooks means users must verify the hook contract before interacting with a pool. A malicious hook could drain funds. The Uniswap team is developing a hook auditing framework, but for now due diligence falls on users and front-ends.

## Ecosystem Impact

Already, over 200 hook contracts have been open-sourced by the community. Analysts predict hooks will absorb significant volume currently flowing to specialized DEXs built for specific use cases — the general-purpose hook infrastructure may outcompete narrow single-purpose protocols.`,
  },
  {
    id: 2,
    category: "Layer 2",
    tag: "Scaling",
    title: "ZK-Rollups Hit 100,000 TPS Milestone in Testnet Stress Test",
    summary: "A new ZK-rollup implementation achieved a sustained throughput of 100,000 transactions per second during a coordinated testnet stress test, representing a 10x improvement over previous benchmarks.",
    date: "2026-03-26",
    readTime: "3 min read",
    content: `A coordinated stress test conducted across three continents has pushed a next-generation ZK-rollup to **100,000 transactions per second** — a milestone that puts blockchain throughput in the same ballpark as Visa's peak processing capacity.

## The Test Setup

The test was run on a devnet with 50 geographically distributed sequencer nodes. Transactions were synthetic ERC-20 transfers, chosen because they represent the most common on-chain action. The proving system used a custom recursive SNARK that batches proofs from multiple sequencers before submitting a single validity proof to Ethereum L1.

## Key Technical Breakthroughs

**Parallel Proving**: Previous ZK systems were bottlenecked by serial proof generation. The new architecture splits the transaction batch into shards and proves them in parallel across GPU clusters, then aggregates proofs in a tree structure.

**Hardware Acceleration**: Custom FPGA circuits reduced proving time for a 10,000-tx batch from ~8 seconds to under 400ms. This unlocks sub-second finality even at high throughput.

**Calldata Compression**: By encoding transaction data with a domain-specific compression scheme (leveraging the predictable structure of on-chain transfers), the team achieved 8:1 compression ratios, dramatically reducing L1 settlement costs.

## Caveats

The 100k TPS figure is for simple transfers. Complex DeFi interactions with multiple contract calls remain constrained by proof generation time. Real-world mainnet performance will also depend on sequencer decentralization — current production deployments use a single sequencer for liveness.

## What This Means

If these results translate to mainnet, gas fees could fall below $0.001 per transaction for most users, making micro-transactions economically viable for the first time. This could unlock gaming, social, and payments use cases that were previously priced out of Ethereum.`,
  },
  {
    id: 3,
    category: "Regulation",
    tag: "Policy",
    title: "EU MiCA Framework Enters Full Enforcement — Here's What Changes",
    summary: "The Markets in Crypto-Assets regulation is now fully in force across all 27 EU member states. Exchanges, stablecoin issuers, and wallet providers face new licensing requirements, reserve mandates, and disclosure rules.",
    date: "2026-03-25",
    readTime: "5 min read",
    content: `After years of debate and an 18-month phased rollout, the EU's **Markets in Crypto-Assets (MiCA)** regulation is now fully enforced. This is the most comprehensive crypto regulatory framework enacted by any major jurisdiction and will reshape how crypto businesses operate in Europe.

## Who Is Affected

**Crypto Asset Service Providers (CASPs)**: Any exchange, broker, custodian, or trading platform serving EU residents must obtain a CASP license from their home member state's regulator. The license provides a "passport" to operate across all 27 countries.

**Stablecoin Issuers**: Both "e-money tokens" (fiat-pegged) and "asset-referenced tokens" must maintain 1:1 reserves held with EU-regulated custodians. Daily transaction volume limits apply to non-euro stablecoins — once a stablecoin exceeds €200M in daily EU volume, new issuance pauses until the issuer meets enhanced requirements.

**DeFi Protocols**: Fully decentralized protocols with no identifiable issuer are exempt — for now. The European Securities and Markets Authority (ESMA) has 18 months to issue guidance on how DeFi will be treated going forward.

## Key Compliance Requirements

- **Whitepapers**: Any token offering must publish a standardized whitepaper with liability attached to the issuer.
- **Conflict of Interest Disclosure**: CASPs must disclose any financial relationships with token projects listed on their platform.
- **Segregation of Client Assets**: Customer funds must be held separately from company operating funds.
- **Travel Rule**: All transfers above €1,000 must include sender and receiver identification, extending existing FATF standards to crypto.

## Industry Response

Major exchanges have largely completed compliance preparations. Several smaller platforms announced they would exit the EU market rather than bear licensing costs estimated at €500,000–€2M. Stablecoin issuers Circle (USDC) and Tether (USDT) have taken different approaches — Circle obtained an e-money license and is fully compliant; Tether has not and faces potential delisting from EU-regulated platforms.

## The Road Ahead

ESMA's upcoming DeFi guidance will be the next major regulatory event to watch. The outcome will determine whether DeFi front-ends, DAOs, and protocol governance token holders face liability — questions that remain deeply contentious among legal scholars.`,
  },
  {
    id: 4,
    category: "Security",
    tag: "Exploit",
    title: "$47M Drained from Cross-Chain Bridge via Signature Replay Attack",
    summary: "A cross-chain bridge suffered a $47M exploit after attackers discovered that signed withdrawal messages could be replayed on a newly deployed contract. The protocol's upgrade process failed to invalidate existing signatures.",
    date: "2026-03-24",
    readTime: "3 min read",
    content: `A cross-chain bridge lost **$47 million** in a signature replay attack — a vulnerability class that has now been responsible for over $2 billion in bridge losses across the industry.

## What Happened

The protocol underwent a smart contract upgrade to patch an unrelated bug. The new contract was deployed to a different address, but the development team failed to implement a mechanism to invalidate signatures that had been issued against the old contract's domain separator.

An attacker discovered that withdrawal authorizations signed by the bridge's validator set used a domain separator that didn't include the contract address — only a chain ID and a fixed string. This meant signatures valid for the old contract were equally valid for the new one.

## The Attack Sequence

1. Attacker collected valid, unspent withdrawal signatures from the bridge's mempool and event logs.
2. After the upgrade was deployed, the attacker submitted these old signatures to the new contract.
3. The new contract, lacking nonce tracking for cross-chain messages, accepted the replayed withdrawals.
4. Over 47 transactions, the attacker drained the bridge's liquidity pools across Ethereum, Arbitrum, and Base.

## Root Cause

The core failure was the absence of **EIP-712 compliant domain separation** that includes the verifying contract's address. EIP-712 specifically requires 'verifyingContract' in the domain separator to prevent exactly this attack. The team had used a simplified signing scheme that omitted this field.

## Post-Mortem Lessons

Bridge security researchers note this is the third major replay attack on bridges in 12 months. Recommendations now universally include:
- Always include 'verifyingContract' and 'chainId' in signature domain separators
- Implement global nonce tracking that persists across upgrades
- Use upgrade patterns that explicitly revoke all outstanding authorizations

The protocol has paused operations and is working with white-hat researchers on a recovery plan. Approximately 60% of stolen funds are still in the attacker's wallet, and negotiation is ongoing.`,
  },
  {
    id: 5,
    category: "Infrastructure",
    tag: "Node Software",
    title: "Ethereum Clients Ship Verkle Tree Migration — State Size Drops 40%",
    summary: "The long-awaited Verkle tree migration has shipped across all major Ethereum execution clients. Early benchmarks show a 40% reduction in state size and significant improvements in stateless client verification speed.",
    date: "2026-03-23",
    readTime: "4 min read",
    content: `After years of research and development, all major Ethereum execution clients — Geth, Nethermind, Besu, and Erigon — have shipped implementations of **Verkle trees**, the cryptographic data structure that will eventually replace Merkle Patricia Tries as Ethereum's state representation.

## Why Verkle Trees Matter

Ethereum's current Merkle Patricia Trie (MPT) produces **witnesses** — cryptographic proofs that a piece of state exists — that can be several hundred kilobytes for complex transactions. This makes stateless clients impractical: a node would need to download enormous witnesses for every block.

Verkle trees use **vector commitments** based on polynomial cryptography (specifically, KZG commitments) to produce witnesses that are **10-30x smaller** than MPT witnesses. A full block witness shrinks from ~2MB to ~150KB, making it feasible for lightweight clients to verify blocks without storing any state.

## What Shipped

The clients have implemented:
- Verkle tree state storage and traversal
- Witness generation for all transaction types
- A conversion layer that reads both MPT and Verkle state during the migration window

The state conversion is the hardest part. Ethereum has ~200GB of MPT state that needs to be converted. The migration will happen lazily — state is converted to Verkle format when it's accessed, while untouched state is migrated in background processes.

## Benchmarks

Early testnet data shows:
- **40% reduction** in raw state database size
- **Witness generation** 3x faster than equivalent MPT proofs
- **Stateless verification** of witnesses takes ~2ms per block — fast enough for resource-constrained devices

## Path to Mainnet

The Ethereum Improvement Proposal for the Verkle migration (EIP-6800) is in "Last Call" status. A testnet specifically for Verkle migration testing — "Kaustinen" — has been running for six months without issues. If testnet stability holds, mainnet activation could follow within 12 months.

This is a prerequisite for true stateless Ethereum, where users could run full nodes on phones without ever storing the full state.`,
  },
  {
    id: 6,
    category: "Markets",
    tag: "On-Chain Data",
    title: "Stablecoin Supply Hits All-Time High as Institutions Ramp On-Chain Activity",
    summary: "Total stablecoin supply across all chains crossed $250 billion for the first time. Data suggests the growth is driven primarily by institutional treasury operations and tokenized money market funds, not retail speculation.",
    date: "2026-03-22",
    readTime: "3 min read",
    content: `The total supply of stablecoins across all blockchains has crossed **$250 billion** for the first time, according to on-chain data aggregated from Ethereum, Solana, Tron, Base, and a dozen other networks. The milestone reflects a fundamental shift in who is using stablecoins and for what purpose.

## The Numbers

- **USDC**: $95B (+8% month-over-month), growing fastest on Base and Ethereum
- **USDT**: $112B (+3%), dominant on Tron for payments and cross-border remittances
- **USDS (formerly DAI)**: $18B, heavily used in DeFi yield strategies
- **Tokenized Money Market Funds**: $22B combined (BlackRock BUIDL, Franklin OnChain, Fidelity FBTB)

## Institutional Drivers

The most notable trend is the explosive growth of **tokenized money market funds** — traditional financial instruments wrapped as on-chain tokens. These products offer:
- Yield (currently ~4.8% APY) vs. 0% for fiat stablecoins
- Instant on-chain settlement for institutional trades
- Use as collateral in DeFi protocols

Multiple Fortune 500 companies have disclosed that they hold portions of their treasury in tokenized money market funds. The appeal is clear: earn yield on idle cash while maintaining the flexibility to deploy it on-chain for DeFi operations or cross-border payments within seconds.

## Remittance Use Case Maturing

On Tron and Solana, stablecoin transfer volume for sub-$1,000 transactions has grown 340% year-over-year. This segment — dominated by migrant workers sending money home — has found a product-market fit that legacy remittance providers like Western Union cannot easily match on cost (average fee: $0.02 vs. $12-25 for wire transfers).

## Risk Watch

Concentration risk remains high — three issuers control 92% of supply. Regulatory action against any of them, or a de-peg event, could have outsized market impact. The MiCA framework's reserve requirements in Europe are seen as a positive step toward reducing tail risk in the sector.`,
  },
    {
    id: 7,
    category: "Macro",
    tag: "FX Markets",
    title: "Nigerian Naira Hits Record Lows as Iran-US Conflict Drives Oil Shock and Dollar Flight",
    summary: "The naira has lost over 18% of its value in three weeks as the escalating Iran-US conflict pushes oil markets into chaos, triggers a global risk-off surge in dollar demand, and squeezes Nigeria's already strained foreign reserves.",
    date: "2026-03-27",
    readTime: "5 min read",
    content: `The Nigerian naira is in freefall. In less than a month, the currency has shed **18.4%** against the US dollar — sliding from ₦1,580/$ to ₦1,871/$ at the official NAFEM window, with parallel market rates pushing past ₦2,100/$. The trigger is the escalating military standoff between Iran and the United States, which has unleashed a cascade of macroeconomic shocks that Nigeria is poorly positioned to absorb.

## The Iran-US Conflict and the Oil Paradox

At first glance, a conflict in the Persian Gulf should benefit Nigeria — Africa's largest oil producer. Brent crude spiked to $134/barrel in the opening days of hostilities as markets priced in potential Strait of Hormuz disruptions. But the effect on Nigeria has been the opposite of what many expected.

**Why Nigeria isn't winning on oil:**
- Nigeria's daily output has declined to roughly 1.3 million barrels per day due to ongoing pipeline vandalism and underinvestment — far below its OPEC quota of 1.8 mbpd
- The bulk of Nigeria's oil revenues are locked into forward sale agreements and joint venture obligations, limiting the government's immediate dollar inflows
- Petrol subsidies were partially reinstated earlier this year under political pressure, meaning higher oil prices translate to higher subsidy costs, not windfall revenue

## Dollar Scarcity and Capital Flight

The broader global impact of the conflict has been a violent **flight to safety**. Institutional investors are unwinding positions in frontier and emerging markets and piling into US Treasuries and the dollar. This dynamic is hitting every African currency hard, but Nigeria's structural vulnerabilities amplify the pain.

The Central Bank of Nigeria (CBN) has intervened twice in the past week, selling a combined $210 million from reserves to defend the naira — but foreign reserves have already fallen to $32.4 billion, a level analysts describe as providing less than five months of import cover.

## Import Cost Crisis

Nigeria imports the majority of its refined petroleum, industrial machinery, pharmaceuticals, and food staples. A weaker naira directly raises the cost of all of these. Early data from port authorities in Lagos and Apapa show a sharp drop in import volumes as businesses struggle to source foreign exchange at any price.

**Sectors feeling the most pain:**
- **Manufacturing**: Raw material costs up 34% year-on-year; several factories have reduced shifts
- **Aviation**: Airlines operating naira-denominated routes are hemorrhaging money as dollar-priced fuel costs surge
- **Healthcare**: Imported drugs and medical equipment now cost significantly more in naira terms; some hospitals report stockouts of critical medications

## The CBN's Difficult Position

The Central Bank faces a classic trilemma. Raising interest rates aggressively could attract some portfolio inflows but would crush an already fragile domestic economy. Burning reserves to defend the naira is unsustainable. Allowing a free float risks a disorderly crash that further erodes confidence.

Governor Olayemi Cardoso hinted at an emergency monetary policy committee meeting but has not confirmed a rate decision timeline. The CBN has asked exporters to repatriate dollar earnings within 90 days — a measure that has had limited enforcement success in the past.

## On-Chain Activity Spikes

Notably, peer-to-peer trading volumes for USDT and USDC on Nigerian platforms have surged **67%** week-over-week. Nigerians are increasingly using stablecoins as a dollar hedge, bypassing the official FX window entirely. This echoes the playbook seen during the 2022–2023 naira crisis, when crypto P2P volumes made Nigeria one of the highest-volume crypto markets globally on a per-capita basis.

## Outlook

Most FX analysts are not calling a bottom yet. If the Iran-US conflict escalates further — particularly if it draws in Gulf producers and triggers broader Strait of Hormuz closures — the combined effect of a stronger dollar, weaker oil output revenues, and rising import costs could push the naira past ₦2,500/$ before any structural relief arrives. Nigeria's next external debt service payment of $500 million is due in June, adding another pressure point to an already stretched reserve position.`,
  },
]
