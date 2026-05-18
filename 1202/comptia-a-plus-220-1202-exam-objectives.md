# CompTIA A+ Certification Exam Objectives
**EXAM NUMBER: CORE 2 (220-1202) V15**

*Exam Objectives Document Version 4.0 | Copyright © 2024 CompTIA, Inc. All rights reserved.*

---

## 1.0 Operating Systems

### 1.1 Explain common operating system (OS) types and their purposes.

- Workstation systems (OSs)
  - Windows
  - Linux
  - macOS
  - Chrome OS
- Mobile OSs
  - iPadOS
  - iOS
  - Android
- Various filesystem types
  - New Technology File System (NTFS)
  - Resilient File System (ReFS)
  - File Allocation Table 32 (FAT32)
  - Fourth extended filesystem (ext4)
  - Extended filesystem (XFS)
  - Apple File System (APFS)
  - Extensible File Allocation Table (exFAT)
- Vendor life-cycle limitations
  - End-of-life (EOL)
  - Update limitations
- Compatibility concerns between operating systems

### 1.2 Given a scenario, perform OS installations and upgrades in a diverse environment.

- Boot methods
  - Universal Serial Bus (USB)
  - Network
  - Solid-state/flash drives
  - Internet-based
  - External/hot-swappable drive
  - Internal hard drive (partition)
  - Multiboot
- Types of installations
  - Clean install
  - Upgrade
  - Image deployment
  - Remote network installation
  - Zero-touch deployment
  - Recovery partition
  - Repair installation
  - Other considerations
    - Third-party drivers
- Partitioning
  - GUID [globally unique identifier] Partition Table (GPT)
  - Master boot record (MBR)
- Drive format
- Upgrade considerations
  - Backup files and user preferences
  - Application and driver support/backward compatibility
  - Hardware compatibility
- Feature updates
  - Product life cycle

### 1.3 Compare and contrast basic features of Microsoft Windows editions.

- Windows 10 editions
  - Home
  - Pro
  - Pro for Workstations
  - Enterprise
- Windows 11 editions
  - Home
  - Pro
  - Enterprise
- N versions
- Feature differences
  - Domain vs. workgroup
  - Desktop styles/user interface
  - Availability of Remote Desktop Protocol (RDP)
  - Random-access memory (RAM) support limitations
  - BitLocker
  - gpedit.msc
- Upgrade paths
  - In-place upgrade
  - Clean install
- Hardware requirements
  - Trusted Platform Module (TPM)
  - Unified Extensible Firmware Interface (UEFI)

### 1.4 Given a scenario, use Microsoft Windows operating system features and tools.

- Task Manager
  - Services
  - Startup
  - Performance
  - Processes
  - Users
- Microsoft Management Console (MMC) snap-in
  - Event Viewer (eventvwr.msc)
  - Disk Management (diskmgmt.msc)
  - Task Scheduler (taskschd.msc)
  - Device Manager (devmgmt.msc)
  - Certificate Manager (certmgr.msc)
  - Local User and Groups (lusrmgr.msc)
  - Performance Monitor (perfmon.msc)
  - Group Policy Editor (gpedit.msc)
- Additional tools
  - System Information (msinfo32.exe)
  - Resource Monitor (resmon.exe)
  - System Configuration (msconfig.exe)
  - Disk Cleanup (cleanmgr.exe)
  - Disk Defragment (dfrgui.exe)
  - Registry Editor (regedit.exe)

### 1.5 Given a scenario, use the appropriate Microsoft command-line tools.

- Navigation
  - cd
  - dir
- Network
  - ipconfig
  - ping
  - netstat
  - nslookup
  - net use
  - tracert
  - pathping
- Disk management
  - chkdsk
  - format
  - diskpart
- File management
  - md
  - rmdir
  - robocopy
- Informational
  - hostname
  - net user
  - winver
  - whoami
  - [command name] /?
- OS management
  - gpupdate
  - gpresult
  - sfc

### 1.6 Given a scenario, configure Microsoft Windows settings.

- Internet Options
- Devices and Printers
- Program and Features
- Network and Sharing Center
- System
- Windows Defender Firewall
- Mail
- Sound
- User Accounts
- Device Manager
- Indexing Options
- Administrative Tools
- File Explorer Options
  - View hidden files
  - Hide extensions
  - General options
  - View options
- Power Options
  - Hibernate
  - Power plans
  - Sleep/suspend
  - Standby
  - Choose what closing the lid does
  - Turn on fast startup
  - USB selective suspend
- Ease of Access
- Time and Language
- Update and Security
- Personalization
- Apps
- Privacy
- System
- Devices
- Network and Internet
- Gaming
- Accounts

### 1.7 Given a scenario, configure Microsoft Windows networking features on a client/desktop.

- Domain joined vs. workgroup
  - Shared resources
  - Printers
  - File servers
  - Mapped drives
- Local OS firewall settings
  - Application restrictions and exceptions
  - Configuration
- Client network configuration
  - Internet Protocol (IP) addressing scheme
  - Domain Name System (DNS) settings
  - Subnet mask
  - Gateway
  - Static vs. dynamic
- Establish network connections
  - Virtual private network (VPN)
  - Wireless
  - Wired
  - Wireless wide area network (WWAN)/cellular network
- Proxy settings
- Public network vs. private network
- File Explorer navigation–network paths
- Metered connections and limitations

### 1.8 Explain common features and tools of the macOS/desktop operating system.

- Installation and uninstallation of applications
  - File types
    - .dmg
    - .pkg
    - .app
  - App Store
  - Uninstallation process
- System folders
  - /Applications
  - /Users
  - /Library
  - /System
  - /Users/Library
- Apple ID and corporate restrictions
- Best practices
  - Backups
  - Antivirus
  - Updates/patches
  - Rapid Security Response (RSR)
- System Preferences
  - Displays
  - Networks
  - Printers
  - Scanners
  - Privacy
  - Accessibility
  - Time Machine
- Features
  - Multiple desktops
  - Mission Control
  - Keychain
  - Spotlight
  - iCloud
    - iMessage
    - FaceTime
    - Drive
  - Gestures
  - Finder
  - Dock
  - Continuity
- Disk Utility
- FileVault
- Terminal
- Force Quit

### 1.9 Identify common features and tools of the Linux client/desktop operating system.

- File management
  - ls
  - pwd
  - mv
  - cp
  - rm
  - chmod
  - chown
  - grep
  - find
- Filesystem management
  - fsck
  - mount
- Administrative
  - su
  - sudo
- Package management
  - apt
  - dnf
- Network
  - ip
  - ping
  - curl
  - dig
  - traceroute
- Informational
  - man
  - cat
  - top
  - ps
  - du
  - df
- Text editors
  - nano
- Common configuration files
  - /etc/passwd
  - /etc/shadow
  - /etc/hosts
  - /etc/fstab
  - /etc/resolv.conf
- OS components
  - systemd
  - kernel
  - bootloader
- Root account

### 1.10 Given a scenario, install applications according to requirements.

- System requirements for applications
  - 32-bit vs. 64-bit dependent application requirements
  - Dedicated vs. integrated graphics card
  - Video random-access memory (VRAM) requirements
  - RAM requirements
  - Central processing unit (CPU) requirements
  - External hardware tokens
  - Storage requirements
  - Application to OS compatibility
- Distribution methods
  - Physical media vs. mountable ISO file
  - Downloadable package
  - Image deployment
- Impact considerations for new applications
  - Device
  - Network
  - Operation
  - Business

### 1.11 Given a scenario, install and configure cloud-based productivity tools.

- Email systems
- Storage
  - Sync/folder settings
- Collaboration tools
  - Spreadsheets
  - Videoconferencing
  - Presentation tools
  - Word processing tools
  - Instant messaging
- Identity synchronization
- Licensing assignment

---

## 2.0 Security

### 2.1 Summarize various security measures and their purposes.

- Physical security
  - Bollards
  - Access control vestibule
  - Badge reader
  - Video surveillance
  - Alarm systems
  - Motion sensors
  - Door locks
  - Equipment locks
  - Security guards
  - Fences
- Physical access security
  - Key fobs
  - Smart cards
  - Mobile digital key
  - Keys
  - Biometrics
    - Retina scanner
    - Fingerprint scanner
    - Palm print scanner
    - Facial recognition technology (FRT)
    - Voice recognition technology
  - Lighting
  - Magnetometers
- Logical security
  - Principle of least privilege
  - Zero Trust model
  - Access control lists (ACLs)
  - Multifactor authentication (MFA)
    - Email
    - Hardware token
    - Authenticator application
    - Short Message Service (SMS)
    - Voice call
    - Time-based one-time password (TOTP)
    - One-time password/passcode (OTP)
  - Security Assertions Markup Language (SAML)
  - Single sign-on (SSO)
  - Just-in-time access
    - Privileged access management (PAM)
  - Mobile device management (MDM)
  - Data loss prevention (DLP)
  - Identity access management (IAM)
  - Directory services

### 2.2 Given a scenario, configure and apply basic Microsoft Windows OS security settings.

- Defender Antivirus
  - Activate/deactivate
  - Update definitions
- Firewall
  - Activate/deactivate
  - Port security
  - Application security
- User and groups
  - Local vs. Microsoft account
  - Standard account
  - Administrator
  - Guest user
  - Power user
- Log-in OS options
  - Username and password
  - Personal identification number (PIN)
  - Fingerprint
  - Facial recognition
  - SSO
  - Passwordless/Windows Hello
- NTFS vs. share permissions
  - File and folder attributes
  - Inheritance
- Run as administrator vs. standard user
- User Account Control (UAC)
- BitLocker
- BitLocker-To-Go
- Encrypting File System (EFS)
- Active Directory
  - Joining domain
  - Assigning log-in script
  - Moving objects within organizational units
  - Assigning home folders
  - Applying Group Policy
  - Selecting security groups
  - Configuring folder redirection

### 2.3 Compare and contrast wireless security protocols and authentication methods.

- Protocols and encryption
  - Wi-Fi Protected Access 2 (WPA2)
  - WPA3
  - Temporal Key Integrity Protocol (TKIP)
  - Advanced Encryption Standard (AES)
- Authentication
  - Remote Authentication Dial-in User Service (RADIUS)
  - Terminal Access Controller Access-control System (TACACS+)
  - Kerberos
  - Multifactor

### 2.4 Summarize types of malware and tools/methods for detection, removal, and prevention.

- Malware
  - Trojan
  - Rootkit
  - Virus
  - Spyware
  - Ransomware
  - Keylogger
  - Boot sector virus
  - Cryptominer
  - Stalkerware
  - Fileless
- Adware
  - Potentially unwanted program (PUP)
- Tools and methods
  - Recovery console
  - Endpoint detection and response (EDR)
  - Managed detection and response (MDR)
  - Extended detection and response (XDR)
  - Antivirus
  - Anti-malware
  - Email security gateway
  - Software firewalls
  - User education regarding common threats
    - Antiphishing training
  - OS reinstallation

### 2.5 Compare and contrast common social engineering attacks, threats, and vulnerabilities.

- Social engineering
  - Phishing
    - Vishing
    - Smishing
    - QR code phishing
    - Spear phishing
    - Whaling
  - Shoulder surfing
  - Tailgating
  - Impersonation
  - Dumpster diving
- Threats
  - Denial of service (DoS)
  - Distributed denial of service (DDoS)
  - Evil twin
  - Zero-day attack
  - Spoofing
  - On-path attack
  - Brute-force attack
  - Dictionary attack
  - Insider threat
  - Structured Query Language (SQL) injection
  - Cross-site scripting (XSS)
  - Business email compromise (BEC)
  - Supply chain/pipeline attack
- Vulnerabilities
  - Non-compliant systems
  - Unpatched systems
  - Unprotected systems (missing antivirus/missing firewall)
  - EOL
  - Bring your own device (BYOD)

### 2.6 Given a scenario, implement procedures for basic small office/home office (SOHO) malware removal.

1. Investigate and verify malware symptoms.
2. Quarantine infected system.
3. Disable System Restore in Windows Home.
4. Remediate infected systems.
5. Update anti-malware software.
6. Scan and removal techniques (e.g., safe mode, preinstallation environment)
7. Reimage/reinstall.
8. Schedule scans and run updates.
9. Enable System Restore and create a restore point in Windows Home.
10. Educate the end user.

### 2.7 Given a scenario, apply workstation security options and hardening techniques.

- Data-at-rest encryption
- Password considerations
  - Length
  - Character types
  - Uniqueness
  - Complexity
  - Expiration
- Basic input/output system (BIOS)/Unified Extensible Firmware Interface (UEFI) passwords
- End-user best practices
  - Use screensaver locks
  - Log off when not in use
  - Secure/protect critical hardware (e.g., laptops)
  - Secure personally identifiable information (PII) and passwords
  - Use password managers
- Account management
  - Restrict user permissions
  - Restrict log-in times
  - Disable guest account
  - Use failed attempts lockout
  - Use timeout/screen lock
  - Apply account expiration dates
- Change default administrator's user account/password
- Disable AutoRun
- Disable unused services

### 2.8 Given a scenario, apply common methods for securing mobile devices.

- Hardening techniques
  - Device encryption
  - Screen locks
    - Facial recognition
    - PIN codes
    - Fingerprint
    - Pattern
    - Swipe
  - Configuration profiles
- Patch management
  - OS updates
  - Application updates
- Endpoint security software
  - Antivirus
  - Anti-malware
  - Content filtering
- Locator applications
- Remote wipes
- Remote backup applications
- Failed log-in attempts restrictions
- Policies and procedures
  - MDM
  - BYOD vs. corporate-owned devices
  - Profile security requirements

### 2.9 Compare and contrast common data destruction and disposal methods.

- Physical destruction of hard drives
  - Drilling
  - Shredding
  - Degaussing
  - Incineration
- Recycling or repurposing best practices
  - Erasing/wiping
  - Low-level formatting
  - Standard formatting
- Outsourcing concepts
  - Third-party vendor
  - Certification of destruction/recycling
- Regulatory and environmental requirements

### 2.10 Given a scenario, apply security settings on SOHO wireless and wired networks.

- Router settings
  - Change default passwords
  - IP filtering
  - Firmware updates
  - Content filtering
  - Physical placement/secure locations
  - Universal Plug and Play (UPnP)
  - Screened subnet
  - Configure secure management access
- Wireless specific
  - Changing the service set identifier (SSID)
  - Disabling SSID broadcast
  - Encryption settings
  - Configuring guest access
- Firewall settings
  - Disabling unused ports
  - Port forwarding/mapping

### 2.11 Given a scenario, configure relevant security settings in a browser.

- Browser download/installation
  - Trusted sources
    - Hashing
  - Untrusted sources
- Browser patching
- Extensions and plug-ins
  - Trusted sources
  - Untrusted sources
- Password managers
- Secure connections/sites–valid certificates
- Settings
  - Pop-up blocker
  - Clearing browsing data
  - Clearing cache
  - Private-browsing mode
  - Sign-in/browser data synchronization
  - Ad blockers
  - Proxy
  - Secure DNS
- Browser feature management
  - Enable/disable
    - Plug-ins
    - Extensions
    - Features

---

## 3.0 Software Troubleshooting

### 3.1 Given a scenario, troubleshoot common Windows OS issues.

- Blue screen of death (BSOD)
- Degraded performance
- Boot issues
- Frequent shutdowns
- Services not starting
- Applications crashing
- Low memory warnings
- USB controller resource warnings
- System instability
- No OS found
- Slow profile load
- Time drift

### 3.2 Given a scenario, troubleshoot common mobile OS and application issues.

- Application fails to launch
- Application fails to close/crashes
- Application fails to update
- Application fails to install
- Slow to respond
- OS fails to update
- Battery life issues
- Random reboots
- Connectivity issues
  - Bluetooth
  - Wi-Fi
  - Near-field communication (NFC)
- Screen does not autorotate

### 3.3 Given a scenario, troubleshoot common mobile OS and application security issues.

- Security concerns
  - Application source/unofficial application stores
  - Developer mode
  - Root access/jailbreak
  - Unauthorized/malicious application
    - Application spoofing
- Common symptoms
  - High network traffic
  - Degraded response time
  - Data-usage limit notification
  - Limited internet connectivity
  - No internet connectivity
  - High number of ads
  - Fake security warnings
  - Unexpected application behavior
  - Leaked personal files/data

### 3.4 Given a scenario, troubleshoot common personal computer (PC) security issues.

- Common symptoms
  - Unable to access the network
  - Desktop alerts
  - False alerts regarding antivirus protection
  - Altered system or personal files
    - Missing/renamed files
    - Inability to access files
  - Unwanted notifications within the OS
  - OS updates failures
- Browser-related symptoms
  - Random/frequent pop-ups
  - Certificate warnings
  - Redirection
  - Degraded browser performance

---

## 4.0 Operational Procedures

### 4.1 Given a scenario, implement best practices associated with documentation and support systems information management.

- Ticketing systems
  - User information
  - Device information
  - Description of issues
  - Categories
  - Severity
  - Escalation levels
  - Clear, concise written communication
    - Issue description
    - Progress notes
    - Issue resolution
- Asset management
  - Inventory lists
  - Configuration management database (CMDB)
  - Asset tags and IDs
  - Procurement life cycle
  - Warranty and licensing
  - Assigned users
- Types of documents
  - Incident reports
  - Standard operating procedures (SOPs)
    - Software package custom installation procedure
  - New user/onboarding setup checklist
  - User off-boarding checklist
  - Service-level agreements (SLAs)
    - Internal
    - External/third-party
  - Knowledge base/articles

### 4.2 Given a scenario, apply change management procedures.

- Documented business processes
  - Rollback plan
  - Backup plan
  - Sandbox testing
  - Responsible staff members
- Change management
  - Request forms
  - Purpose of the change
  - Scope of the change
  - Change type
    - Standard change
    - Normal change
    - Emergency change
  - Date and time of change
    - Change freeze
    - Maintenance windows
  - Affected systems/impact
  - Risk analysis
    - Risk level
  - Change board approvals
  - Implementation
  - Peer review
  - End-user acceptance

### 4.3 Given a scenario, implement workstation backup and recovery methods.

- Backup
  - Full
  - Incremental
  - Differential
  - Synthetic full
- Recovery
  - In-place/overwrite
  - Alternative location
- Backup testing
  - Frequency
- Backup rotation schemes
  - Onsite vs. offsite
  - Grandfather-father-son (GFS)
  - 3-2-1 backup rule

### 4.4 Given a scenario, use common safety procedures.

- Electrostatic discharge (ESD) straps
- ESD mats
- Electrical safety
  - Equipment grounding
- Proper component handling and storage
- Cable management
- Antistatic bags
- Compliance with government regulations
- Personal safety
  - Disconnect power before repairing PC
  - Lifting techniques
  - Fire safety
  - Safety goggles
  - Air filter mask

### 4.5 Summarize environmental impacts and local environment controls.

- Material safety data sheet (MSDS) documentation for handling and disposal
  - Proper battery disposal
  - Proper toner disposal
  - Proper disposal of other devices and assets
- Temperature, humidity-level awareness, and proper ventilation
  - Location/equipment placement
  - Dust cleanup
  - Compressed air/vacuums
- Power surges, brownouts, and blackouts
  - Uninterruptible power supply (UPS)
  - Surge suppressor

### 4.6 Explain the importance of prohibited content/activity and privacy, licensing, and policy concepts.

- Incident response
  - Chain of custody
  - Informing management/law enforcement as necessary
  - Copy of drive (data integrity and preservation)
  - Incident documentation
  - Order of volatility
- Licensing/digital rights management (DRM)/end-user license agreement (EULA)
  - Valid licenses
  - Perpetual license agreement
  - Personal-use license vs. corporate-use license
  - Open-source license
- Non-disclosure agreement (NDA)/mutual non-disclosure agreement (MNDA)
- Regulated data
  - Credit card payment information
  - Personal government-issued information
  - PII
  - Healthcare data
  - Data retention requirements
- Acceptable use policy (AUP)
- Regulatory and business compliance requirements
  - Splash screens

### 4.7 Given a scenario, use proper communication techniques and professionalism.

- Present a professional appearance and wear appropriate attire.
  - Match the required attire of the given environment.
    - Formal
    - Business casual
- Use proper language and avoid jargon, acronyms, and slang, when applicable.
- Maintain a positive attitude/project confidence.
- Actively listen and avoid interrupting the customer.
- Be culturally sensitive.
  - Use appropriate professional titles and designations, when applicable.
- Be on time (if late, contact the customer).
- Avoid distractions.
  - Personal calls
  - Texting/social media sites
  - Personal interruptions
- Appropriately deal with difficult customers or situations.
  - Do not argue with customer and/or be defensive.
  - Avoid dismissing customer issues.
  - Avoid being judgmental.
  - Clarify customer statements (i.e., ask open-ended questions to narrow the scope of the issue, restate the issue, or question to verify understanding).
  - Use discretion and professionalism when discussing experiences/encounters.
- Set and meet expectations/timeline and communicate status with the customer.
  - Offer repair/replacement options, as needed.
  - Provide proper documentation on the services provided.
  - Follow up with customer/user at a later date to verify satisfaction.
- Appropriately handle customers' confidential and private materials.
  - Located on a computer, desktop, printer, etc.

### 4.8 Explain the basics of scripting.

- Script file types
  - .bat
  - .ps1
  - .vbs
  - .sh
  - .js
  - .py
- Use cases for scripting
  - Basic automation
  - Restarting machines
  - Remapping network drives
  - Installation of applications
  - Automated backups
  - Gathering of information/data
  - Initiating updates
- Other considerations when using scripts
  - Unintentionally introducing malware
  - Inadvertently changing system settings
  - Browser or system crashes due to mishandling of resources

### 4.9 Given a scenario, use remote access technologies.

- Methods/tools
  - RDP
  - VPN
  - Virtual network computer (VNC)
  - Secure Shell (SSH)
  - Remote monitoring and management (RMM)
  - Simple Protocol for Independent Computing Environments (SPICE)
  - Windows Remote Management (WinRM)
  - Third-party tools
    - Screen-sharing software
    - Videoconferencing software
    - File transfer software
    - Desktop management software
- Security considerations of each access method

### 4.10 Explain basic concepts related to artificial intelligence (AI).

- Application integration
- Policy
  - Appropriate use
  - Plagiarism
- Limitations
  - Bias
  - Hallucinations
  - Accuracy
- Private vs. public
  - Data security
  - Data source
  - Data privacy
