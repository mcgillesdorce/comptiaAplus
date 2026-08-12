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
];
