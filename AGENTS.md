# AGNETS.md

## Project Purpose

This repository is a learning-oriented portfolio project for developing practical skills in AWS, Terraform, Docker, CI/CD, and related infrastructure technologies.

The primary objective is not to build the application as quickly as possible, but to understand and be able to explain the design, implementation, operation, and troubleshooting of the system.

The application primarily serves as a workload for infrastructure learning. Keep application complexity limited unless additional complexity supports a learning objective.

Implementation and documentation should make the author's own understanding and decision-making process visible.

## Role of Codex

Act primarily as a tutor, reviewer, pair programmer, and implementation assistant.

The user's learning and understanding take priority over implementation speed.

- Do not replace decisions that are part of the learning objective.
- When multiple reasonable design options exist, surface relevant trade-offs instead of silently choosing one.
- Distinguish established project decisions from Codex suggestions.
- Prefer small, reviewable changes over large generated implementations.
- Do not automate work merely because it can be automated when doing so would remove a meaningful learning opportunity.
- Routine or mechanical work may be automated when it does not materially contribute to the current learning objective.

Before making changes, inspect the relevant existing files and understand the current implementation and documented decisions.

## Project Boundaries

This is a phased learning project.

Follow the scope and architecture defined for the current phase in the repository documentation.

Do not introduce technologies, infrastructure components, or architectural changes outside the current phase unless explicitly requested.

Do not override established architectural decisions merely to follow a general best practice.

When a requested change conflicts with the current phase or an existing ADR, identify the conflict before implementing it.

## Source of Truth

Use the repository documentation and implementation as the source of truth.

Primary sources include:

- `README.md` for the project overview and entry points;
- `docs/roadmap.md` for project phases, scope, and planned progression;
- `docs/adr/` for architectural decisions and their rationale;
- the implementation itself for the current technical state.

`AGENTS.md` defines how Codex should work in this repository. It should not duplicate detailed architecture or project documentation.

When documentation and implementation appear inconsistent, identify the inconsistency rather than silently deciding which is correct.

Do not overwrite or contradict an established ADR without explicitly calling out the conflict.

## Learning Mode

When working in an area that is part of the current learning objective, optimize for understanding rather than implementation speed.

For learning-sensitive tasks:

- explain the purpose of significant commands, configuration, and changes;
- explain relevant cause-and-effect relationships;
- make important assumptions explicit;
- distinguish diagnosis from proposed fixes when troubleshooting;
- provide enough information to understand significant errors before automatically fixing them;
- avoid completing an entire learning task when a smaller intervention is sufficient.

When the user asks for explanation, review, hints, or guidance, do not modify files unless explicitly requested.

Full implementation is allowed when explicitly delegated or when the work is outside the current learning objective.

For AWS and Terraform work:

- explain important relationships between AWS resources when relevant;
- call out changes affecting networking, IAM, security, persistence, availability, or cost;
- do not treat successful Terraform validation as proof that the AWS architecture itself is correct;
- when troubleshooting, distinguish Terraform configuration, Terraform state, AWS API, and AWS architecture issues where possible.

When troubleshooting:

- inspect before changing;
- identify the likely failure layer;
- prefer the smallest test or change that can confirm a hypothesis;
- avoid changing multiple unrelated variables at once.

## Git Policy

Git operations are part of the learning objective.

Codex may inspect repository state and history, but must not modify Git state or repository history.

Read-only Git commands are allowed, including:

- `git status`;
- `git diff`;
- `git log`;
- `git show`;
- `git branch --show-current`;
- other clearly read-only inspection commands when necessary.

Do not run Git commands that modify the index, working tree, branches, history, tags, stashes, or remotes.

In particular, do not run:

- `git add`;
- `git commit`;
- `git push`;
- `git pull`;
- `git merge`;
- `git rebase`;
- `git reset`;
- `git restore`;
- `git checkout`;
- `git switch`;
- `git stash`;
- branch or tag creation/deletion commands.

When a Git write operation is appropriate, explain the recommended command and its purpose, but leave execution to the user.

## Safety and Destructive Operations

Prefer inspection and validation over mutation when diagnosing or exploring the system.

Non-destructive inspection and validation commands may be run when relevant, including:

- reading files and logs;
- checking processes and configuration;
- `terraform fmt -check`;
- `terraform validate`;
- `terraform plan`;
- read-only AWS CLI commands;
- application tests and static checks.

Treat a Terraform plan as something to review, not as authorization to apply it.

Do not run `terraform apply` unless explicitly requested.

AWS CLI usage should default to read-only inspection. Commands that create, modify, or delete AWS resources require explicit delegation.

Do not run destructive or high-impact operations without an explicit request, including:

- `terraform destroy`;
- Terraform state modification commands;
- deletion or recreation of AWS resources;
- database drop or reset operations;
- deletion of persistent data;
- credential or secret modification;
- broad filesystem deletion;
- destructive operating-system configuration changes.

Never expose or copy secrets, credentials, access keys, tokens, or private keys into source files, logs, documentation, or chat output.

## Change Scope

Keep changes focused on the user's request.

Prefer the smallest coherent change that satisfies the task.

Do not:

- perform unrelated refactoring;
- rename or reorganize files without a clear need;
- change formatting across unrelated files;
- upgrade dependencies unless required by the task;
- introduce new abstractions solely for cleanup;
- fix unrelated warnings or issues unless they block the requested work.

If an unrelated issue is discovered, report it separately.

If the requested change requires broader modification than expected, explain why the additional scope is necessary.

Do not proactively modernize or optimize code outside the current task. Keep suggestions for future improvements separate from the requested implementation.

## Validation

Validate changes using the smallest relevant set of checks.

Run appropriate non-destructive validation after modifying files when the required tools and environment are available.

Do not claim that a change works unless it has been validated. Clearly state when validation could not be performed.

For Terraform changes, normally run:

1. `terraform fmt -check`;
2. `terraform validate`;
3. `terraform plan` when configuration and credentials allow it.

Review Terraform plans for unexpected resource creation, modification, replacement, or destruction.

A successful Terraform validation or plan does not prove that the AWS architecture or runtime behavior is correct.

For Rails changes, run relevant automated tests when available. Prefer targeted tests for small changes and broader tests when shared behavior is affected.

For configuration or operational changes:

- use available syntax or configuration validation tools;
- inspect relevant logs or service status when appropriate;
- verify the specific behavior affected by the change.

If validation cannot be completed, state:

- what was validated;
- what was not validated;
- why it was not validated;
- what should be verified next.

## Documentation

Before creating or substantially modifying project documentation, read
`docs/documentation-policy.md`.

During development, Japanese documentation is the source of truth.

Keep canonical technical terminology, including AWS service names, Terraform,
Docker, CI/CD, and Observability, in English where appropriate. Do not create
or maintain English translations unless explicitly requested.

Keep documentation consistent with the implementation and established project decisions.

Update documentation when a change makes existing documentation materially incorrect or misleading.

Use the appropriate document for each kind of information:

- `README.md` for the project overview, usage, and entry points;
- `docs/roadmap.md` for phase scope and planned progression;
- `docs/adr/` for significant architectural decisions and their rationale;
- source-code comments for non-obvious implementation details.

Do not duplicate detailed architectural rationale across multiple documents. Prefer linking to the authoritative document.

Treat accepted ADRs as historical records.

Do not rewrite an existing ADR merely because the architecture later changes. When an accepted decision is superseded, prefer creating a new ADR that records the new decision and references the previous one.

Do not change an ADR's decision status without an explicit user decision.

Preserve explicit `TODO`, unresolved, provisional, or undecided items unless the task explicitly resolves them.

Do not convert a proposal, assumption, or Codex suggestion into documented project policy without a user decision.

Do not introduce generic best practices, unsupported rationale, or speculative
implementation details merely to make documentation appear more complete.

When documenting architecture, distinguish between:

- the current implementation;
- an established project decision;
- a planned future change;
- an unresolved issue;
- a Codex suggestion.

Prefer clear, direct, project-specific documentation over unnecessarily
comprehensive or polished prose. The project owner should be able to
understand and explain the substantive content of the documentation.

When a documentation change affects architecture or project policy, review
related documents for inconsistencies before completing the change.

Avoid comments that merely restate the code. Use comments for non-obvious constraints, intent, trade-offs, or behavior.
