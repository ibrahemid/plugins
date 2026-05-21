# Plugin Patterns

Reference for authoring plugins inside `plugins/`. For standalone plugin repos (`sesh/`, `claude-mem/`), follow each repo's own conventions.

## Minimal Plugin Skeleton

```
plugins/<name>/
  .claude-plugin/
    plugin.json
  commands/
    <command>.md        # if shipping a slash command
  skills/
    <skill>/SKILL.md    # if shipping a skill
  hooks/
    <event>.sh|.ts      # if shipping hooks
  README.md
```

## `plugin.json` Required Fields

```json
{
  "name": "kebab-case-name",
  "version": "0.1.0",
  "description": "One sentence, action-oriented, third-person.",
  "author": { "name": "ibrahemid" },
  "license": "MIT"
}
```

After creation, register in `../.claude-plugin/marketplace.json` under `plugins[]`:

```json
{
  "name": "<name>",
  "version": "0.1.0",
  "source": "./plugins/<name>",
  "description": "One sentence."
}
```

## Slash Command Frontmatter

```markdown
---
description: One line, third-person, what it does.
argument-hint: "<expected-arg>"
---

Command body. Use ${CLAUDE_PLUGIN_ROOT} for plugin-relative paths.
```

## Skill Frontmatter

```markdown
---
name: kebab-case-name
description: Use when <trigger phrases>. Then <what it does>.
---
```

Triggers must be concrete user-phrases ("audit my UI", "convert to HTML"), not capability descriptions. Match the working style of skills in `claude-mem/plugin/skills/`.

## Hooks

- Reference scripts with `${CLAUDE_PLUGIN_ROOT}/hooks/<file>`.
- Keep them idempotent and fast. Long work goes to a worker, not the hook.
- Validate input from `$1`/stdin; never trust the harness blindly.

## Validation Workflow

1. After authoring: invoke `plugin-dev:plugin-validator` agent.
2. For skills: invoke `plugin-dev:skill-reviewer` agent.
3. Install locally: `/plugin install <name>@ibrahemid`.
4. Run the happy path in a fresh CC session and verify.
5. Bump `version` in both `plugin.json` and `marketplace.json` entry on every change.

## Naming Anti-Patterns

- Don't use camelCase or snake_case in command/plugin names. Always kebab-case.
- Don't suffix with `-plugin` or `-skill`. The directory and manifest already imply that.
- Don't ship multiple commands per plugin unless they share state. Split otherwise.
