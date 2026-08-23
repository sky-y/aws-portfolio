# AWS Portfolio

## Overview

このプロジェクトは、AWS上にWebアプリケーション用インフラを構築することを題材としたポートフォリオです。

主な目的は、インフラ・クラウド技術の学習と実践であり、アプリケーション開発自体は主目的ではありません。段階的にAWS、Terraform、Docker、CI/CD、Observabilityなどの技術を導入し、最終的には本番環境に近い構成を目指します。

## Current Status

- 現在のPhase: Phase 0 (学習・検証フェーズ)
- 実装済みの範囲: プロジェクトの初期整備
- 現在作業中の範囲: ドキュメント整備

> TODO: Public化時には、Phase 0の説明を開発履歴側へ移し、現在の正式バージョンを中心とした記述へ変更する。

## Roadmap

詳細なフェーズ定義と完了条件は roadmap.md を参照。

- Phase 0: 学習・検証
- Phase 1: コンテナベースのインフラ設計
- Phase 2: Terraformによるインフラ構築
- Phase 3: CI/CD、Observability、Securityを含む運用構成

> TODO: Public化時には「未完成の計画」ではなく、完了済みPhaseと今後の発展を区別して整理する。

## Architecture

### Phase 0

> TODO: AWS構成図

#### Planned Scope

##### In Scope

- Rails API
- EC2
- RDS for MySQL
- ALB
- VPC / Subnet / Route Table / Security Group
- Route 53 / ACM
- Systems Manager Session Manager
- Terraformの段階的導入
- Terraform stateのS3管理
- 手動デプロイ

##### Out of Scope

- Docker / ECS
- CI/CDによる自動デプロイ
- 本格的なObservability
- 高可用性を目的としたEC2冗長化
- その他、後続Phaseで導入予定の機能

#### Technical Stack

##### Application

- Ruby
- Ruby on Rails
- MySQL

##### Infrastructure

- AWS
- Ubuntu LTS

##### Infrastructure as Code

- Terraform

##### Development

- Git
- GitHub

> TODO: Docker / ECSを導入後にContainerセクションを追加する。
> TODO: GitHub Actions導入後にCI/CDセクションを追加する。
> TODO: Observability導入後にMonitoring / Observabilityセクションを追加する。

## Key Design Decisions

詳細な判断過程はADRを参照。

> TODO: 以下の主要な設計判断について、READMEには要約、詳細はADRへのリンクを記載する。
>
> - Application framework: Rails — アプリケーション実装よりインフラ学習へ集中するため
> - Operating system: Ubuntu LTS — 既存の運用経験を活用するため
> - Database: RDS for MySQL — マネージドDBを含む典型的なAWS構成を学習するため
> - EC2のPrivate Subnet配置
> - ALBのみ2AZとする構成
> - ALB → Puma間のHTTP:8080
> - Systems Manager Session Managerの採用
> - NAT Gatewayを常設しない運用
> - Terraformの段階的導入

> TODO: 後続Phaseの主要な設計判断を追加する。
> TODO: READMEが長くなった場合は、代表的な判断だけを残してADRへ委譲する。

## Development with AI

### Principles

- AIを学習・調査・レビュー・実装支援に利用する
- 学習と自身による理解を優先する
- 設計判断の主体をAIへ委譲しない
- AIが生成した内容は、採用前に自身で確認・検証する
- 状態を変更する操作や重要な実装判断は、人間による明示的な管理のもとで行う

### Tools

- ChatGPT: 調査、学習、設計検討、レビュー、限定的なコード生成
- Codex: コードベースの調査、レビュー、学習支援、限定的な実装支援

### Agent Instructions

Codexを含むコーディングエージェントの詳細な行動規範と権限制御については、[AGENTS.md](./AGENTS.md) を参照。

> TODO: Public化前に、実際の開発でのAI利用実績をもとに、人間とAIの責任分界を整理する。

## Repository Structure

> TODO: リポジトリ構成が安定した段階で実際のtreeに合わせて更新する。

## Documentation

- [AGENTS.md](./AGENTS.md)

> TODO: ドキュメントが揃った段階で索引として整理する。
>
> - TODO: Architecture Diagram
> - TODO: Architecture Decision Records
> - TODO: Roadmap
> - TODO: その他の設計資料

## Security

> TODO: 後続Phaseで独立セクションとして記述する。
>
> - IAM
> - Security Groups
> - Public / Private Network
> - Secrets Management
> - Session Manager
> - TLS
> - Least Privilege

## CI/CD

> TODO: GitHub Actions等を導入した段階で記述する。
>
> - CI
> - Deployment pipeline
> - Branch / merge strategy
> - Release flow

## Observability and Operations

> TODO: Observabilityを実装した段階で記述する。
>
> - Metrics
> - Logs
> - Monitoring
> - Alerting
> - SLI / SLO
> - Incident / troubleshooting
> - 運用上の判断

## Running and Deployment

> TODO: 再現可能な状態になった段階で記述する。
>
> - Prerequisites
> - Local development
> - Infrastructure provisioning
> - Application deployment
> - Required configuration

## Cost

> TODO: 構成が安定した段階で記述する。
>
> - 主な課金リソース
> - 想定コスト
> - 学習環境としてのコスト削減策
> - NAT Gateway等を常設しない理由

## What This Project Demonstrates

> TODO: Public化前に完成させる。
>
> - AWS設計・構築
> - TerraformによるIaC
> - Docker / container platform
> - CI/CD
> - Observability
> - Security
> - 運用設計
> - 技術選定とトレードオフ
> - AI-assisted developmentを適切に制御する能力

## Future Work

> TODO: 完成時点で「未実装事項」と「ポートフォリオ完成後の発展案」を整理する。

## License

All rights reserved.
