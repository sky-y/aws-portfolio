# Documentation Policy

## Purpose

この文書は、本プロジェクトにおけるDocumentationの作成・更新方針を定める。

本プロジェクトは学習および転職用Portfolioとして開発しているため、Documentationでは文章としての完成度だけでなく、以下を重視する。

- Project owner自身が内容を正確に理解し、説明できること
- 実際に行った設計判断とDocumentationの内容が一致していること
- 未決定事項と決定済み事項を区別すること
- AIによる不必要な補完や、もっともらしいが根拠のない記述を避けること

このPolicyは、Public化前の開発期間を対象とする。

Public化に伴う英語版の作成・翻訳・同期方法については、必要になった時点で別途決定する。

## Language

### Japanese as the Source of Truth

開発期間中、Project documentationの本文は原則として日本語で記述する。

日本語版をsource of truthとし、設計・学習内容・意思決定は日本語版で確定させる。

現時点では、英語版Documentationを並行して作成・維持しない。

ただし、以下のような明確な理由がある文書は例外とする。

- ToolやAI agentが直接利用することを主目的とする文書
- 既に英語で運用することをProject decisionとして決定している文書

`AGENTS.md` はこの例外に含まれる。

## Technical Terminology

AWS、Terraform、Docker、CI/CD、Observabilityなどのtechnical terminologyは、原則としてcanonicalな英語表記を使用する。

日本語化することで意味が不明確になったり、公式Documentationとの対応が分かりにくくなったりする用語は、無理に翻訳しない。

例えば、以下の表記をそのまま使用してよい。

- Application Load Balancer
- Security Group
- Route Table
- Public Subnet / Private Subnet
- Terraform state
- Docker image
- ECS Service
- Task Definition
- CI/CD
- Observability
- SLI / SLO
- Runbook

本文全体を英語にする必要はない。

日本語の説明文の中でtechnical terminologyを英語のまま使用することを許容する。

## Accuracy and Ownership

Documentationには、Projectで実際に決定・実装・検証した内容を記載する。

文章として自然にするためだけに、未確認の事実や設計判断を補完してはならない。

特に以下を区別する。

- 決定済みの事項
- 現在の実装
- 将来の計画
- 候補・検討中の事項
- 未決定事項

未決定事項を、一般的なbest practiceやAIの推測によって決定済みであるかのように記述してはならない。

Documentationに記載された主要な設計判断について、Project ownerがその内容と理由を説明できる状態を維持する。

## Use of AI

ChatGPT、CodexなどのAIは、Documentationの作成・整理・レビューを補助するために利用できる。

ただし、AIはProject ownerの設計判断を代替しない。

AIによるDocumentation作成・更新では、以下のルールを適用する。

### Do

- 既存の意思決定を整理する
- 文章構造を改善する
- 表現を明確にする
- 矛盾や不足している説明を指摘する
- 未決定事項をTODOとして明示する
- 関連するREADME、roadmap、ADRなどとの整合性を確認する
- canonical technical terminologyを維持する

### Do Not

- 存在しない設計判断を追加する
- TODOを推測によって解決する
- 一般的なbest practiceをProjectの決定事項として追加する
- 未実装の機能を実装済みであるかのように記述する
- 個人学習や検証を実務経験であるかのように表現する
- 読みやすさや見栄えのためだけに不要な説明を大量に追加する

AIが生成した文章であっても、最終的な内容の責任はProject ownerが持つ。

## Avoiding AI Slop

Documentationは、必要以上に包括的・一般的・装飾的にしない。

以下のような記述は避ける。

- Project固有の意味を持たない一般論
- 実際には検討していないtrade-off
- 根拠のない「best practice」
- 実装予定のないtechnologyの列挙
- 内容に対して過剰に詳細な説明
- Project ownerが説明できない専門的な主張

文章の完成度よりも、Projectの現状と正確に対応していることを優先する。

Documentationを更新した際は、少なくとも以下を確認する。

1. この変更によって新しい設計判断が勝手に追加されていないか
2. 未決定事項が暗黙に決定済みへ変更されていないか
3. Projectで実際に使用しないbest practiceが追加されていないか
4. 現在の実装よりもDocumentationの方が先行していないか
5. 主要な内容をProject owner自身が説明できるか

## TODOs and Unresolved Decisions

未決定事項は無理に埋めず、明示的に`TODO`として残す。

例えば

```markdown
TODO: ECSのlaunch modelをPhase 1で比較・決定する。
```

のように、可能であれば「何が未決定なのか」「いつ決定する想定なのか」が分かる形にする。

重要なarchitecture decisionが確定した場合は、必要に応じてADRへ記録する。

## Relationship Between Documents

各Documentationの役割を分離し、同じ情報を不必要に複製しない。

### `README.md`

Projectの入口として、主に以下を扱う。

- Project overview
- Purpose
- Current status
- Major technologies
- Repository navigation

### `docs/roadmap.md`

Projectの発展計画として、主に以下を扱う。

- Phase definitions
- Learning objectives
- Scope / Out of scope
- Deliverables
- Exit criteria
- Future direction

### `docs/adr/`

重要なarchitecture decisionについて、主に以下を扱う。

- Context
- Decision
- Alternatives
- Consequences
- Revisit conditions

詳細な意思決定理由をREADMEやroadmapへ重複して記載する必要はない。

必要に応じてADRを参照する。

## Documentation Updates

Documentationを大きく変更する前に、関連する既存文書を確認する。

特に以下の間で矛盾を発生させない。

- `README.md`
- `docs/roadmap.md`
- `docs/adr/`
- `AGENTS.md`
- その他のProject policy

Projectの方針変更によって複数文書へ影響する場合は、影響範囲を確認したうえで更新する。

Documentationだけを変更して、実際のProject decisionを暗黙に変更してはならない。

## Public Documentation

Public化時の英語Documentationについては、現時点ではこのPolicyの対象外とする。

Public化を行う段階で、以下を改めて検討する。

- 英語版を作成する文書
- 日本語版と英語版のfile naming
- source of truthの扱い
- 翻訳workflow
- 日本語版と英語版の同期方法
- AIを利用したtranslationのreview方法

Public化前に、将来の多言語対応を前提とした複雑な仕組みを導入しない。
