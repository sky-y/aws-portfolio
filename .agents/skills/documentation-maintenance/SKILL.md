---
name: documentation-maintenance
description: >
  Create, update, or review project documentation while preserving established
  project decisions, unresolved items, document responsibilities, and the
  repository documentation policy. Use for substantial changes to README.md,
  docs/roadmap.md, docs/adr/, and other project documentation.
---

# Documentation Maintenance

## Purpose

Maintain project documentation without allowing documentation work to silently
change project decisions.

This skill is a workflow for creating, substantially updating, or reviewing
project documentation.

The authoritative documentation rules are defined in
`docs/documentation-policy.md`. Follow the repository `AGENTS.md` as well.

Do not treat this skill as an independent source of architectural decisions.

## Core Principles

When maintaining documentation:

* Preserve established project decisions.
* Keep unresolved matters unresolved unless the task explicitly resolves them.
* Distinguish implementation, decisions, plans, unresolved issues, and
  suggestions.
* Do not invent rationale, requirements, or implementation details.
* Do not add generic best practices merely to make a document appear complete.
* Prefer accurate, project-specific documentation over polished but generic
  prose.
* Keep the documentation understandable and explainable by the project owner.

During development, Japanese documentation is the source of truth.

Keep canonical technical terminology in English where appropriate, including
AWS service names, Terraform, Docker, CI/CD, Observability, SLI/SLO, and other
terms whose translation would reduce clarity.

Do not create or maintain English translations unless explicitly requested.

## Source Precedence

Use the following precedence when determining what may be documented:

1. Explicit decisions or instructions from the current task.
2. Established project decisions, including accepted ADRs.
3. Existing authoritative project documentation.
4. Current implementation, for claims about what is actually implemented.
5. Provisional plans or explicit TODOs.
6. Codex suggestions.

A Codex suggestion is not a project decision.

If authoritative sources conflict, do not silently reconcile them. Identify the
conflict and preserve the distinction unless the task explicitly resolves it.

## Workflow

### 1. Read the Documentation Policy

Before making substantial documentation changes, read:

```text
docs/documentation-policy.md
```

Also follow the repository-level `AGENTS.md`.

### 2. Identify the Document's Responsibility

Determine what kind of information belongs in the target document.

Use these default responsibilities:

* `README.md`: project overview, usage, current status, and entry points.
* `docs/roadmap.md`: phase scope, learning objectives, planned progression,
  deliverables, and exit criteria.
* `docs/adr/`: significant architectural decisions and their rationale.
* Source-code comments: non-obvious implementation constraints, intent,
  trade-offs, or behavior.

Do not duplicate detailed architectural rationale across multiple documents.
Prefer linking to the authoritative document.

### 3. Inspect Relevant Existing Sources

Before drafting or editing, inspect the documents and implementation that can
constrain the change.

Depending on the task, this may include:

* `README.md`
* `docs/roadmap.md`
* relevant files under `docs/adr/`
* `AGENTS.md`
* relevant source code or configuration
* existing explicit TODOs

Do not search unrelated files merely to make the documentation broader.

### 4. Classify Statements Before Writing

For important architectural or project statements, determine which category
they belong to:

* **Current implementation** — verified in the repository.
* **Established decision** — explicitly decided and documented.
* **Planned change** — intended for a future phase.
* **Unresolved issue** — not yet decided.
* **Codex suggestion** — a proposal only.

Do not blur these categories in the resulting documentation.

### 5. Preserve Open Questions

Preserve explicit:

* `TODO`
* unresolved
* provisional
* undecided

items unless the task explicitly resolves them.

Do not infer a decision from common practice, AWS recommendations, tool
defaults, or apparent implementation convenience.

When useful, make a TODO more precise without resolving it.

For example:

```markdown
TODO: Phase 1でECSのlaunch modelを比較し、採用方式と理由を決定する。
```

### 6. Draft or Edit the Document

Write the minimum content necessary to accurately fulfill the document's role.

Prefer:

* direct explanations;
* project-specific statements;
* explicit scope boundaries;
* clear distinctions between current and future states;
* canonical technical terminology.

Avoid:

* generic introductions that add no project-specific information;
* unexplored alternatives presented as evaluated trade-offs;
* speculative implementation details;
* technologies that are not actually planned;
* excessive lists added only for apparent completeness;
* claims the project owner cannot reasonably explain.

### 7. Handle ADRs Carefully

Treat accepted ADRs as historical records.

Do not rewrite an accepted ADR merely because the architecture has changed.

When a previous decision is superseded, prefer a new ADR that:

* records the new context and decision;
* references the previous ADR;
* explains the consequences of the change.

Do not change an ADR's status unless the user explicitly decides to do so.

### 8. Review Related Documents

If the change affects architecture, phase scope, project policy, or current
status, inspect related documents for material inconsistencies.

Do not automatically rewrite every related document.

Update another document only when leaving it unchanged would make it materially
incorrect or misleading, or when the task explicitly includes that document.

### 9. Perform a Semantic Consistency Review

Before considering the documentation change complete, review the diff or
proposed text and answer these questions:

1. Did this change introduce an architectural decision that was not explicitly
   made?
2. Did it resolve any TODO or unresolved issue by assumption?
3. Did it add rationale that is not supported by an existing decision?
4. Did it convert a Codex suggestion or general best practice into project
   policy?
5. Did it describe planned functionality as already implemented?
6. Did it make the project appear more mature or complete than the repository
   supports?
7. Did it unnecessarily translate canonical technical terminology?
8. Did it introduce an English translation without an explicit request?
9. Is detailed architectural rationale duplicated instead of referenced?
10. Could the project owner reasonably understand and explain the substantive
    claims added by this change?

If any answer indicates a problem, revise the documentation before completing
the task.

## Verification

After documentation changes, run the repository's applicable documentation
checks.

First inspect the repository configuration to determine the actual commands.
Do not invent script names.

Typical checks may include:

* markdownlint;
* textlint;
* link or documentation-specific checks configured by the repository.

Only run checks applicable to the changed files.

If a check cannot be run, report that fact rather than claiming validation
succeeded.

## Completion Report

When reporting a substantial documentation change, keep the summary concise.

Include:

* what documentation was changed;
* any important consistency issue found;
* unresolved TODOs intentionally preserved;
* verification performed and its result.

Do not present unchanged proposals as newly accepted decisions.

## Boundaries

This skill does not authorize Codex to:

* decide architecture on behalf of the project owner;
* change project policy;
* resolve open design questions;
* change ADR status;
* add English translations;
* broaden project scope;
* modify implementation solely to make it match documentation.

If documentation reveals a genuine inconsistency that requires a project
decision, surface the inconsistency instead of silently choosing a resolution.
