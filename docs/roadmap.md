# Project Roadmap

## Overview

このRoadmapは、本Projectを基本的なAWS構成から、Containerization、CI/CD、Observabilityを備えた構成へ段階的に発展させるための学習計画を示す。

本Projectの主目的は、AWS、Terraform、Docker、CI/CD、ObservabilityなどのInfrastructure / Cloud技術を、設計・構築・運用を通して理解することである。

完成形を最初から構築するのではなく、各Phaseで学習対象を限定し、前のPhaseで理解した構成を次のPhaseで改善する。

基本的な進行は以下とする。

1. AWSの基本構成を理解し、Infrastructure as Codeで再現する
2. ContainerizationとCI/CDを設計する
3. 設計した構成を実装・自動化する
4. 構築したSystemを観測・運用・改善する

重要なArchitecture Decisionとその理由は、必要に応じてADRへ記録する。

## Roadmap Overview

| Phase   | Theme                                     | Goal                                                |
| ------- | ----------------------------------------- | --------------------------------------------------- |
| Phase 0 | AWS Fundamentals + IaC Fundamentals       | AWSの基本構成をManagement Consoleで理解し、同等構成をTerraformで再現する |
| Phase 1 | Containerization and CI/CD Design         | ContainerizationとCI/CDを導入した次のArchitectureを設計する      |
| Phase 2 | Containerization and CI/CD Implementation | Phase 1で設計したArchitectureをIaCを含めて実装する                |
| Phase 3 | Operations and Observability              | 構築したSystemを観測・運用・改善できる状態へ発展させる                      |

各Phaseはrelease scheduleではなく、学習範囲を明確にするための境界である。

学習結果や設計判断によって、将来Phaseの詳細は変更する可能性がある。

---

## Phase 0 — AWS Fundamentals + IaC Fundamentals

### Goal

典型的なWeb ApplicationをAWS上で構築し、主要なAWS resourceの役割と通信経路を理解する。

同じ基本Architectureを、以下の順序で構築する。

1. AWS Management Consoleを使用して手動で構築する
2. 構成と通信経路を確認する
3. 構築したresourceを削除する
4. 同等の構成をTerraformで再構築する

最初からTerraformだけを使用するのではなく、AWS resource自体を理解したうえでInfrastructure as Codeへ移行する。

### Learning Objectives

- VPCの基本構造を理解する
- Public Subnet / Private Subnetの役割を理解する
- Route Tableによるroutingを理解する
- Internet GatewayとNAT Gatewayの役割を理解する
- Security Groupによる通信制御を理解する
- Application Load BalancerからEC2への通信を理解する
- EC2からRDSへの通信を理解する
- ACMを利用したHTTPS terminationを理解する
- Systems Manager Session ManagerによるEC2管理を理解する
- AWS resourceとTerraform resourceの対応を理解する
- Terraformの基本的なstate管理を理解する

特に、InternetからApplicationまでのrequestとresponseが、どのresourceを経由するか説明できることを重視する。

### Architecture

Phase 0では、Rails APIをAWS上で動作させる。

主要な構成要素は以下とする。

- VPC
- Public Subnet
- Private Subnet
- Route Table
- Internet Gateway
- NAT Gateway
- Security Group
- Application Load Balancer
- EC2
- RDS for MySQL
- ACM
- Route 53
- Systems Manager Session Manager
- Terraform
- S3 backend for Terraform state

ApplicationはRuby on RailsをAPI modeで使用する。

EC2のOSにはUbuntu LTSを使用する。

基本的なrequest pathは以下とする。

```text
Internet
   |
 HTTPS
   |
   v
  ALB
   |
 HTTP :8080
   |
   v
EC2 / Puma
   |
   v
RDS for MySQL
```

### Current Design Decisions

現時点で以下を採用する。

- ALB用Subnetのみ2 Availability Zonesに配置する
- Application用EC2は単一instanceとする
- EC2はPrivate Subnetへ配置する
- DatabaseにはRDS for MySQLを使用する
- InternetからALBまではHTTPSを使用する
- TLS certificateはACMで管理する
- ALBからEC2 / PumaまではHTTPを使用する
- Pumaはport `8080`でlistenする
- EC2への直接SSH accessは原則として使用しない
- EC2管理にはSystems Manager Session Managerを使用する
- NAT Gatewayは必要なときに作成し、不要時には削除できる運用とする
- EC2 Security GroupのoutboundはAll trafficを許可する
- Network ACLはAWS defaultのAllow Allを維持する
- RailsはEC2へ直接installする
- Application deploymentは手動で行う
- Phase 0ではContainerizationを行わない

### Infrastructure as Code

Management Consoleによる構築を完了した後、同等のAWS構成をTerraformで再構築する。

Phase 0におけるTerraformの主目的は、高度なTerraform architectureを作ることではない。

Management Consoleで理解したAWS resourceと、Terraform上のresource definitionを対応付けて理解することを目的とする。

Terraform stateはS3で管理する。

### Deliverables

- AWS Architecture Diagram
- Management Consoleで構築したAWS environment
- Terraformで再構築した同等のAWS environment
- AWS上で動作するRails API
- HTTPS endpoint
- Terraform source code
- 必要なArchitecture Decision Record
- 構築・検証に関するDocumentation

### Out of Scope

Phase 0では以下を対象外とする。

- DockerによるApplication deployment
- Amazon ECR
- Amazon ECS
- Automated CI/CD
- Automated deployment
- Application instanceのhigh availability
- Kubernetes
- 高度なObservability
- SLI / SLO
- Formal Incident Management

これらは後続Phaseで扱う。

### Exit Criteria

Phase 0は、少なくとも以下を説明・実行できる状態になった時点で完了とする。

- 主要なAWS resourceの役割を説明できる
- InternetからApplicationまでの通信経路を説明できる
- ALBからEC2までの通信経路を説明できる
- EC2からRDSまでの通信経路を説明できる
- Public / Private Subnetの配置理由を説明できる
- Route TableとSecurity Groupが通信に与える影響を説明できる
- Management Consoleから基本構成を構築できる
- Terraformで同等構成を再現できる
- Rails APIをAWS上で公開できる

---

## Phase 1 — Containerization and CI/CD Design

### Goal

Phase 0のEC2への直接deploymentから、
ContainerizationとCI/CDを利用するArchitectureへ移行する。

Phase 1では、実装よりも設計と意思決定を中心とする。

Phase 0のdeployment modelでは

```text
GitHub
   |
manual deployment
   |
   v
 EC2
   |
Rails / Puma
```

を、Containerを利用するmodelへ発展させる。

想定する方向性は以下である。

```text
GitHub
   |
 CI/CD
   |
   v
Container Image
   |
   v
  ECR
   |
   v
  ECS
```

### Learning Objectives

- ApplicationをContainer化する際の設計事項を理解する
- Container imageのlifecycleを理解する
- ECSでApplicationを実行するためのArchitectureを設計する
- CIとCDの責務を整理する
- Application deploymentとInfrastructure provisioningの責務を整理する
- Terraformで管理するresourceの範囲を設計する
- 設計判断とtrade-offをADRとして記録する

### Design Topics

#### Containerization

以下を設計する。

- Dockerfile
- Container startup process
- Runtime configuration
- Environment variables
- Secrets
- Database connectivity
- Database migration

#### ECS

以下を設計する。

- ECSの実行方式
- Task Definition
- ECS Service
- Networking
- ALB integration
- Deployment behavior

`TODO`: ECSの具体的な実行方式を比較し、採用方式と理由を決定する。

#### CI

CIの責務を定義する。

候補には以下を含む。

- lint
- automated test
- Docker image build
- image validation

#### CD

Application deploymentのworkflowを設計する。

候補となるflowは以下。

```text
GitHub
   |
   v
  CI
   |
   v
Docker Build
   |
   v
  ECR
   |
   v
ECS Deployment
```

以下を検討する。

- deployment trigger
- image tagging
- AWS authentication
- deployment failure handling
- rollback

#### Infrastructure as Code

TerraformとCI/CD pipelineの責務境界を決定する。

主な検討事項は以下のとおりである。

- Terraformで管理するAWS resource
- Application deploymentで管理する範囲
- Infrastructure変更とApplication変更の扱い
- Terraform configurationの構造

### Deliverables

- Phase 1 Architecture Diagram
- Containerization design
- CI/CD flow design
- Terraform implementation plan
- Architecture Decision Records
- 未決定事項を明示した設計Documentation

### TODO

少なくとも以下はPhase 1で検討・決定する。

- ECSの実行方式
- Terraform module structure
- Environment separation
- Secrets management
- Database migration strategy
- Container image tagging
- Deployment strategy
- Rollback strategy
- CI/CDとTerraformの責務境界

この一覧はPhase 1開始時に見直す。

### Exit Criteria

Phase 1は、少なくとも以下の状態になった時点で完了とする。

- Target Container Architectureが定義されている
- CI workflowが定義されている
- CD workflowが定義されている
- TerraformとApplication deploymentの責務境界が定義されている
- 主要なArchitecture DecisionがADRとして記録されている
- Phase 2の実装中に基本Architectureを再設計する必要がない程度まで設計されている

---

## Phase 2 — Containerization and CI/CD Implementation

### Goal

Phase 1で設計したArchitectureを実装する。

ApplicationをEC2へ直接配置する方式からContainer-based deploymentへ移行し、InfrastructureとApplication deploymentを再現可能・自動化された状態にする。

### Expected Technologies

現時点では以下を主要候補とする。

- Docker
- Amazon ECR
- Amazon ECS
- Terraform
- GitHub Actions
- Application Load Balancer
- RDS for MySQL

具体的な構成はPhase 1のArchitecture Decisionに従う。

### Target Deployment Flow

現時点で想定する基本flowは以下。

```text
Developer
    |
    v
 GitHub
    |
    +----> Lint / Test
    |
    +----> Docker Build
    |
    v
   ECR
    |
    v
   ECS
    |
    v
   ALB
    |
    v
Application
```

### Infrastructure as Code

Phase 2でもTerraformを使用するが、Phase 0とは目的が異なる。

Phase 0では、Management Consoleで理解したAWS FundamentalsをTerraformで再現する。

Phase 2では、Phase 1で設計したContainerizationとCI/CDを含むArchitectureを、Infrastructure as Codeとして実装する。

### Learning Objectives

- Rails ApplicationをDocker imageとして構築する
- Container imageのbuildとdistributionを理解する
- ECRを利用する
- ECSでContainerを実行する
- ECSとALBを接続する
- GitHub ActionsによるCIを構築する
- Application deploymentを自動化する
- Terraformで必要なAWS resourceを管理する
- Infrastructure provisioningとApplication deploymentを分離する

### Deliverables

- Dockerized Rails Application
- ECR image workflow
- ECS environment
- Terraform-managed infrastructure
- GitHub Actions CI
- Automated deployment workflow
- 更新されたArchitecture Diagram
- 必要なADRおよびDocumentation

### Exit Criteria

Phase 2は、少なくとも以下を実現した時点で完了とする。

- Rails ApplicationがContainerとして動作する
- Container imageをECRで管理できる
- ApplicationがECS上で動作する
- ALB経由でApplicationへaccessできる
- GitHub ActionsによるCIが自動実行される
- Application deploymentが自動化されている
- 必要なAWS infrastructureをTerraformから再現できる
- Phase 0からPhase 2でArchitectureがどのように変化したか説明できる
- Infrastructure provisioningとApplication deploymentの責務を説明できる

---

## Phase 3 — Operations and Observability

### Goal

Phase 2で構築したSystemを、単にdeploy可能な状態から、観測・診断・復旧・改善できる状態へ発展させる。

Phase 3では、新しいdeployment architectureの構築よりも、System運用を中心に学習する。

### Learning Objectives

- MonitoringとObservabilityの違いを理解する
- ApplicationおよびInfrastructureのMetricsを確認できるようにする
- Logsを集約し、troubleshootingへ利用する
- Serviceの正常状態を定義する
- SLI / SLOの基礎を理解し、実際のSystemへ適用する
- 異常状態を検知する
- Incidentを体系的に調査する
- 復旧手順をDocumentationとして残す
- Deployment failureへのrollbackを扱う
- 運用結果をSystem改善へつなげる

### Operational Cycle

Phase 3では以下のcycleを経験することを目標とする。

```text
Define expected behavior
        |
        v
Observe
        |
        v
Detect
        |
        v
Investigate
        |
        v
Recover
        |
        v
Improve
```

### Candidate Topics

現時点では以下を候補とする。

- CloudWatch Metrics
- CloudWatch Logs
- CloudWatch Alarms
- Application metrics
- Structured logging
- OpenTelemetry
- Prometheus
- Grafana
- SLI / SLO
- Incident response
- Runbook
- Failure simulation
- Rollback

すべてを採用することを前提とはしない。

`TODO`: Phase 3の学習目的を満たす最小限のObservability stackを決定する。

### Deliverables

候補となる成果物は以下のとおりである。

- Monitoring dashboard
- Log investigation example
- Alert configuration
- SLI / SLO definition
- Runbook
- Failure scenario
- Incident investigation record
- Operational improvement record

具体的な成果物はPhase 3開始時に決定する。

### Exit Criteria

Phase 3は、少なくとも以下を説明・実行できる状態になった時点で完了とする。

- Applicationのhealthをどのように観測するか説明できる
- 重要なMetricsを定義できる
- Logsをtroubleshootingへ利用できる
- 少なくとも1つの意味のあるSLI / SLOを定義できる
- Controlled failureを検知できる
- 障害の調査・復旧手順をDocumentationとして説明できる
- Rollbackまたはrecovery pathを説明・実行できる
- 運用結果をもとに少なくとも1つの改善を実施できる

---

## Possible Future Extensions

Phase 0からPhase 3までを、本ProjectのCore Roadmapとする。

Core Roadmap完了後、必要に応じてApplication / AI領域への拡張を検討する。

現時点の候補には以下がある。

- Python
- FastAPI
- LLM API
- RAG
- AI Agent
- AI Application
- AI Platform / LLMOps concepts

Phase 3まではRailsをApplication frameworkとして使用し、Infrastructure / Cloud / Operationsの学習に集中する。

これらのFuture ExtensionsはCore Roadmapの完了条件には含めない。

---

## Documentation

各Documentの責務は以下とする。

### `README.md`

Projectの入口として、以下を扱う。

- Project overview
- Purpose
- Current status
- Major technologies
- Repository navigation

### `docs/roadmap.md`

Projectの発展計画として、以下を扱う。

- Phase scope
- Learning objectives
- Planned progression
- Deliverables
- Exit criteria

### `docs/adr/`

重要なArchitecture Decisionについて、以下を扱う。

- Context
- Decision
- Alternatives
- Consequences
- Revisit conditions

詳細な意思決定理由を複数Documentへ重複して記録せず、必要に応じてADRを参照する。

---

## Roadmap Principles

### Understand Before Automating

AWS resourceを直接理解したうえでInfrastructure as Codeへ移行する。

### Design Before Implementation

大きなArchitecture変更は、実装する前に設計する。

特にContainerizationとCI/CDはPhase 1で設計し、Phase 2で実装する。

### Keep the Scope Explicit

各Phaseの学習目的に直接関係しないtechnologyは、意図的に後続Phaseへ延期する。

### Prefer Explainability Over Feature Count

使用しているAWS serviceやtoolの数ではなく、Architectureとその判断を説明できることを重視する。

### Treat Operations as Part of the System

Deploymentを完成地点とは考えない。

最終的にSystemを観測・診断・復旧・改善できる状態を目指す。

### Allow the Roadmap to Evolve

Roadmapは学習結果や設計判断によって変更できる。

ただし、重要なArchitecture Decisionの変更は暗黙に上書きせず、必要に応じてADRへ記録する。
