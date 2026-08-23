#!/usr/bin/env python3

import json
import re
import sys

SAFE_GIT_COMMANDS = {
    "status",
    "diff",
    "log",
    "show",
    "rev-parse",
}


def deny(reason: str) -> None:
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": reason,
                }
            }
        )
    )


def find_git_subcommands(command: str) -> list[str]:
    """
    Find ordinary Git invocations in a shell command.

    This is a guardrail for accidental Git writes, not a security boundary.
    """
    pattern = re.compile(
        r"""(?:^|[\s;&|()'"])
            (?:/[^\s'"]*/)?git
            \s+
            ([a-zA-Z][a-zA-Z0-9-]*)
        """,
        re.VERBOSE,
    )
    return pattern.findall(command)


def main() -> None:
    try:
        hook_input = json.load(sys.stdin)
    except (json.JSONDecodeError, OSError):
        return

    if hook_input.get("tool_name") != "Bash":
        return

    tool_input = hook_input.get("tool_input") or {}
    command = tool_input.get("command")

    if not isinstance(command, str):
        return

    subcommands = find_git_subcommands(command)

    for subcommand in subcommands:
        if subcommand in SAFE_GIT_COMMANDS:
            continue

        if subcommand == "branch":
            # AGENTS.md explicitly permits this read-only form.
            if re.search(r"\bgit\s+branch\s+--show-current(?:\s|$)", command):
                continue

        deny(
            f"Git command 'git {subcommand}' is blocked by the repository "
            "learning policy. Git write operations must be performed by the user."
        )
        return


if __name__ == "__main__":
    main()