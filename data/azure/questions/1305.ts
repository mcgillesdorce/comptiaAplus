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

  // ════════════════════════════════════════════════════════════════
  // 1.0 — Identity, Governance & Monitoring (additional)
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-igm-05",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "multi",
    prompt:
      "Your company has an on-premises Active Directory (AD) domain that uses AD Connect to access Microsoft Entra ID. Employees use single sign-on (SSO) from corporate or personal devices. IT reported that the Remote Desktop Protocol (RDP) port of the on-premises AD server was left open after a one-time administrative task. After reports of identity theft at a partner company, management is concerned about identity security. You must strengthen your security policy to mitigate risks associated with identity compromise. Which two actions should you perform? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Require strong passwords that expire each month.", correct: false },
      { id: "b", text: "Enable Microsoft Entra conditional access.", correct: true },
      { id: "c", text: "Close Remote Desktop Protocol (RDP) ports on the on-premises AD server.", correct: true },
      { id: "d", text: "Disable password hash synchronization.", correct: false },
    ],
    explanation:
      "Microsoft Entra conditional access ensures users gain access to corporate resources only from devices that meet your security standards. Closing the RDP ports prevents unauthorized remote access to the AD server — only the ports required for the AD-to-AD-Connect connection should be open. You should NOT disable password hash synchronization (it lets AD Connect compare passwords against known-compromised credentials), and frequent forced password expiration encourages users to choose weaker, easy-to-guess passwords.",
  },
  {
    id: "az305-igm-06",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "You work for a global company operating in East US, Central US, North Europe, West Europe, East Asia, and Southeast Asia. The company plans to use Azure Monitor to centralize log storage. Requirements: minimize administrative overhead, minimize costs, conform to specific regional compliance requirements, and provide regional data sovereignty. What is the minimum number of Log Analytics workspaces you should identify?",
    choices: [
      { id: "a", text: "Five", correct: false },
      { id: "b", text: "One", correct: false },
      { id: "c", text: "Three", correct: true },
      { id: "d", text: "Six", correct: false },
    ],
    explanation:
      "A Log Analytics workspace aggregates and stores data, provides administrative boundaries (data sovereignty), and defines a geographic location for storage (regional compliance). The company's regions span three Azure geographies — United States, Europe, and Asia Pacific — so you need three workspaces, one per geography. One workspace would minimize cost but fails sovereignty/compliance; five or six workspaces would increase cost and administrative overhead unnecessarily.",
  },
  {
    id: "az305-igm-07",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company has a Microsoft Entra ID P2 environment that hosts over 10,000 licensed users and supports over 100 business-critical applications. The company is concerned about its ability to recognize and respond to external threats for the applications. You need to recommend a solution that supports identifying sign-in risks and provides remediation strategies. What should you recommend?",
    choices: [
      { id: "a", text: "Microsoft Entra ID Protection", correct: true },
      { id: "b", text: "Microsoft Entra Connect Health", correct: false },
      { id: "c", text: "Microsoft Entra Privileged Identity Management (PIM)", correct: false },
      { id: "d", text: "Azure Policies", correct: false },
    ],
    explanation:
      "Microsoft Entra ID Protection automates detection and remediation of identity-based risks (such as anonymous IP address use or leaked credentials), lets you investigate risks via portal data, and can export risk data for further analysis — full implementation requires a P2 license. PIM manages just-in-time privileged access but does not provide threat detection/remediation. Connect Health monitors on-premises identity infrastructure performance, not security threats. Azure Policy enforces compliance with defined standards, not sign-in risk remediation.",
  },

  // ════════════════════════════════════════════════════════════════
  // 2.0 — Data Storage (additional)
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-data-09",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "You are designing a storage solution that will facilitate the migration of on-premises data to the Azure cloud, consolidating resources to minimize costs while still providing the required features and performance. Requirements: data must be accessible via SMB or a REST API; the solution must be optimized for random-access workloads; and affordability should be prioritized over low latency or support for heavy workloads. Which storage technology and storage tier should you include? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Storage technology: Azure Files", correct: true },
      { id: "b", text: "Storage tier: Transaction optimized", correct: true },
      { id: "c", text: "Storage technology: Azure Blob Storage", correct: false },
      { id: "d", text: "Storage tier: Premium", correct: false },
      { id: "e", text: "Storage tier: Hot", correct: false },
    ],
    explanation:
      "Azure Files is the primary file storage and sharing solution on Azure, optimized for random-access workloads and accessible via SMB and the Azure Files REST API. The Transaction optimized tier is not HDD-backed but is relatively cheaper than premium while still giving good performance for random-access workloads. Azure Blob Storage would suit read-heavy analytical datasets but does not support SMB; Premium file shares are SSD-backed (higher performance, higher cost); the Hot tier targets general-purpose file sharing rather than this cost-prioritized scenario.",
  },
  {
    id: "az305-data-10",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A company is enabling its engineers to adopt Azure for a multi-tenant Software-as-a-Service (SaaS) product that will require lots of databases for each tenant. You need to recommend a relational database solution that is cost-efficient, keeps management overhead to a minimum (the team has no database administrator), and supports geo-replication and auto-failovers. Which database solution should you recommend?",
    choices: [
      { id: "a", text: "SQL Server on Azure virtual machines", correct: false },
      { id: "b", text: "An Azure SQL Database single database", correct: false },
      { id: "c", text: "An Azure SQL Database elastic pool", correct: true },
      { id: "d", text: "Azure SQL Managed Instance", correct: false },
    ],
    explanation:
      "An Azure SQL Database elastic pool is a fully managed PaaS option that lets multiple databases share resources on one logical SQL server — cost-efficient because resources are shared with no underutilization, and it supports geo-replication and auto-failover. A single database is not cost-efficient when you create one per tenant; SQL Server on VMs is IaaS and needs a DBA; SQL Managed Instance is PaaS but provides no auto-failover and costs more than an elastic pool.",
  },
  {
    id: "az305-data-11",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "You work for a consumer sales company that has gathered market data from a variety of sources. You have noticed that data from some sources has schema-drift issues. You need to recommend a data-preparation solution to prepare the data for analysis, and the solution must minimize development effort. Which Azure service should you recommend?",
    choices: [
      { id: "a", text: "Azure Stream Analytics", correct: false },
      { id: "b", text: "Azure Data Factory", correct: true },
      { id: "c", text: "Azure Functions", correct: false },
      { id: "d", text: "Azure Logic Apps", correct: false },
    ],
    explanation:
      "Azure Data Factory lets you develop graphical data-transformation logic without writing code and can protect against schema drift, minimizing development effort. Azure Functions would require changing function code for every schema change; Azure Stream Analytics would require changing the job's code for each schema change; Azure Logic Apps would require changing the application structure whenever the input schema changes.",
  },
  {
    id: "az305-data-12",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "single",
    prompt:
      "Your company is developing a new data-intensive application. The initial database will contain approximately 1 TB of data and is projected to grow by 300 to 500 GB per year after release. All development takes place in Azure. You need an Azure database solution that provides Microsoft SQL Server compatibility, minimal management requirements, minimal cost, support for the DTU-based purchasing model, and support for widely varying processing requirements during development. Which storage solution should you recommend?",
    choices: [
      { id: "a", text: "SQL Server on Azure VM", correct: false },
      { id: "b", text: "Azure SQL Database single database", correct: true },
      { id: "c", text: "Azure SQL managed instance", correct: false },
      { id: "d", text: "Azure SQL Database elastic pool", correct: false },
    ],
    explanation:
      "An Azure SQL Database single database meets all the requirements — it is SQL Server compatible, fully managed, low cost, supports the DTU-based purchasing model, and can scale to handle widely varying processing during development. If needed later, a database can be added to an elastic pool. An elastic pool is only beneficial with multiple databases; SQL Managed Instance supports only vCore pricing (no DTU model); SQL Server on a VM has the highest management overhead since you manage the OS and database engine.",
  },
  {
    id: "az305-data-13",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "You are designing a data-migration project that will move 1 TB of data from multiple on-premises servers (FILESRV_HR and ARCHIVE_SRV1) to Azure Storage using Azure Data Factory with self-hosted integration runtimes (SHIRs). Which statement about the self-hosted integration runtime requirements is TRUE?",
    choices: [
      { id: "a", text: "You must configure two self-hosted integration runtimes, one each for FILESRV_HR and ARCHIVE_SRV1.", correct: false },
      { id: "b", text: "You must install each self-hosted integration runtime on a separate Windows machine.", correct: true },
      { id: "c", text: "You must install a self-hosted integration runtime on FILESRV_HR and on ARCHIVE_SRV1.", correct: false },
      { id: "d", text: "A self-hosted integration runtime can only connect to a single data source at a time.", correct: false },
    ],
    explanation:
      "The self-hosted integration runtime only runs on Windows-based computers, and you can run only a single runtime on each machine — so each SHIR must be installed on a separate Windows machine. You are NOT required to configure two SHIRs (a single runtime can service multiple data sources), and the runtime does NOT need to reside on the data source itself; it can live on any on-premises Windows server.",
  },

  // ════════════════════════════════════════════════════════════════
  // 3.0 — Business Continuity (additional)
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-bc-03",
    objective: "3.0-business-continuity",
    difficulty: "hard",
    type: "multi",
    prompt:
      "Your company builds a demo environment in Azure by using an Azure Resource Manager (ARM) template. The demo environment includes three VMs that use general-purpose v2 storage accounts. You plan to implement a disaster-recovery solution that must be able to recover from a failure in a single Azure data center, meet a recovery time objective (RTO) of 96 hours, and minimize cost. Which three recommendations should you make? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Use zone-redundant storage (ZRS).", correct: true },
      { id: "b", text: "You should NOT include Azure Site Recovery.", correct: true },
      { id: "c", text: "If an outage occurs, use ARM templates to re-create the VMs.", correct: true },
      { id: "d", text: "Use geo-redundant storage (GRS).", correct: false },
      { id: "e", text: "Use locally redundant storage (LRS).", correct: false },
    ],
    explanation:
      "ZRS protects data from a single Azure data-center failure and is less expensive than GRS. Because the RTO is a long 96 hours, you should NOT include Azure Site Recovery — re-creating the VMs from the existing ARM templates in the secondary location is feasible and cheaper. LRS only protects against single-server failure (not a data-center outage), and GRS is more expensive than ZRS. A manual failover is unnecessary since there is no secondary region in this single-data-center scenario.",
  },

  // ════════════════════════════════════════════════════════════════
  // 4.0 — Infrastructure (additional)
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-infra-07",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "multi",
    prompt:
      "You are designing an auditing application built as multiple Azure Functions that will subscribe to events from other resources across an Azure subscription (such as storage account key rotation and virtual machine creation), receive events from those resources as soon as they happen, and deploy all resources related to the application using Infrastructure as Code (IaC). Which two Azure features or services should you recommend? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Azure Event Grid", correct: true },
      { id: "b", text: "Azure Bicep", correct: true },
      { id: "c", text: "Azure Automation", correct: false },
      { id: "d", text: "Azure Queue Storage", correct: false },
      { id: "e", text: "Azure Service Bus", correct: false },
    ],
    explanation:
      "Azure Event Grid lets you build event-based applications with built-in integration across Azure services — you create an Event Grid topic to subscribe to events of interest, and the Function handler executes as soon as the event happens (for example, when a storage account key is rotated). Azure Bicep is a declarative IaC abstraction over ARM templates used to deploy all application resources, including the Azure Functions. Service Bus and Queue Storage are for message delivery (guaranteed/FIFO processing), not real-time events; Azure Automation runs runbooks/DSC, not event subscriptions.",
  },
  {
    id: "az305-infra-08",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "A startup is launching an online retail platform that must provide a seamless shopping experience while efficiently managing unpredictable traffic spikes during promotions, and the platform requires control over the server resources. You need a solution so the system can automatically handle significantly increased traffic during Black Friday sales in the most efficient way. Proposed solution: you recommend serverless computing. Does this solution meet the goal?",
    choices: [
      { id: "a", text: "Yes", correct: false },
      { id: "b", text: "No", correct: true },
    ],
    explanation:
      "No. Serverless computing lets developers run code without managing the underlying infrastructure, and the cloud provider handles provisioning, scaling, and managing compute. While serverless can automatically scale to handle traffic spikes, it does NOT provide control over the server resources, which is an explicit requirement in this scenario — so the proposed solution does not meet the goal.",
  },

  // ════════════════════════════════════════════════════════════════
  // 1.0 — Identity, Governance & Monitoring (batch 3)
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-igm-08",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Company1 has a Microsoft Entra tenant named company1.com. Company1 uses groups to provide access to resources. Each employee has a user in company1.com. Employees frequently change company positions and often still have access to resources they no longer need. You need to recommend a solution to automatically remove users from groups that they no longer need to be in. What should you recommend?",
    choices: [
      { id: "a", text: "Access review", correct: true },
      { id: "b", text: "Group expiration", correct: false },
      { id: "c", text: "Microsoft Entra ID Protection", correct: false },
      { id: "d", text: "Conditional access", correct: false },
    ],
    explanation:
      "Access reviews can be performed once or periodically, and you configure who performs the review (the group owner or the members themselves). At the end of the evaluation period, users who no longer need membership are automatically removed from the group. Group expiration applies only to Office 365 groups (which can't be granted access to resources), Conditional access controls who can access cloud apps, and Entra ID Protection detects/prevents risky sign-ins — none of these remove users from groups automatically.",
  },
  {
    id: "az305-igm-09",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "hard",
    type: "single",
    prompt:
      "Your Azure organizational hierarchy has one management group with two subscriptions and four resource groups in each subscription. You plan to implement a custom Azure policy that will (1) restrict the types of VMs that can be deployed and (2) deny the creation of resources without a Department tag. You assign the policy at the management group. What is the minimum number of custom policies and policy assignments required?",
    choices: [
      { id: "a", text: "1 custom policy and 1 policy assignment", correct: true },
      { id: "b", text: "2 custom policies and 1 policy assignment", correct: false },
      { id: "c", text: "1 custom policy and 2 policy assignments", correct: false },
      { id: "d", text: "2 custom policies and 2 policy assignments", correct: false },
    ],
    explanation:
      "You need a minimum of one custom policy and one policy assignment. Only one policy is needed because you can include multiple conditions in a custom policy using the allOf logical operator, but a policy should produce a single effect. Both requirements here use the deny effect, so they can live in one policy. (If one requirement needed deny and another needed append, you would need two policies.) Applying the policy to the management group automatically inherits it to all subscriptions and resource groups.",
  },
  {
    id: "az305-igm-10",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "multi",
    prompt:
      "Your company has a Microsoft Entra subscription. Recent security breaches resulted from inappropriate or outdated access privilege assignments. You are designing access policies for different departments and want a solution that provides permissions only when needed, lets you set start and end dates for permission assignments, and sends notifications when privileged roles are activated. Which Microsoft Entra ID license and feature should you recommend? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Microsoft Entra ID minimum license: P2", correct: true },
      { id: "b", text: "Microsoft Entra feature: Privileged Identity Management (PIM)", correct: true },
      { id: "c", text: "Microsoft Entra ID minimum license: P1", correct: false },
      { id: "d", text: "Microsoft Entra feature: ID Protection", correct: false },
      { id: "e", text: "Microsoft Entra feature: Conditional Access", correct: false },
    ],
    explanation:
      "Privileged Identity Management (PIM) provides just-in-time (JIT) privileged access control, time-bound access with start and end dates, required approval to activate privileged roles, and notification when privileged roles are activated — exactly the controls described. Full implementation of PIM requires the Microsoft Entra ID P2 license. ID Protection guards against identity threats (not JIT activation), and Conditional Access blocks/allows access based on conditions but doesn't provide time-bound privileged role activation.",
  },
  {
    id: "az305-igm-11",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "easy",
    type: "single",
    prompt:
      "You are managing the Microsoft Entra environment for your organization. You need to enable secure access for applications and services to Azure resources or applications. What account or identity should you create for this purpose?",
    choices: [
      { id: "a", text: "Service principal identity", correct: true },
      { id: "b", text: "Device identity", correct: false },
      { id: "c", text: "User account", correct: false },
      { id: "d", text: "group Managed Service account (gMSA)", correct: false },
    ],
    explanation:
      "A service principal is an application identity you create in Microsoft Entra to provide secure authentication and authorization for applications and services. Service principals let apps and services interact with Azure resources using OAuth2 tokens while adhering to controlled access through roles and permissions (common for ARM template deployments and granting permissions to APIs). User accounts are for individual humans, gMSAs are an on-premises Active Directory concept, and device identities concern device management — not application authentication.",
  },
  {
    id: "az305-igm-12",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company collects tenant, subscription, and resource data using Azure Monitor. The company also wants to stream this data, as it is collected in real time, to a third-party monitoring solution for additional analysis. You need to recommend the most effective method to stream monitoring data to a third-party tool. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Event Hub", correct: true },
      { id: "b", text: "Azure Event Grid", correct: false },
      { id: "c", text: "Azure Service Bus", correct: false },
      { id: "d", text: "Azure Logic Apps", correct: false },
    ],
    explanation:
      "Azure Event Hubs is designed to support telemetry and is the best fit for a real-time streaming solution — you create an Event Hubs namespace and event hub as your monitoring data destination, then configure an external data consumer. Event Grid reacts to status changes (event-driven integration, not streaming), Service Bus is an enterprise messaging system for order/transaction processing, and Logic Apps is not a real-time streaming solution (it would require staging data in blob storage first).",
  },
  {
    id: "az305-igm-13",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "easy",
    type: "single",
    prompt:
      "Your company has an Azure subscription with Microsoft Entra ID. Your development team members will provision Azure VMs to support special projects. You need a solution that limits VMs to specific sizes only and limits VMs to specific regions. What should you use?",
    choices: [
      { id: "a", text: "Azure Policy", correct: true },
      { id: "b", text: "Azure Resource Tags", correct: false },
      { id: "c", text: "Azure Role-Based Access Control (Azure RBAC)", correct: false },
      { id: "d", text: "Azure Conditional Access", correct: false },
    ],
    explanation:
      "Azure Policy lets you enforce organizational standards at any point in your hierarchy, from management groups down to individual resources — including defining policies that control which VM sizes can be created and in which regions. Resource Tags organize resources but don't control governance, RBAC controls what you can do when you access a resource (not resource consistency for creation), and Conditional Access is an Entra security feature for allowing/blocking access to resources.",
  },
  {
    id: "az305-igm-14",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company has an Azure subscription with multiple resource groups used to organize resources. Currently you are not using resource tags. You need to apply resource tags to resource groups and ensure that the same tags apply to any resources the group contains. When tags change at the resource group, the change should update its resources. You want to minimize the effort required to implement and maintain the solution. What should you do?",
    choices: [
      { id: "a", text: "Create an Azure Policy to apply specified tags from the resource group to resources, link the policy to the resource group, and initiate a remediation task when specified tags are added or updated at the resource group.", correct: true },
      { id: "b", text: "Create an Azure Policy to apply specified tags from the resource group to resources, and link the policy to the resource group (without remediation).", correct: false },
      { id: "c", text: "Create and modify the tags at the resource group.", correct: false },
      { id: "d", text: "Manually create and update tags individually for the resources.", correct: false },
    ],
    explanation:
      "Resource tags applied at the resource group are NOT inherited by its resources by default, so you use an Azure Policy to apply the tags and then run a remediation task whenever tags are added or updated at the resource group (remediation is required to update existing resources). Just modifying tags at the resource group won't inherit to resources, manual tagging requires the most effort and risks errors, and the policy without a remediation process won't update existing resources.",
  },
  {
    id: "az305-igm-15",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company has a Microsoft Entra tenant named Company.com with a Marketing, Finance, and Research department. You are designing multi-factor authentication (MFA) for Company.com. You need to ensure that MFA is only implemented for users in the Research department. Which requirement should you include in the design?",
    choices: [
      { id: "a", text: "Create a conditional access policy.", correct: true },
      { id: "b", text: "Configure authentication methods.", correct: false },
      { id: "c", text: "Implement Microsoft Entra Privileged Identity Management (PIM).", correct: false },
      { id: "d", text: "Implement Microsoft Entra ID Protection.", correct: false },
    ],
    explanation:
      "A conditional access policy can be targeted to specific users and groups (such as the Research department), and one of the access controls you can require is multi-factor authentication. Authentication methods configure smart lockout/banned passwords (you can't enable MFA there), Entra ID Protection can require MFA only when a sign-in is detected as risky, and PIM can require MFA only when activating a privileged role — neither targets MFA to a department at every sign-in.",
  },
  {
    id: "az305-igm-16",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "easy",
    type: "single",
    prompt:
      "You create an Azure subscription for your company. You plan to create a resource group for each department in your company. You want to allow only members of a particular department to create resources in the resource group assigned to their department. You need to identify an Azure feature to support this design. Which Azure feature should you use?",
    choices: [
      { id: "a", text: "Role-based access control (RBAC)", correct: true },
      { id: "b", text: "Locks", correct: false },
      { id: "c", text: "Initiatives", correct: false },
      { id: "d", text: "Policies", correct: false },
    ],
    explanation:
      "Role-based access control (RBAC) controls which users or groups have access to resources and what permissions they have, and it can be applied to a management group, subscription, resource group, or resource (permissions inherit from higher to lower scopes) — perfect for granting a department access to its resource group. Locks prevent modification/deletion, Policies control which resource types are allowed, and Initiatives are groups of policies.",
  },

  // ════════════════════════════════════════════════════════════════
  // 2.0 — Data Storage (batch 3)
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-data-14",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "multi",
    prompt:
      "You are designing a mission-critical web app that processes large amounts of data from clients located around the world. You have selected Microsoft Azure and need to finalize the design of a backend database that minimizes latency while supporting read and write requests on a global scale. Requirements: client requests should always return the most recent committed version of data; requests should be serviced concurrently; read latency minimization should be backed by an SLA; and the service must offer 99.999% availability. Which database service and consistency level should you include? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Database service: Azure Cosmos DB", correct: true },
      { id: "b", text: "Consistency level: Strong consistency", correct: true },
      { id: "c", text: "Database service: Azure SQL Database", correct: false },
      { id: "d", text: "Consistency level: Session consistency", correct: false },
      { id: "e", text: "Consistency level: Bounded staleness", correct: false },
    ],
    explanation:
      "Azure Cosmos DB is purpose-built for Azure to provide practically limitless storage at massive scale, with SLA-backed guarantees of 99.999% availability and read latencies under 10 ms. The Strong consistency level guarantees that all reads return the most recently committed write. Azure Database for MySQL / Azure SQL Database offer solid performance but no SLA-backed latency or 99.999% guarantee; Session consistency only guarantees the writer sees its own latest data, and Bounded staleness can still suffer lag across multiple regions.",
  },
  {
    id: "az305-data-15",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "multi",
    prompt:
      "You are migrating on-premises semi-structured and unstructured data to Azure Storage. All migrated data must be highly resilient to power, network, or other hardware outages. Specifically: data must be replicated across three availability zones; data must be available even if a zone becomes unavailable; data must be protected from regional disasters that may impact more than one zone; and data stored in the secondary region must be redundantly stored across three copies. You recommend that redundant storage be used. Which two statements correctly describe the design implications of this approach? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Geo-zone-redundant storage (GZRS) will be used.", correct: true },
      { id: "b", text: "Zone-redundant storage (ZRS) will be used.", correct: true },
      { id: "c", text: "Geo-redundant storage (GRS) will be used.", correct: false },
      { id: "d", text: "Locally-redundant storage (LRS) will be used.", correct: false },
    ],
    explanation:
      "Zone-redundant storage (ZRS) copies data replicas across three availability zones in the primary region, meeting the first two requirements (resilient to a zone outage). Geo-zone-redundant storage (GZRS) builds on ZRS by also copying data to a secondary region, where it is stored using locally redundant storage (LRS) — three replicas in the secondary region — meeting the regional-disaster and secondary-region requirements. GRS keeps only one copy arrangement without zone redundancy in the primary region, and LRS only copies within a single data center.",
  },
  {
    id: "az305-data-16",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "You are managing a data migration project. You have just discovered a new 12 TB store of unstructured data and suspect similar stores will be discovered as the project progresses. You need to design a solution for this data set that meets the following requirements: data must be stored in its unfiltered, raw format; the solution must scale easily and at minimal cost; and relational and non-relational data must be supported. Which of the following should you include in your design?",
    choices: [
      { id: "a", text: "Azure Data Lake", correct: true },
      { id: "b", text: "Azure Files", correct: false },
      { id: "c", text: "Azure SQL Database", correct: false },
      { id: "d", text: "Azure Data Factory", correct: false },
    ],
    explanation:
      "Azure Data Lake is a massively scalable data storage solution built on Azure Blob Storage, primarily used to store large data sets for machine learning, real-time analytics, and similar scenarios. It can store structured, semi-structured, and unstructured (raw) data in a single repository, scales more easily and at lower cost than alternatives like Cosmos DB, and supports both relational and non-relational data. Azure Files is optimized for SMB file shares, Azure SQL Database requires structured data, and Azure Data Factory orchestrates data workflows rather than storing raw data.",
  },

  // ════════════════════════════════════════════════════════════════
  // 3.0 — Business Continuity (batch 2)
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-bc-04",
    objective: "3.0-business-continuity",
    difficulty: "hard",
    type: "single",
    prompt:
      "You work for a large multi-national company that deals with highly sensitive data that, due to regulations, must remain within the country in which it is generated. You are developing disaster recovery (DR) plans to geographically distribute data and backups to meet DR and regulatory requirements (initially, cost is not a concern). Which statement about Azure storage replication and regional pairing is TRUE?",
    choices: [
      { id: "a", text: "An Azure region that another region is paired with is nearly always located in the same geo-political area.", correct: true },
      { id: "b", text: "Automatic data replication via geo-redundant storage (GRS) guarantees that the data remains within the same geo-political boundaries.", correct: false },
      { id: "c", text: "Geo-redundant storage (GRS) always keeps data within the same country.", correct: false },
      { id: "d", text: "Zone-redundant storage (ZRS) replicates data to a paired region in another geo-political area.", correct: false },
    ],
    explanation:
      "With only a single exception (Brazil South), every Azure paired region is within the same geo-political boundary, so paired regions are nearly always in the same geo-political area. Automatic replication via GRS does NOT guarantee data stays within the same geo-political boundary (Brazil South is the exception). ZRS replicates within a single region's availability zones — it does not cross to a paired region. To reduce cost while keeping intra-region redundancy, ZRS keeps data inside the same geographic boundary.",
  },
  {
    id: "az305-bc-05",
    objective: "3.0-business-continuity",
    difficulty: "medium",
    type: "multi",
    prompt:
      "CompanyA, which operates in East US only, is modernizing its infrastructure by moving to the cloud. The Enterprise Resource Planning (ERP) web application workload cannot be modified and must be moved to Azure as-is. Your solution must be available if a datacenter fails, and cost and administrative effort must be minimized. Which two solutions should you recommend? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Deploy a VM scale set across two availability zones.", correct: true },
      { id: "b", text: "Deploy a load balancer.", correct: true },
      { id: "c", text: "Deploy a web app across two regions.", correct: false },
      { id: "d", text: "Deploy an Azure Traffic Manager profile.", correct: false },
    ],
    explanation:
      "Because the ERP web app cannot be modified, it must run on an Azure VM. Deploying a VM scale set across two availability zones provides datacenter-failure resilience with minimal administrative effort, and an Azure load balancer routes traffic automatically to the healthy availability zone. Deploying across two regions or using Traffic Manager is unnecessary (CompanyA operates only in East US — no interregional availability is required) and would increase cost via interregional data transfer.",
  },

  // ════════════════════════════════════════════════════════════════
  // 4.0 — Infrastructure (batch 3)
  // ════════════════════════════════════════════════════════════════
  {
    id: "az305-infra-09",
    objective: "4.0-infrastructure",
    difficulty: "hard",
    type: "multi",
    prompt:
      "Your client plans to migrate on-premises databases and other services to the Azure cloud. To enhance data security, you must design a solution that copies data from the on-premises servers to Azure endpoints. Requirements: data must NOT be sent across the public internet; the solution should offer a minimum of 5 Gbps bandwidth; and latency should be reduced as much as possible. Which two tasks should you recommend? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Implement Azure ExpressRoute.", correct: true },
      { id: "b", text: "Implement Private Link.", correct: true },
      { id: "c", text: "Create a private endpoint.", correct: false },
      { id: "d", text: "Deploy a P2S VPN gateway.", correct: false },
      { id: "e", text: "Create a virtual network service endpoint.", correct: false },
    ],
    explanation:
      "Azure ExpressRoute extends an on-premises network directly to the Microsoft cloud over a private connection — traffic does not cross the public internet, which increases security and reduces latency, and it supports bandwidth up to 10 Gbps. Private Link provides secure connectivity between an Azure virtual network and Microsoft services, ensuring data never leaves Microsoft-owned infrastructure. A P2S VPN connects a single endpoint (not on-premises networks), a service endpoint accesses Azure resources from within a VNet (not for connecting on-premises networks), and a private endpoint alone (part of a Private Link config) won't fulfill all the requirements.",
  },
  {
    id: "az305-infra-10",
    objective: "4.0-infrastructure",
    difficulty: "hard",
    type: "multi",
    prompt:
      "You manage a virtual network named vnet1 that contains a subnet named subnet1. You deploy 30 Azure VMs in subnet1: five are used for a distributed database, 20 are used by a batch application, and the others host a web application. The private IP address for all Azure VMs changes frequently. The distributed database VMs should be accessed by the batch application VMs only. You need to restrict network access in subnet1. Which two services or features should you use? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Network security groups (NSGs)", correct: true },
      { id: "b", text: "Application security groups (ASGs)", correct: true },
      { id: "c", text: "Network rule", correct: false },
      { id: "d", text: "Service tags", correct: false },
      { id: "e", text: "Azure Firewall", correct: false },
    ],
    explanation:
      "Application security groups (ASGs) let you group the NICs of the distributed database VMs and, separately, the batch application VMs — so you don't depend on the frequently changing private IP addresses. Network security groups (NSGs) then use those ASGs to allow connectivity from the batch application group to the distributed database and deny it for the other VMs (attach the NSG to all VMs in subnet1). Azure Firewall and network rules rely on IP addresses (which change frequently here), and service tags represent Azure service IP ranges, not your own VMs.",
  },
  {
    id: "az305-infra-11",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "You are designing a high-performance computing (HPC) workload that will be used to support complex engineering projects. The workload runs multiple applications as an intrinsically parallel workload. You need to select an application service to support the workload. The solution should manage job scheduling, and you want to minimize costs related to the solution. What should you use?",
    choices: [
      { id: "a", text: "Azure Batch", correct: true },
      { id: "b", text: "Azure Virtual Machine Scale Sets", correct: false },
      { id: "c", text: "Azure Kubernetes Service (AKS) clusters", correct: false },
      { id: "d", text: "Azure Functions", correct: false },
    ],
    explanation:
      "Azure Batch is designed to run large-scale parallel and HPC batch jobs efficiently in Azure — it manages a pool of VMs to run the applications, installs the applications, and manages job scheduling. There is no charge for using Azure Batch; you only pay for the underlying resources used. VM Scale Sets automate scaling but provide no special support for parallel processing, Azure Functions are for small event-driven code, and AKS clusters don't support the intrinsically parallel processing required here.",
  },
  {
    id: "az305-infra-12",
    objective: "4.0-infrastructure",
    difficulty: "hard",
    type: "multi",
    prompt:
      "A company has two applications named App1 and App2 for a point-of-sale (POS) system deployed as Azure Functions. App1 scans products and sends a message to App2 when payment is initiated; App2 takes care of the payment and sends a message on the status of the payment to App1. It currently uses Azure Queue Storage to deliver the messages. In future, the applications will process large amounts of data when new stores open. You need to recommend a solution to replace Azure Queue Storage so that it has high throughput and the data is also stored in a NoSQL database. Which two solutions should you recommend? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Azure Event Hubs", correct: true },
      { id: "b", text: "Azure Stream Analytics", correct: true },
      { id: "c", text: "Azure Service Bus", correct: false },
      { id: "d", text: "Azure Data Factory", correct: false },
    ],
    explanation:
      "Azure Event Hubs can send millions of messages per second and deliver messages to multiple sources — Functions can be triggered based on the message received, so App1 and App2 can trigger each other (high throughput, scalable as stores increase). Azure Stream Analytics is a real-time analytics engine that retrieves data from multiple sources (an event hub being one) and writes it to a NoSQL database like Cosmos DB. Service Bus has high throughput but isn't supported as a Stream Analytics input and needs extra apps to write to the database; Data Factory is for ETL/ELT and can't receive messages directly from the event hub.",
  },
  {
    id: "az305-infra-13",
    objective: "4.0-infrastructure",
    difficulty: "hard",
    type: "multi",
    prompt:
      "Your company designs an application based on the Azure microservices architecture that will: receive up to thousands of events per second from environmental sensors; submit events in real-time for formatting and pre-processing; ignore missed or improperly formatted data without interrupting the stream; and write formatted event data to a Cosmos DB database. The number of events per second can vary widely. You need to determine which Azure services are necessary to support the solution while keeping costs to a minimum. Which two Azure services should you include? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Azure Event Hubs", correct: true },
      { id: "b", text: "Azure Functions", correct: true },
      { id: "c", text: "Azure Event Grid", correct: false },
      { id: "d", text: "Azure Service Bus", correct: false },
      { id: "e", text: "Azure Logic Apps", correct: false },
    ],
    explanation:
      "Azure Event Hubs can receive data for up to millions of events per second and pass them in real time to the event consumer. Azure Functions serves as the event consumer, handling the formatting/pre-processing and writing data to Cosmos DB — and both Event Hubs and Functions automatically scale as the data volume changes (minimizing cost). Event Grid manages events but is not a data pipeline that delivers event data, Service Bus delivers messages when polled (not streaming), and Logic Apps is for scheduling/orchestrating workflows, not high-volume data pipelines.",
  },
  {
    id: "az305-infra-14",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company has an on-premises Active Directory domain that supports a variety of resources, including a SQL Server database, non-relational data stores, web apps, Hyper-V virtual machines, and physical servers. Your company wants to use the tools in the Azure Migrate service to migrate resources to Azure. Which statement about Azure Migrate tool support is TRUE?",
    choices: [
      { id: "a", text: "You can migrate on-premises Hyper-V VMs, physical servers, and public cloud VMs to Azure VMs, and you can migrate SQL Server databases and web apps — but no tools are provided for migrating non-relational databases.", correct: true },
      { id: "b", text: "You can migrate SQL Server and non-relational databases to Azure Database instances.", correct: false },
      { id: "c", text: "Azure Migrate cannot migrate web apps to Azure.", correct: false },
      { id: "d", text: "Azure Migrate cannot migrate physical servers, only Hyper-V VMs.", correct: false },
    ],
    explanation:
      "Azure Migrate is a centralized hub of tools to assess and migrate on-premises resources. Server Migration moves Hyper-V VMs, physical servers, public cloud VMs (and VMware VMs) to Azure VMs; the Azure Database Migration Service migrates SQL Server databases to Azure SQL Database/Managed Instance/SQL on a VM; and the Web app migration assistant migrates web apps. However, Azure Migrate provides NO tool for migrating non-relational databases, so the statement that you can migrate non-relational databases is false.",
  },
  {
    id: "az305-infra-15",
    objective: "4.0-infrastructure",
    difficulty: "hard",
    type: "single",
    prompt:
      "An application was originally developed and deployed on-premises for its pilot release. You determined it would be more cost-effective and easier to scale in Azure with minimal application changes. Requirements: scale up to 300 instances across a region, load-balance traffic, and use a customized Windows Server 2019 VM image. You need to minimize costs and management overhead. What should you do?",
    choices: [
      { id: "a", text: "Package the application as a container and deploy it to Azure Container Instances (ACI).", correct: false },
      { id: "b", text: "Create the deployment as a VM scale set.", correct: true },
      { id: "c", text: "Package the application as a container and deploy it to an AKS cluster.", correct: false },
      { id: "d", text: "Use an ARM template and PowerShell script to deploy individual VMs as needed.", correct: false },
    ],
    explanation:
      "Use a VM scale set. VMSS supports autoscaling and load balancing for large VM fleets while using a custom Windows image, which matches the requirement to keep application changes minimal. ACI and AKS assume containerization (a larger app change path), and scripted individual VM deployment increases operational overhead.",
  },
  {
    id: "az305-infra-16",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "A company is modernizing workloads (VMs, databases, and applications) by moving to the cloud. You need to identify the correct migration phases in sequence. Which sequence is correct?",
    choices: [
      { id: "a", text: "Plan -> Ready -> Deploy", correct: false },
      { id: "b", text: "Assess -> Deploy -> Release", correct: true },
      { id: "c", text: "Assess -> Ready -> Release", correct: false },
      { id: "d", text: "Plan -> Deploy -> Release", correct: false },
    ],
    explanation:
      "The correct sequence is Assess, then Deploy, then Release. First assess workloads and migration effort, then deploy/migrate workloads, and finally validate and release them into production operations.",
  },
  {
    id: "az305-data-17",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "single",
    prompt:
      "You plan to use an Azure Blob storage account to let external partners access technical videos. Partners do not have accounts in your Microsoft Entra tenant and must not be able to modify the storage account. What should you do?",
    choices: [
      { id: "a", text: "Create a shared access signature (SAS).", correct: true },
      { id: "b", text: "Create a role assignment.", correct: false },
      { id: "c", text: "Provide the secondary access key.", correct: false },
      { id: "d", text: "Provide the primary access key.", correct: false },
    ],
    explanation:
      "Use SAS to grant scoped, time-limited access to specific blobs/containers without tenant user accounts and without granting full account administration. RBAC role assignments typically require Entra identities, and sharing account keys grants excessive privilege.",
  },
  {
    id: "az305-data-18",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "multi",
    prompt:
      "You have an Azure Synapse Analytics solution. The AI engineering team implemented Apache Spark and wants to query external Spark tables from the Synapse workspace using T-SQL, without deploying or managing extra clusters/infrastructure. Which two recommendations should you include? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Use the built-in serverless SQL pool for T-SQL analysis.", correct: true },
      { id: "b", text: "Create and manage a dedicated SQL pool for this requirement.", correct: false },
      { id: "c", text: "Configure Private Link for secure workspace connectivity to the Spark data path.", correct: true },
      { id: "d", text: "Use Azure Synapse Link to query Apache Spark external tables.", correct: false },
      { id: "e", text: "Use PolyBase as the primary integration approach for Spark tables.", correct: false },
    ],
    explanation:
      "Use the built-in serverless SQL pool to run T-SQL without provisioning extra compute infrastructure. For the workspace connectivity model in this scenario, configure Private Link. Dedicated SQL pools add management overhead, and Synapse Link/PolyBase are not the intended path for this Spark-table access pattern in the given context.",
  },
  {
    id: "az305-infra-17",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "multi",
    prompt:
      "You are designing an auditing application as multiple Azure Functions that must subscribe to events across an Azure subscription, receive those events as soon as they occur, and deploy all related resources using Infrastructure as Code (IaC). Which two Azure services/features should you recommend? (Each correct answer presents part of the solution.)",
    choices: [
      { id: "a", text: "Azure Service Bus", correct: false },
      { id: "b", text: "Azure Event Grid", correct: true },
      { id: "c", text: "Azure Automation", correct: false },
      { id: "d", text: "Azure Bicep", correct: true },
      { id: "e", text: "Azure Queue Storage", correct: false },
    ],
    explanation:
      "Use Azure Event Grid for near real-time event routing from Azure services to functions, and Azure Bicep for declarative IaC deployment of all application resources. Service Bus/Queue Storage are message queues rather than native event-subscription services for this scenario, and Azure Automation runbooks are not the right IaC/eventing mechanism here.",
  },
  {
    id: "az305-data-19",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "single",
    prompt:
      "A company needs a data store created in Azure for an application. The data store must be able to store JSON-based items, allow SQL-like queries against the data store, and provide low-latency access to data items. Which of the following would you consider as the data store?",
    choices: [
      { id: "a", text: "Azure BLOB storage", correct: false },
      { id: "b", text: "Azure Cosmos DB", correct: true },
      { id: "c", text: "Azure HDInsight", correct: false },
      { id: "d", text: "Azure Redis", correct: false },
    ],
    explanation:
      "Azure Cosmos DB stores JSON documents, supports SQL API queries over that data, and delivers guaranteed single-digit-millisecond low-latency access. Blob storage is object storage without SQL query support, HDInsight is a big-data analytics platform (not a low-latency operational store), and Redis is an in-memory key-value cache rather than a queryable JSON document store.",
  },
  {
    id: "az305-data-20",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "Your organization has multiple Azure Cosmos DB accounts. You need to recommend which API to use for application functionality. Which of the following APIs would you use to host a JSON document? (Choose two.)",
    choices: [
      { id: "a", text: "SQL (Core)", correct: true },
      { id: "b", text: "Table", correct: false },
      { id: "c", text: "Gremlin", correct: false },
      { id: "d", text: "Cassandra", correct: false },
      { id: "e", text: "MongoDB", correct: true },
    ],
    explanation:
      "The SQL (Core) API and the MongoDB API both store data as JSON documents. The Table API stores key/value entities, Gremlin is for graph data, and Cassandra uses a column-family (wide-column) model — none of which are JSON-document stores.",
  },
  {
    id: "az305-data-21",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "A company uses Azure SQL Managed Instance for the application data. What two parameters would you set up to ensure that the instance will scale to meet the workload demands? (Choose two.)",
    choices: [
      { id: "a", text: "Define the maximum of CPU cores", correct: true },
      { id: "b", text: "Define the maximum of the allocated storage", correct: true },
      { id: "c", text: "Define the maximum of the resources per database", correct: false },
      { id: "d", text: "Define the maximum resource limit per group of databases", correct: false },
    ],
    explanation:
      "Azure SQL Managed Instance is based only on the vCore purchasing model, which lets you select two scalability parameters: the maximum number of CPU (vCore) cores and the maximum allocated storage. Per-database and per-group resource limits are Elastic Pool concepts, not Managed Instance scaling parameters.",
  },
  {
    id: "az305-data-22",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "You have been asked to suggest Azure SQL DB purchasing options, service tiers, and hardware choices for the following requirements: (1) select compute and storage options independently; (2) select the amount of data and log storage; (3) select backup storage replication options — LRS, ZRS and RA-GRS; (4) save costs by selecting the reservation option to purchase; (5) utilize the Azure Hybrid Benefit. Which of the following models will you select to meet all the above requirements?",
    choices: [
      { id: "a", text: "vCore Model", correct: true },
      { id: "b", text: "DTU model", correct: false },
      { id: "c", text: "Serverless Model", correct: false },
      { id: "d", text: "Elastic Pools", correct: false },
    ],
    explanation:
      "Only the vCore purchasing model lets you scale compute and storage independently, choose data/log storage sizing and backup storage redundancy (LRS/ZRS/RA-GRS), purchase Reserved Capacity for savings, and apply the Azure Hybrid Benefit. The DTU model bundles compute/storage together and offers none of these; Serverless auto-scales compute (not independent selection) and Elastic Pools share resources across databases rather than meeting these specific requirements.",
  },
  {
    id: "az305-infra-18",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company has two Azure virtual machines deployed in different regions. Each VM has a public IP address assigned to its network interface, and an application is installed on the VMs. You need to implement Azure Front Door-based load balancing across the virtual machines and ensure the application only accepts traffic that is routed from Azure Front Door. Which of the following can be implemented for this requirement?",
    choices: [
      { id: "a", text: "Azure Private Link", correct: false },
      { id: "b", text: "Service Endpoints", correct: false },
      { id: "c", text: "Network Security Groups with service tags", correct: true },
      { id: "d", text: "Network Security Groups with application security groups", correct: false },
    ],
    explanation:
      "Use an NSG with the AzureFrontDoor.Backend service tag to allow inbound traffic only from Front Door's backend IP ranges (and validate the X-Azure-FDID header) so the VMs reject direct internet traffic. Private Link and Service Endpoints secure access to PaaS services, and application security groups group VM NICs but do not identify Front Door's source ranges.",
  },
  {
    id: "az305-infra-19",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "multi",
    prompt:
      "You have to implement an Azure Logic App to perform the following task: \"Notify an administrator when the settings of a virtual machine in a resource group are changed.\" Which of the following components would you create in the Logic Apps Designer? (Choose three.)",
    choices: [
      { id: "a", text: "A condition control", correct: true },
      { id: "b", text: "An action", correct: true },
      { id: "c", text: "A variable", correct: false },
      { id: "d", text: "An Azure Event Grid trigger", correct: true },
      { id: "e", text: "An Azure Service Bus trigger", correct: false },
    ],
    explanation:
      "First create an Azure Event Grid trigger to listen for resource-change events from the resource group. Then add a condition control to evaluate whether the relevant setting changed, and finally an action to alert the administrator. A variable is not required, and a Service Bus trigger is not how you subscribe to Azure resource change events.",
  },
  {
    id: "az305-data-23",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "The vCore purchase model for Azure SQL Database provides three service tiers. Which of the following tiers will you select to ensure that it uses in-memory OLTP computing to improve performance?",
    choices: [
      { id: "a", text: "General Purpose", correct: false },
      { id: "b", text: "Business Critical", correct: true },
      { id: "c", text: "Hyperscale", correct: false },
      { id: "d", text: "Premium", correct: false },
    ],
    explanation:
      "In the vCore model the three tiers are General Purpose, Business Critical, and Hyperscale. Business Critical provides in-memory OLTP (memory-optimized tables) along with high-IOPS local SSD and read replicas for the highest performance. Premium is a DTU-model tier (not vCore), General Purpose has no in-memory OLTP, and Hyperscale targets very large databases rather than in-memory OLTP.",
  },
  {
    id: "az305-data-24",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "You are developing a cloud-based OTT application on Azure to host movies and web shows online. Each video file is between 100 MB and 10 GB. The application needs certificate-based authentication and must stream to all users over the Internet. You need an Azure storage option that provides the fastest read performance while keeping storage costs low. Which storage solution would you recommend?",
    choices: [
      { id: "a", text: "Azure Files", correct: false },
      { id: "b", text: "Azure SQL Database", correct: false },
      { id: "c", text: "Azure Data Lake Storage Gen2", correct: false },
      { id: "d", text: "Azure Blob Storage", correct: true },
    ],
    explanation:
      "Azure Blob Storage is purpose-built for storing and streaming large unstructured media files (100 MB–10 GB) at low cost, delivers high read throughput (and can be fronted by a CDN), and supports secure access. Azure Files targets SMB file shares, Azure SQL Database is a relational store (not for large binary streaming), and Data Lake Gen2 is optimized for analytics rather than cost-efficient public media streaming.",
  },
  {
    id: "az305-data-25",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "You are developing an online retail application on Azure that needs to handle dynamic product schemas. The database solution must: store semi-structured data without a predefined schema; support SQL-like querying; maintain ACID compliance within individual partitions; and facilitate global data replication. Which database solution would you recommend?",
    choices: [
      { id: "a", text: "Azure Cosmos DB for NoSQL", correct: true },
      { id: "b", text: "Azure Blob Storage", correct: false },
      { id: "c", text: "Azure SQL Database Hyperscale", correct: false },
      { id: "d", text: "Azure Cosmos DB for Apache Cassandra", correct: false },
    ],
    explanation:
      "Azure Cosmos DB for NoSQL stores schema-free JSON documents, supports a SQL-like query language, guarantees ACID transactions within a logical partition, and offers turnkey global distribution/replication. Blob Storage has no SQL querying, SQL Database Hyperscale requires a fixed relational schema, and the Cassandra API uses CQL (a column-family model) rather than the SQL/document model described.",
  },
  {
    id: "az305-data-26",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "single",
    prompt:
      "Contoso Ltd. needs to retain large volumes of historical inventory data exported from the \"Contoso_Inventory\" database. The data is accessed infrequently but must remain immediately available when requested without requiring offline rehydration. The company wants to reduce storage costs compared with storing frequently accessed data while maintaining online access. Which Azure storage option should they select?",
    choices: [
      { id: "a", text: "Azure Premium SSD Managed Disks", correct: false },
      { id: "b", text: "Azure Blob Storage with Hot Access Tier", correct: false },
      { id: "c", text: "Azure Blob Storage with Cool Access Tier", correct: true },
      { id: "d", text: "Azure Blob Storage with Archive Access Tier", correct: false },
    ],
    explanation:
      "The Cool tier lowers storage cost for infrequently accessed data while keeping it online and immediately available. The Archive tier is cheapest but is offline and requires rehydration before access (which the requirement forbids). The Hot tier costs more for storage, and Premium SSD Managed Disks are for VM disks, not archival blob data.",
  },
  {
    id: "az305-data-27",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "An IoT startup needs to store massive amounts of sensor data generated from its devices. The data should be stored in a way that optimizes write performance and allows for efficient batch processing at a later time. The startup also needs to consider cost management. Proposed solution: The startup should use Azure Data Lake Storage Gen2 to store the sensor data, optimizing for write performance and cost-effective batch processing. Is this proposed solution correct?",
    choices: [
      { id: "a", text: "Yes", correct: true },
      { id: "b", text: "No", correct: false },
    ],
    explanation:
      "Yes. Azure Data Lake Storage Gen2 provides high-throughput, low-latency data ingestion ideal for massive sensor data, integrates natively with Azure Data Factory, Databricks, and HDInsight for efficient batch processing, and uses pay-as-you-go pricing to help manage costs — meeting all stated requirements.",
  },
  {
    id: "az305-data-28",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "Contoso's e-commerce platform, running on Azure, requires a storage solution to balance high performance, feature richness, and cost efficiency for its product catalog. The catalog experiences fluctuating read and write operations and needs to handle large, unstructured data alongside structured metadata. Which storage solution should you recommend?",
    choices: [
      { id: "a", text: "Azure SQL Database with In-Memory OLTP", correct: false },
      { id: "b", text: "Azure Cosmos DB with Provisioned Throughput", correct: true },
      { id: "c", text: "Azure Blob Storage with Premium Performance Tier", correct: false },
      { id: "d", text: "Azure SQL Managed Instance with Elastic Pools", correct: false },
    ],
    explanation:
      "Azure Cosmos DB is a globally distributed, multi-model database that delivers high availability and fast, consistent performance. Provisioned throughput lets you allocate resources for fluctuating read/write demand, and its multi-model support (document, key-value, graph, column-family) handles both unstructured data and structured metadata. The SQL-based options are relational-only, and Blob Storage cannot query structured metadata the way this catalog needs.",
  },
  {
    id: "az305-data-29",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "multi",
    prompt:
      "Your client, a financial services firm, requires a data analysis solution for processing large volumes of transactional data. The solution must support complex queries and provide insights using machine learning models. It should also be integrated with their existing on-premises SQL Server. Which of the following three components should you use in your design? (Choose three.)",
    choices: [
      { id: "a", text: "Azure Data Factory", correct: true },
      { id: "b", text: "Azure Machine Learning", correct: true },
      { id: "c", text: "Azure Cosmos DB", correct: false },
      { id: "d", text: "Azure Synapse Link", correct: false },
      { id: "e", text: "Azure SQL Managed Instance", correct: true },
    ],
    explanation:
      "Azure Data Factory orchestrates ETL and moves large volumes of transactional data from on-premises SQL Server into Azure. Azure SQL Managed Instance provides near-100% SQL Server compatibility for seamless integration and complex querying. Azure Machine Learning builds and serves the predictive models. Cosmos DB (NoSQL) and Synapse Link do not fit the relational, on-premises-SQL-integration requirement here.",
  },
  {
    id: "az305-data-30",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "Contoso Ltd. requires a solution to perform batch processing of large datasets stored in Azure Data Lake Storage. They need the solution to integrate with their existing Hadoop ecosystem and provide cost-effective scaling. Proposed solution: They should use Azure Databricks to perform batch processing on the datasets stored in Azure Data Lake Storage, leveraging its compatibility with the Hadoop ecosystem and scalability. Is this proposed solution correct?",
    choices: [
      { id: "a", text: "Yes", correct: true },
      { id: "b", text: "No", correct: false },
    ],
    explanation:
      "Yes. Azure Databricks is a unified analytics platform natively integrated with Azure Data Lake Storage and built on Apache Spark, so it is compatible with existing Hadoop-based workflows. It offers scalable compute for cost-effective batch processing, meeting all of Contoso's requirements.",
  },
  // ── Weak-topic series: SQL family ──────────────────────────────
  {
    id: "az305-data-31",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A company is migrating an on-premises application to Azure. The application uses SQL Server Agent jobs, cross-database queries, and linked servers. The company wants a PaaS solution with minimal application changes. What should you recommend?",
    choices: [
      { id: "a", text: "Azure SQL Database (single database)", correct: false },
      { id: "b", text: "Azure SQL Database elastic pool", correct: false },
      { id: "c", text: "Azure SQL Managed Instance", correct: true },
      { id: "d", text: "SQL Server on an Azure Virtual Machine", correct: false },
    ],
    explanation:
      "SQL Server Agent, cross-database queries, and linked servers are instance-scoped features that Azure SQL Database doesn't provide, but Managed Instance does (near 100% SQL Server compatibility, PaaS). SQL Server on a VM would work technically but is IaaS — you manage OS/patching/backups — so it fails the minimal-effort PaaS requirement.",
  },
  {
    id: "az305-data-32",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "single",
    prompt:
      "You need to migrate a mission-critical on-premises SQL Server database to the Business Critical tier of Azure SQL Managed Instance. The migration must be a true online migration with minimal downtime. What should you recommend?",
    choices: [
      { id: "a", text: "Native backup and restore to Azure Blob Storage", correct: false },
      { id: "b", text: "Azure Database Migration Service (offline mode)", correct: false },
      { id: "c", text: "Managed Instance link", correct: true },
      { id: "d", text: "Transactional replication", correct: false },
    ],
    explanation:
      "Managed Instance link uses distributed availability group technology to replicate in near real time and is the only solution enabling a true online migration to the Business Critical tier. Backup/restore and DMS offline both require downtime, and transactional replication is a scenario enabler, not the documented online migration path to BC.",
  },
  {
    id: "az305-data-33",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A dev/test database is used heavily during business hours but sits idle overnight and on weekends. You must minimize compute costs. Which Azure SQL Database configuration should you recommend?",
    choices: [
      { id: "a", text: "Provisioned compute, Business Critical tier", correct: false },
      { id: "b", text: "Serverless compute, General Purpose tier, Standard-series (Gen5)", correct: true },
      { id: "c", text: "Serverless compute, Business Critical tier", correct: false },
      { id: "d", text: "Provisioned compute, Hyperscale tier", correct: false },
    ],
    explanation:
      "Serverless auto-scales and bills per second only for the compute used, ideal for intermittent usage. Serverless is only supported on Standard-series (Gen5) hardware in the General Purpose tier — it is not available for Business Critical (so C is invalid) — and provisioned tiers bill continuously.",
  },
  {
    id: "az305-data-34",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "An application's database is expected to grow to 30 TB. The workload is modern OLTP and needs fast scaling without copying data to new nodes. Which service tier should you recommend?",
    choices: [
      { id: "a", text: "General Purpose", correct: false },
      { id: "b", text: "Business Critical", correct: false },
      { id: "c", text: "Hyperscale", correct: true },
      { id: "d", text: "Premium (DTU)", correct: false },
    ],
    explanation:
      "Hyperscale supports up to 128 TB, is the recommended default for new/modern OLTP workloads, and scales quickly because new compute nodes don't copy data locally (page-server architecture). General Purpose and Business Critical cap at 4 TB.",
  },
  {
    id: "az305-data-35",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A workload requires I/O latency of 1–2 ms, In-Memory OLTP, and a free read-only replica for reporting queries. Which service tier meets all three requirements?",
    choices: [
      { id: "a", text: "General Purpose", correct: false },
      { id: "b", text: "Business Critical", correct: true },
      { id: "c", text: "Hyperscale", correct: false },
      { id: "d", text: "Standard (DTU)", correct: false },
    ],
    explanation:
      "Business Critical delivers 1–2 ms local SSD latency, is the only vCore tier with In-Memory OLTP, and provides a free read scale-out replica from its secondary replicas. Hyperscale has 1–2 ms cached latency and read replicas but no In-Memory OLTP.",
  },
  {
    id: "az305-bc-06",
    objective: "3.0-business-continuity",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company runs several Azure SQL Databases in the Business Critical tier. A new requirement states the databases must remain available if an entire Azure availability zone fails, with zero data loss and no increase in cost. What should you recommend?",
    choices: [
      { id: "a", text: "Configure active geo-replication to a second region", correct: false },
      { id: "b", text: "Enable zone redundancy on the existing Business Critical databases", correct: true },
      { id: "c", text: "Migrate the databases to Hyperscale", correct: false },
      { id: "d", text: "Configure geo-redundant (GRS) backup storage", correct: false },
    ],
    explanation:
      "For Premium/Business Critical, enabling zone redundancy redistributes the existing replicas across availability zones at no extra cost. Active geo-replication adds cost and is region-level DR (not zone HA), and GRS backup storage protects backups, not the running database.",
  },
  {
    id: "az305-bc-07",
    objective: "3.0-business-continuity",
    difficulty: "hard",
    type: "multi",
    prompt:
      "You plan to deploy a new Hyperscale database that must be zone redundant. Which two statements are true? (Choose two.)",
    choices: [
      { id: "a", text: "Zone redundancy can be enabled at any time after creation", correct: false },
      { id: "b", text: "Zone redundancy must be specified during database creation", correct: true },
      { id: "c", text: "It requires at least one HA compute replica and zone-redundant (or geo-zone-redundant) backup storage", correct: true },
      { id: "d", text: "Zone redundancy on Hyperscale removes the 128 TB storage limit", correct: false },
    ],
    explanation:
      "Hyperscale zone redundancy is a creation-time-only setting (existing databases need a database copy, PITR, or geo-replica workaround), and it requires at least one HA compute replica plus zone-redundant or geo-zone-redundant backup storage. It does not change the 128 TB maximum.",
  },
  {
    id: "az305-bc-08",
    objective: "3.0-business-continuity",
    difficulty: "medium",
    type: "single",
    prompt:
      "A database uses the Standard (DTU) purchasing model. The business now requires the database to survive an availability-zone outage. What should you recommend?",
    choices: [
      { id: "a", text: "Enable zone redundancy on the Standard tier", correct: false },
      { id: "b", text: "Move to the Basic tier with ZRS backups", correct: false },
      { id: "c", text: "Move to a tier that supports zone redundancy, such as Premium or a vCore tier (General Purpose, Business Critical, or Hyperscale)", correct: true },
      { id: "d", text: "Nothing — all Azure SQL Database tiers are zone redundant by default", correct: false },
    ],
    explanation:
      "Basic and Standard (DTU) tiers do not support zone redundancy. Premium (DTU) and all three vCore tiers do, so the design answer is a tier change.",
  },
  {
    id: "az305-bc-09",
    objective: "3.0-business-continuity",
    difficulty: "medium",
    type: "single",
    prompt:
      "For compliance, full backups of an Azure SQL database must be retained for 7 years. Point-in-time restore retention is currently 7 days. What should you recommend?",
    choices: [
      { id: "a", text: "Increase PITR retention to 35 days", correct: false },
      { id: "b", text: "Configure a long-term retention (LTR) policy", correct: true },
      { id: "c", text: "Export the database to a BACPAC weekly", correct: false },
      { id: "d", text: "Enable geo-redundant backup storage", correct: false },
    ],
    explanation:
      "Long-term retention (LTR) keeps weekly/monthly/yearly full backups for up to 10 years in Blob storage — the compliance mechanism. PITR maxes at 35 days, and BACPAC exports are manual and not the recommended design answer.",
  },
  {
    id: "az305-data-36",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "single",
    prompt:
      "A company holds SQL Server licenses with Software Assurance and wants to reduce Azure SQL costs. For which deployment does Azure Hybrid Benefit NOT apply to new databases?",
    choices: [
      { id: "a", text: "Azure SQL Database General Purpose", correct: false },
      { id: "b", text: "Azure SQL Database Business Critical", correct: false },
      { id: "c", text: "Azure SQL Database Hyperscale", correct: true },
      { id: "d", text: "Azure SQL Managed Instance", correct: false },
    ],
    explanation:
      "As of December 2023, Hyperscale's simplified pricing has no SQL license fee, so Azure Hybrid Benefit is not available for new Hyperscale databases (existing provisioned ones could use it until December 2026). General Purpose, Business Critical, and Managed Instance all support AHB.",
  },
  // ── Weak-topic series: Storage accounts, ADLS & Cosmos DB ──────
  {
    id: "az305-bc-10",
    objective: "3.0-business-continuity",
    difficulty: "medium",
    type: "single",
    prompt:
      "You need a storage solution for blob data that must survive both an availability-zone failure and a regional outage, and the application must be able to read from the secondary region at any time. Which redundancy option should you recommend?",
    choices: [
      { id: "a", text: "ZRS", correct: false },
      { id: "b", text: "GRS", correct: false },
      { id: "c", text: "GZRS", correct: false },
      { id: "d", text: "RA-GZRS", correct: true },
    ],
    explanation:
      "Zone failure needs ZRS locally; a regional outage needs geo-redundancy; reading from the secondary anytime needs the RA- (read-access) prefix. Only RA-GZRS combines all three. GZRS protects the same way but has no secondary read access.",
  },
  {
    id: "az305-data-37",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "An application requires Azure Files shares over the NFS protocol with consistently low latency. Which storage account type should you recommend?",
    choices: [
      { id: "a", text: "Standard general-purpose v2", correct: false },
      { id: "b", text: "Premium block blobs", correct: false },
      { id: "c", text: "Premium file shares", correct: true },
      { id: "d", text: "Premium page blobs", correct: false },
    ],
    explanation:
      "Premium file shares support both SMB and NFS with SSD-backed low latency. Standard GPv2 files is the SMB/standard path, and premium block/page blob accounts don't serve Azure Files.",
  },
  {
    id: "az305-data-38",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your team wants geo-redundant (GRS) storage for a high-transaction, low-latency blob workload and proposes a premium block blob account. What is wrong with this design?",
    choices: [
      { id: "a", text: "Premium block blob accounts don't support blobs", correct: false },
      { id: "b", text: "Premium accounts only support LRS and ZRS — no geo-redundancy", correct: true },
      { id: "c", text: "GRS is only available in US regions", correct: false },
      { id: "d", text: "Nothing — the design is valid", correct: false },
    ],
    explanation:
      "All three premium account types (block blobs, file shares, page blobs) support LRS and ZRS only. If geo-redundancy is mandatory, you need Standard GPv2 — or a design that copies data to a second region yourself.",
  },
  {
    id: "az305-data-39",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A data science team will run Apache Spark and Hadoop jobs against petabytes of files, and security requires POSIX-style permissions at the directory and file level. What should you recommend?",
    choices: [
      { id: "a", text: "A standard GPv2 account with hierarchical namespace enabled (Data Lake Storage)", correct: true },
      { id: "b", text: "A standard GPv2 account with plain blob containers and account SAS tokens", correct: false },
      { id: "c", text: "Azure Files premium shares with NTFS ACLs", correct: false },
      { id: "d", text: "Azure Table Storage", correct: false },
    ],
    explanation:
      "Spark/Hadoop plus directory/file-level POSIX ACLs equals Data Lake Storage: GPv2 with the hierarchical namespace enabled, accessed via the ABFS driver. Plain blob containers lack POSIX ACLs, Azure Files targets SMB/NFS file shares, and Table Storage is a NoSQL key-value store.",
  },
  {
    id: "az305-data-40",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "single",
    prompt:
      "Which statement about Azure Data Lake Storage is TRUE?",
    choices: [
      { id: "a", text: "It is a separate Azure service with its own account type", correct: false },
      { id: "b", text: "It is a set of capabilities on Blob Storage, enabled by the hierarchical namespace setting on a storage account", correct: true },
      { id: "c", text: "It requires premium performance accounts", correct: false },
      { id: "d", text: "It cannot use lifecycle management policies", correct: false },
    ],
    explanation:
      "ADLS is not a separate service — it's Blob Storage with the hierarchical namespace enabled. It's priced at Blob levels, works on standard accounts, and keeps Blob features like access tiers and lifecycle management.",
  },
  {
    id: "az305-data-41",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "What is the practical benefit of the hierarchical namespace when a job renames a directory containing one million files?",
    choices: [
      { id: "a", text: "The rename is parallelized across a Spark cluster", correct: false },
      { id: "b", text: "The rename is a single atomic metadata operation instead of an operation on every object", correct: true },
      { id: "c", text: "Renames are impossible without hierarchical namespace", correct: false },
      { id: "d", text: "The files are automatically compressed during rename", correct: false },
    ],
    explanation:
      "With the hierarchical namespace, directory rename/delete are single atomic metadata operations. Without it, 'directories' are just name prefixes, so a rename touches every one of the million objects — slow and expensive.",
  },
  {
    id: "az305-data-42",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A team is migrating an existing MongoDB application to Azure and wants global distribution with no application code changes. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Cosmos DB for NoSQL", correct: false },
      { id: "b", text: "Azure Cosmos DB for MongoDB", correct: true },
      { id: "c", text: "Azure SQL Database with JSON support", correct: false },
      { id: "d", text: "Azure Table Storage", correct: false },
    ],
    explanation:
      "Cosmos DB for MongoDB speaks the BSON/wire protocol, so an existing MongoDB app migrates without code changes and gains Cosmos DB's global distribution. The NoSQL API would require rewriting data access.",
  },
  {
    id: "az305-data-43",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "single",
    prompt:
      "In Azure Cosmos DB, what does one Request Unit (RU) represent?",
    choices: [
      { id: "a", text: "One second of CPU time on a partition", correct: false },
      { id: "b", text: "The throughput of one GET operation on a 1-KB document", correct: true },
      { id: "c", text: "One MB of storage consumed per hour", correct: false },
      { id: "d", text: "One connection to the database", correct: false },
    ],
    explanation:
      "By definition, 1 RU is the throughput of a point read (GET) of a 1-KB document. Every operation (read, write, query, stored procedure) has a deterministic RU cost — that's how you budget capacity.",
  },
  {
    id: "az305-data-44",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "An application needs ACID transactions across multiple documents in Cosmos DB. Which condition must be met?",
    choices: [
      { id: "a", text: "The documents must be in different containers", correct: false },
      { id: "b", text: "The account must use the Cassandra API", correct: false },
      { id: "c", text: "The documents must be within a single partition of a container", correct: true },
      { id: "d", text: "Strong consistency must be enabled account-wide", correct: false },
    ],
    explanation:
      "Cosmos DB transactions are ACID with all-or-nothing semantics but are scoped to a single logical partition within a container, expressed via SDK transactional batches or JavaScript stored procedures/triggers.",
  },
  {
    id: "az305-data-45",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "single",
    prompt:
      "A Cosmos DB container is hitting throttling errors on some operations even though total provisioned RU/s looks sufficient. Based on how Cosmos DB scales, what is the most likely design flaw?",
    choices: [
      { id: "a", text: "Too many containers in the database", correct: false },
      { id: "b", text: "The workload isn't distributed evenly across enough partition key values", correct: true },
      { id: "c", text: "The account uses Entra ID authentication", correct: false },
      { id: "d", text: "The free tier's 25 GB limit was exceeded", correct: false },
    ],
    explanation:
      "A container's throughput has no upper limit provided load is distributed evenly across enough partition key values. A hot partition key throttles even when aggregate RU/s looks fine — the classic Cosmos DB design flaw.",
  },
  // ── Weak-topic series: Data Factory & Stream Analytics ─────────
  {
    id: "az305-data-46",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "single",
    prompt:
      "In Azure Data Factory, what is the difference between a linked service and a dataset?",
    choices: [
      { id: "a", text: "A linked service defines the connection to a resource; a dataset points to the specific data within it", correct: true },
      { id: "b", text: "A dataset defines the connection; a linked service points to the data", correct: false },
      { id: "c", text: "They are synonyms", correct: false },
      { id: "d", text: "Linked services are only for compute; datasets are only for storage", correct: false },
    ],
    explanation:
      "A linked service is the connection string (how to reach the store or compute); a dataset is a named, strongly typed pointer to the data used as activity input/output (this container, this folder). Linked services cover both data stores and compute.",
  },
  {
    id: "az305-data-47",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "In Azure Data Factory, which component provides the compute environment where an activity runs or is dispatched from, placed close to the target data store for performance and compliance?",
    choices: [
      { id: "a", text: "Pipeline", correct: false },
      { id: "b", text: "Trigger", correct: false },
      { id: "c", text: "Integration runtime", correct: true },
      { id: "d", text: "Control flow", correct: false },
    ],
    explanation:
      "The integration runtime is the compute bridge between activities and linked services. It's also the answer when a scenario mentions reaching on-premises data (self-hosted IR) or running SSIS packages (Azure-SSIS IR).",
  },
  {
    id: "az305-data-48",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A data engineering team must transform terabytes of data with joins, aggregations, and derived columns, but the team has no Spark or coding expertise. The logic must run on a schedule as part of an ADF pipeline. What should you recommend?",
    choices: [
      { id: "a", text: "An ADF pipeline calling an Azure Databricks notebook", correct: false },
      { id: "b", text: "ADF mapping data flows", correct: true },
      { id: "c", text: "Azure Stream Analytics", correct: false },
      { id: "d", text: "A custom activity running Python on Azure Batch", correct: false },
    ],
    explanation:
      "Mapping data flows are visually designed transformations that require no coding and no Spark expertise, and they execute as pipeline activities with ADF's scheduling and monitoring. Databricks is the code-first path, and Stream Analytics is for streams, not scheduled batch ETL.",
  },
  {
    id: "az305-data-49",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "Where does the transformation logic of an ADF mapping data flow actually execute?",
    choices: [
      { id: "a", text: "On the self-hosted integration runtime's local machine", correct: false },
      { id: "b", text: "Inside the Azure SQL Database engine", correct: false },
      { id: "c", text: "On scaled-out Apache Spark clusters managed by Azure Data Factory", correct: true },
      { id: "d", text: "In the browser session of the pipeline author", correct: false },
    ],
    explanation:
      "ADF translates the visual logic, optimizes the path, and runs the job on Apache Spark clusters that spin up and down automatically — you never manage them.",
  },
  {
    id: "az305-data-50",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "single",
    prompt:
      "While building a mapping data flow, an engineer wants to see an interactive snapshot of the data at each transformation step. What is required?",
    choices: [
      { id: "a", text: "Publish the pipeline first", correct: false },
      { id: "b", text: "Enable debug mode (Data Preview tab)", correct: true },
      { id: "c", text: "Export the data flow script", correct: false },
      { id: "d", text: "Attach a GPU-enabled cluster", correct: false },
    ],
    explanation:
      "The Data Preview tab works only with debug mode on. By contrast, the Inspect tab shows metadata (columns, types, order) without debug mode.",
  },
  {
    id: "az305-data-51",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "single",
    prompt:
      "A pipeline must start automatically whenever a file lands in a storage container, and a different pipeline must run every night at 02:00. Which ADF components make this happen?",
    choices: [
      { id: "a", text: "Two datasets", correct: false },
      { id: "b", text: "Parameters and variables", correct: false },
      { id: "c", text: "Triggers (event-based and schedule-based)", correct: true },
      { id: "d", text: "Two integration runtimes", correct: false },
    ],
    explanation:
      "Triggers determine when pipelines execute; ADF supports event triggers (file arrival) and schedule triggers (nightly at 02:00). Parameters/variables configure runs, they don't start them.",
  },
  {
    id: "az305-data-52",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A company needs real-time analysis of telemetry from Azure IoT Hub. The team's skills are primarily SQL, and they want a fully managed service with no clusters to manage. Results must feed a live Power BI dashboard. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Databricks Structured Streaming", correct: false },
      { id: "b", text: "Azure Stream Analytics", correct: true },
      { id: "c", text: "Azure Data Factory mapping data flows", correct: false },
      { id: "d", text: "Azure HDInsight Storm", correct: false },
    ],
    explanation:
      "SQL skills, fully managed, IoT Hub input, and native Power BI output for real-time dashboards is Stream Analytics' textbook profile. Databricks needs code and cluster management, and mapping data flows are for batch ETL.",
  },
  {
    id: "az305-data-53",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "Which three are valid Azure Stream Analytics inputs? (Choose three.)",
    choices: [
      { id: "a", text: "Azure Event Hubs", correct: true },
      { id: "b", text: "Azure IoT Hub", correct: true },
      { id: "c", text: "Azure Blob Storage / Data Lake Storage Gen2", correct: true },
      { id: "d", text: "Azure Service Bus queues", correct: false },
    ],
    explanation:
      "Documented Stream Analytics inputs are Event Hubs and IoT Hub for streaming, and Blob Storage/ADLS Gen2 for historical/batch and reference data. Service Bus appears as an output pattern in messaging designs, not a Stream Analytics input.",
  },
  {
    id: "az305-data-54",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A Stream Analytics job must enrich a fast-moving event stream by joining it with a slow-changing product catalog stored in Azure SQL Database. Which Stream Analytics feature supports this?",
    choices: [
      { id: "a", text: "Reference data input", correct: true },
      { id: "b", text: "Streaming units", correct: false },
      { id: "c", text: "Checkpoints", correct: false },
      { id: "d", text: "No-code editor", correct: false },
    ],
    explanation:
      "Reference data inputs bring static or slow-changing data (from Blob Storage or SQL Database) into the job for join operations against the stream.",
  },
  {
    id: "az305-data-55",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "Which two statements about Stream Analytics reliability and pricing are TRUE? (Choose two.)",
    choices: [
      { id: "a", text: "Events may be silently lost during node failures", correct: false },
      { id: "b", text: "It offers exactly-once processing with selected outputs and at-least-once delivery, so events aren't lost", correct: true },
      { id: "c", text: "You pay per streaming unit consumed with no upfront cluster costs", correct: true },
      { id: "d", text: "You must pre-provision a cluster of VMs and pay for idle time", correct: false },
    ],
    explanation:
      "Stream Analytics guarantees at-least-once delivery (never loses events), offers exactly-once with selected outputs, uses built-in checkpoints, and bills purely on streaming units consumed — no clusters, no upfront costs.",
  },
  // ── Weak-topic series: Databricks & batch processing ───────────
  {
    id: "az305-data-56",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "multi",
    prompt:
      "Which three characteristics define a batch processing workload? (Choose three.)",
    choices: [
      { id: "a", text: "Latency tolerance of minutes to hours between ingestion and results", correct: true },
      { id: "b", text: "Requirement for submillisecond responses", correct: false },
      { id: "c", text: "Discrete tasks contributing to an overall data processing solution", correct: true },
      { id: "d", text: "The need to scale out over large data volumes", correct: true },
    ],
    explanation:
      "Batch processing means discrete tasks, high latency tolerance (minutes to hours), and scale-out over large volumes. Submillisecond responses describe streaming engines like Stream Analytics.",
  },
  {
    id: "az305-data-57",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A company wants an all-in-one SaaS analytics platform covering data movement, processing, ingestion, transformation, and reporting, with storage in OneLake and minimal platform management. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Databricks", correct: false },
      { id: "b", text: "Microsoft Fabric", correct: true },
      { id: "c", text: "Azure Stream Analytics", correct: false },
      { id: "d", text: "Azure Data Factory alone", correct: false },
    ],
    explanation:
      "'All-in-one SaaS', 'OneLake', and 'end-to-end analytics with minimal management' are Microsoft Fabric's signature. Databricks is a managed service where you still configure clusters, not fully SaaS.",
  },
  {
    id: "az305-data-58",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A data team of Python and Scala engineers needs collaborative notebooks, GPU-enabled clusters for ML, and fine-grained per-cluster scaling. What should you recommend?",
    choices: [
      { id: "a", text: "Microsoft Fabric", correct: false },
      { id: "b", text: "Azure Databricks", correct: true },
      { id: "c", text: "Azure Machine Learning Designer", correct: false },
      { id: "d", text: "Azure Stream Analytics", correct: false },
    ],
    explanation:
      "Collaborative web-based notebooks, GPU-enabled clusters, autoscaling, and per-cluster scale-out granularity are Azure Databricks' documented strengths for code-first data teams.",
  },
  {
    id: "az305-data-59",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "Batch jobs run in short bursts a few times per day. You must avoid paying for compute between runs. Which Azure Databricks capabilities address this? (Choose two.)",
    choices: [
      { id: "a", text: "Automatic cluster termination", correct: true },
      { id: "b", text: "Autoscaling", correct: true },
      { id: "c", text: "In-memory caching", correct: false },
      { id: "d", text: "Unity Catalog", correct: false },
    ],
    explanation:
      "Auto-termination stops the cluster (and billing) when idle; autoscaling right-sizes it during runs. Caching is a performance feature and Unity Catalog is governance — neither addresses idle cost.",
  },
  {
    id: "az305-data-60",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "single",
    prompt:
      "How is Azure Databricks priced?",
    choices: [
      { id: "a", text: "Capacity units assigned to the workspace", correct: false },
      { id: "b", text: "Databricks Units (DBUs — processing capability per hour) plus cluster hours", correct: true },
      { id: "c", text: "Per query executed", correct: false },
      { id: "d", text: "Flat monthly fee per user", correct: false },
    ],
    explanation:
      "Databricks pricing is DBUs (a unit of processing capability per hour) plus the underlying cluster hours. Capacity units is Microsoft Fabric's model.",
  },
  {
    id: "az305-data-61",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "multi",
    prompt:
      "In the batch-technology comparison, which capabilities does Azure Databricks have that Microsoft Fabric does NOT? (Choose two.)",
    choices: [
      { id: "a", text: "Autoscaling", correct: true },
      { id: "b", text: "In-memory caching of data", correct: true },
      { id: "c", text: "Row-level security", correct: false },
      { id: "d", text: "Microsoft Entra ID authentication", correct: false },
    ],
    explanation:
      "Per the comparison matrix, Databricks has autoscaling and in-memory caching; Fabric does not. Both have row-level security and Entra ID authentication, so those are shared, not differentiators.",
  },
  {
    id: "az305-data-62",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "single",
    prompt:
      "Databricks analysts need to run read-only queries against data in PostgreSQL, SQL Server, and Snowflake without copying the data into the lakehouse, with governance through Unity Catalog. What should you recommend?",
    choices: [
      { id: "a", text: "Nightly ADF copy pipelines into Delta tables", correct: false },
      { id: "b", text: "Lakehouse Federation (query federation connectors)", correct: true },
      { id: "c", text: "Exporting CSVs to Blob Storage", correct: false },
      { id: "d", text: "A custom JDBC driver on every user's cluster", correct: false },
    ],
    explanation:
      "Lakehouse Federation gives read-only JDBC access with Unity Catalog query pushdown to sources including PostgreSQL, MySQL, SQL Server, and Snowflake — preferred over raw JDBC for read-only federation, with no data movement.",
  },
  {
    id: "az305-data-63",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "In Unity Catalog, what is a connection?",
    choices: [
      { id: "a", text: "A network peering between two VNets", correct: false },
      { id: "b", text: "A securable object storing the endpoint and credentials needed to access an external system", correct: true },
      { id: "c", text: "A Spark session configuration", correct: false },
      { id: "d", text: "A Power BI gateway", correct: false },
    ],
    explanation:
      "A Unity Catalog connection is a securable object holding the endpoint and credentials for an external system, enabling governed authentication, federation, managed ingestion, JDBC, and HTTP connectivity.",
  },
  {
    id: "az305-data-64",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "What is the recommended way for Azure Databricks to govern access to cloud object storage such as ADLS and Blob Storage?",
    choices: [
      { id: "a", text: "Account keys embedded in notebooks", correct: false },
      { id: "b", text: "Unity Catalog", correct: true },
      { id: "c", text: "Public containers with anonymous access", correct: false },
      { id: "d", text: "Per-cluster mount points with shared credentials", correct: false },
    ],
    explanation:
      "Unity Catalog is the recommended governance layer for cloud object storage (ADLS, Blob, S3), both structured and unstructured. Keys-in-notebooks and shared mounts are legacy anti-patterns.",
  },
  {
    id: "az305-data-65",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "single",
    prompt:
      "Databricks needs governed access to a non-storage cloud service using long-term cloud credentials. Which Unity Catalog object is designed for this?",
    choices: [
      { id: "a", text: "Catalog federation", correct: false },
      { id: "b", text: "Service credential", correct: true },
      { id: "c", text: "Managed ingestion connector", correct: false },
      { id: "d", text: "Delta share", correct: false },
    ],
    explanation:
      "Service credentials are Unity Catalog securable objects that encapsulate long-term cloud credentials for non-storage cloud services.",
  },
  // ── Weak-topic series: Azure Machine Learning ──────────────────
  {
    id: "az305-data-66",
    objective: "2.0-data-storage",
    difficulty: "easy",
    type: "single",
    prompt:
      "What is Azure Machine Learning, in one sentence?",
    choices: [
      { id: "a", text: "A pre-trained vision and speech API service", correct: false },
      { id: "b", text: "A cloud service for accelerating and managing the ML project lifecycle: train and deploy models, and manage MLOps", correct: true },
      { id: "c", text: "A BI dashboarding tool", correct: false },
      { id: "d", text: "A relational database with ML functions", correct: false },
    ],
    explanation:
      "Azure Machine Learning is the lifecycle platform for custom models — training, deployment, and MLOps management. It is not a pre-built AI API service, a BI tool, or a database.",
  },
  {
    id: "az305-data-67",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "Business analysts with no coding experience must build and deploy a classification model. Which Azure ML capabilities fit? (Choose two.)",
    choices: [
      { id: "a", text: "Designer (drag-and-drop)", correct: true },
      { id: "b", text: "Automated ML (AutoML) UI", correct: true },
      { id: "c", text: "Python SDK v2", correct: false },
      { id: "d", text: "REST APIs", correct: false },
    ],
    explanation:
      "Designer is the no-code drag-and-drop interface to train and deploy, and the AutoML UI automates featurization and algorithm selection through an easy interface. The SDK and REST APIs are the code-first paths.",
  },
  {
    id: "az305-data-68",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "An e-commerce app must get fraud predictions for each transaction within milliseconds over HTTPS, and the team wants to roll out a new model version to only 10% of traffic first. What should you recommend?",
    choices: [
      { id: "a", text: "A batch endpoint on a compute cluster", correct: false },
      { id: "b", text: "A managed online (real-time) endpoint with traffic splitting across deployments", correct: true },
      { id: "c", text: "An ADF pipeline calling the model nightly", correct: false },
      { id: "d", text: "Stream Analytics with a JavaScript UDF", correct: false },
    ],
    explanation:
      "Managed online endpoints score over HTTPS in near real time, and traffic splitting across deployments exists exactly for A/B testing and safe rollout of new versions.",
  },
  {
    id: "az305-data-69",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "Ten million customer records must be scored for churn every night, in parallel, with results stored for later analysis. What should you recommend?",
    choices: [
      { id: "a", text: "A managed online endpoint", correct: false },
      { id: "b", text: "A batch endpoint processing data on a compute cluster", correct: true },
      { id: "c", text: "Prompt flow", correct: false },
      { id: "d", text: "The model catalog", correct: false },
    ],
    explanation:
      "Batch endpoints do asynchronous scoring: data reference in, parallel processing on compute clusters, results stored for analysis. Online endpoints are for per-request latency, not bulk jobs.",
  },
  {
    id: "az305-data-70",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "Which capabilities support MLOps in Azure Machine Learning? (Choose three.)",
    choices: [
      { id: "a", text: "Git integration and MLflow", correct: true },
      { id: "b", text: "ML pipeline scheduling and Azure Event Grid triggers", correct: true },
      { id: "c", text: "CI/CD with GitHub Actions and Azure DevOps", correct: true },
      { id: "d", text: "Automatic conversion of models to T-SQL", correct: false },
    ],
    explanation:
      "Documented MLOps integrations include Git, MLflow, pipeline scheduling, Event Grid triggers, and CI/CD tooling (GitHub Actions/Azure DevOps). Automatic conversion of models to T-SQL does not exist.",
  },
  {
    id: "az305-data-71",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A regulator asks you to prove exactly which code, data, and environment produced the model now running in production. Which Azure ML capability answers this?",
    choices: [
      { id: "a", text: "Serverless Spark compute", correct: false },
      { id: "b", text: "Lineage and job artifacts (code snapshots, logs, outputs) tracked between jobs and assets", correct: true },
      { id: "c", text: "The no-code Designer", correct: false },
      { id: "d", text: "GPU clusters", correct: false },
    ],
    explanation:
      "Azure ML tracks lineage between jobs and assets and keeps job artifacts — code snapshots, logs, outputs — so the model lifecycle is auditable down to a specific commit and environment.",
  },
  {
    id: "az305-data-72",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "single",
    prompt:
      "A healthcare company requires that training data is never stored or processed outside the Azure region where the workspace is deployed. Is Azure ML suitable?",
    choices: [
      { id: "a", text: "No — Azure ML replicates data globally by design", correct: false },
      { id: "b", text: "Yes — Azure ML doesn't store or process data outside the region where you deploy", correct: true },
      { id: "c", text: "Only with a Databricks premium tier", correct: false },
      { id: "d", text: "Only in sovereign clouds", correct: false },
    ],
    explanation:
      "Azure ML doesn't store or process your data outside the region where you deploy the workspace. Combine with VNet, Key Vault, and RBAC for the full compliance story.",
  },
  {
    id: "az305-data-73",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "A team wants to prototype, iterate, and deploy an application powered by large language models from providers like Azure OpenAI, Mistral, Meta, and Cohere. Which two Azure ML capabilities apply? (Choose two.)",
    choices: [
      { id: "a", text: "Model catalog", correct: true },
      { id: "b", text: "Prompt flow", correct: true },
      { id: "c", text: "Data labeling", correct: false },
      { id: "d", text: "Embarrassingly parallel training", correct: false },
    ],
    explanation:
      "The model catalog is the hub for hundreds of foundation models (Azure OpenAI, Mistral, Meta, Cohere, NVIDIA, Hugging Face, Microsoft), and prompt flow is the tool for prototyping, iterating, and deploying LLM-powered apps.",
  },
  {
    id: "az305-data-74",
    objective: "2.0-data-storage",
    difficulty: "hard",
    type: "single",
    prompt:
      "A retailer needs to train a separate demand-forecasting model for each of its 2,000 stores. Which documented training pattern fits?",
    choices: [
      { id: "a", text: "Distributed multinode training with Horovod", correct: false },
      { id: "b", text: "Embarrassingly parallel training", correct: true },
      { id: "c", text: "Hyperparameter tuning", correct: false },
      { id: "d", text: "Transfer learning", correct: false },
    ],
    explanation:
      "Training many independent models (one per store) is the 'embarrassingly parallel' scale-out pattern named in the docs for scenarios like demand forecasting. Horovod/distributed training splits one big training job, not thousands of small ones.",
  },
  {
    id: "az305-data-75",
    objective: "2.0-data-storage",
    difficulty: "medium",
    type: "multi",
    prompt:
      "For securing an Azure ML workspace end to end, which Azure services does it integrate with? (Choose three.)",
    choices: [
      { id: "a", text: "Azure Virtual Networks and network security groups", correct: true },
      { id: "b", text: "Azure Key Vault for secrets and credentials", correct: true },
      { id: "c", text: "Azure Container Registry behind a virtual network", correct: true },
      { id: "d", text: "Azure DNS Zone endpoints for storage", correct: false },
    ],
    explanation:
      "Azure ML's security integrations include VNets and NSGs, Key Vault for secrets, Container Registry behind a VNet, and Azure RBAC. An Azure DNS Zone endpoint is a storage-account networking concept, not an Azure ML security integration.",
  },
  // ── Blueprint rebalance: Identity, Governance & Monitoring ─────
  {
    id: "az305-igm-17",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company has 40 Azure subscriptions across four departments. You must apply a common set of security policies to all subscriptions, allow each department to add its own policies, and minimize administrative effort as new subscriptions are added. What should you recommend?",
    choices: [
      { id: "a", text: "Assign policies individually to each subscription", correct: false },
      { id: "b", text: "A management group hierarchy: a root-level group for common policies and child groups per department", correct: true },
      { id: "c", text: "A single resource group per department with policies assigned to it", correct: false },
      { id: "d", text: "Azure Blueprints assigned per subscription", correct: false },
    ],
    explanation:
      "Management groups let you organize subscriptions into a hierarchy where policy and RBAC assignments inherit downward. Common policies go on a top-level group; each department's group adds its own. New subscriptions placed into a group automatically inherit everything — no per-subscription work. Per-subscription assignment doesn't scale, resource groups can't contain subscriptions, and Blueprints is deprecated in favor of template specs and deployment stacks.",
  },
  {
    id: "az305-igm-18",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "An Azure App Service web app must read secrets from Azure Key Vault. Credentials must not be stored in code or configuration, and there must be nothing to rotate. Several other apps will need the same pattern with their own identities managed automatically alongside each app's lifecycle. What should you recommend?",
    choices: [
      { id: "a", text: "A service principal with a client secret stored in app settings", correct: false },
      { id: "b", text: "A system-assigned managed identity for each app, granted access to Key Vault", correct: true },
      { id: "c", text: "A shared user-assigned managed identity stored in code", correct: false },
      { id: "d", text: "A SAS token for Key Vault", correct: false },
    ],
    explanation:
      "A system-assigned managed identity is created and deleted with the resource, requires no credentials in code, and has nothing to rotate — Azure manages the lifecycle. Grant it Key Vault access via RBAC. A client secret is exactly the credential-in-config problem you're avoiding. User-assigned identities are valid when identities must be shared or pre-provisioned, but the per-app lifecycle requirement points to system-assigned. Key Vault doesn't use SAS tokens.",
  },
  {
    id: "az305-igm-19",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "You need to recommend when to use a user-assigned managed identity instead of a system-assigned managed identity. Which scenario fits a user-assigned identity best?",
    choices: [
      { id: "a", text: "The identity must be deleted automatically when the resource is deleted", correct: false },
      { id: "b", text: "Many VMs in a scale set must share one identity with pre-configured permissions before the VMs exist", correct: true },
      { id: "c", text: "Only one resource will ever use the identity", correct: false },
      { id: "d", text: "The workload needs to authenticate users interactively", correct: false },
    ],
    explanation:
      "A user-assigned managed identity is a standalone Azure resource: you create it first, grant it permissions, then assign it to any number of resources — ideal for fleets that share one identity and for pre-provisioning permissions before resources exist. System-assigned is tied 1:1 to a resource and dies with it. Managed identities authenticate workloads, not interactive users.",
  },
  {
    id: "az305-igm-20",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "hard",
    type: "single",
    prompt:
      "A company needs to grant an operations team the ability to restart virtual machines in specific resource groups, but no existing built-in role matches (Contributor is too broad, Reader is too narrow). The permission set must be reusable across the company's 12 subscriptions, which all sit under one management group. What should you recommend?",
    choices: [
      { id: "a", text: "Create a custom RBAC role with Microsoft.Compute/virtualMachines/restart/action, with the management group as assignable scope", correct: true },
      { id: "b", text: "Assign Contributor at each resource group and document that only restart should be used", correct: false },
      { id: "c", text: "Create an Azure Policy with a restart effect", correct: false },
      { id: "d", text: "Add the team to the Virtual Machine Administrator Login role", correct: false },
    ],
    explanation:
      "Custom RBAC roles let you compose exactly the actions needed (here the restart action) and define assignable scopes — setting the management group as assignable scope makes the role usable in all 12 subscriptions. Over-granting Contributor violates least privilege, Azure Policy governs resource configuration (it has no restart effect), and VM Administrator Login controls OS sign-in, not the Azure restart operation.",
  },
  {
    id: "az305-igm-21",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "multi",
    prompt:
      "You are designing Key Vault protection for production secrets. A recent incident involved a departing employee deleting a vault. You must ensure deleted vaults and secrets are recoverable for 90 days and that nobody — including administrators — can permanently purge them during that window. Which two settings should you require? (Choose two.)",
    choices: [
      { id: "a", text: "Soft delete with a 90-day retention period", correct: true },
      { id: "b", text: "Purge protection", correct: true },
      { id: "c", text: "A CanNotDelete resource lock on each secret", correct: false },
      { id: "d", text: "Geo-replication of the vault", correct: false },
    ],
    explanation:
      "Soft delete keeps deleted vaults/objects recoverable for a configurable retention period (up to 90 days). Purge protection prevents anyone — even administrators — from permanently purging soft-deleted items until retention expires. Resource locks apply to Azure resources, not individual secrets inside a vault, and geo-replication is about availability, not delete protection.",
  },
  {
    id: "az305-igm-22",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company must collaborate with an external consulting firm. Consultants must use their own organizational credentials to access your Azure DevOps and SharePoint resources, and your team must not manage their passwords or lifecycle manually. What should you recommend?",
    choices: [
      { id: "a", text: "Create member accounts in your tenant for each consultant", correct: false },
      { id: "b", text: "Microsoft Entra B2B collaboration (guest users)", correct: true },
      { id: "c", text: "Microsoft Entra B2C", correct: false },
      { id: "d", text: "A site-to-site VPN to the consulting firm", correct: false },
    ],
    explanation:
      "Entra B2B invites external users as guests who authenticate with their home organization's credentials — you never manage their passwords, and their home org controls their lifecycle. Member accounts mean you own credential management (what you're avoiding). B2C is for customer-facing applications with social/local identities, not workforce collaboration. A VPN is network connectivity, not identity.",
  },
  {
    id: "az305-igm-23",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "A retailer is building a consumer mobile app where millions of customers should sign up and sign in using local email accounts or social identities such as Google and Facebook, with fully customizable branded sign-in pages. Which identity solution should you recommend?",
    choices: [
      { id: "a", text: "Microsoft Entra B2B", correct: false },
      { id: "b", text: "Microsoft Entra B2C", correct: true },
      { id: "c", text: "Microsoft Entra Domain Services", correct: false },
      { id: "d", text: "Active Directory Federation Services (AD FS)", correct: false },
    ],
    explanation:
      "Entra B2C is the customer identity and access management (CIAM) solution: it scales to millions of consumer identities, supports social and local accounts, and offers fully customizable user journeys and branding. B2B is for business partner collaboration in your workforce tenant, Entra Domain Services provides legacy domain services (LDAP/Kerberos), and AD FS is legacy on-premises federation.",
  },
  {
    id: "az305-igm-24",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "hard",
    type: "single",
    prompt:
      "You are migrating a legacy application to an Azure VM. The application requires domain join, LDAP reads, and Kerberos authentication, but the company does not want to deploy or manage domain controllers in Azure. What should you recommend?",
    choices: [
      { id: "a", text: "Microsoft Entra ID with seamless SSO", correct: false },
      { id: "b", text: "Microsoft Entra Domain Services", correct: true },
      { id: "c", text: "Microsoft Entra B2C", correct: false },
      { id: "d", text: "Extend on-premises AD DS with domain controller VMs in Azure", correct: false },
    ],
    explanation:
      "Entra Domain Services provides managed domain services — domain join, group policy, LDAP, Kerberos/NTLM — without deploying or patching domain controllers. Plain Entra ID doesn't speak Kerberos/LDAP for legacy apps. Deploying DC VMs works but violates the 'no domain controllers to manage' requirement. B2C is consumer identity.",
  },
  {
    id: "az305-igm-25",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "A company is synchronizing its on-premises Active Directory to Microsoft Entra ID. The design must allow users to sign in with the same password, keep working if the on-premises network is down, and enable Entra ID to detect leaked credentials. Which authentication method should you recommend?",
    choices: [
      { id: "a", text: "Pass-through authentication (PTA)", correct: false },
      { id: "b", text: "Federation with AD FS", correct: false },
      { id: "c", text: "Password hash synchronization (PHS)", correct: true },
      { id: "d", text: "Certificate-based authentication only", correct: false },
    ],
    explanation:
      "PHS syncs password hashes to Entra ID, so cloud authentication works even if on-premises is completely down, and it's what enables leaked-credential detection in Entra ID Protection. PTA and federation both depend on on-premises infrastructure being reachable at sign-in time — an on-premises outage breaks cloud sign-in. PHS is also Microsoft's recommended default for hybrid identity.",
  },
  {
    id: "az305-igm-26",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Remote employees must access an internal on-premises web application from the internet. The solution must not require inbound firewall ports to be opened, must pre-authenticate users with Microsoft Entra ID, and should support conditional access. What should you recommend?",
    choices: [
      { id: "a", text: "A point-to-site VPN for each employee", correct: false },
      { id: "b", text: "Microsoft Entra application proxy", correct: true },
      { id: "c", text: "Publishing the app through Azure Front Door", correct: false },
      { id: "d", text: "An NSG rule allowing HTTPS from the internet", correct: false },
    ],
    explanation:
      "Entra application proxy publishes on-premises web apps externally via an outbound-only connector — no inbound ports — with Entra pre-authentication and full conditional access support. VPNs grant network-level access and don't pre-authenticate at the app layer. Front Door fronts internet-reachable endpoints; it can't reach into a private network. Opening HTTPS inbound directly exposes the app.",
  },
  {
    id: "az305-igm-27",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your security team requires that access to the Azure portal be blocked for all users connecting from outside specific countries, with an exception for the break-glass account. Which feature should the design use?",
    choices: [
      { id: "a", text: "Azure Policy with a location condition", correct: false },
      { id: "b", text: "Conditional access with named locations", correct: true },
      { id: "c", text: "NSG rules based on country IP ranges", correct: false },
      { id: "d", text: "Microsoft Entra ID Protection sign-in risk policy", correct: false },
    ],
    explanation:
      "Conditional access named locations define country/IP-based locations that policies can include or exclude; the policy targets the Azure portal app, blocks non-approved locations, and excludes the break-glass account. Azure Policy governs resources, not sign-ins. NSGs filter network traffic to your resources, not Entra authentication. Sign-in risk policies react to detected risk, not fixed geography rules.",
  },
  {
    id: "az305-igm-28",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "multi",
    prompt:
      "You must design privileged access for the subscription so that admin roles are only active when needed, all activations require approval and MFA, and unused role eligibility is removed automatically over time. Which two features should the design combine? (Choose two.)",
    choices: [
      { id: "a", text: "PIM role eligibility with activation requiring approval and MFA", correct: true },
      { id: "b", text: "Recurring access reviews of privileged roles", correct: true },
      { id: "c", text: "Permanent Owner assignments with strong passwords", correct: false },
      { id: "d", text: "A ReadOnly lock on the subscription", correct: false },
    ],
    explanation:
      "PIM makes roles eligible instead of permanently active, with activation gated by approval and MFA (just-in-time access). Recurring access reviews automatically remove eligibility from users who no longer need it. Permanent Owner assignments are the anti-pattern PIM replaces, and resource locks protect resources from changes — they don't govern role assignments.",
  },
  {
    id: "az305-igm-29",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "hard",
    type: "single",
    prompt:
      "External partners regularly need a bundle of access — two groups, one enterprise app, and a SharePoint site — for 90-day project engagements. Access must be requestable via self-service, approved by a project sponsor, and expire automatically. What should you recommend?",
    choices: [
      { id: "a", text: "Entitlement management access packages", correct: true },
      { id: "b", text: "Manually adding guests to each resource per project", correct: false },
      { id: "c", text: "Dynamic groups keyed on a partner attribute", correct: false },
      { id: "d", text: "Conditional access with sign-in frequency of 90 days", correct: false },
    ],
    explanation:
      "Entitlement management bundles groups, apps, and SharePoint sites into an access package with self-service requests, approval workflows, and automatic expiration — exactly the repeatable, time-boxed external access lifecycle described. Manual assignment doesn't scale or expire, dynamic groups don't do approval or expiry, and sign-in frequency controls re-authentication, not access lifecycle.",
  },
  {
    id: "az305-igm-30",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "You are designing monitoring for a business-critical API hosted in Azure App Service. The operations team must be alerted when the API becomes unreachable from multiple geographic locations, and they need end-to-end distributed traces to diagnose slow dependencies. Which service should be at the core of the design?",
    choices: [
      { id: "a", text: "Azure Service Health", correct: false },
      { id: "b", text: "Application Insights (availability tests + distributed tracing)", correct: true },
      { id: "c", text: "Azure Advisor", correct: false },
      { id: "d", text: "Network Watcher", correct: false },
    ],
    explanation:
      "Application Insights availability tests probe your endpoint from multiple Azure locations and alert on failures, while its distributed tracing (application map, end-to-end transaction views) shows exactly which downstream dependency is slow. Service Health reports Azure platform issues (not your app's reachability), Advisor gives recommendations, and Network Watcher diagnoses network-level issues, not application transactions.",
  },
  {
    id: "az305-igm-31",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "A Log Analytics workspace ingests large volumes of verbose debug logs that are queried only during incident investigations, plus critical security logs queried constantly. You must minimize ingestion cost for the debug logs while keeping full KQL analytics on the security logs. What should you recommend?",
    choices: [
      { id: "a", text: "Send debug logs to Basic/Auxiliary table plans and keep security logs on the Analytics plan", correct: true },
      { id: "b", text: "Shorten the workspace retention to 7 days for everything", correct: false },
      { id: "c", text: "Send everything to a storage account and query with AzCopy", correct: false },
      { id: "d", text: "Create a second workspace in a cheaper region", correct: false },
    ],
    explanation:
      "Log Analytics table plans let you mix tiers in one workspace: Basic/Auxiliary plans have much lower ingestion cost with limited query capability (fine for rarely queried debug logs), while the Analytics plan keeps full KQL power for the security tables. Cutting retention doesn't reduce ingestion cost (the dominant cost), storage accounts aren't queryable with KQL, and region choice barely moves the price.",
  },
  {
    id: "az305-igm-32",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Compliance requires Azure Activity Log events to be retained for 3 years and be queryable. By default, how long does Azure retain Activity Log data, and what should you recommend?",
    choices: [
      { id: "a", text: "90 days by default; create a diagnostic setting to send the Activity Log to a Log Analytics workspace with extended retention/archive", correct: true },
      { id: "b", text: "1 year by default; nothing further is required", correct: false },
      { id: "c", text: "30 days by default; export to Event Hubs and retain there for 3 years", correct: false },
      { id: "d", text: "Indefinitely by default", correct: false },
    ],
    explanation:
      "The Activity Log is retained for 90 days by default. For 3-year queryable retention, create a diagnostic setting that routes it to a Log Analytics workspace and configure long-term retention/archive there. Event Hubs is a streaming pipe with days of retention, not an archive, and default retention is neither 1 year nor indefinite.",
  },
  {
    id: "az305-igm-33",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "easy",
    type: "single",
    prompt:
      "An alert rule for CPU over 90% must notify the on-call team by SMS and trigger an Azure Function to auto-remediate, and the same notification set will be reused by dozens of other alert rules. Which Azure Monitor component holds the notification and action configuration?",
    choices: [
      { id: "a", text: "An action group", correct: true },
      { id: "b", text: "A diagnostic setting", correct: false },
      { id: "c", text: "A data collection rule", correct: false },
      { id: "d", text: "A workbook", correct: false },
    ],
    explanation:
      "Action groups are reusable collections of notification preferences (SMS, email, push, voice) and actions (Functions, Logic Apps, webhooks, ITSM, runbooks) referenced by any number of alert rules. Diagnostic settings route platform logs, data collection rules define what agents collect, and workbooks are interactive reports.",
  },
  {
    id: "az305-igm-34",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "A metric alert on a seasonal e-commerce workload keeps false-alarming during nightly low-traffic periods when static thresholds are used. The team wants alerting that learns the workload's historical patterns. What should you recommend?",
    choices: [
      { id: "a", text: "Dynamic thresholds on the metric alert rule", correct: true },
      { id: "b", text: "A log search alert with a fixed count", correct: false },
      { id: "c", text: "Duplicate alert rules per time-of-day", correct: false },
      { id: "d", text: "Increasing the static threshold to 99%", correct: false },
    ],
    explanation:
      "Dynamic thresholds use machine learning over the metric's historical behavior — including seasonality — to compute an expected band and alert on deviations, eliminating time-of-day false alarms. Fixed-count log alerts and higher static thresholds still ignore seasonality, and per-time-of-day rule duplication is brittle maintenance overhead.",
  },
  {
    id: "az305-igm-35",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "You need to enforce that every new resource is deployed only to the West Europe region, and existing non-compliant resources should be identified but not deleted. Which Azure Policy design accomplishes this?",
    choices: [
      { id: "a", text: "A policy with the Deny effect for new deployments; existing resources are reported as non-compliant automatically", correct: true },
      { id: "b", text: "A policy with the DeleteIfNotExists effect", correct: false },
      { id: "c", text: "An RBAC deny assignment scoped to other regions", correct: false },
      { id: "d", text: "A ReadOnly lock on all resource groups", correct: false },
    ],
    explanation:
      "A Deny policy on allowed locations blocks new non-compliant deployments, and Azure Policy automatically evaluates and flags existing resources as non-compliant in compliance reports — it never deletes them. DeleteIfNotExists doesn't exist as an effect, RBAC controls who can act (not where resources go), and locks block all changes rather than enforcing location.",
  },
  {
    id: "az305-igm-36",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "hard",
    type: "single",
    prompt:
      "Every VM in the subscription must have the Azure Monitor Agent installed automatically, including VMs created in the future, without any manual step. Which Azure Policy effect should the design use?",
    choices: [
      { id: "a", text: "Deny", correct: false },
      { id: "b", text: "Audit", correct: false },
      { id: "c", text: "DeployIfNotExists with a remediation task", correct: true },
      { id: "d", text: "Append", correct: false },
    ],
    explanation:
      "DeployIfNotExists deploys the specified resource (the AMA extension) when it's missing — new VMs get it automatically at creation, and a remediation task retrofits existing VMs. Deny blocks deployments, Audit only reports, and Append adds properties to a resource during creation (like tags or IP rules), not sub-resource deployments.",
  },
  {
    id: "az305-igm-37",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Department heads must be notified before their Azure spending exceeds monthly limits, and the finance team wants forecasted overspend alerts too — without any resources being shut down automatically. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Cost Management budgets with actual and forecasted alert thresholds tied to action groups", correct: true },
      { id: "b", text: "An Azure Policy that denies deployments after the limit is reached", correct: false },
      { id: "c", text: "Resource locks applied when spend is high", correct: false },
      { id: "d", text: "Azure Advisor cost recommendations", correct: false },
    ],
    explanation:
      "Budgets in Cost Management alert on actual and forecasted spend at configurable thresholds via action groups — they notify without taking destructive action. Budgets don't stop resources by themselves, which matches the requirement. Policy/locks would block work rather than warn, and Advisor recommends optimizations but has no threshold alerting.",
  },
  {
    id: "az305-igm-38",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your CISO wants a consolidated view of the security posture of all Azure subscriptions, measured against regulatory standards like PCI DSS and ISO 27001, with prioritized hardening recommendations. Which service provides this?",
    choices: [
      { id: "a", text: "Microsoft Sentinel", correct: false },
      { id: "b", text: "Microsoft Defender for Cloud (secure score + regulatory compliance dashboard)", correct: true },
      { id: "c", text: "Azure Monitor", correct: false },
      { id: "d", text: "Microsoft Entra ID Protection", correct: false },
    ],
    explanation:
      "Defender for Cloud is the cloud security posture management (CSPM) service: secure score quantifies posture, the regulatory compliance dashboard maps your environment against standards like PCI DSS/ISO 27001, and recommendations prioritize hardening. Sentinel is the SIEM/SOAR for threat detection and response, Monitor is observability, and ID Protection covers identity risk only.",
  },
  {
    id: "az305-igm-39",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "A security operations center needs to collect security events from Azure, Microsoft 365, AWS, and on-premises firewalls into one place, correlate them with built-in analytics and threat intelligence, and run automated response playbooks. What should you recommend?",
    choices: [
      { id: "a", text: "Microsoft Defender for Cloud", correct: false },
      { id: "b", text: "Azure Monitor alerts with action groups", correct: false },
      { id: "c", text: "Microsoft Sentinel", correct: true },
      { id: "d", text: "Azure Event Grid", correct: false },
    ],
    explanation:
      "Sentinel is the cloud-native SIEM/SOAR: connectors ingest from Azure, M365, AWS, and syslog/CEF sources; analytics rules and threat intelligence correlate incidents; and playbooks (Logic Apps) automate response. Defender for Cloud is posture management and workload protection, Monitor alerts lack cross-source correlation and SOAR, and Event Grid is an event router.",
  },
  {
    id: "az305-igm-40",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "hard",
    type: "single",
    prompt:
      "Application teams must query only the monitoring logs of resources they own, which live in a centralized Log Analytics workspace shared by the whole company. You want to avoid creating separate workspaces. What should you recommend?",
    choices: [
      { id: "a", text: "Resource-context access: grant teams read access on their resources and let them query logs scoped to those resources", correct: true },
      { id: "b", text: "Grant all teams the Log Analytics Reader role on the workspace", correct: false },
      { id: "c", text: "Export each team's logs nightly to team-owned storage accounts", correct: false },
      { id: "d", text: "Give teams the workspace key", correct: false },
    ],
    explanation:
      "Resource-context RBAC means users with read access to a resource can query that resource's logs in the central workspace without workspace-level rights — logs are automatically filtered to their resources. Log Analytics Reader on the workspace exposes everyone's logs. Nightly exports add cost and lag, and workspace keys are for agent ingestion, not user queries.",
  },
  {
    id: "az305-igm-41",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "easy",
    type: "single",
    prompt:
      "The operations team wants proactive notification when Azure itself has an outage, planned maintenance, or health advisories affecting the specific regions and services your company uses. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Service Health alerts scoped to your subscriptions, services, and regions", correct: true },
      { id: "b", text: "Application Insights availability tests", correct: false },
      { id: "c", text: "The Azure status page checked manually", correct: false },
      { id: "d", text: "Resource health on each VM blade", correct: false },
    ],
    explanation:
      "Service Health provides a personalized view of Azure platform incidents, planned maintenance, and advisories for exactly the services/regions you use, and its alerts push notifications through action groups. Availability tests monitor your app (not the platform), the status page is global and manual, and per-resource health blades don't proactively notify.",
  },
  {
    id: "az305-igm-42",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "multi",
    prompt:
      "You are designing emergency (break-glass) access for a Microsoft Entra tenant. Which two practices should the design include? (Choose two.)",
    choices: [
      { id: "a", text: "Cloud-only accounts excluded from conditional access policies and MFA requirements that could lock them out", correct: true },
      { id: "b", text: "Monitoring and alerting on any sign-in by the break-glass accounts", correct: true },
      { id: "c", text: "Synchronizing break-glass accounts from on-premises AD", correct: false },
      { id: "d", text: "Sharing the break-glass credentials with all Global Administrators", correct: false },
    ],
    explanation:
      "Break-glass accounts must be cloud-only (so an on-premises or federation outage can't lock them out) and excluded from conditional access/MFA policies that could block emergency use — with sign-ins monitored and alerted since use should be rare and audited. Syncing from AD reintroduces the dependency you're protecting against, and credential sharing destroys accountability.",
  },
  {
    id: "az305-igm-43",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "A company wants users to register for self-service password reset and MFA in one combined experience, and requires that password changes made in the cloud flow back to on-premises Active Directory. Which feature must be enabled for the write-back requirement?",
    choices: [
      { id: "a", text: "Password writeback in Microsoft Entra Connect", correct: true },
      { id: "b", text: "Password hash synchronization", correct: false },
      { id: "c", text: "Seamless SSO", correct: false },
      { id: "d", text: "Group writeback", correct: false },
    ],
    explanation:
      "Password writeback (an Entra Connect / cloud sync capability) writes cloud password changes and resets back to on-premises AD in real time — required for SSPR in hybrid environments. PHS flows passwords the other direction (on-premises to cloud), seamless SSO is about silent sign-in on domain-joined devices, and group writeback handles groups, not passwords.",
  },
  {
    id: "az305-igm-44",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Auditors require an immutable, tamper-proof record proving who approved and activated privileged roles over the past year. Where does the design get this data, and how should it be retained?",
    choices: [
      { id: "a", text: "Microsoft Entra audit logs (including PIM events), routed via diagnostic settings to a Log Analytics workspace or immutable storage for long-term retention", correct: true },
      { id: "b", text: "The Azure Activity Log alone, which keeps PIM data for one year", correct: false },
      { id: "c", text: "Screenshots of the PIM portal taken monthly", correct: false },
      { id: "d", text: "Sign-in logs, which include approvals by default", correct: false },
    ],
    explanation:
      "PIM activations and approvals land in the Entra audit logs, which retain data for a limited period by default (30 days at P2), so long-term/audit needs require routing them via diagnostic settings to Log Analytics or to immutable storage. The Azure Activity Log covers ARM operations, not Entra role activations; sign-in logs record authentications, not approvals.",
  },
  {
    id: "az305-igm-45",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your organization has three environments — production, staging, and development — in separate subscriptions. Governance requires stricter policies in production and looser ones in development, with common baseline policies everywhere. Which management group design should you recommend?",
    choices: [
      { id: "a", text: "One management group per environment under a shared parent that holds the baseline policies", correct: true },
      { id: "b", text: "One management group containing all three subscriptions with all policies assigned to it", correct: false },
      { id: "c", text: "No management groups; assign every policy per subscription", correct: false },
      { id: "d", text: "One management group per region", correct: false },
    ],
    explanation:
      "A parent group carries the baseline policies (inherited by all), and child groups per environment layer on stricter production policies and looser development ones. A single group can't differentiate environments, per-subscription assignment duplicates effort, and regions are irrelevant to this policy hierarchy.",
  },
  {
    id: "az305-igm-46",
    objective: "1.0-identity-governance-monitoring",
    difficulty: "hard",
    type: "single",
    prompt:
      "An AKS-hosted microservice must authenticate to Azure Key Vault and Azure Storage without any stored secrets. The platform team wants the Kubernetes-native approach currently recommended by Microsoft. What should you recommend?",
    choices: [
      { id: "a", text: "Storing a service principal secret in a Kubernetes secret", correct: false },
      { id: "b", text: "Microsoft Entra Workload ID (federated identity between the Kubernetes service account and a managed identity)", correct: true },
      { id: "c", text: "Enabling anonymous access on the storage account", correct: false },
      { id: "d", text: "Hardcoding a SAS token in the container image", correct: false },
    ],
    explanation:
      "Entra Workload ID federates a Kubernetes service account with a user-assigned managed identity via OIDC — pods exchange their service account token for Entra tokens, with no stored secrets anywhere. It replaces the deprecated pod-identity approach. Service principal secrets in K8s secrets are exactly the stored-credential problem, and anonymous access/hardcoded SAS destroy security.",
  },
  // ── Blueprint rebalance: Infrastructure ────────────────────────
  {
    id: "az305-infra-20",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "A team is deploying a containerized microservices application. They want event-driven autoscaling (including scale to zero), built-in Dapr integration for service-to-service calls, and no Kubernetes cluster to manage. Which compute service should you recommend?",
    choices: [
      { id: "a", text: "Azure Kubernetes Service (AKS)", correct: false },
      { id: "b", text: "Azure Container Apps", correct: true },
      { id: "c", text: "Azure Container Instances (ACI)", correct: false },
      { id: "d", text: "App Service for Containers", correct: false },
    ],
    explanation:
      "Container Apps is the serverless container platform built on Kubernetes/KEDA/Dapr — event-driven scaling with scale-to-zero and native Dapr support, without exposing the cluster to you. AKS gives full Kubernetes control but you manage the cluster. ACI runs single container groups without orchestration or KEDA scaling. App Service scales web workloads but has no Dapr/KEDA model.",
  },
  {
    id: "az305-infra-21",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "A nightly job needs to run one container for about 20 minutes to process a file, then stop. There is no orchestration requirement, and cost must be minimal — paying only for the seconds the container runs. What should you recommend?",
    choices: [
      { id: "a", text: "An AKS cluster with one node pool", correct: false },
      { id: "b", text: "Azure Container Instances (ACI)", correct: true },
      { id: "c", text: "A dedicated D-series VM running Docker", correct: false },
      { id: "d", text: "App Service Premium plan", correct: false },
    ],
    explanation:
      "ACI is per-second billed, serverless container execution with no cluster or VM to keep running — perfect for short-lived, simple container tasks. AKS and a dedicated VM both bill for idle infrastructure around the 20-minute window, and an App Service plan runs continuously.",
  },
  {
    id: "az305-infra-22",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "An Azure Functions app must access resources inside a virtual network, must never experience cold starts, and needs to run beyond the 10-minute execution limit of the Consumption plan. Which hosting plan should you recommend?",
    choices: [
      { id: "a", text: "Consumption plan", correct: false },
      { id: "b", text: "Functions Premium (Elastic Premium) plan", correct: true },
      { id: "c", text: "Free App Service plan", correct: false },
      { id: "d", text: "Azure Container Instances", correct: false },
    ],
    explanation:
      "The Premium plan provides VNet integration, pre-warmed instances that eliminate cold starts, and much longer (effectively unbounded) execution durations, while still scaling elastically. The Consumption plan has cold starts, a 10-minute cap, and no VNet integration. Free App Service plans don't support these features, and ACI isn't a Functions hosting plan.",
  },
  {
    id: "az305-infra-23",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "A workflow implemented in Azure Functions must chain several functions: the output of one feeds the next (function chaining), a fan-out/fan-in step processes items in parallel, and the workflow must survive process recycles while waiting days for human approval. What should you recommend?",
    choices: [
      { id: "a", text: "Durable Functions", correct: true },
      { id: "b", text: "A timer-triggered function polling a database", correct: false },
      { id: "c", text: "Stateless functions passing data via query strings", correct: false },
      { id: "d", text: "WebJobs on an App Service plan", correct: false },
    ],
    explanation:
      "Durable Functions adds stateful orchestrations to Functions: function chaining, fan-out/fan-in, and human-interaction patterns with durable timers that survive restarts and can wait days. Polling and query-string state are fragile workarounds, and WebJobs lack the orchestration/checkpointing model.",
  },
  {
    id: "az305-infra-24",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "A business process must integrate SaaS systems (Salesforce, Office 365, SAP) with conditional approval steps. The integration team prefers a visual designer with hundreds of prebuilt connectors and minimal custom code. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Functions", correct: false },
      { id: "b", text: "Azure Logic Apps", correct: true },
      { id: "c", text: "Azure Event Grid", correct: false },
      { id: "d", text: "Azure Service Bus", correct: false },
    ],
    explanation:
      "Logic Apps is the designer-first integration service with 1,000+ connectors (Salesforce, Office 365, SAP), approval actions, and conditional control flow — code-light by design. Functions is code-first, Event Grid routes events but has no workflow/connectors, and Service Bus is messaging transport.",
  },
  {
    id: "az305-infra-25",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your company exposes 30 internal REST APIs to external partners. The design must add per-partner rate limiting, subscription keys, request/response transformation, and a developer portal with API documentation — without changing the backend APIs. What should you recommend?",
    choices: [
      { id: "a", text: "Azure API Management", correct: true },
      { id: "b", text: "Azure Application Gateway", correct: false },
      { id: "c", text: "Azure Front Door", correct: false },
      { id: "d", text: "Azure Load Balancer", correct: false },
    ],
    explanation:
      "API Management is the API façade layer: policies handle rate limiting/quotas per subscription key, inbound/outbound transformation, and it ships a developer portal with interactive docs. Application Gateway and Front Door route and protect HTTP traffic but have no API products, keys, quotas, or portal; Load Balancer is layer 4.",
  },
  {
    id: "az305-infra-26",
    objective: "4.0-infrastructure",
    difficulty: "hard",
    type: "single",
    prompt:
      "A global HTTP application runs in three Azure regions. You need a single anycast entry point with TLS termination at Microsoft edge locations, URL-path-based routing, WAF protection, and automatic failover between regions with the lowest possible latency for users worldwide. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Traffic Manager", correct: false },
      { id: "b", text: "Azure Front Door (with WAF policy)", correct: true },
      { id: "c", text: "One Application Gateway per region with DNS round-robin", correct: false },
      { id: "d", text: "Azure Load Balancer (Standard, global tier)", correct: false },
    ],
    explanation:
      "Front Door is the global layer 7 entry point: anycast at Microsoft edge, TLS offload, path-based routing, integrated WAF, and health-probe-driven regional failover with latency-based routing. Traffic Manager is DNS-only (no TLS termination or WAF), per-region App Gateways with DNS round-robin lack edge acceleration and unified failover, and global Load Balancer is layer 4.",
  },
  {
    id: "az305-infra-27",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "You must choose a load-balancing service for a non-HTTP workload: TCP traffic on port 1433 to a group of VMs within one region, with ultra-low latency and port forwarding. Which service fits?",
    choices: [
      { id: "a", text: "Azure Application Gateway", correct: false },
      { id: "b", text: "Azure Front Door", correct: false },
      { id: "c", text: "Azure Load Balancer (Standard)", correct: true },
      { id: "d", text: "Azure Traffic Manager", correct: false },
    ],
    explanation:
      "Azure Load Balancer is the layer 4 (TCP/UDP) regional load balancer — pass-through, ultra-low latency, port forwarding, ideal for non-HTTP protocols like SQL on 1433. Application Gateway and Front Door only handle HTTP/HTTPS (layer 7), and Traffic Manager is DNS-based global routing, not a data-path balancer.",
  },
  {
    id: "az305-infra-28",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "A company connects its datacenter to Azure. Requirements: predictable latency, a connection SLA, bandwidth up to 10 Gbps, and traffic must not traverse the public internet. Cost is secondary. What should you recommend?",
    choices: [
      { id: "a", text: "Site-to-site VPN over the internet", correct: false },
      { id: "b", text: "ExpressRoute", correct: true },
      { id: "c", text: "Point-to-site VPN", correct: false },
      { id: "d", text: "Azure Bastion", correct: false },
    ],
    explanation:
      "ExpressRoute is a private circuit through a connectivity provider: it bypasses the public internet, offers an SLA, predictable latency, and bandwidths up to 10 Gbps (100 Gbps with Direct). S2S VPN rides the public internet (no latency SLA), P2S is per-device, and Bastion is browser-based VM access, not connectivity between networks.",
  },
  {
    id: "az305-infra-29",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "Your network design has 25 spoke VNets that all need shared services (firewall, DNS, ExpressRoute gateway) from a central VNet, with spokes isolated from each other by default. Which topology should you recommend?",
    choices: [
      { id: "a", text: "Full mesh peering between all 25 VNets", correct: false },
      { id: "b", text: "Hub-and-spoke topology with VNet peering to a central hub", correct: true },
      { id: "c", text: "One giant VNet with 25 subnets", correct: false },
      { id: "d", text: "Site-to-site VPNs between every VNet pair", correct: false },
    ],
    explanation:
      "Hub-and-spoke centralizes shared services (firewall, gateways, DNS) in a hub VNet, with each spoke peered only to the hub — spokes are isolated from one another by default since peering isn't transitive. Full mesh is 300 peerings of unmanageable sprawl, one giant VNet destroys isolation and subscription boundaries, and VPNs between VNets add cost and latency over native peering.",
  },
  {
    id: "az305-infra-30",
    objective: "4.0-infrastructure",
    difficulty: "hard",
    type: "single",
    prompt:
      "A global company has 60 branch offices that need connectivity to Azure and to each other, mixing SD-WAN, VPN, and ExpressRoute. Managing individual hub VNets and gateways has become unmanageable. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Virtual WAN", correct: true },
      { id: "b", text: "One VPN gateway per branch VNet", correct: false },
      { id: "c", text: "Azure Front Door", correct: false },
      { id: "d", text: "Peering every branch VNet to every other", correct: false },
    ],
    explanation:
      "Virtual WAN is the managed global transit network: Microsoft-managed hubs per region, unified branch connectivity (VPN, ExpressRoute, SD-WAN partners), branch-to-branch and branch-to-VNet routing at scale. Manual per-branch gateways is exactly the operational burden being escaped, Front Door is for HTTP apps, and mesh peering doesn't connect on-premises branches at all.",
  },
  {
    id: "az305-infra-31",
    objective: "4.0-infrastructure",
    difficulty: "hard",
    type: "single",
    prompt:
      "An Azure SQL Database must be reachable only from your VNet via a private IP address, with no exposure on any public endpoint, and on-premises clients connected via ExpressRoute private peering must also reach it. What should you recommend?",
    choices: [
      { id: "a", text: "A virtual network service endpoint for Microsoft.Sql", correct: false },
      { id: "b", text: "A private endpoint (Private Link) for the SQL server with public network access disabled", correct: true },
      { id: "c", text: "A firewall rule allowing the VNet's IP range", correct: false },
      { id: "d", text: "An NSG on the SQL Database", correct: false },
    ],
    explanation:
      "A private endpoint gives the SQL server a private IP inside your VNet, works from on-premises over ExpressRoute private peering, and lets you disable public network access entirely. Service endpoints keep traffic on the Azure backbone but the resource still resolves to a public endpoint and they don't work from on-premises. Firewall rules still use the public endpoint, and you can't attach NSGs to a PaaS database.",
  },
  {
    id: "az305-infra-32",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "After creating private endpoints for several PaaS services, applications inside the VNet still resolve the services to their public IP addresses. What must the design include so the private IPs are returned inside the VNet?",
    choices: [
      { id: "a", text: "Azure Private DNS zones (e.g., privatelink.database.windows.net) linked to the VNet", correct: true },
      { id: "b", text: "Custom hosts file entries on every VM", correct: false },
      { id: "c", text: "A public DNS CNAME change", correct: false },
      { id: "d", text: "An NSG rule redirecting DNS", correct: false },
    ],
    explanation:
      "Private endpoints rely on privatelink.* Private DNS zones linked to the VNet so name resolution returns the private IP inside the network while the public name keeps working externally. Hosts files don't scale and break on IP changes, public DNS changes would affect everyone, and NSGs filter traffic — they can't rewrite DNS answers.",
  },
  {
    id: "az305-infra-33",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "VMs in a subnet make massive numbers of outbound connections to internet APIs and suffer SNAT port exhaustion. The design must provide scalable, predictable outbound connectivity with a static egress IP range. What should you recommend?",
    choices: [
      { id: "a", text: "An Azure Load Balancer with default outbound rules", correct: false },
      { id: "b", text: "NAT Gateway (Azure Virtual Network NAT) with public IP prefixes", correct: true },
      { id: "c", text: "Instance-level public IPs on every VM", correct: false },
      { id: "d", text: "Increasing the VM size", correct: false },
    ],
    explanation:
      "Azure NAT Gateway is the purpose-built answer: it provides on-demand SNAT port allocation at massive scale, static predictable egress via public IP prefixes, and attaches to the subnet. Load Balancer outbound rules pre-allocate a fixed SNAT port budget per VM, which is exactly what exhausts under heavy egress. Per-VM public IPs multiply attack surface and management, and VM size doesn't change SNAT allocation.",
  },
  {
    id: "az305-infra-34",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "Security requires centralized, FQDN-based outbound filtering (e.g., allow *.microsoft.com), threat-intelligence-based blocking, and forced tunneling of all spoke VNet egress through one inspection point. NSGs alone cannot do this. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Firewall in the hub VNet with user-defined routes from the spokes", correct: true },
      { id: "b", text: "More granular NSG rules on every subnet", correct: false },
      { id: "c", text: "Azure DDoS Protection", correct: false },
      { id: "d", text: "Web Application Firewall on Application Gateway", correct: false },
    ],
    explanation:
      "Azure Firewall is the managed stateful firewall with FQDN/application rules, threat-intelligence filtering, and centralized egress when spokes' UDRs point 0.0.0.0/0 at it in the hub. NSGs match IP/port/tag only — no FQDN or TI. DDoS Protection defends against volumetric inbound attacks, and WAF inspects inbound HTTP to your apps, not general egress.",
  },
  {
    id: "az305-infra-35",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "Administrators need RDP/SSH access to production VMs. Security prohibits public IPs on VMs and requires access through the Azure portal over TLS without managing jump-box VMs. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Bastion", correct: true },
      { id: "b", text: "Public IPs with NSG source restrictions", correct: false },
      { id: "c", text: "A self-managed jump-box VM with a public IP", correct: false },
      { id: "d", text: "Azure Front Door", correct: false },
    ],
    explanation:
      "Bastion is the managed jump service: browser-based (or native client) RDP/SSH over TLS 443 via the portal, with VMs keeping only private IPs. Public IPs with NSG restrictions still expose RDP/SSH to the internet, a self-managed jump box is the management burden being avoided, and Front Door is for HTTP applications.",
  },
  {
    id: "az305-infra-36",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "A fault-tolerant rendering farm can checkpoint and resume work at any time. The company wants the deepest possible compute discount and accepts that Azure may reclaim the capacity with 30 seconds' notice. Which option should you recommend?",
    choices: [
      { id: "a", text: "Reserved instances (3-year)", correct: false },
      { id: "b", text: "Azure Spot VMs in a VM scale set", correct: true },
      { id: "c", text: "Azure Dedicated Host", correct: false },
      { id: "d", text: "Pay-as-you-go VMs", correct: false },
    ],
    explanation:
      "Spot VMs offer up to ~90% discounts on unused capacity in exchange for eviction on 30 seconds' notice — a perfect match for interruptible, checkpointing batch/render workloads, especially in a scale set that replenishes evicted instances. Reservations discount steady-state committed usage, Dedicated Host is for isolation/compliance, and PAYG has no discount.",
  },
  {
    id: "az305-infra-37",
    objective: "4.0-infrastructure",
    difficulty: "hard",
    type: "single",
    prompt:
      "A company runs a steady 24/7 production workload on D-series VMs and wants the largest cost reduction, but finance wants flexibility to change VM sizes and regions over the commitment period. Which purchasing option should you recommend?",
    choices: [
      { id: "a", text: "Reserved VM instances for a specific size and region", correct: false },
      { id: "b", text: "An Azure savings plan for compute", correct: true },
      { id: "c", text: "Spot VMs", correct: false },
      { id: "d", text: "Azure Hybrid Benefit alone", correct: false },
    ],
    explanation:
      "Savings plans commit to an hourly spend for 1 or 3 years and apply across VM sizes, families, and regions — the flexibility finance asked for, with discounts approaching (though usually slightly below) reservations. Reservations lock size/region for the deepest discount but no flexibility. Spot is for interruptible workloads, and Hybrid Benefit only removes the Windows/SQL license cost — it's complementary, not the commitment discount.",
  },
  {
    id: "az305-infra-38",
    objective: "4.0-infrastructure",
    difficulty: "hard",
    type: "single",
    prompt:
      "An order-processing system requires messages for the same order to be processed strictly in the order they were sent, one at a time, while orders themselves process in parallel. Duplicate submissions must also be detected automatically. Which messaging design should you recommend?",
    choices: [
      { id: "a", text: "Azure Service Bus queues with sessions (session ID = order ID) and duplicate detection", correct: true },
      { id: "b", text: "Azure Queue Storage with multiple consumers", correct: false },
      { id: "c", text: "Azure Event Grid with retry policies", correct: false },
      { id: "d", text: "Azure Event Hubs with a random partition key", correct: false },
    ],
    explanation:
      "Service Bus sessions guarantee FIFO ordered, exclusive processing of all messages sharing a session ID (the order ID), while different sessions process in parallel — and Service Bus offers built-in duplicate detection. Queue Storage has no ordering guarantee or dedup, Event Grid is push-based eventing without FIFO, and a random Event Hubs partition key explicitly destroys per-order ordering.",
  },
  {
    id: "az305-infra-39",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "You are designing an AKS cluster for production. The design must keep system pods isolated from application workloads, and must automatically add nodes when pods can't be scheduled and remove them when unneeded. Which two-part configuration should you recommend?",
    choices: [
      { id: "a", text: "A single node pool with manual scaling", correct: false },
      { id: "b", text: "Separate system and user node pools, with the cluster autoscaler enabled", correct: true },
      { id: "c", text: "One large node pool with the horizontal pod autoscaler only", correct: false },
      { id: "d", text: "Virtual nodes only", correct: false },
    ],
    explanation:
      "Dedicated system node pools isolate critical system pods (CoreDNS, metrics-server) from application workloads in user pools, and the cluster autoscaler adds/removes nodes based on pending pods. The HPA scales pods, not nodes — it can't fix unschedulable pods when nodes are full. Virtual nodes (ACI burst) complement but don't replace node pool design.",
  },
  {
    id: "az305-infra-40",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "A marketing site is a pre-rendered JavaScript single-page application with a small serverless API. The team wants global static content hosting, integrated CI/CD from GitHub, free TLS certificates, and managed API integration — with minimal cost and zero servers to manage. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Static Web Apps", correct: true },
      { id: "b", text: "AKS with an NGINX ingress", correct: false },
      { id: "c", text: "A Windows VM running IIS", correct: false },
      { id: "d", text: "Azure App Service Premium v3", correct: false },
    ],
    explanation:
      "Static Web Apps is purpose-built for SPAs: globally distributed static hosting, GitHub Actions CI/CD out of the box, free certificates, and integrated Azure Functions APIs — on a free or low-cost tier. AKS and IIS VMs are radically over-provisioned for static content, and full App Service costs more than needed for a static site with a small API.",
  },
  {
    id: "az305-infra-41",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "A solution must react to blob-created events in a storage account by invoking an Azure Function within seconds. Requirements: push delivery (no polling), pay only per event, and support for filtering events by blob path prefix. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Event Grid with a subscription filtered on the blob path", correct: true },
      { id: "b", text: "A timer-triggered Function that lists the container each minute", correct: false },
      { id: "c", text: "Azure Event Hubs", correct: false },
      { id: "d", text: "Azure Service Bus topics", correct: false },
    ],
    explanation:
      "Event Grid natively publishes Blob Storage events (BlobCreated), pushes to Function handlers in near real time, bills per operation, and supports subject/prefix filtering (e.g., only /container/uploads/). Polling with a timer adds latency and wasted list transactions. Event Hubs is stream ingestion (your app would have to produce events), and Service Bus doesn't natively receive storage events.",
  },
  {
    id: "az305-infra-42",
    objective: "4.0-infrastructure",
    difficulty: "hard",
    type: "single",
    prompt:
      "A trading platform ingests two million telemetry events per second from market feeds. Events must be retained for 24 hours so multiple independent consumer groups can replay the stream from any offset. Which service is designed for this?",
    choices: [
      { id: "a", text: "Azure Service Bus queues", correct: false },
      { id: "b", text: "Azure Event Hubs", correct: true },
      { id: "c", text: "Azure Event Grid", correct: false },
      { id: "d", text: "Azure Queue Storage", correct: false },
    ],
    explanation:
      "Event Hubs is the big-data streaming platform: millions of events per second, partitioned log with time-based retention, offset-based replay, and independent consumer groups. Service Bus and Queue Storage are destructive-read message queues (no replay), and Event Grid is discrete event routing, not a high-throughput retained stream.",
  },
  {
    id: "az305-infra-43",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "A legacy client-server application must move to Azure unchanged. Compliance requires that its VMs run on physical servers dedicated to your company only — no other tenant's workloads may share the hardware. What should you recommend?",
    choices: [
      { id: "a", text: "Azure Dedicated Host", correct: true },
      { id: "b", text: "Availability zones", correct: false },
      { id: "c", text: "Azure Spot VMs", correct: false },
      { id: "d", text: "Proximity placement groups", correct: false },
    ],
    explanation:
      "Azure Dedicated Host provides physical servers reserved for your organization — single-tenant hardware isolation for compliance — while still running standard Azure VMs on them. Availability zones address resiliency, Spot is discounted evictable capacity, and proximity placement groups co-locate resources for latency; none provide hardware tenancy isolation.",
  },
  {
    id: "az305-infra-44",
    objective: "4.0-infrastructure",
    difficulty: "medium",
    type: "single",
    prompt:
      "You must recommend a compute option for a public web application with these needs: deploy from Git, custom domains and managed TLS, autoscale on a schedule and on CPU, deployment slots for zero-downtime releases, and no OS management. What should you recommend?",
    choices: [
      { id: "a", text: "Azure App Service (Standard or higher)", correct: true },
      { id: "b", text: "Virtual machine scale sets", correct: false },
      { id: "c", text: "Azure Container Instances", correct: false },
      { id: "d", text: "Azure Batch", correct: false },
    ],
    explanation:
      "App Service checks every box: Git-based deployment, custom domains with managed certificates, schedule- and metric-based autoscale, deployment slots with slot swap for zero-downtime releases, and a fully managed OS. VMSS makes you manage the OS image and has no slots, ACI has no slots/custom domain autoscale story for web apps, and Batch is for parallel compute jobs.",
  },
];
