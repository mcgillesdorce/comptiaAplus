/**
 * AZ-305 — Designing Microsoft Azure Infrastructure Solutions.
 *
 * Self-contained question bank. Intentionally NOT using the CompTIA
 * `Question` type so AZ-305 data stays fully isolated from the A+ modules.
 * Every id is prefixed with "az305-".
 */

export type AZ305Objective =
  | "1.0-identity-governance-monitoring"
  | "2.0-data-storage"
  | "3.0-business-continuity"
  | "4.0-infrastructure";

export const AZ305_OBJECTIVES: Record<
  AZ305Objective,
  { name: string; short: string; emoji: string }
> = {
  "1.0-identity-governance-monitoring": {
    name: "Design identity, governance & monitoring solutions",
    short: "Identity, Governance & Monitoring",
    emoji: "🔐",
  },
  "2.0-data-storage": {
    name: "Design data storage solutions",
    short: "Data Storage",
    emoji: "🗄️",
  },
  "3.0-business-continuity": {
    name: "Design business continuity solutions",
    short: "Business Continuity",
    emoji: "🛡️",
  },
  "4.0-infrastructure": {
    name: "Design infrastructure solutions",
    short: "Infrastructure",
    emoji: "🏗️",
  },
};

export const AZ305_OBJECTIVE_ORDER: AZ305Objective[] = [
  "1.0-identity-governance-monitoring",
  "2.0-data-storage",
  "3.0-business-continuity",
  "4.0-infrastructure",
];

export interface AZ305Choice {
  id: string;
  text: string;
  correct: boolean;
}

export interface AZ305Question {
  id: string;
  objective: AZ305Objective;
  difficulty: "easy" | "medium" | "hard";
  type: "single" | "multi";
  prompt: string;
  choices: AZ305Choice[];
  explanation: string;
  reference?: string;
}

export const questionsAZ305: AZ305Question[] = [
  // ════════════════════════════════════════════════════════════════
  // 1.0 — Identity, Governance & Monitoring
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-igm-01",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "multi",
    prompt:
      "A medium-sized company uses Microsoft Entra ID to control access to apps and services deployed in Azure. A security audit shows the Global Administrator group contains people who do not need such broad access. You must restrict access appropriately and be able to grant elevated access only for specific periods of time (for example, an hour or a day) for temporary tasks. Which two actions should you perform? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Use Privileged Identity Management (PIM) to create additional rules for access.", correct: true },
      { id: "b", text: "Add conditional access policies to your current access restrictions.", correct: false },
      { id: "c", text: "Use managed identities to further restrict access to the resources.", correct: false },
      { id: "d", text: "Assign more granular roles to the administrators according to their functions.", correct: true },
    ],
    explanation:
      "Assign more granular roles so each administrator only gets the least privilege needed for their specific tasks. Use Privileged Identity Management (PIM) to create just-in-time (JIT) rules that activate elevated access for only a limited time, such as one hour or one day. Managed identities provide identity for resources (not users), and conditional access targets remote-access / BYOD scenarios — neither solves time-bound privileged access.",
  },
  {
    id: "az305-igm-02",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "easy",
    type: "single",
    prompt:
      "You are designing a monitoring strategy for an Azure SQL Database. You want metrics collected from the database and presented as performance reports on a dashboard, while minimizing programming effort. Which logging target should you specify in the design?",
    choices: [
      { id: "a", text: "Azure Blob Storage", correct: false },
      { id: "b", text: "Azure Table Storage", correct: false },
      { id: "c", text: "Azure Log Analytics", correct: true },
      { id: "d", text: "Azure Event Hubs", correct: false },
    ],
    explanation:
      "Enable diagnostic settings on the database and send metrics to a Log Analytics workspace in Azure Monitor. Azure SQL Analytics can then consume that data and build performance dashboards with no custom programming. Blob and Table Storage would require significant code to read and visualize the data, and Event Hubs is for streaming to third-party/custom solutions.",
  },
  {
    id: "az305-igm-03",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "You are migrating on-premises Windows and Linux virtual machines to Azure using a hybrid model during the migration. You need a monitoring strategy so logs and metrics are available in a centralized location in Azure, stored for at least 18 months, and easy to view and query. Which solution should you configure?",
    choices: [
      { id: "a", text: "Event Hubs", correct: false },
      { id: "b", text: "Log Analytics", correct: true },
      { id: "c", text: "A Storage Account", correct: false },
    ],
    explanation:
      "Log Analytics lets you collect logs and metrics from VMs running on-premises or in Azure using Log Analytics agents, retains data for up to two years (more than the required 18 months), and supports Kusto Query Language for easy querying. A storage account can hold logs cheaply but cannot collect directly from VMs and is hard to query. Event Hubs has short retention (max 7 days on Standard) and cannot be queried directly.",
  },
  {
    id: "az305-igm-04",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "hard",
    type: "single",
    prompt:
      "An administrator accidentally deletes a storage account containing financial information. After recovering it, you apply a lock and run `az lock list`, which shows a lock with \"level\": \"CanNotDelete\". Given only this CanNotDelete lock on the storage account, which statement is TRUE?",
    choices: [
      { id: "a", text: "Users are prevented from deleting the storage account, but can still read and modify its configuration.", correct: true },
      { id: "b", text: "Users are prevented from deleting or overwriting containers or blobs within the storage account.", correct: false },
      { id: "c", text: "Users are prevented from reading or modifying the storage account's configuration.", correct: false },
      { id: "d", text: "Users are prevented from all access to the storage account.", correct: false },
    ],
    explanation:
      "A CanNotDelete lock prevents deletion of the resource but still allows reading and modifying its configuration. It does not protect containers or blobs from being deleted or overwritten (enable container soft delete for that). To block configuration changes you would need a ReadOnly lock instead.",
  },

  // ════════════════════════════════════════════════════════════════
  // 2.0 — Data Storage
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-data-01",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your on-premises SQL Server 2019 instance supports a high-volume transaction processing application with hundreds of concurrent users, expected to grow rapidly. The database is 3 TB and will grow to no more than 4 TB. The solution must support at least one read-only replica in addition to the primary read-write database. Solution: Deploy an Azure SQL Managed Instance under the vCore-based purchasing model and choose the Business Critical service tier. Does this solution meet the goal?",
    choices: [
      { id: "a", text: "Yes", correct: true },
      { id: "b", text: "No", correct: false },
    ],
    explanation:
      "Yes. The Business Critical service tier supports up to 4 TB of storage and provides multiple read-only replicas. On failure of the primary, one of the read-only replicas is promoted to the new read-write primary, meeting the high-availability requirement.",
  },
  {
    id: "az305-data-02",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your on-premises SQL Server 2019 instance supports a high-volume transaction processing application with hundreds of concurrent users, expected to grow rapidly. The database is 3 TB and will grow to no more than 4 TB. The solution must support at least one read-only replica in addition to the primary read-write database. Solution: Deploy an Azure SQL Database under the vCore-based purchasing model and choose the Hyperscale service tier. Does this solution meet the goal?",
    choices: [
      { id: "a", text: "Yes", correct: true },
      { id: "b", text: "No", correct: false },
    ],
    explanation:
      "Yes. The Hyperscale service tier supports databases far larger than 4 TB and allows up to four (and more) high-availability read-only replicas in addition to the primary read-write replica, satisfying the requirements.",
  },
  {
    id: "az305-data-03",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "single",
    prompt:
      "You have an Azure Blob storage account containing data accessed several times daily. You plan to upload a new blob that will be viewed infrequently but must be available immediately when accessed. You must configure the access tier for the new blob while minimizing storage costs. What should you do?",
    choices: [
      { id: "a", text: "Set the default access tier for the storage account to Hot.", correct: false },
      { id: "b", text: "Set the access tier for the new blob to Archive.", correct: false },
      { id: "c", text: "Set the access tier for the new blob to Cool.", correct: true },
      { id: "d", text: "Set the default access tier for the storage account to Cool.", correct: false },
    ],
    explanation:
      "Set the access tier on the individual new blob to Cool. Cool is intended for infrequently accessed data stored for at least 30 days, has similar time-to-access as Hot, and lower storage cost. Archive is cheaper but has hours of retrieval latency, so it is not immediately available. Changing the account default tier to Cool would also apply to future blobs that may need frequent access.",
    reference: "Access tiers for blob data",
  },
  {
    id: "az305-data-04",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "You are the lead architect for a cloud-only data analytics startup with data in approximately 50 SQL databases. Usage patterns vary, and several databases will remain in use for at least two years. You need to minimize costs. Which two approaches will save costs? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Use SQL elastic pools to manage your databases.", correct: true },
      { id: "b", text: "Configure the databases to have the Price:Low tag.", correct: false },
      { id: "c", text: "Use reserved capacity instead of pay-as-you-go.", correct: true },
    ],
    explanation:
      "SQL elastic pools let multiple databases share resources on a single server, reducing cost when usage varies. Reserved capacity (pre-paying for one or three years) is much more cost-effective than pay-as-you-go for long-lived databases. Tags such as Price:Low only add metadata for organization — they do not affect resource cost.",
  },
  {
    id: "az305-data-05",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "A development team uses Azure Databricks with Delta Live Tables for data processing and wants members of other teams to query their Delta Live Tables using Databricks SQL. Which two tasks could the team perform to publish the tables to Unity Catalog? (Each correct answer presents a complete solution.)",
    choices: [
      { id: "a", text: "Specify a schema name in the pipeline settings.", correct: true },
      { id: "b", text: "Set the target value in a JSON configuration file.", correct: false },
      { id: "c", text: "Define a catalog where the pipeline can persist tables.", correct: true },
      { id: "d", text: "Create a shared access signature (SAS) for the target tables.", correct: false },
      { id: "e", text: "Configure strong consistency for the database.", correct: false },
    ],
    explanation:
      "By default, Delta Live Tables data can only be accessed by tasks within the pipeline. To publish to Unity Catalog you specify a target schema name in the pipeline settings, or define a catalog where the pipeline can persist tables. Publishing is configured through the Unity Catalog management interface, not JSON files. A SAS grants access to Azure Storage resources, and consistency levels apply to Azure Cosmos DB — neither publishes tables to Unity Catalog.",
  },
  {
    id: "az305-data-06",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company is migrating data operations from an on-premises network to Azure storage. There are over 65 terabytes of files on on-premises file servers to import into an Azure cool storage tier. You need to transfer the data while minimizing costs and interruptions to the on-premises network. What solution should you recommend?",
    choices: [
      { id: "a", text: "Data Migration Assistant", correct: false },
      { id: "b", text: "AzCopy", correct: false },
      { id: "c", text: "Azure Data Box", correct: true },
      { id: "d", text: "Azure Data Factory", correct: false },
    ],
    explanation:
      "Azure Data Box provides a cost-effective, offline way to migrate large amounts of on-premises data (Data Box handles up to ~80 TB usable) without saturating the network. Azure Data Factory is a cloud ETL/integration service, AzCopy is a command-line copy utility not designed for this volume of offline transfer, and Data Migration Assistant only assesses SQL Server compatibility.",
    reference: "Azure Data Box for data transfer",
  },
  {
    id: "az305-data-07",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "Your company wants to configure a storage account for a new application. The storage account must remain available if a single Azure data center fails. The application performs more than 95% write operations, and when it needs read access, data must be available immediately. You need the lowest storage cost for this usage pattern. Which storage account type and access tier should you use? (Select the two correct options.)",
    choices: [
      { id: "a", text: "Storage account type: Zone-redundant storage (ZRS)", correct: true },
      { id: "b", text: "Storage account type: Locally-redundant storage (LRS)", correct: false },
      { id: "c", text: "Storage account type: Geo-redundant storage (GRS)", correct: false },
      { id: "d", text: "Access tier: Cool", correct: true },
      { id: "e", text: "Access tier: Hot", correct: false },
      { id: "f", text: "Access tier: Archive", correct: false },
    ],
    explanation:
      "ZRS replicates data synchronously across three availability zones in a single region, so it survives a data-center (zone) failure — LRS only survives a single server failure, and GRS/RA-GRS are more expensive than needed. The Cool access tier gives the lowest storage cost for this write-heavy pattern while still making data available immediately for reads; Archive is cheaper to store but requires rehydration (up to 15 hours), so it is not immediately available.",
  },
  {
    id: "az305-data-08",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "single",
    prompt:
      "Your company moved several databases to Azure: SqlDB01 (Azure SQL Database), SqlDB02 and SqlDB03 (Azure SQL Managed Instance), and SqlDW01 (Azure Synapse SQL pool). You are reviewing backup retention. Which statement about backup retention is correct?",
    choices: [
      { id: "a", text: "Long-term retention (LTR) of up to 10 years can be configured for Azure SQL Database and Azure SQL Managed Instance, but not for an Azure Synapse SQL pool.", correct: true },
      { id: "b", text: "Only the Azure Synapse SQL pool can be configured to retain data for up to 10 years.", correct: false },
      { id: "c", text: "None of the databases retain data by default; retention must always be enabled manually.", correct: false },
      { id: "d", text: "Azure Synapse SQL pool supports a 35-day retention period without configuring LTR.", correct: false },
    ],
    explanation:
      "All four databases keep backups for at least seven days by default. Azure SQL Database and Azure SQL Managed Instance can be configured for up to 35 days, and for up to 10 years using long-term retention (LTR). An Azure Synapse SQL pool does not support LTR or the extended 35-day/10-year retention.",
  },

  // ════════════════════════════════════════════════════════════════
  // 3.0 — Business Continuity
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-bc-01",
    objective: "3.0-business-continuity",
    difficulty: "medium",
    type: "multi",
    prompt:
      "CompanyA operates an online shop with most customers in the US and Asia, moving its on-premises web app to Azure across the East US and West US regions. East US is the primary region where all customer requests should go; if East US fails, West US must take over automatically. Which two options should you include in the recommendation? (Select the routing configuration and routing method.)",
    choices: [
      { id: "a", text: "Routing configuration: Azure Traffic Manager", correct: true },
      { id: "b", text: "Routing configuration: Azure Load Balancer", correct: false },
      { id: "c", text: "Routing method: Priority routing", correct: true },
      { id: "d", text: "Routing method: Weighted routing", correct: false },
      { id: "e", text: "Routing method: Round-robin routing", correct: false },
    ],
    explanation:
      "Azure Traffic Manager operates at the DNS layer and can load balance across geographic regions. With Priority routing you define a highest-priority (primary) endpoint in one region and a secondary failover endpoint in another, so all traffic goes to East US and fails over to West US automatically. Azure Load Balancer works only within a region (layer 4), and weighted/round-robin cannot differentiate a primary vs failover region.",
  },
  {
    id: "az305-bc-02",
    objective: "3.0-business-continuity",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company has an on-premises Active Directory domain and a Microsoft Entra subscription. You are designing an Azure internet-facing web application in the West Europe region. The load-balancing solution must provide OSI layer 7 (application) load balancing for HTTPS, support URL-routing, control routing with round-robin sequencing, and provide SSL/TLS termination, while minimizing cost and management overhead. What is the best solution to use?",
    choices: [
      { id: "a", text: "Azure Application Gateway", correct: true },
      { id: "b", text: "Azure Load Balancer", correct: false },
      { id: "c", text: "Azure Traffic Manager", correct: false },
      { id: "d", text: "Azure Front Door", correct: false },
    ],
    explanation:
      "Azure Application Gateway is a layer 7 load balancer that handles HTTPS traffic, supports URL-based routing, distributes requests round-robin, and performs SSL/TLS termination (SSL offload). Azure Load Balancer is layer 4 and cannot terminate SSL. Front Door and Traffic Manager are global solutions for multi-region scenarios; this app is deployed in a single region, and Traffic Manager does not provide SSL/TLS termination.",
  },

  // ════════════════════════════════════════════════════════════════
  // 4.0 — Infrastructure
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-infra-01",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "You run an online shop web application in Azure. When a customer buys one or more products, the application must send the purchase and shipping details grouped in a single transaction to accounting and warehouse applications for further processing. Both applications must receive the transactions without polling (without constantly querying whether a transaction is ready). What should you recommend?",
    choices: [
      { id: "a", text: "Azure Service Bus topics", correct: true },
      { id: "b", text: "Azure Service Bus queues", correct: false },
      { id: "c", text: "Azure Queue Storage", correct: false },
      { id: "d", text: "Azure Event Hubs", correct: false },
    ],
    explanation:
      "Azure Service Bus topics deliver messages from a single source to multiple subscribers (accounting and warehouse) using a publish/subscribe model, so both apps receive the message without polling. Service Bus queues deliver each message to only one receiver. Queue Storage is designed for polling. Event Hubs is a streaming platform for high-volume telemetry, not transactional multi-subscriber delivery.",
  },
  {
    id: "az305-infra-02",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "multi",
    prompt:
      "Your company deployed a web app through Azure App Service that relies heavily on a backend data store. You enabled Always On and identified two requirements: (1) content must be available closer to the web app instance with minimal latency, and (2) downloadable content must be local to, or at least closer to, application users. Which two solutions should you use? (One for each requirement.)",
    choices: [
      { id: "a", text: "Azure Redis Cache (to hold backend content local to the web app)", correct: true },
      { id: "b", text: "Azure Content Delivery Network (to deliver content from a closer location to web users)", correct: true },
      { id: "c", text: "Azure Application Firewall", correct: false },
      { id: "d", text: "Azure Service Fabric", correct: false },
      { id: "e", text: "Azure Traffic Manager", correct: false },
    ],
    explanation:
      "Use Azure Redis Cache to hold backend content in memory local to the web app, improving performance for apps that rely heavily on a backend store. Use Azure CDN to deliver downloadable content from edge nodes closer to users. Application Firewall protects against web exploits, Service Fabric is a microservices platform, and Traffic Manager directs users to endpoints but does not satisfy either caching/delivery requirement.",
  },
  {
    id: "az305-infra-03",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "multi",
    prompt:
      "A company is migrating several web services to the cloud; other web services must remain on-premises but be visible in Azure. The migrated services contain simple logic, no code can be changed due to time constraints, and they must scale independently when web requests increase. Which deployment option should you recommend for the migrated services, and how should the on-premises services be made visible in Azure? (Select the two correct options.)",
    choices: [
      { id: "a", text: "Deploy the migrated services as Azure app services.", correct: true },
      { id: "b", text: "Deploy the migrated services as Azure Functions.", correct: false },
      { id: "c", text: "Deploy the migrated services to Azure VMs.", correct: false },
      { id: "d", text: "Install Azure Relay to make the on-premises services visible in Azure.", correct: true },
      { id: "e", text: "Install Application Gateway to make the on-premises services visible in Azure.", correct: false },
    ],
    explanation:
      "Deploy the migrated services as Azure App Service web apps — they scale automatically without code changes. Install Azure Relay to expose the on-premises services in Azure without changing the company network infrastructure. Azure Functions would require code changes, Azure VMs do not scale as easily, and Application Gateway/Load Balancer do not make on-premises services visible in Azure.",
  },
  {
    id: "az305-infra-04",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "multi",
    prompt:
      "You are lifting and shifting a 100-VM workload from on-premises to Azure and want to reduce the time to configure and deploy the VMs. Requirements: VMs must be deployed using Infrastructure as Code (IaC), a custom image should be used to deploy the VMs, and existing Ansible playbooks should be reused. Which two options should you recommend? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Packer", correct: true },
      { id: "b", text: "Terraform", correct: true },
      { id: "c", text: "Azure Automation", correct: false },
      { id: "d", text: "Ansible", correct: false },
      { id: "e", text: "Chef", correct: false },
    ],
    explanation:
      "Terraform uses human-readable HCL configuration files and reusable modules to deploy all 100 VMs consistently with minimal effort (IaC). Packer creates custom VM images and can use the Ansible provisioner to reuse existing Ansible playbooks. Azure Automation uses Desired State Configuration (cannot reuse Ansible playbooks), and Chef/Ansible alone focus on configuration management rather than IaC image creation in this scenario.",
  },
  {
    id: "az305-infra-05",
    objective: "4.0-infrastructure",
    difficulty: "easy",
    type: "single",
    prompt:
      "Your company deploys a web app that streams audio and video to users who require a high-bandwidth connection for continuous streaming. You want data stores in the geographic locations nearest to high concentrations of users, in various Azure zones. The data is stored in a General-purpose v2 storage account configured for zone-redundant storage (ZRS). What should you recommend to help support continuous streaming in select locations?",
    choices: [
      { id: "a", text: "Azure Web Application Firewall", correct: false },
      { id: "b", text: "Geo-zone-redundant storage (GZRS)", correct: false },
      { id: "c", text: "Azure Content Delivery Network (CDN)", correct: true },
      { id: "d", text: "Azure Cache for Redis", correct: false },
    ],
    explanation:
      "Azure CDN is a distributed network of edge servers that delivers content rapidly from strategic physical nodes close to users, supporting continuous streaming. Cache for Redis improves backend data performance but is not a content-delivery point-of-presence, WAF protects against web attacks, and GZRS adds cross-region redundancy but does not provide a point-of-presence for streaming.",
  },
  {
    id: "az305-infra-06",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "You are planning to move 20 web applications with SQL databases to Azure. You must be able to change connection strings, passwords, and rotated secrets across all your web applications and SQL databases as quickly as possible, and users must stay connected to the web applications. Administrative and development effort must be minimized. What should you do?",
    choices: [
      { id: "a", text: "Update web.config.", correct: false },
      { id: "b", text: "Implement a secure string class in your code.", correct: false },
      { id: "c", text: "Use Azure Key Vault.", correct: false },
      { id: "d", text: "Use Azure App Configuration.", correct: true },
    ],
    explanation:
      "Azure App Configuration is a single place to update application configuration (including connection strings) without redeploying or restarting the service, and it integrates with Azure Key Vault for sensitive values. Updating web.config on each server is IIS-only, doesn't help SQL databases, and interrupts user connections. Key Vault alone securely stores secrets but, without App Configuration, still requires significant administrative and development effort across 20 apps.",
  },
];
